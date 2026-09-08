import type { WorkflowState } from '../domain/workflow';

export function normalWorklistPatients(state: WorkflowState) {
  const currentEncounters = new Map(state.histories.map(history => [history.context.patient_id,
    history.encounters.find(encounter => encounter.status === 'active')?.id ?? history.context.current_encounter_id]));
  const routedEncounters = new Set(state.discharges.filter(record => record.status !== 'cancelled').map(record => record.encounter_id));
  return state.patients.filter(patient => !patient.encounter.startsWith('Discharged')
    && !routedEncounters.has(currentEncounters.get(patient.id) ?? ''));
}

export function dischargeViewRecords(state: WorkflowState, view: string) {
  return state.discharges.filter(record => view === 'Discharged' ? record.status === 'discharged'
    : view === 'Cancelled' ? record.status === 'cancelled'
      : ['planned', 'in_progress', 'ready'].includes(record.status));
}
