import type { WorkflowState } from '../domain/workflow';

export function removeLegacyInferredDischarges(state: WorkflowState): WorkflowState {
  const discharges = state.discharges.filter(record => {
    const patient = state.patients.find(patient => patient.id === record.patient_id);
    const encounter = state.histories.find(history => history.context.patient_id === record.patient_id)?.encounters.find(encounter => encounter.id === record.encounter_id);
    const originalFixture = patient && /^F-DEMO-00[0-5][0-9]$/.test(patient.uhid) && Number(patient.uhid.slice(-4)) <= 50;
    const untouched = record.status === 'planned' && record.version === 0 && !record.summary && !record.clearance_note
      && !record.clinical_clearance && !record.medications_checked && !record.follow_up_checked && !record.documents_checked
      && !record.discharged_at && record.created_at === encounter?.started_at && record.updated_at === record.created_at;
    const inferredId = record.id === record.encounter_id.replace(/^.{8}/, '00000060');
    const audited = state.audit.some(event => event.entity_id === record.id);
    return !(originalFixture && untouched && inferredId && !audited);
  });
  return discharges.length === state.discharges.length ? state : { ...state, discharges, revision: state.revision + 1 };
}
