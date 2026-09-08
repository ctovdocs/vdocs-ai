import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { dispatchWorkflow, readWorkflow, WORKFLOW_STORAGE_KEY } from './workflowStore';
import { patientService, labService } from './clinical';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { initialWorkflowState } from './workflowEngine';
import { decodeWorkflow } from './workflowStorageCodec';

vi.mock('../lib/env', () => ({ env: { mode: 'mock' } }));
vi.mock('../lib/supabase', () => ({ supabase: null }));

const patientId = '20000000-0000-4000-8000-000000000001';
let saved: Map<string, string>;

beforeEach(() => {
  saved = new Map();
  let pending = Promise.resolve();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => saved.get(key) ?? null,
    setItem: (key: string, value: string) => saved.set(key, value),
  });
  vi.stubGlobal('window', new EventTarget());
  vi.stubGlobal('navigator', { locks: { request: (_name: string, callback: () => Promise<void>) => {
    const next = pending.then(callback);
    pending = next.catch(() => undefined);
    return next;
  } } });
});
afterEach(() => vi.unstubAllGlobals());

describe('shared local workflow persistence', () => {
  it('upgrades a saved fifty-patient demo without clearing doctor notes, chats or existing edits', async () => {
    const patientIds = new Set(cohort.patients.slice(0, 50).map(patient => patient.id));
    const old = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients.slice(0, 50), cohort.reports.filter(report => patientIds.has(report.patient_id)), cohort.histories.filter(history => patientIds.has(history.context.patient_id)));
    old.patients[0].name = 'Preserved user edit';
    old.revision = 7;
    saved.set(WORKFLOW_STORAGE_KEY, JSON.stringify(old));
    saved.set('doctor-notes-fixture', 'Keep these notes');
    saved.set('ai-chat-fixture', 'Keep this conversation');
    const state = await readWorkflow();
    expect(state.patients).toHaveLength(100);
    expect(state.patients[0].name).toBe('Preserved user edit');
    expect(state.revision).toBe(8);
    expect((await decodeWorkflow(saved.get(WORKFLOW_STORAGE_KEY)!)).patients).toHaveLength(100);
    expect((await readWorkflow()).revision).toBe(8);
    expect(saved.get('doctor-notes-fixture')).toBe('Keep these notes');
    expect(saved.get('ai-chat-fixture')).toBe('Keep this conversation');
  });
  it('serializes concurrent writes and reads persisted results through the patient and lab services', async () => {
    await Promise.all(['KFT', 'CBC'].map(title => dispatchWorkflow({ type: 'order.create', patient_id: patientId, kind: 'lab', title, indication: 'Synthetic follow-up', priority: 'routine' })));
    const history = await patientService.history(patientId);
    const orders = history!.orders.filter(order => order.source_system === 'VDoc');
    expect(orders.map(order => order.title)).toEqual(['KFT', 'CBC']);
    const order = orders[0];
    const reportId = await dispatchWorkflow({ type: 'order.publish', patient_id: patientId, entity_id: order.id, expected_version: 0,
      findings: 'Synthetic report', performed_at: order.placed_at, observations: [{ name: 'Creatinine', value: '2.2', unit: 'mg/dL', reference: '0.7–1.3', flag: 'high' }], actor: 'Demo laboratory operator' });
    expect((await labService.listReports(patientId)).find(report => report.id === reportId)?.order_id).toBe(order.id);
    expect((await patientService.history(patientId))!.orders.find(item => item.id === order.id)?.status).toBe('completed');
    const state = await readWorkflow();
    state.patients[0].name = 'Unsaved change';
    expect((await patientService.get(patientId))!.name).toBe('Rahul Sharma');
    expect(JSON.parse(saved.get(WORKFLOW_STORAGE_KEY)!).revision).toBe(3);
  });

  it('does not overwrite corrupt saved work with fresh fixtures', async () => {
    saved.set(WORKFLOW_STORAGE_KEY, '{broken');
    await expect(readWorkflow()).rejects.toThrow('has not been overwritten');
    expect(saved.get(WORKFLOW_STORAGE_KEY)).toBe('{broken');
  });

  it('reports storage failures instead of claiming that a clinical action succeeded', async () => {
    vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => { throw new Error('Storage full'); } });
    await expect(dispatchWorkflow({ type: 'round.create', patient_id: patientId, findings: 'Synthetic findings', plan: 'Review' })).rejects.toThrow('Storage full');
    expect(saved.size).toBe(0);
  });

  it('requires cross-tab locking before saving', async () => {
    vi.stubGlobal('navigator', {});
    await expect(dispatchWorkflow({ type: 'round.create', patient_id: patientId, findings: 'Synthetic findings', plan: 'Review' })).rejects.toThrow('Web Locks');
  });
});
