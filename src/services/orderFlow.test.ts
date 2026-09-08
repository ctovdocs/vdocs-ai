import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { orderCatalog } from '../data/orderCatalog';
import { applyWorkflowCommand, initialWorkflowState } from './workflowEngine';
import type { WorkflowCommand } from '../domain/workflow';

const initial = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
const patientId = cohort.patients[0].id;
const command = (kind: 'lab' | 'imaging'): Extract<WorkflowCommand, { type: 'order.place' }> => ({
  type: 'order.place', id: crypto.randomUUID(), patient_id: patientId, actor: 'Dr. Ananya Mehta', at: '2026-09-08T09:00:00.000Z', kind,
  indication: 'Synthetic clinician request', priority: 'urgent', items: orderCatalog.filter(item => item.kind === kind).slice(0, 3).map(item => ({ catalog_id: item.id, title: item.title, site: 'Clinician-entered site', instructions: 'Confirm with receiving service' })),
});

describe('catalog and multi-investigation workflow', () => {
  it('has unique catalog codes and supports blood, urine, stool, cultures and multiple imaging modalities', () => {
    expect(new Set(orderCatalog.map(item => item.id)).size).toBe(orderCatalog.length);
    expect(orderCatalog.filter(item => item.kind === 'lab').length).toBeGreaterThan(100);
    expect(orderCatalog.filter(item => item.kind === 'imaging').length).toBeGreaterThan(40);
    for (const category of ['Urine', 'Stool', 'Respiratory', 'Haematology', 'CT', 'MRI', 'Doppler']) expect(orderCatalog.some(item => item.category === category)).toBe(true);
  });

  it.each(['lab', 'imaging'] as const)('places multiple %s orders in one revision with independent reports and timeline references', kind => {
    const before = initial();
    const input = command(kind);
    const state = applyWorkflowCommand(before, input);
    const orders = state.histories[0].orders.filter(order => order.batch_id === input.id);
    expect(orders).toHaveLength(3);
    expect(new Set(orders.map(order => order.id)).size).toBe(3);
    expect(state.revision).toBe(before.revision + 1);
    expect(applyWorkflowCommand(state, input)).toBe(state);
    for (const order of orders) {
      expect(order).toMatchObject({ hospital_id: DEMO_HOSPITAL_ID, patient_id: patientId, status: 'pending', priority: 'urgent', site: 'Clinician-entered site' });
      expect(state.histories[0].timeline.some(event => event.source_id === order.id)).toBe(true);
    }
    const completed = applyWorkflowCommand(state, { type: 'order.publish', id: crypto.randomUUID(), actor: 'Synthetic receiving service', patient_id: patientId,
      at: '2026-09-08T10:00:00.000Z', performed_at: input.at, entity_id: orders[0].id, expected_version: 0, findings: 'Synthetic findings', observations: kind === 'lab' ? [{ name: 'Test result', value: 'Negative', unit: '', reference: 'Negative', flag: 'normal' }] : [] });
    expect(completed.histories[0].orders.find(order => order.id === orders[0].id)?.status).toBe('completed');
    expect(completed.histories[0].orders.find(order => order.id === orders[1].id)?.status).toBe('pending');
    expect(completed.reports[0].order_id).toBe(orders[0].id);
    expect(completed.reviews[completed.reports[0].id]).toBeUndefined();
  });

  it('rejects duplicates, invalid catalog, and custom orders missing specimen without partial changes', () => {
    const state = initial();
    const snapshot = structuredClone(state);
    const input = command('lab');
    expect(() => applyWorkflowCommand(state, { ...input, items: [input.items[0], input.items[0]] })).toThrow('Already ordered');
    expect(() => applyWorkflowCommand(state, { ...input, items: [{ title: 'Unknown', catalog_id: 'missing' }] })).toThrow('catalog');
    expect(() => applyWorkflowCommand(state, { ...input, items: [{ title: 'Custom panel' }] })).toThrow('specimen');
    expect(state).toEqual(snapshot);
    const ordered = applyWorkflowCommand(state, input);
    expect(() => applyWorkflowCommand(ordered, { ...input, id: crypto.randomUUID() })).toThrow('Already ordered');
  });

  it('supports custom investigations and new referral departments without inventing department patients', () => {
    const state = applyWorkflowCommand(initial(), { ...command('lab'), items: [{ title: 'Custom specialist assay', specimen: 'Blood', instructions: 'Confirm availability' }] });
    const request: WorkflowCommand = { type: 'request.create', id: crypto.randomUUID(), patient_id: patientId, actor: 'Dr. Ananya Mehta', at: '2026-09-08T10:00:00.000Z',
      kind: 'referral', to_department: 'Neurology', reason: 'Synthetic clinical question', owner: 'Neurology receiving team', priority: 'urgent', source_ids: [], request_type: 'Clinical assessment', contact: 'Ward extension 123' };
    const sent = applyWorkflowCommand(state, request);
    expect(sent.histories[0].requests.at(-1)).toMatchObject({ to_department: 'Neurology', requested_by: 'Dr. Ananya Mehta', contact: 'Ward extension 123', status: 'received' });
    expect(() => applyWorkflowCommand(sent, { ...request, id: crypto.randomUUID() })).toThrow('identical');
    expect(sent.patients).toEqual(state.patients);
  });
});
