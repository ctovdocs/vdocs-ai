import { z } from 'zod';

/** Letterhead for generated documents. One constant so the demo hospital can be rebranded in a single place. */
export const HOSPITAL_PROFILE = {
  name: 'DEMO MULTISPECIALITY HOSPITAL',
  locality: 'Jubilee Hills, Hyderabad',
  address: 'Road No. 72, Film Nagar, Jubilee Hills, Hyderabad, Telangana - 500033',
  contact: 'Reception: 040-0000-0000 | Emergency: 040-0000-0001 | www.demo-hospital.example',
  footer: 'This is a computer-generated discharge summary.',
} as const;

export const DISCHARGE_STATUSES = ['Home', 'Referred', 'LAMA', 'DOR', 'Transferred'] as const;

const text = z.string();
export const summaryMedicationSchema = z.object({ name: text, dosage: text, route: text, frequency: text, duration: text });
export const summaryProcedureSchema = z.object({ name: text, date: text, performed_by: text });
export const summaryEditSchema = z.object({ at: z.string(), by: z.string(), role: z.enum(['doctor', 'nurse']), note: z.string() });

export const dischargeSummaryDocSchema = z.object({
  patient: z.object({
    name: text, uhid: text, age_sex: text, dob: text, address: text, phone: text, admitted_at: text, discharged_at: text,
    department: text, ward_bed: text, consultant: text, referring_doctor: text,
  }),
  primary_diagnosis: text, secondary_diagnosis: text,
  presenting_complaints: text, past_history: text, allergies: text, examination: text,
  investigations: z.object({ lab: text, imaging: text, other: text }),
  hospital_course: text,
  procedures: z.array(summaryProcedureSchema),
  condition: z.object({ general: text, bp: text, pulse: text, temp: text, spo2: text, rr: text }),
  medications: z.array(summaryMedicationSchema),
  diet: text, activity: text,
  follow_up: z.object({ with: text, date: text, investigations: text }),
  warning_signs: z.array(text),
  discharge_status: z.enum(DISCHARGE_STATUSES),
  /** Where each section was pre-filled from, shown next to the field so staff can verify it. */
  sources: z.record(z.string(), z.string()),
  prepared_by: text, prepared_role: z.enum(['doctor', 'nurse']),
  status: z.enum(['draft', 'signed']),
  signed_by: z.string().nullable(), signed_qualification: z.string().nullable(), signed_reg_no: z.string().nullable(), signed_at: z.string().nullable(),
  generated_at: z.string(),
  edits: z.array(summaryEditSchema).max(40),
});
export type DischargeSummaryDoc = z.infer<typeof dischargeSummaryDocSchema>;
export type SummaryMedication = z.infer<typeof summaryMedicationSchema>;

/** What must be present before a doctor can sign. Returned as readable gaps. */
export function summarySignGaps(doc: DischargeSummaryDoc): string[] {
  const gaps: string[] = [];
  if (!doc.primary_diagnosis.trim()) gaps.push('Primary diagnosis');
  if (!doc.hospital_course.trim()) gaps.push('Hospital course / treatment summary');
  if (!doc.condition.general.trim()) gaps.push('General condition at discharge');
  if (!doc.follow_up.with.trim() && !doc.follow_up.investigations.trim()) gaps.push('Follow-up instructions');
  if (!doc.warning_signs.some(item => item.trim())) gaps.push('Warning signs');
  return gaps;
}

const line = (label: string, value: string) => (value.trim() ? `${label}: ${value.trim()}` : '');
/** Plain-text rendering. Stored on the discharge record's `summary` so claims, search and completion notes keep working. */
export function dischargeSummaryText(doc: DischargeSummaryDoc): string {
  const meds = doc.medications.filter(item => item.name.trim()).map(item => `- ${[item.name, item.dosage, item.route, item.frequency, item.duration].filter(part => part.trim()).join(' · ')}`);
  const procedures = doc.procedures.filter(item => item.name.trim()).map(item => `- ${[item.name, item.date, item.performed_by].filter(part => part.trim()).join(' · ')}`);
  const vitals = [['BP', doc.condition.bp], ['Pulse', doc.condition.pulse], ['Temp', doc.condition.temp], ['SpO2', doc.condition.spo2], ['RR', doc.condition.rr]].filter(([, value]) => value.trim()).map(([label, value]) => `${label} ${value}`).join(' | ');
  return [
    line('Primary diagnosis', doc.primary_diagnosis), line('Secondary diagnosis / comorbidities', doc.secondary_diagnosis),
    line('Presenting complaints', doc.presenting_complaints), line('Past history', doc.past_history), line('Examination', doc.examination),
    line('Laboratory', doc.investigations.lab), line('Imaging', doc.investigations.imaging), line('Other investigations', doc.investigations.other),
    line('Hospital course', doc.hospital_course),
    procedures.length ? `Procedures:\n${procedures.join('\n')}` : '',
    line('Condition at discharge', doc.condition.general), line('Vitals at discharge', vitals),
    meds.length ? `Discharge medications:\n${meds.join('\n')}` : '',
    line('Diet', doc.diet), line('Activity', doc.activity),
    line('Follow-up with', [doc.follow_up.with, doc.follow_up.date].filter(part => part.trim()).join(' on ')), line('Investigations to repeat', doc.follow_up.investigations),
    doc.warning_signs.some(item => item.trim()) ? `Warning signs: ${doc.warning_signs.filter(item => item.trim()).join('; ')}` : '',
    line('Discharge status', doc.discharge_status),
  ].filter(Boolean).join('\n');
}
