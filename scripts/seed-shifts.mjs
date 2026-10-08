// One-time server-side seed: writes the demo shift packets (with doctor and nurse entries) straight to Supabase,
// so the Handovers page only ever reads data. Safe to re-run: shifts that already have their data are skipped.
//   npm run seed:shifts            (needs SUPABASE_SERVICE_ROLE_KEY and VITE_SUPABASE_URL in .env)
import { readFileSync } from 'node:fs';
import console from 'node:console';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';
import { createServer } from 'vite';

const env = Object.fromEntries(readFileSync('.env', 'utf8').split('\n').filter(line => /^[A-Z_]+=/.test(line)).map(line => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1).trim()]));
if (!env.VITE_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom', logLevel: 'error' });
try {
  const { DEMO_HOSPITAL_ID } = await server.ssrLoadModule('/src/data/cohort.ts');
  const { workflowStateSchema } = await server.ssrLoadModule('/src/domain/workflow.ts');
  const { seedShiftDemo, seedShiftEntries, shiftsMissingEntries } = await server.ssrLoadModule('/src/data/shiftDemo.ts');
  const { data, error } = await supabase.from('demo_workflow_state').select('revision,state').eq('hospital_id', DEMO_HOSPITAL_ID).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('No workflow state in Supabase yet. Open the app once so the patient data loads, then run this again.');
  const before = workflowStateSchema.parse(data.state);
  let state = seedShiftDemo(before, new Date().toISOString());
  for (const shiftId of shiftsMissingEntries(state)) state = seedShiftEntries(state, shiftId);
  if (state === before) { console.log('Nothing to do: shifts and entries already seeded.'); process.exit(0); }
  const manual = state.handovers.flatMap(record => record.source_snapshot ?? []).filter(source => source.manual);
  const next = workflowStateSchema.parse(state);
  const { data: updated, error: writeError } = await supabase.from('demo_workflow_state').update({ revision: next.revision, state: next, updated_at: new Date().toISOString() }).eq('hospital_id', DEMO_HOSPITAL_ID).eq('revision', data.revision).select('revision');
  if (writeError) throw writeError;
  if (!updated?.length) throw new Error('The workflow changed while seeding. Run the command again.');
  console.log(JSON.stringify({ revision: next.revision, shifts: new Set(next.handovers.map(record => record.shift_id).filter(Boolean)).size, patient_handovers: next.handovers.filter(record => record.shift_id).length, nurse_entries: manual.filter(item => item.role === 'nurse').length, doctor_entries: manual.filter(item => item.role === 'doctor').length }));
} finally { await server.close(); }
