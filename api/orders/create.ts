import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { WorkflowCommand } from '../../src/domain/workflow.js';
import { applyAndSave, findPatientByUhid, handleCorsPreflight } from '../_lib/workflowState.js';

interface CreateOrderBody {
  uhid: string;
  kind: 'lab' | 'imaging';
  title: string;
  indication: string;
  priority?: 'routine' | 'urgent';
  actor?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCorsPreflight(req, res)) return;
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const body = req.body as CreateOrderBody;
  if (!body?.uhid || !body?.kind || !body?.title || !body?.indication) {
    res.status(400).json({ error: 'uhid, kind, title and indication are required' });
    return;
  }

  try {
    const patient = await findPatientByUhid(body.uhid);
    if (!patient) { res.status(404).json({ error: `No patient found for UHID "${body.uhid}".` }); return; }

    const actor = body.actor ?? 'MockHIS operator';
    const orderId = crypto.randomUUID();

    const next = await applyAndSave(() => {
      const command: WorkflowCommand = {
        id: orderId, type: 'order.create', patient_id: patient.id, actor, at: new Date().toISOString(),
        title: body.title, kind: body.kind, indication: body.indication, priority: body.priority ?? 'routine',
      };
      return [command];
    });

    const history = next.histories.find(history => history.context.patient_id === patient.id);
    const order = history?.orders.find(order => order.id === orderId);
    res.status(200).json({ order });
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'Failed to place order' });
  }
}
