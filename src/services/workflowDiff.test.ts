import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { applyWorkflowCommand, initialWorkflowState } from './workflowEngine';
import { diffWorkflowState, applyWorkflowPatch } from './workflowDiff';
import { doctorUpdates } from './doctorUpdates';
import type { CommandInput, WorkflowCommand } from '../domain/workflow';

function freshState() {
  return initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
}

function run(prev: ReturnType<typeof freshState>, input: CommandInput, id: string, at: string) {
  const command = { ...input, id, actor: input.actor ?? 'Dr. Ananya Mehta', at } as WorkflowCommand;
  const next = applyWorkflowCommand(prev, command);
  const patch = diffWorkflowState(prev, next);
  const reconstructed = applyWorkflowPatch(prev, patch);
  expect(reconstructed).toEqual(next);
  return next;
}

describe('diffWorkflowState + applyWorkflowPatch round-trip', () => {
  it('reconstructs state exactly for a single doctor note', () => {
    const prev = freshState();
    const patientId = prev.histories.find(history => history.encounters.some(encounter => encounter.status === 'active'))!.context.patient_id;
    run(prev, { type: 'note.create', patient_id: patientId, body: 'Round-trip note.' }, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '2026-09-09T10:00:00.000Z');
  });

  it('reconstructs state exactly for an order placement and its publish (touches orders, timeline, reports)', () => {
    let state = freshState();
    const patientId = state.histories.find(history => history.encounters.some(encounter => encounter.status === 'active'))!.context.patient_id;
    state = run(state, { type: 'order.place', patient_id: patientId, kind: 'lab', priority: 'routine', indication: 'Round-trip evaluation',
      items: [{ title: 'Round-trip assay', specimen: 'Blood' }] }, 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '2026-09-09T10:05:00.000Z');
    const order = state.histories.find(history => history.context.patient_id === patientId)!.orders.find(order => order.title === 'Round-trip assay')!;
    run(state, { type: 'order.publish', patient_id: patientId, entity_id: order.id, expected_version: order.version,
      findings: 'Unremarkable.', observations: [{ name: 'Haemoglobin', value: '13.5', unit: 'g/dL', flag: 'normal', reference: '12-16' }], performed_at: '2026-09-09T10:10:00.000Z' },
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc', '2026-09-09T10:15:00.000Z');
  });

  it('reconstructs state exactly for a discharge lifecycle (touches discharges, encounters, work_items)', () => {
    let state = freshState();
    const history = state.histories.find(history => history.encounters.some(encounter => encounter.kind === 'IPD' && encounter.status === 'active'))!;
    const patientId = history.context.patient_id;
    state = run(state, { type: 'discharge.create', patient_id: patientId }, 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', '2026-09-09T11:00:00.000Z');
    const discharge = state.discharges.find(item => item.patient_id === patientId)!;
    run(state, { type: 'discharge.update', patient_id: patientId, entity_id: discharge.id, expected_version: discharge.version,
      fields: { clinical_clearance: true, clearance_note: 'Cleared.', summary: 'Round-trip discharge summary.', medications_checked: true, follow_up_checked: true, documents_checked: true } },
      'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', '2026-09-09T11:05:00.000Z');
  });

  it('reconstructs state exactly for a brand-new patient registration (full history push)', () => {
    const prev = freshState();
    run(prev, { type: 'patient.register', patient_id: 'ffffffff-ffff-4fff-8fff-ffffffffffff', encounter_id: '11111111-1111-4111-8111-111111111111',
      uhid: 'F-ROUNDTRIP-0001', name: 'Round Trip Patient', age: 40, sex: 'F', department: 'Internal Medicine', reason: 'Round-trip check', kind: 'OPD', location: 'OPD / Room 9' },
      '22222222-2222-4222-8222-222222222222', '2026-09-09T12:00:00.000Z');
  });

  it('reconstructs state exactly for inbox read receipts (touches update_receipts)', () => {
    const prev = freshState();
    const update = doctorUpdates(prev)[0];
    run(prev, { type: 'updates.read', patient_id: update.patient_id, actor: 'Dr. Ananya Mehta', update_ids: [update.id], read: true },
      '33333333-3333-4333-8333-333333333333', '2026-09-09T12:05:00.000Z');
  });
});
