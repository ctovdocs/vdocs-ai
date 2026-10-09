import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import type { CommandInput, WorkflowCommand, WorkflowState } from '../domain/workflow';
import { signSummary } from '../test/signSummary';
import { seedWardRounds } from './wardRoundSeed';
import { applyWorkflowCommand, initialWorkflowState } from './workflowEngine';
import { normalWorklistPatients } from './worklistSelectors';

const base = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
const rounds = (state: WorkflowState, uhid: string) => {
  const patient = state.patients.find(item => item.uhid === uhid)!;
  const history = state.histories.find(item => item.context.patient_id === patient.id)!;
  const active = history.encounters.find(item => item.status === 'active');
  return history.notes.filter(note => note.title.startsWith('Ward round') && note.encounter_id === active?.id);
};
const run = (state: WorkflowState, input: CommandInput) => applyWorkflowCommand(state, { ...input, id: crypto.randomUUID(), at: '2026-09-08T09:00:00.000Z', actor: input.actor ?? 'Dr. Ananya Mehta' } as WorkflowCommand);

describe('ward rounds for every inpatient', () => {
  const seeded = seedWardRounds(base());

  it('gives every demo inpatient at least two ward rounds and leaves OPD patients alone', () => {
    const active = seeded.patients.filter(patient => patient.encounter.startsWith('IPD'));
    expect(active).toHaveLength(94);
    for (const patient of active) expect(rounds(seeded, patient.uhid).length, patient.uhid).toBeGreaterThanOrEqual(2);
    for (const uhid of ['F-DEMO-0002', 'F-DEMO-0019', 'F-DEMO-0020']) expect(rounds(seeded, uhid)).toHaveLength(0);
  });

  it('leaves Rahul and the other first-fifty patients exactly as they were', () => {
    const before = base();
    for (const uhid of ['F-DEMO-0001', 'F-DEMO-0010', 'F-DEMO-0050']) expect(rounds(seeded, uhid)).toEqual(rounds(before, uhid));
    expect(rounds(seeded, 'F-DEMO-0001').map(note => note.title)).toEqual(['Ward round — admission day', 'Ward round — today, morning round']);
  });

  it('adds both rounds for Sunanda (#25) and a morning round after the existing review for #75, built from their own data', () => {
    expect(rounds(seeded, 'F-DEMO-0025').map(note => note.title).sort()).toEqual(['Ward round — admission day', 'Ward round — today, morning round']);
    const titles = rounds(seeded, 'F-DEMO-0075').map(note => note.title);
    expect(titles).toEqual(expect.arrayContaining(['Ward round — current admission review', 'Ward round — today, morning round']));
    const morning = rounds(seeded, 'F-DEMO-0075').find(note => note.title.includes('morning'))!;
    expect(morning.body).toMatch(/^Findings: Vitals: BP \d+\/\d+/);
    expect(morning.body).toContain('Plan:');
    expect(morning.author).toBe(seeded.histories.find(history => history.context.patient_id === morning.patient_id)!.encounters.find(item => item.status === 'active')!.owner);
  });

  it('is deterministic, idempotent, does not change the revision and adds matching timeline rows', () => {
    const again = seedWardRounds(base());
    expect(again.histories.flatMap(history => history.notes.map(note => note.id)).sort()).toEqual(seeded.histories.flatMap(history => history.notes.map(note => note.id)).sort());
    expect(seedWardRounds(seeded)).toBe(seeded);
    expect(seeded.revision).toBe(base().revision);
    const note = rounds(seeded, 'F-DEMO-0075').find(item => item.title.includes('morning'))!;
    const history = seeded.histories.find(item => item.context.patient_id === note.patient_id)!;
    expect(history.timeline.some(item => item.source_id === note.id && item.kind === 'note')).toBe(true);
    expect(history.timeline.map(item => item.available_at)).toEqual(history.timeline.map(item => item.available_at).sort().reverse());
  });

  it('still lets staff add a further round', () => {
    const patient = seeded.patients.find(item => item.uhid === 'F-DEMO-0075')!;
    const next = run(seeded, { type: 'round.create', patient_id: patient.id, findings: 'Afebrile overnight', plan: 'Continue' });
    expect(rounds(next, 'F-DEMO-0075')).toHaveLength(rounds(seeded, 'F-DEMO-0075').length + 1);
  });
});

describe('reopening a completed discharge', () => {
  const discharged = () => {
    let state = seedWardRounds(base());
    const patient = state.patients.find(item => item.uhid === 'F-DEMO-0090')!;
    const record = state.discharges.find(item => item.patient_id === patient.id && item.status === 'ready')!;
    state = signSummary(state, record);
    const signed = state.discharges.find(item => item.id === record.id)!;
    state = run(state, { type: 'discharge.update', patient_id: patient.id, entity_id: record.id, expected_version: signed.version, fields: {}, status: 'discharged' });
    return { state, patient, id: record.id };
  };

  it('puts the patient back on the inpatient lists, cancels the old discharge and records why', () => {
    const { state, patient, id } = discharged();
    expect(normalWorklistPatients(state).some(item => item.id === patient.id)).toBe(false);
    const record = state.discharges.find(item => item.id === id)!;
    const reopened = run(state, { type: 'discharge.reopen', patient_id: patient.id, entity_id: id, expected_version: record.version, reason: 'Discharged by mistake' });
    expect(reopened.patients.find(item => item.id === patient.id)!.encounter).toMatch(/^IPD · /);
    expect(normalWorklistPatients(reopened).some(item => item.id === patient.id)).toBe(true);
    expect(reopened.discharges.find(item => item.id === id)!.status).toBe('cancelled');
    const history = reopened.histories.find(item => item.context.patient_id === patient.id)!;
    expect(history.encounters.find(item => item.status === 'active')).toBeDefined();
    expect(history.notes.at(-1)!.title).toContain('Discharge reversed');
    expect(reopened.audit.at(-1)).toMatchObject({ action: 'discharge.reopen', entity_id: id });
  });

  it('needs a reason and refuses anything that is not a completed discharge', () => {
    const { state, patient, id } = discharged();
    const record = state.discharges.find(item => item.id === id)!;
    expect(() => run(state, { type: 'discharge.reopen', patient_id: patient.id, entity_id: id, expected_version: record.version, reason: 'no' })).toThrow();
    const reopened = run(state, { type: 'discharge.reopen', patient_id: patient.id, entity_id: id, expected_version: record.version, reason: 'Patient returned' });
    const cancelled = reopened.discharges.find(item => item.id === id)!;
    expect(() => run(reopened, { type: 'discharge.reopen', patient_id: patient.id, entity_id: id, expected_version: cancelled.version, reason: 'Again please' })).toThrow('completed discharge');
  });
});
