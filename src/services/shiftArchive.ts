import type { WorkflowState } from '../domain/workflow';

export function shiftRoster(state: WorkflowState, department: string) {
  return state.patients.filter(patient => state.histories.some(history => {
    if (history.context.patient_id !== patient.id) return false;
    const active = history.encounters.find(encounter => encounter.kind === 'IPD' && encounter.status === 'active');
    return active && (patient.department === department || history.requests.some(request => request.encounter_id === active.id && request.to_department === department && !['completed', 'cancelled'].includes(request.status)));
  }));
}

export function patchArchiveParams(current: URLSearchParams, updates: Record<string, string | null>) {
  const next = new URLSearchParams(current);
  for (const [key, value] of Object.entries(updates)) { if (value) next.set(key, value); else next.delete(key); }
  return next;
}
