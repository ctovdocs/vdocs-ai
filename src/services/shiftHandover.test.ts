import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { initialWorkflowState, applyWorkflowCommand } from './workflowEngine';
import { captureShift, shiftChanged } from './shiftHandover';
import type { CommandInput, WorkflowCommand, WorkflowState } from '../domain/workflow';

const at = '2026-09-09T10:00:00.000Z';
const initial = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
const execute = (state: WorkflowState, input: CommandInput, time = at) => applyWorkflowCommand(state, { ...input, id: crypto.randomUUID(), actor: input.actor ?? 'Dr. Ananya Mehta', at: time } as WorkflowCommand);
function create() {
  let state = initial();
  const patients = state.patients.filter(patient => patient.department === 'Internal Medicine' && state.histories.some(history => history.context.patient_id === patient.id && history.encounters.some(encounter => encounter.kind === 'IPD' && encounter.status === 'active'))).slice(0, 2);
  for (const patient of patients) state = execute(state, { type: 'round.create', patient_id: patient.id, findings: `Round findings for ${patient.name}`, plan: 'Clinician-entered test plan' }, '2026-09-09T08:00:00.000Z');
  return execute(state, { type: 'shift.create', patient_id: patients[0].id, patient_ids: patients.map(patient => patient.id), to_doctor: 'Dr. Incoming', department: 'Internal Medicine', shift: 'Day', starts_at: '2026-09-09T06:00:00.000Z', ends_at: at });
}
function reviewed() {
  let state = create();
  for (const record of state.handovers.filter(record => record.shift_id)) state = execute(state, { type: 'handover.save', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version,
    actor: record.from_doctor, to_doctor: record.to_doctor, shift: record.shift, shift_at: record.shift_at, sections: { ...record.sections, next_actions: 'Incoming clinician to review pending results at next round.' }, escalation: 'Contact outgoing clinician for clarification using the ward directory.', shift_reviewed: true });
  return state;
}

describe('multi-patient shift handover', () => {
  it('captures each patient’s rounds and pending work with original authors and no cross-patient leakage', () => {
    const state = create();
    const records = state.handovers.filter(record => record.shift_id);
    expect(records).toHaveLength(2);
    expect(new Set(records.map(record => record.shift_id)).size).toBe(1);
    for (const record of records) {
      expect(record.source_snapshot?.some(source => source.title === 'Ward round' && source.author === 'Dr. Ananya Mehta' && source.scope === 'shift')).toBe(true);
      expect(record.source_snapshot?.some(source => source.scope === 'carry_forward')).toBe(true);
      const other = state.patients.find(patient => patient.id === records.find(item => item.id !== record.id)!.patient_id)!;
      expect(record.source_snapshot?.some(source => source.body.includes(`Round findings for ${other.name}`))).toBe(false);
      expect(shiftChanged(state, record, at)).toBe(false);
    }
  });

  it('requires all patient reviews and freezes approval plus receiver readback', () => {
    let state = create();
    const record = state.handovers.find(record => record.shift_id)!;
    const approve = { type: 'shift.approve' as const, patient_id: record.patient_id, shift_id: record.shift_id!, expected_revision: state.revision };
    expect(() => execute(state, approve)).toThrow('Review every patient');
    state = reviewed();
    const first = state.handovers.find(record => record.shift_id)!;
    state = execute(state, { ...approve, patient_id: first.patient_id, shift_id: first.shift_id!, expected_revision: state.revision });
    const frozen = structuredClone(state.handovers);
    expect(() => execute(state, { type: 'shift.refresh', patient_id: first.patient_id, shift_id: first.shift_id!, expected_revision: state.revision })).toThrow('draft');
    expect(() => execute(state, { type: 'shift.receive', patient_id: first.patient_id, shift_id: first.shift_id!, expected_revision: state.revision, readback: 'Understood' })).toThrow('incoming doctor');
    state = execute(state, { type: 'shift.receive', patient_id: first.patient_id, shift_id: first.shift_id!, expected_revision: state.revision, actor: 'Dr. Incoming', readback: 'Pending investigations reviewed and responsibilities confirmed.' });
    expect(state.handovers.every(record => record.status === 'received')).toBe(true);
    expect(state.handovers[0].source_snapshot).toEqual(frozen[0].source_snapshot);
    expect(state.handovers[0].readback).toContain('responsibilities');
  });

  it('detects new chart notes, refreshes sources without overwriting clinician text and resets review', () => {
    let state = reviewed();
    const record = state.handovers.find(record => record.shift_id)!;
    state = execute(state, { type: 'note.create', patient_id: record.patient_id, body: 'New clinical concern' }, '2026-09-09T09:00:00.000Z');
    expect(shiftChanged(state, record, at)).toBe(true);
    expect(() => execute(state, { type: 'shift.approve', patient_id: record.patient_id, shift_id: record.shift_id!, expected_revision: state.revision })).toThrow('changed');
    state = execute(state, { type: 'shift.refresh', patient_id: record.patient_id, shift_id: record.shift_id!, expected_revision: state.revision });
    const refreshed = state.handovers.find(item => item.id === record.id)!;
    expect(refreshed.sections).toEqual(record.sections);
    expect(refreshed.shift_reviewed).toBe(false);
    expect(refreshed.source_snapshot?.some(source => source.body === 'New clinical concern')).toBe(true);
  });

  it('rejects invalid scopes and stale packet revisions atomically', () => {
    const state = create();
    const record = state.handovers[0];
    expect(() => execute(state, { type: 'shift.refresh', patient_id: record.patient_id, shift_id: record.shift_id!, expected_revision: -1 })).toThrow('changed');
    const opd = state.patients.find(patient => patient.encounter.startsWith('OPD'))!;
    expect(() => execute(state, { type: 'shift.create', patient_id: opd.id, patient_ids: [opd.id], to_doctor: 'Dr. Incoming', department: opd.department, shift: 'Night', starts_at: '2026-09-09T00:00:00.000Z', ends_at: at })).toThrow('active IPD');
    expect(state.handovers).toHaveLength(2);
  });

  it('uses a half-open shift window and excludes future-recorded activity', () => {
    const state = create();
    const record = state.handovers[0];
    const history = state.histories.find(history => history.context.patient_id === record.patient_id)!;
    const note = history.notes.find(note => note.title === 'Ward round')!;
    note.recorded_at = at;
    expect(captureShift(state, record.patient_id, record.encounter_id, record.shift_start!, at, at).find(source => source.id === note.id)?.scope).toBe('carry_forward');
    note.recorded_at = '2026-09-10T09:00:00.000Z';
    expect(captureShift(state, record.patient_id, record.encounter_id, record.shift_start!, at, at).some(source => source.id === note.id)).toBe(false);
  });
});

describe('doctor and nurse handover entries', () => {
  const entry = (state: WorkflowState, extra: Record<string, unknown>) => {
    const record = state.handovers.find(item => item.shift_id)!;
    return execute(state, { type: 'shift.entry', patient_id: record.patient_id, shift_id: record.shift_id!, handover_id: record.id, role: 'nurse', actor: 'Nurse Priya Nair', op: 'add', title: 'Reduced intake', body: 'Half meals', ...extra } as CommandInput);
  };
  it('stamps role and author, lets only the author edit or delete, and does not look like a chart change', () => {
    let state = entry(create(), {});
    const record = () => state.handovers.find(item => item.shift_id)!;
    const added = record().source_snapshot!.find(source => source.manual)!;
    expect(added).toMatchObject({ role: 'nurse', author: 'Nurse Priya Nair', manual: true });
    expect(shiftChanged(state, record(), at)).toBe(false);
    expect(() => entry(state, { op: 'edit', entry_id: added.id, role: 'doctor', actor: 'Dr. Ananya Mehta' })).toThrow('only change entries you wrote');
    state = entry(state, { op: 'edit', entry_id: added.id, title: 'Updated' });
    expect(record().source_snapshot!.find(source => source.id === added.id)).toMatchObject({ title: 'Updated' });
    expect(record().source_snapshot!.find(source => source.id === added.id)!.edited_at).toBeTruthy();
    state = execute(state, { type: 'shift.refresh', patient_id: record().patient_id, shift_id: record().shift_id!, expected_revision: state.revision, actor: record().from_doctor });
    expect(record().source_snapshot!.some(source => source.id === added.id)).toBe(true);
    state = entry(state, { op: 'delete', entry_id: added.id });
    expect(record().source_snapshot!.some(source => source.id === added.id)).toBe(false);
  });
  it('rejects entries once the packet is approved', () => {
    const state = reviewed();
    const approved = execute(state, { type: 'shift.approve', patient_id: state.handovers.find(item => item.shift_id)!.patient_id, shift_id: state.handovers.find(item => item.shift_id)!.shift_id!, expected_revision: state.revision, actor: 'Dr. Ananya Mehta' });
    expect(() => entry(approved, {})).toThrow('draft');
  });
  it('infers roles for older records', () => {
    expect(create().handovers.find(item => item.shift_id)!.source_snapshot!.every(source => source.role)).toBe(true);
  });
});
