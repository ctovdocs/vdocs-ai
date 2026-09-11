import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { WorkflowCommand, WorkflowState } from '../../src/domain/workflow.js';
import { applyWorkflowCommand } from '../../src/services/workflowEngine.js';

export const SUPABASE_URL = 'https://pqqqrkadcgojhwpajyal.supabase.co';
export const HOSPITAL_ID = '10000000-0000-4000-8000-000000000001';

const ALLOWED_ORIGINS = new Set([
  'https://mockhis.vercel.app',
  'https://mocklab-jet.vercel.app',
  'https://mockradiology.vercel.app',
]);

export function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
}

export function handleCorsPreflight(req: VercelRequest, res: VercelResponse): boolean {
  setCors(req, res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  return false;
}

export function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured on the server.');
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
}

export async function findPatientByUhid(uhid: string) {
  const { data, error } = await serviceClient()
    .from('demo_patients')
    .select('id, uhid, name, age, sex, department')
    .eq('hospital_id', HOSPITAL_ID)
    .eq('uhid', uhid)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function readWorkflowState(): Promise<{ revision: number; state: WorkflowState }> {
  const { data, error } = await serviceClient()
    .from('demo_workflow_state')
    .select('revision, state')
    .eq('hospital_id', HOSPITAL_ID)
    .single();
  if (error) throw new Error(error.message);
  return { revision: data.revision, state: data.state as WorkflowState };
}

async function writeWorkflowState(expectedRevision: number, nextState: WorkflowState): Promise<boolean> {
  const { data, error } = await serviceClient()
    .from('demo_workflow_state')
    .update({ state: nextState, revision: nextState.revision, updated_at: new Date().toISOString() })
    .eq('hospital_id', HOSPITAL_ID)
    .eq('revision', expectedRevision)
    .select('revision');
  if (error) throw new Error(error.message);
  return (data?.length ?? 0) > 0;
}

/**
 * Reads the current workflow snapshot, applies one or more commands to it via the
 * real workflow engine, and writes the result back with an optimistic-concurrency
 * retry loop (same pattern the VDoc client itself uses in dispatchWorkflow).
 */
export async function applyAndSave(buildCommands: (state: WorkflowState) => WorkflowCommand[]): Promise<WorkflowState> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { revision, state } = await readWorkflowState();
    let next = state;
    for (const command of buildCommands(state)) next = applyWorkflowCommand(next, command);
    const saved = await writeWorkflowState(revision, next);
    if (saved) return next;
  }
  throw new Error('Could not save after several attempts; the workflow kept changing concurrently.');
}
