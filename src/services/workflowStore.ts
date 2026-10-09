import { workflowStateSchema, type CommandInput, type WorkflowState, type WorkflowCommand } from '../domain/workflow';
import { historySchema } from '../domain/longitudinal';
import { patientSchema, reportSchema } from '../domain/models';
import { cohort, DEMO_HOSPITAL_ID, SNAPSHOT_AT } from '../data/cohort';
import { buildExpansionWorkflow, mergeNewPatients } from '../data/expansionWorkflow';
import { env } from '../lib/env';
import { supabase } from '../lib/supabase';
import { applyWorkflowCommand, initialWorkflowState } from './workflowEngine';
import { diffWorkflowState } from './workflowDiff';
import { decodeWorkflow, encodeWorkflow } from './workflowStorageCodec';
import { removeLegacyInferredDischarges } from './dischargeMigration';
import { seedDischargeSummaries } from './dischargeSummarySeed';

export const WORKFLOW_STORAGE_KEY = 'vdoc.workflow.india-high-acuity-50-v2.v1';
const expansionSeed = buildExpansionWorkflow(cohort.patients, cohort.reports, cohort.histories);
export const WORKFLOW_CHANGED = 'vdoc:workflow-changed';
let remoteRead: Promise<WorkflowState> | null = null;
let remoteReadAt = 0;
/** Cheap change check for polling: reads only the `revision` column, not the multi-megabyte state. */
export async function fetchRemoteRevision(): Promise<number | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('demo_workflow_state').select('revision').eq('hospital_id', DEMO_HOSPITAL_ID).maybeSingle();
  return error || !data ? null : Number(data.revision);
}
export function clearWorkflowCache() {
  remoteRead = null;
  remoteReadAt = 0;
}

async function localState() {
  const saved = localStorage.getItem(WORKFLOW_STORAGE_KEY);
  if (saved) {
    try { return seedDischargeSummaries(removeLegacyInferredDischarges(mergeNewPatients(await decodeWorkflow(saved), expansionSeed))); }
    catch { throw new Error('Saved workflow data could not be read. Export or clear this demo’s saved data before resetting; it has not been overwritten.'); }
  }
  return seedDischargeSummaries(initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories));
}

async function readRemote() {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase.from('demo_workflow_state').select('state').eq('hospital_id', DEMO_HOSPITAL_ID).maybeSingle();
  if (error) throw new Error(`Workflow database unavailable. Apply migration 003 first. ${error.message}`);
  if (data) {
    const current = workflowStateSchema.parse(data.state);
    const next = removeLegacyInferredDischarges(current);
    if (next !== current) {
      const result = await supabase.rpc('save_demo_workflow', { target_hospital: DEMO_HOSPITAL_ID, expected_revision: current.revision, next_state: next });
      if (result.error?.code === '40001') return readRemote();
      if (result.error) throw result.error;
    }
    return seedDischargeSummaries(next); // in-memory overlay; persisted only when a record is edited
  }
  const names = ['patients', 'reports', 'contexts', 'encounters', 'notes', 'vitals', 'medications', 'orders', 'requests', 'work_items', 'timeline', 'immunizations'] as const;
  const entries = await Promise.all(names.map(async name => {
    const rows: Record<string, unknown>[] = [];
    for (let offset = 0; ; offset += 500) {
      const result = await supabase!.from(`demo_${name}`).select('*').eq('hospital_id', DEMO_HOSPITAL_ID).order('id').range(offset, offset + 499);
      if (result.error) throw result.error;
      rows.push(...result.data);
      if (result.data.length < 500) break;
    }
    return [name, rows] as const;
  }));
  const tables = Object.fromEntries(entries);
  const patients = tables.patients.map(patient => patientSchema.parse(patient));
  const reports = tables.reports.map(report => reportSchema.parse(report));
  if (!patients.length) throw new Error('No accessible hospital patients. Seed the demo and provision your hospital membership.');
  const histories = tables.contexts.map(context => historySchema.parse({
    context, ...Object.fromEntries(names.filter(name => !['patients', 'reports', 'contexts'].includes(name)).map(name => [name, tables[name].filter(row => row.patient_id === context.patient_id)])),
  }));
  const initial = initialWorkflowState(DEMO_HOSPITAL_ID, patients, reports, histories);
  initial.reports.sort((first, second) => second.reported_at.localeCompare(first.reported_at));
  for (const history of initial.histories) {
    history.encounters.sort((first, second) => first.started_at.localeCompare(second.started_at));
    history.vitals.sort((first, second) => first.recorded_at.localeCompare(second.recorded_at));
    history.timeline.sort((first, second) => second.available_at.localeCompare(first.available_at));
  }
  const result = await supabase.rpc('save_demo_workflow', { target_hospital: DEMO_HOSPITAL_ID, expected_revision: -1, next_state: initial });
  if (result.error) {
    if (result.error.code === '40001') return readRemote();
    throw result.error;
  }
  return initial;
}

export async function readWorkflow(): Promise<WorkflowState> {
  if (env.mode === 'mock') {
    const read = async () => {
      const saved = localStorage.getItem(WORKFLOW_STORAGE_KEY);
      const state = await localState();
      if (saved && JSON.parse(saved).revision !== state.revision) localStorage.setItem(WORKFLOW_STORAGE_KEY, await encodeWorkflow(state));
      return state;
    };
    return navigator.locks ? navigator.locks.request(WORKFLOW_STORAGE_KEY, read) : localState();
  }
  if (!remoteRead || Date.now() - remoteReadAt > 1500) {
    remoteReadAt = Date.now();
    remoteRead = readRemote().catch(error => { remoteRead = null; throw error; });
  }
  return structuredClone(await remoteRead);
}

function notifyChange(committed?: WorkflowState) {
  remoteRead = committed ? Promise.resolve(structuredClone(committed)) : null;
  remoteReadAt = committed ? Date.now() : 0;
  window.dispatchEvent(new Event(WORKFLOW_CHANGED));
}

export async function dispatchWorkflow(input: CommandInput) {
  let committed: WorkflowState | undefined;
  const at = new Date(Math.max(Date.now(), new Date(SNAPSHOT_AT).getTime() + 60_000)).toISOString();
  const command = { ...input, id: crypto.randomUUID(), actor: input.actor ?? 'Dr. Ananya Mehta', at } as WorkflowCommand;
  if (env.mode === 'mock') {
    if (!navigator.locks) throw new Error('This demo needs a browser with Web Locks on localhost or HTTPS to save safely across tabs.');
    await navigator.locks.request(WORKFLOW_STORAGE_KEY, async () => {
      const next = applyWorkflowCommand(await localState(), command);
      localStorage.setItem(WORKFLOW_STORAGE_KEY, await encodeWorkflow(next));
    });
  } else {
    for (let attempt = 0; attempt < 3; attempt++) {
      // First attempt reuses the state this tab already holds (saves are guarded by expected_revision, so a stale copy is rejected, not applied); a conflict re-reads fresh.
      const current = attempt === 0 && remoteRead ? await remoteRead.catch(() => readRemote()) : await readRemote();
      const next = applyWorkflowCommand(current, command);
      if (next === current) { committed = current; break; }
      const patch = diffWorkflowState(current, next);
      const { error } = await supabase!.rpc('save_demo_workflow_patch', { target_hospital: DEMO_HOSPITAL_ID, expected_revision: current.revision, patch });
      if (!error) { committed = next; break; }
      if (error.code === 'PATCH1') {
        const fallback = await supabase!.rpc('save_demo_workflow', { target_hospital: DEMO_HOSPITAL_ID, expected_revision: current.revision, next_state: next });
        if (!fallback.error) { committed = next; break; }
        if (fallback.error.code !== '40001' || attempt === 2) throw new Error(fallback.error.message);
        remoteRead = null;
        continue;
      }
      if (error.code !== '40001' || attempt === 2) throw new Error(error.message);
      remoteRead = null;
    }
  }
  notifyChange(committed);
  return command.id;
}
