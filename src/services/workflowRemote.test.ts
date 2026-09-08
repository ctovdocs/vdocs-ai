import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { initialWorkflowState } from './workflowEngine';
import { clearWorkflowCache, dispatchWorkflow, readWorkflow } from './workflowStore';
import { patientService } from './clinical';

const remote = vi.hoisted(() => ({ read: vi.fn(), save: vi.fn() }));
vi.mock('../lib/env', () => ({ env: { mode: 'supabase' } }));
vi.mock('../lib/supabase', () => ({ supabase: { from: () => ({ select: () => ({ eq: () => ({ maybeSingle: remote.read }) }) }), rpc: remote.save } }));

beforeEach(() => { vi.clearAllMocks(); clearWorkflowCache(); });

describe('Supabase workflow persistence contract', () => {
  it('writes a whole basket in one database revision and reads the saved orders through patient services', async () => {
    let database = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
    remote.read.mockImplementation(async () => ({ data: { state: structuredClone(database) }, error: null }));
    remote.save.mockImplementation(async (name, args) => {
      expect(name).toBe('save_demo_workflow');
      expect(args.target_hospital).toBe(DEMO_HOSPITAL_ID);
      expect(args.expected_revision).toBe(database.revision);
      expect(args.next_state.revision).toBe(database.revision + 1);
      database = structuredClone(args.next_state);
      return { error: null };
    });
    vi.stubGlobal('window', new EventTarget());
    try {
      const id = await dispatchWorkflow({ type: 'order.place', patient_id: cohort.patients[0].id, kind: 'lab', priority: 'routine', indication: 'Synthetic evaluation',
        items: [{ title: 'Custom blood assay', specimen: 'Blood' }, { title: 'Custom stool assay', specimen: 'Stool' }] });
      expect(remote.save).toHaveBeenCalledTimes(1);
      const history = await patientService.history(cohort.patients[0].id);
      expect(history?.orders.filter(order => order.batch_id === id)).toHaveLength(2);
      expect((await readWorkflow()).revision).toBe(database.revision);
    } finally { vi.unstubAllGlobals(); }
  });

  it('surfaces database failure without reporting success or retaining partial orders', async () => {
    const database = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
    remote.read.mockResolvedValue({ data: { state: database }, error: null });
    remote.save.mockResolvedValue({ error: { code: '42501', message: 'Hospital membership required' } });
    await expect(dispatchWorkflow({ type: 'order.place', patient_id: cohort.patients[0].id, kind: 'imaging', priority: 'routine', indication: 'Synthetic evaluation', items: [{ title: 'Custom study', modality: 'MRI' }] })).rejects.toThrow('Hospital membership');
    expect(database.histories[0].orders.some(order => order.title === 'Custom study')).toBe(false);
  });
});
