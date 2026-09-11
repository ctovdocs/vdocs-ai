import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { WorkflowCommand } from '../../src/domain/workflow.js';
import { owners } from '../../src/data/cohort.js';
import { applyAndSave, handleCorsPreflight, serviceClient, HOSPITAL_ID } from '../_lib/workflowState.js';

interface RegisterPatientBody {
  name: string;
  age: number;
  sex: 'M' | 'F';
  department: string;
  reason: string;
  kind?: 'OPD' | 'IPD';
  location?: string;
  actor?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCorsPreflight(req, res)) return;
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const body = req.body as RegisterPatientBody;
  if (!body?.name?.trim() || !body?.age || !body?.sex || !body?.department || !body?.reason?.trim()) {
    res.status(400).json({ error: 'name, age, sex, department and reason are required' });
    return;
  }
  if (!(body.age >= 0 && body.age <= 130)) { res.status(400).json({ error: 'age must be between 0 and 130' }); return; }
  const owner = owners[body.department];
  if (!owner) { res.status(400).json({ error: `Unknown department "${body.department}".` }); return; }

  try {
    const patientId = crypto.randomUUID();
    const encounterId = crypto.randomUUID();
    const commandId = crypto.randomUUID();
    const uhid = `F-NEW-${Date.now().toString(36).toUpperCase()}`;
    const kind = body.kind === 'IPD' ? 'IPD' : 'OPD';
    const location = body.location?.trim() || `${body.department} / Registration`;
    const actor = body.actor?.trim() || 'MockHIS operator';
    const at = new Date().toISOString();
    const name = body.name.trim();
    const reason = body.reason.trim();

    const client = serviceClient();
    const { error: patientError } = await client.from('demo_patients').insert({
      id: patientId, hospital_id: HOSPITAL_ID, uhid, name, age: body.age, sex: body.sex,
      department: body.department, encounter: `${kind} · ${location}`, conditions: [], allergies: [], medications: [],
      acuity: 'noncritical', visit_count: 1,
    });
    if (patientError) throw new Error(patientError.message);

    const { error: encounterError } = await client.from('demo_encounters').insert({
      id: encounterId, hospital_id: HOSPITAL_ID, patient_id: patientId, department: body.department, kind,
      started_at: at, ended_at: null, status: 'active', location, owner, reason,
      assessment: 'Pending clinical assessment.', source_system: 'MockHIS',
    });
    if (encounterError) throw new Error(encounterError.message);

    const next = await applyAndSave(() => {
      const command: WorkflowCommand = {
        id: commandId, type: 'patient.register', patient_id: patientId, actor, at,
        encounter_id: encounterId, uhid, name, age: body.age, sex: body.sex,
        department: body.department, reason, kind, location,
      };
      return [command];
    });

    const patient = next.patients.find(patient => patient.id === patientId);
    res.status(200).json({ patient, uhid });
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'Failed to register patient' });
  }
}
