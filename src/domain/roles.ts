export type AuthorRole = 'doctor' | 'nurse' | 'system';
export type ClinicianRole = Exclude<AuthorRole, 'system'>;

export const nurses = ['Nurse Priya Nair', 'Nurse Sunita Pillai', 'Nurse Joseph Dsouza', 'Nurse Meera Iyer'];
export const entryCategories = ['Observation', 'Task', 'Concern', 'Medication', 'Family update', 'Other'] as const;

/** Best-effort role for records that predate role stamping; manual entries always carry an explicit role. */
export function inferRole(author: string): AuthorRole {
  if (/^(mock|synthetic)/i.test(author) || /\b(team|operator|system)\b/i.test(author)) return 'system';
  if (/^(nurse|sr\.? nurse|rn\b)/i.test(author) || nurses.includes(author)) return 'nurse';
  return 'doctor';
}
