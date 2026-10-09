import { PDFDocument, StandardFonts, degrees, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { HOSPITAL_PROFILE, type DischargeSummaryDoc } from '../domain/dischargeSummary';
import { formatDateTime } from './dischargeSummaryBuilder';
import { pdfSafe, wrap } from './claimsExport';

const NAVY = rgb(0.043, 0.18, 0.35); const BLUE = rgb(0.35, 0.45, 0.6); const GREY = rgb(0.4, 0.42, 0.45);
const INK = rgb(0.1, 0.12, 0.15); const PALE = rgb(0.91, 0.94, 0.98); const LINE = rgb(0.25, 0.27, 0.3);
const W = 595; const H = 842; const M = 40; const CONTENT = W - M * 2; const BOTTOM = 56;

/** Renders the discharge summary as an A4 PDF in the hospital template. Standard fonts only: characters outside WinAnsi print as '?'. */
export async function renderDischargeSummaryPdf(doc: DischargeSummaryDoc): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Discharge summary - ${doc.patient.name} (${doc.patient.uhid})`); pdf.setProducer('VDoc'); pdf.setCreator('VDoc discharge summary');
  const regular = await pdf.embedFont(StandardFonts.Helvetica); const bold = await pdf.embedFont(StandardFonts.HelveticaBold); const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);
  let page: PDFPage = pdf.addPage([W, H]); let y = H - M;
  const pages: PDFPage[] = [page];
  const safe = (text: string, font: PDFFont) => pdfSafe(text, font);
  const newPage = () => { page = pdf.addPage([W, H]); pages.push(page); y = H - M; };
  const ensure = (height: number) => { if (y - height < BOTTOM) newPage(); };
  const lines = (text: string, font: PDFFont, size: number, width: number) => wrap(safe(text || '', font), font, size, width);
  const center = (text: string, font: PDFFont, size: number, color = INK) => { const t = safe(text, font); page.drawText(t, { x: (W - font.widthOfTextAtSize(t, size)) / 2, y, size, font, color }); };

  center(HOSPITAL_PROFILE.name, bold, 20, BLUE); y -= 18; center(HOSPITAL_PROFILE.locality, bold, 11, BLUE); y -= 14;
  for (const row of lines(`${HOSPITAL_PROFILE.address} | ${HOSPITAL_PROFILE.contact}`, regular, 7.5, CONTENT - 20)) { center(row, regular, 7.5, GREY); y -= 10; }
  y -= 4; page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1.6, color: rgb(0.55, 0.65, 0.8) }); y -= 24;
  center('DISCHARGE SUMMARY', bold, 17, NAVY); y -= 26;

  const section = (title: string) => { ensure(40); page.drawText(safe(title, bold), { x: M, y, size: 11, font: bold, color: NAVY }); y -= 5; page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1.2, color: NAVY }); y -= 14; };
  const boxed = (text: string, hint: string) => {
    const content = lines(text.trim() || hint, text.trim() ? regular : italic, 9.5, CONTENT - 16); const font = text.trim() ? regular : italic;
    let index = 0;
    while (index < content.length) {
      ensure(30); const room = Math.max(1, Math.floor((y - BOTTOM - 10) / 12.5)); const chunk = content.slice(index, index + room); const height = chunk.length * 12.5 + 10;
      page.drawRectangle({ x: M, y: y - height + 4, width: CONTENT, height, borderColor: rgb(0.8, 0.8, 0.82), borderWidth: 0.8 });
      chunk.forEach((row, i) => page.drawText(row, { x: M + 8, y: y - 8 - i * 12.5, size: 9.5, font, color: text.trim() ? INK : GREY }));
      y -= height + 4; index += chunk.length;
    }
    y -= 8;
  };
  const labelled = (label: string, value: string) => {
    const row = lines(`${label}: ${value.trim() || '-'}`, regular, 10, CONTENT); ensure(row.length * 13 + 4);
    row.forEach((text, i) => { page.drawText(text, { x: M + 4, y: y - i * 13, size: 10, font: i === 0 ? regular : regular, color: INK }); }); y -= row.length * 13 + 3;
  };
  const bullets = (items: string[]) => {
    const list = items.filter(item => item.trim()); if (!list.length) list.push('-');
    for (const item of list) { const row = lines(item, regular, 10, CONTENT - 28); ensure(row.length * 13 + 3); page.drawCircle({ x: M + 12, y: y + 3.5, size: 2.2, color: INK });
      row.forEach((text, i) => page.drawText(text, { x: M + 24, y: y - i * 13, size: 10, font: regular, color: INK })); y -= row.length * 13 + 3; }
    y -= 4;
  };

  section('PATIENT INFORMATION');
  const cols = [105, 152, 105, 153]; const rows: string[][] = [
    ['Patient Name', doc.patient.name, 'UHID / MRN', doc.patient.uhid], ['Age / Sex', doc.patient.age_sex, 'Date of Birth', doc.patient.dob],
    ['Address', doc.patient.address, 'Contact Number', doc.patient.phone], ['Admission Date', doc.patient.admitted_at, 'Discharge Date', doc.patient.discharged_at],
    ['Department', doc.patient.department, 'Room / Bed No.', doc.patient.ward_bed], ['Consultant / Treating Doctor', doc.patient.consultant, 'Referring Doctor', doc.patient.referring_doctor],
  ];
  for (const row of rows) {
    const wrapped = row.map((cell, i) => lines(cell || '-', i % 2 === 0 ? bold : regular, 9, cols[i] - 10)); const height = Math.max(...wrapped.map(item => item.length)) * 11 + 10;
    ensure(height); let x = M;
    wrapped.forEach((cellLines, i) => {
      page.drawRectangle({ x, y: y - height + 2, width: cols[i], height, borderColor: LINE, borderWidth: 0.8, color: i % 2 === 0 ? PALE : undefined });
      cellLines.forEach((text, k) => page.drawText(text, { x: x + 5, y: y - 10 - k * 11, size: 9, font: i % 2 === 0 ? bold : regular, color: i % 2 === 0 ? NAVY : INK })); x += cols[i];
    });
    y -= height;
  }
  y -= 16;
  section('DIAGNOSIS'); labelled('Primary Diagnosis', doc.primary_diagnosis); labelled('Secondary Diagnosis / Comorbidities', doc.secondary_diagnosis || 'None recorded'); y -= 8;
  section('PRESENTING COMPLAINTS'); boxed(doc.presenting_complaints, '-');
  if (doc.past_history.trim()) { section('PAST HISTORY'); boxed(doc.past_history, '-'); }
  labelled('Allergies', doc.allergies); y -= 6;
  section('CLINICAL / PHYSICAL EXAMINATION FINDINGS'); boxed(doc.examination, '-');
  section('INVESTIGATIONS'); bullets([`Laboratory findings: ${doc.investigations.lab.replace(/\n/g, '; ') || '-'}`, `Imaging: ${doc.investigations.imaging.replace(/\n/g, '; ') || '-'}`, `Other investigations: ${doc.investigations.other || '-'}`]);
  section('HOSPITAL COURSE / TREATMENT SUMMARY'); boxed(doc.hospital_course, '-');
  section('PROCEDURE(S) PERFORMED'); { const done = doc.procedures.filter(item => item.name.trim()).map(item => [item.name, item.date, item.performed_by].filter(Boolean).join(' | ')); bullets(done.length ? done : ['No procedure performed']); }
  section('CONDITION AT DISCHARGE'); labelled('General Condition', doc.condition.general);
  labelled('Vitals at Discharge', `BP ${doc.condition.bp || '__'} | Pulse ${doc.condition.pulse || '__'} | Temp ${doc.condition.temp || '__'} | SpO2 ${doc.condition.spo2 || '__'} | RR ${doc.condition.rr || '__'}`); y -= 8;

  section('DISCHARGE MEDICATIONS');
  const mc = [150, 110, 70, 100, 85]; const head = ['Medicine Name', 'Dosage', 'Route', 'Frequency', 'Duration'];
  const drawMedHeader = () => { ensure(26); let x = M; head.forEach((label, i) => { page.drawRectangle({ x, y: y - 20, width: mc[i], height: 22, color: NAVY, borderColor: LINE, borderWidth: 0.8 }); page.drawText(label, { x: x + 5, y: y - 13, size: 9.5, font: bold, color: rgb(1, 1, 1) }); x += mc[i]; }); y -= 22; };
  drawMedHeader();
  const meds = doc.medications.filter(item => item.name.trim() || item.dosage.trim()); const medRows = meds.length ? meds : [{ name: '', dosage: '', route: '', frequency: '', duration: '' }];
  for (const med of medRows) {
    const cells = [med.name, med.dosage, med.route, med.frequency, med.duration].map((cell, i) => lines(cell, regular, 9, mc[i] - 10)); const height = Math.max(...cells.map(item => item.length), 1) * 11 + 12;
    if (y - height < BOTTOM) { newPage(); drawMedHeader(); }
    let x = M; cells.forEach((cellLines, i) => { page.drawRectangle({ x, y: y - height + 2, width: mc[i], height, borderColor: LINE, borderWidth: 0.8 }); cellLines.forEach((text, k) => page.drawText(text, { x: x + 5, y: y - 11 - k * 11, size: 9, font: regular, color: INK })); x += mc[i]; });
    y -= height;
  }
  y -= 16;
  section('DIET & ACTIVITY ADVICE'); bullets([`Diet: ${doc.diet || '-'}`, `Activity: ${doc.activity || '-'}`]);
  section('FOLLOW-UP INSTRUCTIONS'); bullets([`Follow-up with: ${doc.follow_up.with || '-'}${doc.follow_up.date ? ` on ${doc.follow_up.date}` : ''}`, `Investigations to repeat before follow-up: ${doc.follow_up.investigations || '-'}`]);
  section('WARNING SIGNS - WHEN TO SEEK IMMEDIATE MEDICAL ATTENTION'); bullets(doc.warning_signs);
  section('DISCHARGE STATUS'); labelled('Discharged', doc.discharge_status);

  ensure(110); y -= 40; const half = CONTENT / 2 - 10;
  page.drawLine({ start: { x: M + 4, y }, end: { x: M + half, y }, thickness: 0.8, color: rgb(0.6, 0.6, 0.62) }); page.drawLine({ start: { x: M + half + 20, y }, end: { x: W - M - 4, y }, thickness: 0.8, color: rgb(0.6, 0.6, 0.62) });
  if (doc.status === 'signed') page.drawText(safe(`Digitally signed: ${doc.signed_by}`, italic), { x: M + 6, y: y + 6, size: 10, font: italic, color: NAVY });
  y -= 14; page.drawText('Signature of Treating Consultant', { x: M + 6, y, size: 10, font: regular, color: GREY }); page.drawText('Hospital Seal / Date', { x: M + half + 24, y, size: 10, font: regular, color: GREY }); y -= 12;
  const signLine = doc.status === 'signed' ? `${doc.signed_by}, ${doc.signed_qualification}, Reg. No. ${doc.signed_reg_no}` : 'Awaiting doctor sign-off';
  lines(signLine, italic, 8.5, half - 6).forEach(text => { page.drawText(text, { x: M + 6, y, size: 8.5, font: italic, color: GREY }); y -= 10; });
  page.drawText(safe(doc.signed_at ? formatDateTime(doc.signed_at).split(',')[0] : '__-__-____', italic), { x: M + half + 24, y: y + 10 * Math.max(1, lines(signLine, italic, 8.5, half - 6).length), size: 8.5, font: italic, color: GREY });
  y -= 4; page.drawText(safe(`Prepared by: ${doc.prepared_by} (${doc.prepared_role})`, italic), { x: M + 6, y, size: 8, font: italic, color: GREY });

  pages.forEach((target, index) => {
    const label = `${HOSPITAL_PROFILE.footer} Page ${index + 1} of ${pages.length}`; target.drawText(label, { x: (W - regular.widthOfTextAtSize(label, 8)) / 2, y: 28, size: 8, font: regular, color: GREY });
    if (doc.status !== 'signed') target.drawText('DRAFT', { x: 130, y: 250, size: 120, font: bold, color: rgb(0.8, 0.82, 0.85), opacity: 0.35, rotate: degrees(40) });
  });
  return pdf.save();
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
  const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'application/pdf' }));
  const link = document.createElement('a'); link.href = url; link.download = filename; document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
export const summaryFilename = (doc: DischargeSummaryDoc) => `Discharge-Summary-${doc.patient.uhid}${doc.status === 'signed' ? '' : '-DRAFT'}.pdf`;
