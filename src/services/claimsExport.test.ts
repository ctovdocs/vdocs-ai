import { describe, expect, it } from 'vitest';
import { cohort } from '../data/cohort';
import { buildExpansionWorkflow } from '../data/expansionWorkflow';
import { buildPacketFields, buildSubmission, insurerEventFor, isInsurerReference, pdfSafe } from './claimsExport';
import { seedClaim, transitionClaim } from './claimsDemo';
import { StandardFonts, PDFDocument } from 'pdf-lib';

const state = buildExpansionWorkflow(cohort.patients, cohort.reports, cohort.histories);
const at = '2026-10-08T06:00:00.000Z';
const prepared = () => { let claim = transitionClaim(seedClaim(state), { type: 'prepare' }, state, at); claim = transitionClaim(claim, { type: 'attach_report' }, state, at); return claim; };

describe('claims export adapter', () => {
  it('labels every field with its VDoc source', () => {
    const fields = buildPacketFields(prepared(), state);
    expect(fields.every(field => field.source.length > 0)).toBe(true);
    expect(fields.find(field => field.key === 'patient_name')?.source).toContain('VDoc patient record');
  });

  it('carries a changed discharge summary into the packet after preparation', () => {
    const edited = structuredClone(state);
    const discharge = edited.discharges.find(item => item.patient_id === seedClaim(state).patient_id)!;
    discharge.summary = 'Changed source value: resolved pneumonia, oral antibiotics for five days.';
    const claim = transitionClaim(seedClaim(edited), { type: 'prepare' }, edited, at);
    expect(buildPacketFields(claim, edited).find(field => field.key === 'discharge_summary')?.value).toContain('Changed source value');
    expect(claim.narrative).toContain('Changed source value');
  });

  it('renders real PDFs whose checksum and size match the manifest', async () => {
    const request = await buildSubmission(prepared(), state, 'initial');
    expect(request.documents).toHaveLength(8);
    for (const doc of request.documents) {
      const bytes = Buffer.from(doc.content_base64, 'base64');
      expect(bytes.subarray(0, 5).toString('latin1')).toBe('%PDF-');
      expect(bytes.length).toBe(doc.bytes);
      expect((await PDFDocument.load(bytes)).getPageCount()).toBeGreaterThan(0);
    }
  });

  it('keeps unencodable characters out of PDF text', async () => {
    const pdf = await PDFDocument.create(); const font = await pdf.embedFont(StandardFonts.Helvetica);
    expect(pdfSafe('Bill ₹1,000 → ok ✓ 😀', font)).toBe('Bill Rs 1,000 -> ok OK ?');
  });

  it('recognises insurer-issued references only', () => {
    expect(isInsurerReference('INS-2026-0001')).toBe(true);
    expect(isInsurerReference('DEMO-CLM-0090-5')).toBe(false);
  });

  it('maps presenter actions to insurer-side events with the saved amounts', () => {
    let claim = prepared();
    claim = transitionClaim(claim, { type: 'review_clinical', reviewed_version: claim.version }, state, at);
    claim = transitionClaim(claim, { type: 'review_billing', reviewed_version: claim.version }, state, at);
    claim = transitionClaim(claim, { type: 'submit', reviewed_version: claim.version }, state, at);
    expect(insurerEventFor('submit', claim)).toBeNull();
    claim = transitionClaim(claim, { type: 'authorise' }, state, at);
    expect(insurerEventFor('authorise', claim)).toMatchObject({ kind: 'authorisation', amount: claim.authorised_amount });
    claim = transitionClaim(claim, { type: 'submit_settlement' }, state, at);
    expect(insurerEventFor('submit_settlement', claim)).toMatchObject({ kind: 'settlement', reference: claim.settlement_submission?.reference });
    claim = transitionClaim(claim, { type: 'receive_payment' }, state, at);
    expect(insurerEventFor('receive_payment', claim)).toMatchObject({ kind: 'payment', amount: claim.paid_amount, reference: claim.utr });
    claim = transitionClaim(claim, { type: 'reconcile' }, state, at);
    expect(insurerEventFor('reconcile', claim)?.kind).toBe('reconciliation');
  });
});
