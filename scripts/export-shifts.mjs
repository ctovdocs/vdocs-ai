import { mkdir, writeFile } from 'node:fs/promises';
import console from 'node:console';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' });
try {
  const { cohort, DEMO_HOSPITAL_ID } = await server.ssrLoadModule('/src/data/cohort.ts');
  const { initialWorkflowState } = await server.ssrLoadModule('/src/services/workflowEngine.ts');
  const { seedShiftDemo } = await server.ssrLoadModule('/src/data/shiftDemo.ts');
  const initial = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
  const state = seedShiftDemo(initial, '2026-09-09T12:00:00.000Z');
  const ids = new Set(state.handovers.flatMap(record => record.source_ids));
  const data = { synthetic: true, hospital_id: DEMO_HOSPITAL_ID, handovers: state.handovers,
    notes: state.histories.flatMap(history => history.notes).filter(record => /^7[23]000000/.test(record.id)),
    orders: state.histories.flatMap(history => history.orders).filter(record => /^7[47]000000/.test(record.id)),
    requests: state.histories.flatMap(history => history.requests).filter(record => /^(76000000|80000000)/.test(record.id)),
    reports: state.reports.filter(record => ids.has(record.id) && /^7[58]000000/.test(record.id)) };
  await mkdir('data/generated', { recursive: true });
  await writeFile('data/generated/shift-demo.json', JSON.stringify(data, null, 2));
  console.log(JSON.stringify({ shifts: new Set(data.handovers.map(record => record.shift_id)).size, patient_handovers: data.handovers.length, notes: data.notes.length, orders: data.orders.length, requests: data.requests.length, reports: data.reports.length }));
} finally { await server.close(); }
