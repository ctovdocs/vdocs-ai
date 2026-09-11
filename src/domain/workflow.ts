import { z } from 'zod';
import { patientSchema, reportSchema } from './models.js';
import { historySchema } from './longitudinal.js';

export const dischargeSchema = z.object({
  id: z.uuid(), patient_id: z.uuid(), encounter_id: z.uuid(), hospital_id: z.uuid(),
  owner: z.string().trim().min(1), priority: z.enum(['routine', 'urgent']), target_date: z.iso.date(),
  status: z.enum(['planned', 'in_progress', 'ready', 'discharged', 'cancelled']),
  summary: z.string(), clinical_clearance: z.boolean(), clearance_note: z.string(),
  medications_checked: z.boolean(), follow_up_checked: z.boolean(), documents_checked: z.boolean(),
  created_at: z.string(), updated_at: z.string(), discharged_at: z.string().nullable(), version: z.number().int(),
});
export const handoverSectionsSchema = z.object({
  situation: z.string(), background: z.string(), recent_events: z.string(),
  completed_actions: z.string(), pending_items: z.string(), next_actions: z.string(),
});
export const handoverSchema = z.object({
  shift_id: z.uuid().optional(), shift_start: z.iso.datetime().optional(), shift_end: z.iso.datetime().optional(), department: z.string().optional(),
  shift_reviewed: z.boolean().optional(), escalation: z.string().optional(), readback: z.string().optional(),
  captured_at: z.iso.datetime().optional(),
  source_snapshot: z.array(z.object({ id: z.string(), type: z.string(), title: z.string(), body: z.string(), author: z.string(), at: z.string(), scope: z.enum(['shift', 'carry_forward']) })).optional(),
  id: z.uuid(), hospital_id: z.uuid(), patient_id: z.uuid(), encounter_id: z.uuid(),
  from_doctor: z.string(), to_doctor: z.string(), shift: z.string(), shift_at: z.string(),
  status: z.enum(['draft', 'approved', 'received']), sections: handoverSectionsSchema,
  source_ids: z.array(z.string()), based_on_revision: z.number(),
  created_at: z.string(), updated_at: z.string(), approved_at: z.string().nullable(), received_at: z.string().nullable(), version: z.number().int(),
});
export const workflowStateSchema = z.object({
  update_receipts: z.record(z.string(), z.record(z.string(), z.iso.datetime())).optional(),
  schema_version: z.literal(1), hospital_id: z.uuid(), revision: z.number().int(),
  patients: z.array(patientSchema), reports: z.array(reportSchema), histories: z.array(historySchema),
  discharges: z.array(dischargeSchema), handovers: z.array(handoverSchema),
  reviews: z.record(z.string(), z.object({ at: z.string(), actor: z.string() })),
  commands: z.array(z.string()),
  audit: z.array(z.object({ id: z.string(), at: z.string(), actor: z.string(), action: z.string(), patient_id: z.string(), entity_id: z.string() })),
});
export type WorkflowState = z.infer<typeof workflowStateSchema>;
export type Discharge = z.infer<typeof dischargeSchema>;
export type Handover = z.infer<typeof handoverSchema>;

const base = { id: z.uuid(), patient_id: z.uuid(), actor: z.string().trim().min(1), at: z.iso.datetime() };
const expected = { entity_id: z.string(), expected_version: z.number().int() };
export const commandSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('updates.read'), update_ids: z.array(z.string()).min(1).max(500), read: z.boolean() }),
  z.object({ ...base, type: z.literal('shift.seed') }),
  z.object({ ...base, type: z.literal('shift.create'), patient_ids: z.array(z.uuid()).min(1).max(50), to_doctor: z.string().trim().min(1), shift: z.string().trim().min(1), department: z.string().trim().min(1), starts_at: z.iso.datetime(), ends_at: z.iso.datetime() }),
  z.object({ ...base, type: z.literal('shift.refresh'), shift_id: z.uuid(), expected_revision: z.number().int() }),
  z.object({ ...base, type: z.literal('shift.approve'), shift_id: z.uuid(), expected_revision: z.number().int() }),
  z.object({ ...base, type: z.literal('shift.receive'), shift_id: z.uuid(), expected_revision: z.number().int(), readback: z.string().trim().min(1).max(5000) }),
  z.object({ ...base, type: z.literal('discharge.create') }),
  z.object({ ...base, ...expected, type: z.literal('discharge.update'), fields: dischargeSchema.pick({ owner: true, priority: true, target_date: true, summary: true, clinical_clearance: true, clearance_note: true, medications_checked: true, follow_up_checked: true, documents_checked: true }).partial(), status: z.enum(['planned', 'in_progress', 'ready', 'discharged', 'cancelled']).optional() }),
  z.object({ ...base, type: z.literal('order.create'), title: z.string().trim().min(1), kind: z.enum(['lab', 'imaging']), indication: z.string().trim().min(1), priority: z.enum(['routine', 'urgent']) }),
  z.object({ ...base, type: z.literal('order.place'), kind: z.enum(['lab', 'imaging']), indication: z.string().trim().min(1), priority: z.enum(['routine', 'urgent']),
    items: z.array(z.object({ catalog_id: z.string().optional(), title: z.string().trim().min(1).max(200), specimen: z.string().trim().max(200).optional(), modality: z.string().trim().max(100).optional(), site: z.string().trim().max(200).optional(), instructions: z.string().trim().max(2000).optional() })).min(1).max(30) }),
  z.object({ ...base, ...expected, type: z.literal('order.status'), status: z.enum(['processing', 'cancelled']), reason: z.string().optional() }),
  z.object({ ...base, ...expected, type: z.literal('order.publish'), findings: z.string().trim().min(1), observations: reportSchema.shape.observations, performed_at: z.iso.datetime() }),
  z.object({ ...base, type: z.literal('report.review'), entity_id: z.string() }),
  z.object({ ...base, type: z.literal('request.create'), kind: z.enum(['request', 'referral']), to_department: z.string(), reason: z.string().trim().min(1), priority: z.enum(['routine', 'urgent']), owner: z.string().trim().min(1), source_ids: z.array(z.string()), request_type: z.string().trim().max(200).optional(), contact: z.string().trim().max(300).optional() }),
  z.object({ ...base, ...expected, type: z.literal('request.update'), status: z.enum(['received', 'accepted', 'in_progress', 'completed', 'cancelled']).optional(), owner: z.string().trim().min(1), priority: z.enum(['routine', 'urgent']), response: z.string().optional(), reason: z.string().optional() }),
  z.object({ ...base, ...expected, type: z.literal('request.review') }),
  z.object({ ...base, type: z.literal('work.complete'), entity_id: z.string() }),
  z.object({ ...base, type: z.literal('round.create'), findings: z.string().trim().min(1), plan: z.string().trim().min(1) }),
  z.object({ ...base, type: z.literal('note.create'), body: z.string().trim().min(1).max(20000) }),
  z.object({ ...base, type: z.literal('handover.create'), to_doctor: z.string().trim().min(1), shift: z.string().trim().min(1), shift_at: z.iso.datetime() }),
  z.object({ ...base, ...expected, type: z.literal('handover.save'), sections: handoverSectionsSchema, to_doctor: z.string().trim().min(1), shift: z.string().trim().min(1), shift_at: z.iso.datetime(), escalation: z.string().optional(), shift_reviewed: z.boolean().optional() }),
  z.object({ ...base, ...expected, type: z.literal('handover.approve') }),
  z.object({ ...base, ...expected, type: z.literal('handover.receive') }),
]);
export type WorkflowCommand = z.infer<typeof commandSchema>;
export type CommandInput = WorkflowCommand extends infer Command ? Command extends WorkflowCommand ? Omit<Command, 'id' | 'at' | 'actor'> & { actor?: string } : never : never;
