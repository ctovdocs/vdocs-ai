import { PDFDocument, StandardFonts, rgb, type PDFFont } from 'pdf-lib';
import type { ClaimAction, ClaimCase, ClaimDocument } from '../domain/claims';
import type { InsurerClaimRecord, InsurerReceipt, PacketDocument, PacketField, SubmissionRequest, ValidationCheck } from '../domain/insurer';
import type { WorkflowState } from '../domain/workflow';

/** Hospital-side export adapter: reads the VDoc claim and patient records and produces what the insurer receives. */

export function buildPacketFields(claim: ClaimCase, state: WorkflowState): PacketField[] {
  const patient = state.patients.find(item => item.id === claim.patient_id);
  const discharge = claim.discharge_id ? state.discharges.find(item => item.id === claim.discharge_id) : undefined;
  const summaryDoc = claim.documents.find(doc => doc.kind === 'summary');
  const patientSource = patient ? `VDoc patient record · ${patient.uhid}` : 'Claim record';
  const field = (key: string, label: string, value: string, source: string): PacketField => ({ key, label, value, source });
  return [
    field('patient_name', 'Patient name', patient?.name ?? claim.patient_name, patientSource),
    field('uhid', 'UHID', patient?.uhid ?? claim.uhid, patientSource),
    field('insurer', 'Insurer / TPA', claim.insurer, 'Claim record · payer on file'),
    field('policy_number', 'Policy number', claim.form.policy_number, 'Claim form · policy fixture'),
    field('member_id', 'Member ID', claim.form.member_id, 'Claim form · policy fixture'),
    field('relationship', 'Relationship to policyholder', claim.form.relationship, 'Claim form'),
    field('admission_type', 'Admission type', claim.form.admission_type, 'Claim form'),
    field('room_category', 'Room category', claim.form.room_category, 'Claim form'),
    field('treating_doctor', 'Treating doctor', claim.form.treating_doctor, claim.discharge_id ? 'VDoc encounter owner' : 'Claim form'),
    field('diagnosis', 'Diagnosis', claim.form.diagnosis, patient ? 'VDoc patient conditions' : 'Claim form'),
    field('procedure', 'Treatment / procedure', claim.form.procedure, 'Claim form'),
    field('admission_date', 'Admission date', claim.admission_date, claim.discharge_id ? 'VDoc encounter start' : 'Historical episode'),
    field('discharge_date', 'Discharge date', claim.discharge_date, discharge ? 'VDoc discharge target date' : 'Historical episode'),
    field('bill_total', 'Final bill (INR)', String(claim.bill_total), 'Demo billing fixture'),
    field('preauth_reference', 'Pre-authorisation reference', claim.preauth_reference, 'Demo insurer fixture'),
    field('preauth_amount', 'Pre-authorised amount (INR)', String(claim.preauth_amount), 'Demo insurer fixture'),
    field('discharge_summary', 'Discharge summary', summaryDoc?.body.split('\n').slice(5).join('\n').trim() ?? '', discharge?.summary.trim() ? 'VDoc discharge summary' : 'Generated claims summary'),
  ];
}

const sha256Hex = async (bytes: Uint8Array) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes as BufferSource))).map(b => b.toString(16).padStart(2, '0')).join('');
const toBase64 = (bytes: Uint8Array) => { let binary = ''; for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return btoa(binary); };

/** Standard PDF fonts only cover WinAnsi; map the rupee sign and drop anything else unencodable. */
export function pdfSafe(text: string, font: PDFFont): string {
  const allowed = new Set(font.getCharacterSet());
  return Array.from(text.replaceAll('₹', 'Rs ').replaceAll('→', '->').replaceAll('✓', 'OK').replaceAll('\t', '  '))
    .map(char => char === '\n' || allowed.has(char.codePointAt(0)!) ? char : '?').join('');
}

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    let line = '';
    for (const word of paragraph.split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= width) { line = next; continue; }
      if (line) lines.push(line);
      line = word;
    }
    lines.push(line);
  }
  return lines;
}

export async function renderDocumentPdf(claim: ClaimCase, doc: ClaimDocument): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(doc.title); pdf.setSubject(`${claim.id} · ${claim.uhid}`); pdf.setProducer('VDoc claims export (synthetic demo)');
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const [pageWidth, pageHeight, margin, size, leading] = [595, 842, 48, 10, 14];
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  const newPage = () => { page = pdf.addPage([pageWidth, pageHeight]); y = pageHeight - margin; };
  const draw = (text: string, font: PDFFont, fontSize: number, color = rgb(0.13, 0.2, 0.18)) => {
    for (const line of wrap(pdfSafe(text, font), font, fontSize, pageWidth - margin * 2)) {
      if (y < margin + leading) newPage();
      page.drawText(line, { x: margin, y, size: fontSize, font, color }); y -= fontSize === size ? leading : fontSize + 6;
    }
  };
  draw('Demo Hospital · VDoc', bold, 9, rgb(0.08, 0.36, 0.33));
  draw(doc.title, bold, 18);
  y -= 4;
  draw(`${claim.patient_name} · ${claim.uhid}`, regular, size);
  draw(`Claim ${claim.id} · Episode ${claim.admission_date} to ${claim.discharge_date}`, regular, size);
  draw(`Source: ${doc.source} (${doc.source_id})`, regular, size, rgb(0.4, 0.45, 0.43));
  y -= 8; page.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 0.6, color: rgb(0.8, 0.85, 0.83) }); y -= 18;
  draw(doc.body, regular, size);
  y -= 10; draw('Synthetic demonstration document. Not a medical, legal or financial record.', regular, 8, rgb(0.5, 0.5, 0.5));
  return pdf.save();
}

export async function buildPacketDocuments(claim: ClaimCase, documents: ClaimDocument[]): Promise<PacketDocument[]> {
  return Promise.all(documents.map(async doc => {
    const bytes = await renderDocumentPdf(claim, doc);
    return { id: doc.id, kind: doc.kind, title: doc.title, filename: `${doc.id}.pdf`, sha256: await sha256Hex(bytes), bytes: bytes.length, content_base64: toBase64(bytes) };
  }));
}

export async function buildSubmission(claim: ClaimCase, state: WorkflowState, stage: 'initial' | 'response'): Promise<SubmissionRequest> {
  const documents = stage === 'initial' ? claim.documents.filter(doc => doc.attached) : claim.documents.filter(doc => doc.kind === 'pharmacy' && doc.attached);
  return {
    claim_id: claim.id, version: claim.version, hospital: 'Demo Hospital', narrative: stage === 'initial' ? claim.narrative : claim.response,
    fields: buildPacketFields(claim, state), documents: await buildPacketDocuments(claim, documents),
  };
}

export class InsurerServiceError extends Error {
  constructor(message: string, readonly checks: ValidationCheck[] = []) { super(message); }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try { response = await fetch(`/api/insurer${path}`, { ...init, headers: { 'content-type': 'application/json' } }); }
  catch { throw new InsurerServiceError('The demo insurer service is not reachable. Run VDoc with `npm run dev`.'); }
  const body = await response.json().catch(() => ({})) as { error?: string; checks?: ValidationCheck[] };
  if (!response.ok) throw new InsurerServiceError(response.status === 404 && !body.error ? 'The demo insurer service is not available in this build. Run VDoc with `npm run dev`.' : `${body.error ?? 'Insurer rejected the request'}${body.checks ? `: ${body.checks.filter(c => !c.ok).map(c => c.detail).join('; ')}` : ''}`, body.checks);
  return body as T;
}

export const sendClaimToInsurer = (request: SubmissionRequest) => call<InsurerReceipt>('/claims', { method: 'POST', body: JSON.stringify(request) });
export const sendResponseToInsurer = (ref: string, request: SubmissionRequest) => call<InsurerReceipt>(`/claims/${encodeURIComponent(ref)}/response`, { method: 'POST', body: JSON.stringify(request) });
export const fetchInsurerClaim = (ref: string) => call<InsurerClaimRecord>(`/claims/${encodeURIComponent(ref)}`);
export const fetchInsurerClaims = () => call<{ claims: InsurerClaimRecord[] }>('/claims');
export const requestInsurerDocument = (ref: string, kind: string, note: string) => call<InsurerClaimRecord>(`/claims/${encodeURIComponent(ref)}/query`, { method: 'POST', body: JSON.stringify({ kind, note }) });
export const sendInsurerEvent = (ref: string, event: { kind: 'authorisation' | 'settlement' | 'payment' | 'reconciliation'; detail: string; amount?: number; reference?: string }) =>
  call<InsurerClaimRecord>(`/claims/${encodeURIComponent(ref)}/events`, { method: 'POST', body: JSON.stringify(event) });
const rupees = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
/** The insurer-side event that a hospital action produces, or null when the action is internal to the hospital. */
export function insurerEventFor(action: ClaimAction['type'] | 'reset', saved: ClaimCase) {
  switch (action) {
    case 'authorise': return { kind: 'authorisation' as const, detail: `Authorised ${rupees(saved.authorised_amount ?? 0)}; patient payable ${rupees(saved.patient_payable ?? 0)}`, amount: saved.authorised_amount ?? 0 };
    case 'submit_settlement': return { kind: 'settlement' as const, detail: `Settlement packet ${saved.settlement_submission?.reference ?? ''} with ${saved.settlement_submission?.documents.length ?? 0} documents`, reference: saved.settlement_submission?.reference };
    case 'receive_payment': return { kind: 'payment' as const, detail: `Remitted to ${saved.bank_name}, UTR ${saved.utr}`, amount: saved.paid_amount ?? 0, reference: saved.utr ?? undefined };
    case 'reconcile': return { kind: 'reconciliation' as const, detail: 'Hospital accounts reconciled payment against the final bill; outstanding balance zero' };
    default: return null;
  }
}
export const resetInsurerInbox = () => call<{ ok: true }>('/reset', { method: 'POST' });

/** A claim submitted through the real transfer has a reference issued by the insurer service. */
export const isInsurerReference = (reference: string | undefined | null) => Boolean(reference && /^INS-\d{4}-\d{4}$/.test(reference));
