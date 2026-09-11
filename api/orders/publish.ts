import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { WorkflowCommand } from '../../src/domain/workflow.js';
import { applyAndSave, findPatientByUhid, handleCorsPreflight } from '../_lib/workflowState.js';

interface PublishBody {
  uhid: string;
  order_id: string;
  findings: string;
  observations?: { name: string; value: string; unit: string; reference: string; flag: 'normal' | 'high' | 'low' }[];
  performed_at: string;
  actor?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCorsPreflight(req, res)) return;
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const body = req.body as PublishBody;
  if (!body?.uhid || !body?.order_id || !body?.findings || !body?.performed_at) {
    res.status(400).json({ error: 'uhid, order_id, findings and performed_at are required' });
    return;
  }

  try {
    const patient = await findPatientByUhid(body.uhid);
    if (!patient) { res.status(404).json({ error: `No patient found for UHID "${body.uhid}".` }); return; }

    const next = await applyAndSave(state => {
      const history = state.histories.find(item => item.context.patient_id === patient.id);
      const order = history?.orders.find(item => item.id === body.order_id);
      if (!order) throw new Error('Order not found for this patient.');
      const command: WorkflowCommand = {
        id: crypto.randomUUID(), type: 'order.publish', patient_id: patient.id,
        actor: body.actor ?? (order.kind === 'lab' ? 'MockLab operator' : 'MockRadiology operator'),
        at: new Date().toISOString(),
        entity_id: order.id, expected_version: order.version,
        findings: body.findings, observations: order.kind === 'lab' ? (body.observations ?? []) : [],
        performed_at: body.performed_at,
      };
      return [command];
    });

    const report = next.reports.find(report => report.patient_id === patient.id && report.order_id === body.order_id);
    res.status(200).json({ report });
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'Failed to publish report' });
  }
}
