import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { WorkflowCommand } from '../../src/domain/workflow.js';
import { applyAndSave, findPatientByUhid, handleCorsPreflight } from '../_lib/workflowState.js';

interface WalkinBody {
  uhid: string;
  kind: 'lab' | 'imaging';
  title: string;
  indication: string;
  findings: string;
  observations?: { name: string; value: string; unit: string; reference: string; flag: 'normal' | 'high' | 'low' }[];
  performed_at: string;
  actor?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCorsPreflight(req, res)) return;
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const body = req.body as WalkinBody;
  if (!body?.uhid || !body?.kind || !body?.title || !body?.indication || !body?.findings || !body?.performed_at) {
    res.status(400).json({ error: 'uhid, kind, title, indication, findings and performed_at are required' });
    return;
  }

  try {
    const patient = await findPatientByUhid(body.uhid);
    if (!patient) { res.status(404).json({ error: `No patient found for UHID "${body.uhid}".` }); return; }

    const actor = body.actor ?? (body.kind === 'lab' ? 'MockLab operator' : 'MockRadiology operator');
    const orderId = crypto.randomUUID();
    const now = new Date().toISOString();

    const next = await applyAndSave(() => {
      const createCommand: WorkflowCommand = {
        id: orderId, type: 'order.create', patient_id: patient.id, actor, at: now,
        title: body.title, kind: body.kind, indication: body.indication, priority: 'routine',
      };
      const publishCommand: WorkflowCommand = {
        id: crypto.randomUUID(), type: 'order.publish', patient_id: patient.id, actor, at: now,
        entity_id: orderId, expected_version: 0,
        findings: body.findings, observations: body.kind === 'lab' ? (body.observations ?? []) : [],
        performed_at: body.performed_at,
      };
      return [createCommand, publishCommand];
    });

    const report = next.reports.find(report => report.patient_id === patient.id && report.order_id === orderId);
    res.status(200).json({ report });
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'Failed to file walk-in report' });
  }
}
