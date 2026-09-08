import { z } from 'zod';
import type { PatientHistory } from './longitudinal.ts';

export const patientSchema = z.object({
  id: z.uuid(),
  hospital_id: z.uuid(),
  uhid: z.string(),
  name: z.string(),
  age: z.number().int(),
  sex: z.enum(['M', 'F']),
  department: z.string(),
  encounter: z.string(),
  conditions: z.array(z.string()),
  allergies: z.array(z.string()),
  medications: z.array(z.string()),
  acuity: z.enum(['critical', 'noncritical']).default('noncritical'),
  visit_count: z.number().int().nonnegative().default(1),
});

export const reportSchema = z.object({
  id: z.uuid(),
  hospital_id: z.uuid(),
  patient_id: z.uuid(),
  kind: z.enum(['lab', 'imaging']),
  title: z.string(),
  source: z.enum(['MockLIS', 'MockRIS']),
  reported_at: z.string(),
  findings: z.string(),
  observations: z.array(z.object({
    name: z.string(),
    value: z.string(),
    unit: z.string(),
    reference: z.string(),
    flag: z.enum(['high', 'low', 'normal']),
  })),
  encounter_id: z.uuid().nullable().optional(),
  order_id: z.uuid().nullable().optional(),
  specimen_at: z.iso.datetime({ offset: true }).nullable().optional(),
  performed_at: z.iso.datetime({ offset: true }).nullable().optional(),
  indication: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
});

export type Patient = z.infer<typeof patientSchema>;
export type Report = z.infer<typeof reportSchema>;

export interface ClinicalRepository {
  listPatients: (search?: string) => Promise<Patient[]>;
  getPatient: (patientId: string) => Promise<Patient | null>;
  listReports: (patientId: string) => Promise<Report[]>;
  getHistory: (patientId: string) => Promise<PatientHistory | null>;
}
