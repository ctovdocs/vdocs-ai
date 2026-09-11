import type { VercelRequest, VercelResponse } from '@vercel/node';
import { findPatientByUhid, readWorkflowState, handleCorsPreflight } from '../_lib/workflowState.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCorsPreflight(req, res)) return;
  if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const uhid = typeof req.query.uhid === 'string' ? req.query.uhid.trim() : '';
  const kind = req.query.kind === 'imaging' ? 'imaging' : 'lab';
  if (!uhid) { res.status(400).json({ error: 'uhid is required' }); return; }

  try {
    const patient = await findPatientByUhid(uhid);
    if (!patient) { res.status(404).json({ error: `No patient found for UHID "${uhid}".` }); return; }

    const { state } = await readWorkflowState();
    const history = state.histories.find(item => item.context.patient_id === patient.id);
    const orders = (history?.orders ?? []).filter(order => order.kind === kind)
      .sort((first, second) => second.placed_at.localeCompare(first.placed_at));
    const reports = state.reports.filter(report => report.patient_id === patient.id && report.kind === kind)
      .sort((first, second) => second.reported_at.localeCompare(first.reported_at));

    res.status(200).json({ patient, orders, reports });
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'Failed to load orders' });
  }
}
