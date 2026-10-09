import type { Discharge, WorkflowCommand, WorkflowState } from '../domain/workflow';
import { buildDischargeSummary } from '../services/dischargeSummaryBuilder';
import { applyWorkflowCommand } from '../services/workflowEngine';

/** Test helper: fills the discharge summary from the chart, saves it as a nurse and signs it as the owning doctor. */
export function signSummary(state: WorkflowState, record: Discharge, at = '2026-09-08T08:00:00.000Z'): WorkflowState {
  const doc = buildDischargeSummary(state, record, { name: 'Nurse Priya Nair', role: 'nurse' }, at);
  const saved = applyWorkflowCommand(state, { type: 'discharge.summary.save', id: crypto.randomUUID(), at, actor: 'Nurse Priya Nair', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version, role: 'nurse', doc } as WorkflowCommand);
  return applyWorkflowCommand(saved, { type: 'discharge.summary.sign', id: crypto.randomUUID(), at, actor: record.owner, patient_id: record.patient_id, entity_id: record.id, expected_version: record.version + 1, role: 'doctor', qualification: 'MBBS, MD', reg_no: 'TEST-1' } as WorkflowCommand);
}
