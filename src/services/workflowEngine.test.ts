import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { validateCohort } from '../data/validateCohort';
import type { CommandInput, WorkflowCommand, WorkflowState } from '../domain/workflow';
import { applyWorkflowCommand, dischargeBlockers, initialWorkflowState } from './workflowEngine';
import { withinDateRange } from '../lib/dateRange';

const patientId = cohort.patients[0].id;
const at = '2026-09-07T08:00:00.000Z';
const initial = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
const historyFor = (state: WorkflowState) => state.histories.find(history => history.context.patient_id === patientId)!;
const dischargeFor = (state: WorkflowState) => state.discharges.find(record => record.patient_id === patientId && !['discharged', 'cancelled'].includes(record.status))!;
const execute = (state: WorkflowState, input: CommandInput) => applyWorkflowCommand(state, { ...input, id: crypto.randomUUID(), at, actor: input.actor ?? 'Dr. Ananya Mehta' } as WorkflowCommand);

function readyState() {
  let state = execute(initial(), { type: 'discharge.create', patient_id: patientId });
  const encounterId = historyFor(state).context.current_encounter_id;
  for (const order of historyFor(state).orders.filter(order => order.encounter_id === encounterId && order.status === 'pending')) {
    state = execute(state, { type: 'order.status', patient_id: patientId, entity_id: order.id, expected_version: order.version, status: 'cancelled', reason: 'Test fixture cancellation approved by doctor' });
  }
  for (const request of historyFor(state).requests.filter(request => request.encounter_id === encounterId)) {
    state = request.status === 'completed'
      ? execute(state, { type: 'request.review', patient_id: patientId, entity_id: request.id, expected_version: request.version })
      : execute(state, { type: 'request.update', patient_id: patientId, entity_id: request.id, expected_version: request.version, owner: request.owner, priority: request.priority, status: 'cancelled', reason: 'Test fixture cancellation' });
  }
  for (const report of state.reports.filter(report => report.patient_id === patientId && report.encounter_id === encounterId)) {
    state = execute(state, { type: 'report.review', patient_id: patientId, entity_id: report.id });
  }
  for (const work of historyFor(state).work_items.filter(work => work.encounter_id === encounterId && work.kind === 'review' && work.status === 'pending')) {
    state = execute(state, { type: 'work.complete', patient_id: patientId, entity_id: work.id });
  }
  const record = dischargeFor(state);
  return execute(state, { type: 'discharge.update', patient_id: patientId, entity_id: record.id, expected_version: record.version, status: 'ready', fields: {
    summary: 'Clinician-authored test discharge record.', clinical_clearance: true, clearance_note: 'Reviewed for this synthetic test.', medications_checked: true, follow_up_checked: true, documents_checked: true,
  } });
}

describe('connected clinical workflows', () => {
  it('validates the expanded authored cohort without silently changing its proportions', () => {
    expect(validateCohort(cohort)).toMatchObject({ patients: 100, critical_patients: 88, patients_with_multiple_visits: 80 });
    expect(initial().patients).toHaveLength(100);
  });

  it.each(['lab', 'imaging'] as const)('connects a %s order to publication, patient report, review and audit', kind => {
    let state = execute(initial(), { type: 'order.create', patient_id: patientId, kind, title: 'Test investigation', indication: 'Clinician-entered indication', priority: 'urgent' });
    const order = historyFor(state).orders.at(-1)!;
    state = execute(state, { type: 'order.status', patient_id: patientId, entity_id: order.id, expected_version: 0, status: 'processing' });
    state = execute(state, { type: 'order.publish', patient_id: patientId, entity_id: order.id, expected_version: 1, findings: 'Synthetic report findings', performed_at: at,
      observations: kind === 'lab' ? [{ name: 'Creatinine', value: '2.2', unit: 'mg/dL', reference: '0.7–1.3', flag: 'high' }] : [] });
    const report = state.reports[0];
    expect(historyFor(state).orders.at(-1)).toMatchObject({ status: 'completed', result_id: report.id, version: 2 });
    expect(report).toMatchObject({ patient_id: patientId, order_id: order.id, kind });
    expect(state.reviews[report.id]).toBeUndefined();
    state = execute(state, { type: 'report.review', patient_id: patientId, entity_id: report.id });
    expect(state.reviews[report.id].actor).toBe('Dr. Ananya Mehta');
    expect(state.audit.map(event => event.action)).toEqual(['order.create', 'order.status', 'order.publish', 'report.review']);
    expect(historyFor(state).timeline[0].source_id).toBe(report.id);
  });

  it('rejects duplicate open orders, empty reports, invalid specimen times and stale updates', () => {
    const state = execute(initial(), { type: 'order.create', patient_id: patientId, kind: 'lab', title: 'KFT', indication: 'Follow-up', priority: 'routine' });
    const order = historyFor(state).orders.at(-1)!;
    expect(() => execute(state, { type: 'order.create', patient_id: patientId, kind: 'lab', title: ' kft ', indication: 'Follow-up', priority: 'routine' })).toThrow('already exists');
    expect(() => execute(state, { type: 'order.status', patient_id: patientId, entity_id: order.id, expected_version: 8, status: 'processing' })).toThrow('changed');
    expect(() => execute(state, { type: 'order.publish', patient_id: patientId, entity_id: order.id, expected_version: 0, performed_at: at, findings: 'Empty', observations: [] })).toThrow('at least one');
    expect(() => execute(state, { type: 'order.publish', patient_id: patientId, entity_id: order.id, expected_version: 0, performed_at: '2026-09-08T08:00:00.000Z', findings: 'Future', observations: [] })).toThrow('time');
    expect(historyFor(state).orders.at(-1)?.status).toBe('pending');
  });

  it.each(['request', 'referral'] as const)('enforces the %s lifecycle, specialist response and requester review', kind => {
    let state = execute(initial(), { type: 'request.create', patient_id: patientId, kind, to_department: 'Nephrology', reason: 'Review renal trend', priority: 'urgent', owner: 'Dr. Devika Rao', source_ids: [] });
    const id = historyFor(state).requests.at(-1)!.id;
    const update = { type: 'request.update' as const, patient_id: patientId, entity_id: id, owner: 'Dr. Devika Rao', priority: 'urgent' as const };
    expect(() => execute(state, { ...update, expected_version: 0, status: 'completed', response: 'Skipped review' })).toThrow('in-progress');
    state = execute(state, { ...update, expected_version: 0, status: 'accepted', response: 'Draft response retained for later review' });
    expect(historyFor(state).requests.at(-1)).toMatchObject({ response: null, response_draft: 'Draft response retained for later review' });
    state = execute(state, { ...update, expected_version: 1, status: 'in_progress' });
    expect(() => execute(state, { ...update, expected_version: 2, status: 'completed', response: '  ' })).toThrow('response');
    state = execute(state, { ...update, expected_version: 2, status: 'completed', response: 'Review documented; follow-up plan communicated.' });
    expect(historyFor(state).requests.at(-1)?.reviewed_at).toBeNull();
    state = execute(state, { type: 'request.review', patient_id: patientId, entity_id: id, expected_version: 3 });
    expect(historyFor(state).requests.at(-1)).toMatchObject({ kind, status: 'completed', reviewed_at: at, version: 4 });
  });

  it('keeps discharge planning persistent, blocks premature completion and retains history', () => {
    let state = execute(initial(), { type: 'discharge.create', patient_id: patientId });
    const record = dischargeFor(state);
    expect(record.status).toBe('planned');
    expect(dischargeBlockers(state, record).length).toBeGreaterThan(0);
    expect(() => execute(state, { type: 'discharge.update', patient_id: patientId, entity_id: record.id, expected_version: record.version, fields: {}, status: 'ready' })).toThrow('attention');
    expect(() => execute(state, { type: 'discharge.update', patient_id: patientId, entity_id: record.id, expected_version: record.version, fields: {}, status: 'discharged' })).toThrow('readiness');
    state = readyState();
    const ready = dischargeFor(state);
    expect(dischargeBlockers(state, ready)).toEqual([]);
    state = execute(state, { type: 'discharge.update', patient_id: patientId, entity_id: ready.id, expected_version: ready.version, fields: {}, status: 'discharged' });
    expect(state.patients[0].encounter).toMatch(/^Discharged/);
    expect(historyFor(state).encounters.some(encounter => encounter.status === 'active')).toBe(false);
    expect(state.discharges.find(item => item.id === ready.id)).toMatchObject({ status: 'discharged', discharged_at: at });
    expect(historyFor(state).notes.at(-1)?.kind).toBe('discharge');
    expect(() => execute(state, { type: 'order.create', patient_id: patientId, kind: 'lab', title: 'KFT', indication: 'After closure', priority: 'routine' })).toThrow('active encounter');
  });

  it('revokes readiness if new pending work arrives and prevents task shortcuts', () => {
    let state = readyState();
    const beforeVersion = dischargeFor(state).version;
    state = execute(state, { type: 'order.create', patient_id: patientId, kind: 'lab', title: 'KFT', indication: 'New question', priority: 'urgent' });
    expect(dischargeFor(state)).toMatchObject({ status: 'in_progress', version: beforeVersion + 1 });
    const task = historyFor(state).work_items.find(item => item.kind === 'discharge')!;
    expect(() => execute(state, { type: 'work.complete', patient_id: patientId, entity_id: task.id })).toThrow('checklist');
  });

  it('requires IPD handover review and preserves the approved snapshot through receipt', () => {
    let state = execute(initial(), { type: 'handover.create', patient_id: patientId, to_doctor: 'Dr. Incoming', shift: 'Night', shift_at: at });
    const draft = state.handovers[0];
    expect(draft.sections.pending_items).toContain('Result to review');
    expect(draft.source_ids.length).toBeGreaterThan(0);
    expect(() => execute(state, { type: 'handover.approve', patient_id: patientId, entity_id: draft.id, expected_version: 0 })).toThrow('next actions');
    state = execute(state, { type: 'handover.save', patient_id: patientId, entity_id: draft.id, expected_version: 0, to_doctor: draft.to_doctor, shift: draft.shift, shift_at: at, sections: { ...draft.sections, next_actions: 'Review pending results and contact the responsible consultant.' } });
    state = execute(state, { type: 'handover.approve', patient_id: patientId, entity_id: draft.id, expected_version: 1 });
    const snapshot = structuredClone(state.handovers[0].sections);
    expect(() => execute(state, { type: 'handover.save', patient_id: patientId, entity_id: draft.id, expected_version: 2, to_doctor: draft.to_doctor, shift: draft.shift, shift_at: at, sections: draft.sections })).toThrow('cannot be edited');
    expect(() => execute(state, { type: 'handover.receive', patient_id: patientId, entity_id: draft.id, expected_version: 2 })).toThrow('named receiving doctor');
    state = execute(state, { type: 'handover.receive', patient_id: patientId, entity_id: draft.id, expected_version: 2, actor: 'Dr. Incoming' });
    expect(state.handovers[0]).toMatchObject({ status: 'received', received_at: at, sections: snapshot });
    const opd = state.patients.find(patient => patient.encounter.startsWith('OPD'))!;
    expect(() => execute(state, { type: 'handover.create', patient_id: opd.id, to_doctor: 'Dr. Incoming', shift: 'Night', shift_at: at })).toThrow('IPD');
  });

  it('persists ward rounds as notes and applies command retries only once', () => {
    const command: WorkflowCommand = { type: 'round.create', id: crypto.randomUUID(), patient_id: patientId, at, actor: 'Dr. Mehta', findings: 'Synthetic review', plan: 'Review pending work' };
    const state = applyWorkflowCommand(initial(), command);
    expect(applyWorkflowCommand(state, command)).toBe(state);
    expect(historyFor(state).notes.at(-1)?.body).toContain('Review pending work');
    expect(historyFor(state).timeline[0].source_id).toBe(historyFor(state).notes.at(-1)?.id);
  });

  it('rejects cross-patient sources and entity IDs without changing the input', () => {
    const state = initial();
    const foreignReport = state.reports.find(report => report.patient_id !== patientId)!;
    expect(() => execute(state, { type: 'report.review', patient_id: patientId, entity_id: foreignReport.id })).toThrow('not found');
    expect(() => execute(state, { type: 'request.create', patient_id: patientId, kind: 'request', to_department: 'Nephrology', reason: 'Review', owner: 'Dr. Rao', priority: 'routine', source_ids: [foreignReport.id] })).toThrow('belong to this patient');
    expect(state.revision).toBe(0);
  });

  it('applies date filters at IST midnight, excluding future dates', () => {
    const now = new Date('2026-09-07T18:45:00.000Z');
    expect(withinDateRange('2026-09-07T18:30:00.000Z', 'today', now)).toBe(true);
    expect(withinDateRange('2026-09-07T18:29:59.000Z', 'today', now)).toBe(false);
    expect(withinDateRange('2026-09-07', 'yesterday', now)).toBe(true);
    expect(withinDateRange('2026-09-09', '7', now)).toBe(false);
    expect(withinDateRange('2026-09-02', '7', now)).toBe(true);
  });
});
