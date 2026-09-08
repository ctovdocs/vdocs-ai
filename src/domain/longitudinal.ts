import { z } from 'zod';

const scope = { id: z.uuid(), hospital_id: z.uuid(), patient_id: z.uuid() };
const clinicalScope = { ...scope, encounter_id: z.uuid() };
export const encounterSchema = z.object({
  ...scope, department: z.string(), kind: z.enum(['OPD', 'IPD']),
  started_at: z.iso.datetime(), ended_at: z.iso.datetime().nullable(), status: z.enum(['active', 'completed']),
  location: z.string(), owner: z.string(), reason: z.string(), assessment: z.string(), source_system: z.literal('MockHIS'),
});
export const noteSchema = z.object({
  ...clinicalScope, kind: z.enum(['consultation', 'progress', 'procedure', 'discharge', 'handover']),
  recorded_at: z.iso.datetime(), author: z.string(), title: z.string(), body: z.string(),
  source_ids: z.array(z.uuid()), source_system: z.enum(['MockHIS', 'VDoc']),
});
export const vitalSchema = z.object({
  ...clinicalScope, recorded_at: z.iso.datetime(), systolic: z.number(), diastolic: z.number(), pulse: z.number(),
  respiratory_rate: z.number(), spo2: z.number(), temperature_c: z.number(), oxygen_context: z.string(), source_system: z.literal('MockHIS'),
});
export const medicationRecordSchema = z.object({
  ...clinicalScope, name: z.string(), dose: z.string(), route: z.enum(['oral', 'subcutaneous']), frequency: z.string(),
  status: z.enum(['historical', 'held', 'documented_home']), started_at: z.iso.datetime(), ended_at: z.iso.datetime().nullable(),
  recorded_at: z.iso.datetime(), reason: z.string(), author: z.string(), source_system: z.literal('MockHIS'),
});
export const orderSchema = z.object({
  ...clinicalScope, title: z.string(), kind: z.enum(['lab', 'imaging']), placed_at: z.iso.datetime(),
  status: z.enum(['completed', 'pending', 'processing', 'cancelled']), result_id: z.uuid().nullable(), indication: z.string(), requester: z.string(), source_system: z.enum(['MockLIS', 'MockRIS', 'VDoc']),
  priority: z.enum(['routine', 'urgent']).default('routine'), version: z.number().int().default(0), cancellation_reason: z.string().nullish(),
});
export const requestRecordSchema = z.object({
  ...clinicalScope, from_department: z.string(), to_department: z.string(), reason: z.string(),
  status: z.enum(['received', 'accepted', 'in_progress', 'completed', 'cancelled']), priority: z.enum(['urgent', 'routine']),
  requested_at: z.iso.datetime(), accepted_at: z.iso.datetime().nullable(), completed_at: z.iso.datetime().nullable(),
  response: z.string().nullable(), owner: z.string(), source_ids: z.array(z.uuid()), source_system: z.literal('VDoc'),
  kind: z.enum(['request', 'referral']).default('request'), version: z.number().int().default(0), reviewed_at: z.iso.datetime().nullable().default(null), cancellation_reason: z.string().nullish(), response_draft: z.string().nullish(),
});
export const immunizationSchema = z.object({
  ...scope, name: z.string(), administered_at: z.iso.datetime(), source_system: z.literal('MockHIS'),
});
export const workItemSchema = z.object({
  ...clinicalScope, title: z.string(), status: z.enum(['pending', 'completed']), kind: z.enum(['review', 'discharge', 'follow_up']),
  owner: z.string(), created_at: z.iso.datetime(), due_at: z.iso.datetime(), source_ids: z.array(z.uuid()), source_system: z.literal('VDoc'),
  completed_at: z.iso.datetime().nullable().optional(),
});
export const timelineRecordSchema = z.object({
  ...clinicalScope, occurred_at: z.iso.datetime(), available_at: z.iso.datetime(),
  kind: z.enum(['encounter', 'result', 'note', 'medication', 'request', 'task']), title: z.string(), source_id: z.uuid(), source_system: z.enum(['MockHIS', 'MockLIS', 'MockRIS', 'VDoc']),
});
export const contextSchema = z.object({
  ...scope, dob: z.iso.date(), occupation: z.string(), preferred_language: z.string(), social_context: z.string(),
  history: z.string(), presenting_complaint: z.string(), acuity: z.enum(['critical', 'noncritical']), acuity_reason: z.string(),
  acuity_assessed_at: z.iso.datetime(), acuity_source_ids: z.array(z.uuid()),
  previous_records_status: z.enum(['hospital_records_available', 'first_hospital_visit']), current_encounter_id: z.uuid(),
  clinician_review_status: z.literal('not_reviewed'), synthetic: z.literal(true), scenario_version: z.string(),
  family_history: z.string().nullish(),
});
export const historySchema = z.object({
  context: contextSchema, encounters: z.array(encounterSchema), notes: z.array(noteSchema), vitals: z.array(vitalSchema),
  medications: z.array(medicationRecordSchema), orders: z.array(orderSchema), requests: z.array(requestRecordSchema),
  work_items: z.array(workItemSchema), timeline: z.array(timelineRecordSchema),
  immunizations: z.array(immunizationSchema).default([]),
});
export type PatientHistory = z.infer<typeof historySchema>;
