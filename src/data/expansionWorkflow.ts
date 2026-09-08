import type { Patient, Report } from '../domain/models.ts';
import type { PatientHistory } from '../domain/longitudinal.ts';
import type { Discharge, WorkflowState } from '../domain/workflow.ts';

export function buildExpansionWorkflow(patients: Patient[], reports: Report[], histories: PatientHistory[]): WorkflowState {
  const added = patients.filter(patient => /^F-DEMO-00(?:5[1-9]|[6-9][0-9])$|^F-DEMO-0100$/.test(patient.uhid));
  const identifiers = new Set(added.map(patient => patient.id));
  const state: WorkflowState = structuredClone({ schema_version: 1, hospital_id: added[0]?.hospital_id ?? patients[0].hospital_id, revision: 0,
    patients: added, reports: reports.filter(report => identifiers.has(report.patient_id)),
    histories: histories.filter(history => identifiers.has(history.context.patient_id)),
    discharges: [], handovers: [], reviews: {}, commands: [], audit: [] });
  const reviewedAt = '2026-09-08T07:10:00.000Z';
  for (const history of state.histories) {
    const patient = state.patients.find(patient => patient.id === history.context.patient_id)!;
    const number = Number(patient.uhid.slice(-4));
    const stage = number % 10;
    const active = history.encounters.find(encounter => encounter.status === 'active')!;
    const stable = patient.acuity !== 'critical';
    for (const report of state.reports.filter(report => report.patient_id === patient.id && (stable || report.encounter_id !== active.id))) {
      state.reviews[report.id] = { at: stable ? reviewedAt : report.reported_at, actor: stable ? `${active.owner} · synthetic review fixture` : 'Historical review fixture' };
    }
    if (![7, 8, 9, 0].includes(stage)) continue;
    const ready = number === 90 || number === 100;
    const approvalPending = number === 80;
    const paperwork = number === 60 || number === 70;
    const summary = number === 60 || stage === 7 ? ''
      : `Synthetic discharge working draft: ${patient.conditions[0]}. ${history.context.presenting_complaint}\n${stable ? 'Current recovery assessment reviewed; the checklist below determines whether final approval is complete.' : 'Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.'}\nFollow-up: ${patient.department}; specific appointment and instructions must be verified before the patient leaves.`;
    const record: Discharge = {
      id: active.id.replace(/^.{8}/, '00000060'), patient_id: patient.id, hospital_id: patient.hospital_id, encounter_id: active.id,
      owner: active.owner, priority: stable ? 'routine' : 'urgent', target_date: stable ? '2026-09-08' : '2026-09-15',
      status: ready ? 'ready' : stage === 7 ? 'planned' : 'in_progress', summary,
      clinical_clearance: stable && !approvalPending,
      clearance_note: stable && !approvalPending ? 'Synthetic clinician clearance fixture: recovery observations, available investigations and specialist response reviewed; no current critical physiology is recorded.' : '',
      medications_checked: stable, follow_up_checked: stable, documents_checked: stable && !paperwork,
      created_at: '2026-09-08T06:20:00.000Z', updated_at: reviewedAt, discharged_at: null, version: 0,
    };
    state.discharges.push(record);
    if (stable) for (const request of history.requests.filter(request => request.encounter_id === active.id && request.status === 'completed')) request.reviewed_at = reviewedAt;
    const noteId = active.id.replace(/^.{8}/, '00000062');
    const body = `${ready ? 'Ready after synthetic clinician approval; final discharge completion is still pending.' : approvalPending ? 'Consultant approval pending; clinical clearance has not been signed.' : paperwork ? number === 60 ? 'Summary and discharge document completion required.' : 'Discharge documents and patient instructions require completion.' : 'Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.'}\n${summary || 'Working summary has not yet been written.'}`;
    if (!history.notes.some(note => note.id === noteId)) history.notes.push({ id: noteId, hospital_id: patient.hospital_id, patient_id: patient.id, encounter_id: active.id,
      kind: 'progress', title: 'Discharge working-list review (synthetic)', body, recorded_at: reviewedAt, author: active.owner, source_ids: [], source_system: 'VDoc' });
    if (!history.timeline.some(event => event.id === active.id.replace(/^.{8}/, '00000063'))) history.timeline.unshift({ id: active.id.replace(/^.{8}/, '00000063'), hospital_id: patient.hospital_id, patient_id: patient.id, encounter_id: active.id,
      occurred_at: reviewedAt, available_at: reviewedAt, title: 'Discharge planning review', kind: 'note', source_id: noteId, source_system: 'VDoc' });
  }
  return state;
}

export function mergeNewPatients(current: WorkflowState, expansion: WorkflowState): WorkflowState {
  if (current.hospital_id !== expansion.hospital_id) return current;
  const existing = new Set(current.patients.map(patient => patient.id));
  const missing = new Set(expansion.patients.filter(patient => !existing.has(patient.id)).map(patient => patient.id));
  if (!missing.size) return current;
  const next = structuredClone(current);
  next.patients.push(...structuredClone(expansion.patients.filter(patient => missing.has(patient.id))));
  next.histories.push(...structuredClone(expansion.histories.filter(history => missing.has(history.context.patient_id))));
  const reports = expansion.reports.filter(report => missing.has(report.patient_id));
  next.reports.push(...structuredClone(reports));
  next.discharges.push(...structuredClone(expansion.discharges.filter(record => missing.has(record.patient_id))));
  for (const report of reports) if (expansion.reviews[report.id]) next.reviews[report.id] = structuredClone(expansion.reviews[report.id]);
  next.revision++;
  return next;
}
