import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { applyWorkflowCommand, initialWorkflowState } from './workflowEngine';
import { doctorUpdates, UPDATE_DOCTOR, type DoctorUpdate } from './doctorUpdates';
import type { WorkflowState } from '../domain/workflow';

const initial = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
const mark = (state: WorkflowState, update: DoctorUpdate, read = true, actor = UPDATE_DOCTOR) => applyWorkflowCommand(state, {
  type: 'updates.read', id: crypto.randomUUID(), at: '2026-09-11T08:00:00.000Z', patient_id: update.patient_id, actor, update_ids: [update.id], read,
});

describe('doctor updates inbox', () => {
  it('persists read/unread without completing clinical work', () => {
    const state = initial();
    const update = doctorUpdates(state).find(item => item.type === 'lab')!;
    expect(update).toBeDefined();
    const read = mark(state, update);
    expect(doctorUpdates(read).find(item => item.id === update.id)?.read).toBe(true);
    expect(read.update_receipts?.[UPDATE_DOCTOR]?.[update.id]).toBeDefined();
    expect(read.reviews).toEqual(state.reviews);
    expect(read.histories).toEqual(state.histories);
    expect(read.handovers).toEqual(state.handovers);
    expect(doctorUpdates(mark(read, update, false)).find(item => item.id === update.id)?.read).toBe(false);
  });

  it('rejects unknown updates and mismatched patient scope', () => {
    const state = initial();
    const update = doctorUpdates(state)[0];
    expect(() => mark(state, { ...update, id: 'unknown' })).toThrow('outside');
    expect(() => mark(state, { ...update, patient_id: crypto.randomUUID() })).toThrow('patient');
    expect(doctorUpdates(state, 'Unrelated doctor')).toHaveLength(0);
  });

  it('makes changed requests unread and keeps receipts doctor-specific', () => {
    const state = initial();
    const history = state.histories.find(item => item.requests.length)!;
    const request = history.requests[0];
    request.owner = UPDATE_DOCTOR;
    const update = doctorUpdates(state).find(item => item.id.startsWith(`request:${request.id}:`))!;
    const read = mark(state, update);
    const changedRequest = read.histories.find(item => item.context.patient_id === history.context.patient_id)!.requests[0];
    changedRequest.version++;
    const changed = doctorUpdates(read).find(item => item.id.startsWith(`request:${request.id}:`))!;
    expect(changed.id).not.toBe(update.id);
    expect(changed.read).toBe(false);
    changedRequest.requested_by = 'Dr. Test Sender';
    const senderUpdate = doctorUpdates(read, 'Dr. Test Sender').find(item => item.id === changed.id)!;
    const senderRead = mark(read, senderUpdate, true, 'Dr. Test Sender');
    expect(doctorUpdates(senderRead, 'Dr. Test Sender').find(item => item.id === changed.id)?.read).toBe(true);
    expect(doctorUpdates(senderRead).find(item => item.id === changed.id)?.read).toBe(false);
  });

  it('includes newly published reports linked to their orders', () => {
    let state = initial();
    const patientId = doctorUpdates(state).find(item => item.type === 'lab')!.patient_id;
    const base = { patient_id: patientId, actor: UPDATE_DOCTOR, at: '2026-09-11T08:00:00.000Z' };
    state = applyWorkflowCommand(state, { ...base, id: crypto.randomUUID(), type: 'order.create', kind: 'lab', title: 'Inbox test investigation', indication: 'Synthetic test', priority: 'routine' });
    const order = state.histories.find(item => item.context.patient_id === patientId)!.orders.at(-1)!;
    state = applyWorkflowCommand(state, { ...base, id: crypto.randomUUID(), type: 'order.publish', entity_id: order.id, expected_version: order.version, performed_at: base.at, findings: 'Synthetic result', observations: [{ name: 'Creatinine', value: '2.2', unit: 'mg/dL', reference: '0.7–1.3', flag: 'high' }] });
    expect(doctorUpdates(state).find(item => item.id === `report:${state.reports[0].id}`)).toMatchObject({ read: false, attention: true, href: `/app/lab-orders?id=${order.id}` });
  });
});
