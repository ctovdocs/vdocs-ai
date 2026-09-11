import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { initialWorkflowState } from './workflowEngine';
import { clearWorkflowCache, dispatchWorkflow, readWorkflow } from './workflowStore';
import { patientService } from './clinical';
import { doctorUpdates, UPDATE_DOCTOR } from './doctorUpdates';

const remote = vi.hoisted(() => ({ read: vi.fn(), save: vi.fn() }));
vi.mock('../lib/env', () => ({ env: { mode: 'supabase' } }));
vi.mock('../lib/supabase', () => ({ supabase: { from: () => ({ select: () => ({ eq: () => ({ maybeSingle: remote.read }) }) }), rpc: remote.save } }));

beforeEach(() => { vi.clearAllMocks(); clearWorkflowCache(); });

describe('Supabase workflow persistence contract', () => {
  it('saves inbox read receipts and restores them after a fresh database read', async () => {
    let database = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
    const update = doctorUpdates(database)[0];
    remote.read.mockImplementation(async () => ({ data: { state: structuredClone(database) }, error: null }));
    remote.save.mockImplementation(async (name, args) => {
      expect(name).toBe('save_demo_workflow');
      expect(args.expected_revision).toBe(database.revision);
      database = structuredClone(args.next_state);
      return { error: null };
    });
    vi.stubGlobal('window', new EventTarget());
    try {
      await dispatchWorkflow({ type: 'updates.read', patient_id: update.patient_id, actor: UPDATE_DOCTOR, update_ids: [update.id], read: true });
      clearWorkflowCache();
      expect(doctorUpdates(await readWorkflow()).find(item => item.id === update.id)?.read).toBe(true);
      expect(remote.save).toHaveBeenCalledTimes(1);
    } finally { vi.unstubAllGlobals(); }
  });

  it('saves the ten-shift seed once and treats repeated import as a no-op', async () => {
    let database = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
    remote.read.mockImplementation(async () => ({ data: { state: structuredClone(database) }, error: null }));
    remote.save.mockImplementation(async (_name, args) => {
      expect(args.next_state.revision).toBe(database.revision + 1);
      database = structuredClone(args.next_state);
      return { error: null };
    });
    vi.stubGlobal('window', new EventTarget());
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-09T12:00:00.000Z'));
    try {
      await dispatchWorkflow({ type: 'shift.seed', patient_id: cohort.patients[0].id });
      await dispatchWorkflow({ type: 'shift.seed', patient_id: cohort.patients[0].id });
      expect(remote.save).toHaveBeenCalledTimes(1);
      expect(database.handovers).toHaveLength(120);
      expect((await readWorkflow()).handovers).toHaveLength(120);
    } finally { vi.useRealTimers(); vi.unstubAllGlobals(); }
  });

  it('persists a multi-patient shift packet in one RPC and preserves source snapshots on reload', async () => {
    let database = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
    const patients = database.patients.filter(patient => patient.department === 'Internal Medicine' && database.histories.some(history => history.context.patient_id === patient.id && history.encounters.some(encounter => encounter.kind === 'IPD' && encounter.status === 'active'))).slice(0, 2);
    remote.read.mockImplementation(async () => ({ data: { state: structuredClone(database) }, error: null }));
    remote.save.mockImplementation(async (_name, args) => {
      expect(args.next_state.revision).toBe(database.revision + 1);
      database = structuredClone(args.next_state);
      return { error: null };
    });
    vi.stubGlobal('window', new EventTarget());
    try {
      const id = await dispatchWorkflow({ type: 'shift.create', patient_id: patients[0].id, patient_ids: patients.map(patient => patient.id), actor: 'Dr. Ananya Mehta', to_doctor: 'Dr. Incoming', department: 'Internal Medicine', shift: 'Day', starts_at: '2026-09-08T00:00:00.000Z', ends_at: '2026-09-08T08:00:00.000Z' });
      expect(remote.save).toHaveBeenCalledTimes(1);
      const reloaded = await readWorkflow();
      expect(reloaded.handovers.filter(record => record.shift_id === id)).toHaveLength(2);
      expect(reloaded.handovers[0].source_snapshot?.length).toBeGreaterThan(0);
    } finally { vi.unstubAllGlobals(); }
  });

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
