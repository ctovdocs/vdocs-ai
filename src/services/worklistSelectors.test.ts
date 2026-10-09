import { describe, expect, it } from 'vitest';
import { signSummary } from '../test/signSummary';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { applyWorkflowCommand, initialWorkflowState } from './workflowEngine';
import { dischargeViewRecords, normalWorklistPatients } from './worklistSelectors';
import { removeLegacyInferredDischarges } from './dischargeMigration';

const initial = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);

describe('explicit discharge routing', () => {
  it('removes only untouched legacy inferred entries without changing clinical records', () => {
    const state = initial();
    const patient = state.patients[0];
    const encounter = state.histories[0].encounters.find(encounter => encounter.status === 'active')!;
    const seeded = applyWorkflowCommand(state, { type: 'discharge.create', id: encounter.id.replace(/^.{8}/, '00000060'),
      patient_id: patient.id, actor: encounter.owner, at: encounter.started_at });
    seeded.audit = [];
    const migrated = removeLegacyInferredDischarges(seeded);
    expect(migrated.discharges).toEqual(state.discharges);
    expect(migrated.patients).toEqual(seeded.patients);
    expect(migrated.histories).toEqual(seeded.histories);
    expect(migrated.reports).toEqual(seeded.reports);
    expect(migrated.revision).toBe(seeded.revision + 1);
    expect(removeLegacyInferredDischarges(migrated)).toBe(migrated);
    seeded.discharges.at(-1)!.version = 1;
    expect(removeLegacyInferredDischarges(seeded)).toBe(seeded);
  });

  it('preserves explicit and audited planning records', () => {
    const state = initial();
    const patient = state.patients[0];
    const encounter = state.histories[0].encounters.find(encounter => encounter.status === 'active')!;
    for (const id of [crypto.randomUUID(), encounter.id.replace(/^.{8}/, '00000060')]) {
      const sent = applyWorkflowCommand(state, { type: 'discharge.create', id, patient_id: patient.id, actor: encounter.owner, at: encounter.started_at });
      expect(removeLegacyInferredDischarges(sent)).toBe(sent);
    }
  });

  it('does not route a patient because a discharge task exists', () => {
    const state = initial();
    const patient = state.patients[0];
    expect(normalWorklistPatients(state).some(item => item.id === patient.id)).toBe(true);
    expect(dischargeViewRecords(state, 'Active').some(item => item.patient_id === patient.id)).toBe(false);
  });

  it('moves only after sending, preserves clinical data, and restores on cancellation', () => {
    const before = initial();
    const patient = before.patients[0];
    const id = crypto.randomUUID();
    const state = applyWorkflowCommand(before, { type: 'discharge.create', id, patient_id: patient.id, actor: 'Dr. Ananya Mehta', at: '2026-09-08T09:00:00.000Z' });
    expect(normalWorklistPatients(state).some(item => item.id === patient.id)).toBe(false);
    expect(dischargeViewRecords(state, 'Active').some(item => item.id === id)).toBe(true);
    expect(state.patients).toEqual(before.patients);
    expect(state.reports).toEqual(before.reports);
    expect(state.reviews).toEqual(before.reviews);
    expect(state.histories[0].encounters).toEqual(before.histories[0].encounters);
    const cancelled = applyWorkflowCommand(state, { type: 'discharge.update', id: crypto.randomUUID(), entity_id: id, patient_id: patient.id,
      actor: 'Dr. Ananya Mehta', at: '2026-09-08T09:05:00.000Z', expected_version: 0, fields: {}, status: 'cancelled' });
    expect(normalWorklistPatients(cancelled).some(item => item.id === patient.id)).toBe(true);
    expect(dischargeViewRecords(cancelled, 'Active').some(item => item.id === id)).toBe(false);
    expect(dischargeViewRecords(cancelled, 'Discharged').some(item => item.id === id)).toBe(false);
    expect(dischargeViewRecords(cancelled, 'Cancelled').some(item => item.id === id)).toBe(true);
  });

  it('keeps readiness within an already initiated process and completed history separate', () => {
    const state = initial();
    const ready = state.discharges.find(record => record.status === 'ready')!;
    expect(dischargeViewRecords(state, 'Active')).toContain(ready);
    expect(normalWorklistPatients(state).some(patient => patient.id === ready.patient_id)).toBe(false);
    const signed = signSummary(state, ready);
    const signedReady = signed.discharges.find(record => record.id === ready.id)!;
    const completed = applyWorkflowCommand(signed, { type: 'discharge.update', id: crypto.randomUUID(), patient_id: ready.patient_id, entity_id: ready.id,
      expected_version: signedReady.version, status: 'discharged', fields: {}, actor: ready.owner, at: '2026-09-08T09:00:00.000Z' });
    expect(dischargeViewRecords(completed, 'Discharged').some(record => record.id === ready.id)).toBe(true);
    expect(dischargeViewRecords(completed, 'Active').some(record => record.id === ready.id)).toBe(false);
    expect(normalWorklistPatients(completed).some(patient => patient.id === ready.patient_id)).toBe(false);
  });

  it('does not hide a readmission because of an older discharged encounter', () => {
    const state = initial();
    const historical = state.discharges.find(record => record.status === 'discharged'
      && normalWorklistPatients(state).some(patient => patient.id === record.patient_id));
    expect(historical).toBeDefined();
    expect(dischargeViewRecords(state, 'Discharged')).toContain(historical);
  });
});
