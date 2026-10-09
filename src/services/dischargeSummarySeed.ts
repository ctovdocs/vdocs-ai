import { dischargeSummaryText, type DischargeSummaryDoc } from '../domain/dischargeSummary';
import { nurses } from '../domain/roles';
import type { Discharge, WorkflowState } from '../domain/workflow';
import { buildDischargeSummary, demoDoctorCredentials } from './dischargeSummaryBuilder';

/** Demo patients (by UHID number) whose active discharge starts with a nurse-prepared draft awaiting a doctor. */
export const SEEDED_DRAFTS = [58, 68, 78];
/** Demo patients whose active discharge already has a signed summary, ready to download or complete. */
export const SEEDED_SIGNED = [59, 69, 100];

const uhidNumber = (state: WorkflowState, record: Discharge) => Number(state.patients.find(patient => patient.id === record.patient_id)?.uhid.slice(-4));

/**
 * Gives the demo realistic discharge paperwork: every completed discharge has a signed summary, and a few active ones are
 * prepared (draft or signed). Idempotent and deterministic; only touches records that have no summary yet. Returns the same
 * object when nothing changed. It is an in-memory overlay applied on every read: the revision is not bumped and nothing is written
 * until someone edits the record (the whole discharge record, including its summary, is saved then).
 */
export function seedDischargeSummaries(state: WorkflowState): WorkflowState {
  let next: WorkflowState | null = null;
  for (const [index, record] of state.discharges.entries()) {
    if (record.summary_doc || record.status === 'cancelled') continue;
    const number = uhidNumber(state, record);
    const discharged = record.status === 'discharged';
    const draft = !discharged && SEEDED_DRAFTS.includes(number);
    const signed = discharged || SEEDED_SIGNED.includes(number);
    if (!draft && !signed) continue;
    try {
      const nurse = nurses[index % nurses.length];
      const prepared = record.created_at;
      const signedAt = record.discharged_at ?? record.updated_at;
      const base = buildDischargeSummary(state, record, { name: nurse, role: 'nurse' }, prepared);
      const credentials = demoDoctorCredentials(record.owner);
      const doc: DischargeSummaryDoc = { ...base, edits: [{ at: prepared, by: nurse, role: 'nurse' as const, note: 'Prepared from the patient record' }],
        ...(signed ? { status: 'signed' as const, signed_by: record.owner, signed_qualification: credentials.qualification, signed_reg_no: credentials.reg_no, signed_at: signedAt } : {}) };
      if (signed) doc.edits.push({ at: signedAt, by: record.owner, role: 'doctor' as const, note: 'Signed off' });
      next ??= structuredClone(state);
      const target = next.discharges[index];
      target.summary_doc = doc; target.summary = dischargeSummaryText(doc);
    } catch { /* a record without a complete chart is left for staff to prepare */ }
  }
  return next ?? state;
}
