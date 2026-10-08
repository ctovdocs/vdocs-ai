import { z } from 'zod';

/** Document kinds the demo insurer requires in an initial cashless claim packet. */
export const REQUIRED_DOCUMENT_KINDS = ['summary', 'bill', 'investigation', 'preauth', 'claim_form', 'policy', 'consent', 'prescription'] as const;
/** Fields the demo insurer will not accept a packet without. */
export const REQUIRED_FIELD_KEYS = ['patient_name', 'uhid', 'insurer', 'policy_number', 'member_id', 'diagnosis', 'admission_date', 'discharge_date', 'bill_total'] as const;

export const packetFieldSchema = z.object({ key: z.string().min(1), label: z.string(), value: z.string(), source: z.string() });
export const packetDocumentSchema = z.object({
  id: z.string().min(1), kind: z.string().min(1), title: z.string(), filename: z.string().min(1),
  sha256: z.string().length(64), bytes: z.number().int().nonnegative(), content_base64: z.string().min(1),
});
export const submissionRequestSchema = z.object({
  claim_id: z.string().min(1), version: z.number().int().nonnegative(), hospital: z.string(),
  narrative: z.string(), fields: z.array(packetFieldSchema), documents: z.array(packetDocumentSchema),
});
export const EVENT_KINDS = ['authorisation', 'settlement', 'payment', 'reconciliation'] as const;
export const eventRequestSchema = z.object({ kind: z.enum(EVENT_KINDS), detail: z.string().trim().min(1).max(1000), amount: z.number().nonnegative().optional(), reference: z.string().max(80).optional() });
export const queryRequestSchema = z.object({ kind: z.string().min(1), note: z.string().trim().min(1).max(1000) });

export type PacketField = z.infer<typeof packetFieldSchema>;
export type PacketDocument = z.infer<typeof packetDocumentSchema>;
export type SubmissionRequest = z.infer<typeof submissionRequestSchema>;

export interface ValidationCheck { name: string; ok: boolean; detail: string }
export interface StoredFile { id: string; kind: string; title: string; filename: string; sha256: string; bytes: number }
export interface StoredSubmission {
  stage: 'initial' | 'response'; reference: string; claim_version: number; received_at: string; narrative: string;
  fields: PacketField[]; documents: StoredFile[]; checks: ValidationCheck[];
}
export interface InsurerQuery { id: string; at: string; kind: string; note: string; status: 'open' | 'answered' }
export type InsurerStatus = 'received' | 'query' | 'response_received' | 'authorised' | 'settlement_received' | 'paid' | 'closed';
/** One line of the insurer's own history for a claim. Recorded when it happens, never recomputed. */
export interface InsurerEvent { id: string; at: string; kind: 'received' | 'query' | 'response' | (typeof EVENT_KINDS)[number]; title: string; detail: string; amount?: number; reference?: string }
export interface InsurerClaimRecord {
  ref: string; claim_id: string; hospital: string; status: InsurerStatus; events?: InsurerEvent[];
  submissions: StoredSubmission[]; queries: InsurerQuery[];
}
export interface InsurerReceipt { claim_ref: string; reference: string; received_at: string; stage: 'initial' | 'response'; files: Array<{ filename: string; sha256: string; bytes: number }> }
