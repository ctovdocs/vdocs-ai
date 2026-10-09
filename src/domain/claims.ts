import { z } from 'zod';

export const claimDocumentSchema = z.object({
  id: z.string(), title: z.string(), kind: z.enum(['summary', 'bill', 'investigation', 'pharmacy', 'preauth', 'claim_form', 'policy', 'consent', 'prescription', 'procedure']),
  patient_id: z.uuid(), encounter_id: z.uuid(), source_id: z.string(), source: z.string(),
  body: z.string().min(1), attached: z.boolean(),
});
export const claimEventSchema = z.object({
  id: z.string(), at: z.iso.datetime(), title: z.string(), detail: z.string(), actor: z.string().default('Claims desk'),
  tone: z.enum(['success', 'attention', 'info']), evidence: z.array(z.string()),
});
export const insurerMessageSchema = z.object({
  id: z.string(), kind: z.enum(['receipt', 'query', 'response_receipt', 'authorisation', 'settlement_receipt', 'remittance', 'reconciliation']),
  at: z.iso.datetime(), title: z.string(), body: z.string(),
});
export const claimFormSchema = z.object({
  policy_number: z.string().trim().min(1), member_id: z.string().trim().min(1), relationship: z.string().trim().min(1),
  admission_type: z.enum(['Emergency', 'Planned']), room_category: z.string().trim().min(1),
  treating_doctor: z.string().trim().min(1), diagnosis: z.string().trim().min(1), procedure: z.string().trim().min(1),
});
const packetSchema = z.object({
  reference: z.string(), at: z.iso.datetime(), version: z.number().int(), narrative: z.string(),
  documents: z.array(claimDocumentSchema),
});
export const claimCaseSchema = z.object({
  schema_version: z.literal(1), id: z.string(), version: z.number().int().nonnegative(),
  hospital_id: z.uuid(), patient_id: z.uuid(), encounter_id: z.uuid(), discharge_id: z.uuid().nullable(),
  patient_name: z.string(), uhid: z.string(), diagnosis: z.string(), admission_date: z.string(), discharge_date: z.string(),
  insurer: z.string(), member_id: z.string(), preauth_reference: z.string(), preauth_amount: z.number(), bill_total: z.number(),
  status: z.enum(['draft', 'needs_documents', 'review', 'submitted', 'query', 'response_review', 'response_submitted', 'authorised', 'settlement_submitted', 'payment_received', 'completed']),
  narrative: z.string(), response: z.string(), source_fingerprint: z.string(),
  documents: z.array(claimDocumentSchema), events: z.array(claimEventSchema), messages: z.array(insurerMessageSchema),
  submission: packetSchema.nullable(), response_submission: packetSchema.nullable(), settlement_submission: packetSchema.nullable().default(null),
  authorised_amount: z.number().nullable(), patient_payable: z.number().nullable(), settlement: z.enum(['pending', 'submitted', 'received', 'reconciled']),
  form: claimFormSchema, department: z.string(), owner: z.string(), episode_label: z.string(),
  pharmacy_total: z.number().nonnegative(), deduction: z.number().nonnegative(),
  clinical_review: z.string().nullable(), billing_review: z.string().nullable(),
  bank_name: z.string().default('Demo Settlement Bank'), paid_amount: z.number().nullable(), patient_collected: z.number().nullable(), utr: z.string().nullable(), completed_at: z.string().nullable(),
});
export const claimsWorklistSchema = z.object({ schema_version: z.literal(2), revision: z.number().int().nonnegative(), hospital_id: z.uuid(), claims: z.array(claimCaseSchema) });
export type ClaimDocument = z.infer<typeof claimDocumentSchema>;
export type ClaimEvent = z.infer<typeof claimEventSchema>;
export type InsurerMessage = z.infer<typeof insurerMessageSchema>;
export type ClaimCase = z.infer<typeof claimCaseSchema>;
export type ClaimsWorklist = z.infer<typeof claimsWorklistSchema>;
export type ClaimForm = z.infer<typeof claimFormSchema>;
export type ClaimAction =
  | { type: 'send_query'; note?: string }
  | { type: 'link_insurer'; reference: string }
  | { type: 'prepare' | 'attach_report' | 'prepare_response' | 'authorise' | 'submit_settlement' | 'receive_payment' | 'reconcile' }
  | { type: 'review_clinical' | 'review_billing'; reviewed_version: number }
  | { type: 'edit'; text: string }
  | { type: 'edit_form'; fields: ClaimForm }
  | { type: 'submit' | 'submit_response'; reviewed_version: number; insurer_ref?: string };
