import type { Discharge, WorkflowState } from '../domain/workflow';
import type { DischargeSummaryDoc, SummaryMedication } from '../domain/dischargeSummary';
import type { PatientHistory } from '../domain/longitudinal';
import type { Report } from '../domain/models';

const IST = 'Asia/Kolkata';
const parts = (iso: string) => {
  const date = new Date(iso);
  const get = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-GB', { timeZone: IST, hourCycle: 'h23', ...options }).format(date);
  return { day: get({ day: '2-digit' }), month: get({ month: '2-digit' }), year: get({ year: 'numeric' }), hour: get({ hour: '2-digit' }).padStart(2, '0'), minute: get({ minute: '2-digit' }).padStart(2, '0'), mon: get({ month: 'short' }) };
};
/** DD-MM-YYYY, matching the hospital template. */
export const formatDate = (iso: string) => { if (!iso) return ''; const p = parts(iso.length === 10 ? `${iso}T00:00:00+05:30` : iso); return `${p.day}-${p.month}-${p.year}`; };
export const formatDateTime = (iso: string) => { if (!iso) return ''; const p = parts(iso); return `${p.day}-${p.month}-${p.year}, ${p.hour}:${p.minute}`; };
const shortDay = (iso: string) => { const p = parts(iso); return `${p.day} ${p.mon}`; };
const addDays = (isoDate: string, days: number) => { const date = new Date(`${isoDate}T00:00:00Z`); date.setUTCDate(date.getUTCDate() + days); return date.toISOString().slice(0, 10); };

/** Registration details the demo records do not carry. Deterministic per UHID and clearly synthetic. */
export function demoRegistration(uhid: string) {
  const n = Number(uhid.replace(/\D/g, '')) || 1;
  const streets = ['Road No. 45, Jubilee Hills', 'Banjara Hills Road No. 12', 'Madhapur Main Road', 'Kondapur, Near Botanical Garden', 'Gachibowli, Financial District', 'Begumpet, Greenlands'];
  return { address: `Flat ${(n * 7) % 90 + 10}, ${streets[n % streets.length]}, Hyderabad (synthetic demo address)`, phone: `98${String((n * 7919) % 100000000).padStart(8, '0')} (synthetic)` };
}
/** Doctor credentials for the sign-off block. Synthetic; staff can overwrite them when signing. */
export function demoDoctorCredentials(name: string) {
  let hash = 7; for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 900000;
  return { qualification: 'MBBS, MD (synthetic)', reg_no: `TSMC-${String(100000 + hash)}` };
}

const ADVICE: Array<{ match: RegExp; diet: string; activity: string; warning: string[]; followUpInvestigations?: string }> = [
  { match: /kidney|renal|aki|nephr/i, diet: 'Adequate oral hydration unless advised otherwise; low-salt diet; avoid NSAIDs and herbal supplements.', activity: 'Gradual return to normal activity; avoid strenuous exertion for 1 week.',
    warning: ['Reduced urine output or no urine for 8 hours', 'Persistent vomiting, loose stools or inability to drink fluids', 'Swelling of face or legs, breathlessness', 'Confusion or marked drowsiness'], followUpInvestigations: 'Serum creatinine, electrolytes' },
  { match: /svt|tachycardia|arrhythm|cardiac|heart/i, diet: 'Heart-healthy low-salt diet; limit caffeine and avoid alcohol.', activity: 'Light activity; avoid strenuous exertion for 1-2 weeks or until reviewed.',
    warning: ['Sustained palpitations lasting more than 15 minutes', 'Chest pain or pressure', 'Fainting, giddiness or breathlessness', 'Sudden weakness on one side or difficulty speaking'], followUpInvestigations: 'ECG' },
  { match: /biliary|gallstone|cholang|pancreat|bile/i, diet: 'Low-fat, light diet for 2 weeks; small frequent meals; avoid alcohol.', activity: 'Normal light activity; avoid heavy lifting for 1 week.',
    warning: ['Fever with chills', 'Yellowing of eyes or skin, dark urine', 'Severe or persistent abdominal pain', 'Repeated vomiting'], followUpInvestigations: 'Liver function tests' },
  { match: /pneumon|respirat|copd|asthma|lung/i, diet: 'Normal diet with plenty of fluids.', activity: 'Rest for the first week; gradually resume activity.',
    warning: ['Worsening cough or breathlessness', 'Fever beyond 3 days', 'Chest pain', 'Bluish lips or low oxygen reading'], followUpInvestigations: 'Chest X-ray' },
];
const GENERIC_ADVICE = { diet: 'Normal balanced diet unless advised otherwise.', activity: 'Gradual return to normal activity as tolerated.',
  warning: ['High-grade fever', 'Chest pain or breathlessness', 'Uncontrolled bleeding', 'Persistent vomiting or severe pain', 'Any new symptom that worries you'] };

const flagMark = (flag: string) => (flag === 'high' ? ' (H)' : flag === 'low' ? ' (L)' : '');
function labSummary(reports: Report[]) {
  const series = new Map<string, string[]>();
  for (const report of reports.filter(item => item.kind === 'lab')) {
    for (const obs of report.observations) series.set(obs.name, [...(series.get(obs.name) ?? []), `${obs.value}${obs.unit ? ` ${obs.unit}` : ''}${flagMark(obs.flag)}`]);
  }
  return [...series].map(([name, values]) => `${name}: ${values.join(' → ')}`).join('\n');
}
function abnormalAtLast(reports: Report[]) {
  const last = new Map<string, string>();
  for (const report of reports.filter(item => item.kind === 'lab')) for (const obs of report.observations) last.set(obs.name, obs.flag);
  return [...last].filter(([, flag]) => flag !== 'normal').map(([name]) => name);
}

function hospitalCourse(history: PatientHistory, encounterId: string) {
  const encounter = history.encounters.find(item => item.id === encounterId);
  const notes = history.notes.filter(note => note.encounter_id === encounterId && ['progress', 'consultation', 'procedure'].includes(note.kind) && !/^discharge/i.test(note.title))
    .sort((a, b) => a.recorded_at.localeCompare(b.recorded_at)).map(note => `${shortDay(note.recorded_at)} · ${note.author}: ${note.body.trim().slice(0, 600)}`);
  const advice = history.requests.filter(item => item.encounter_id === encounterId && item.status === 'completed' && item.response?.trim()).map(item => `${item.to_department} advice: ${item.response!.trim()}`);
  return [encounter?.assessment.trim(), ...notes, ...advice].filter(Boolean).join('\n\n');
}

function medicationRows(state: WorkflowState, history: PatientHistory, patientId: string): SummaryMedication[] {
  const patient = state.patients.find(item => item.id === patientId)!;
  const rows: SummaryMedication[] = history.medications.filter(item => item.status !== 'historical').map(item => ({
    name: item.name, dosage: item.dose, route: item.route === 'oral' ? 'Oral' : 'SC', frequency: item.frequency, duration: item.status === 'held' ? 'Held - doctor to review' : 'Continue',
  }));
  for (const name of patient.medications) if (!rows.some(row => row.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))) rows.push({ name, dosage: '', route: '', frequency: '', duration: '' });
  return rows;
}

export type SectionKey = 'patient' | 'diagnosis' | 'history' | 'investigations' | 'course' | 'procedures' | 'condition' | 'medications' | 'advice' | 'follow_up';
export const SECTION_LABELS: Record<SectionKey, string> = { patient: 'Patient information', diagnosis: 'Diagnosis', history: 'Complaints, history and examination', investigations: 'Investigations', course: 'Hospital course', procedures: 'Procedures', condition: 'Condition at discharge', medications: 'Discharge medications', advice: 'Diet, activity and warning signs', follow_up: 'Follow-up' };

/** Builds a discharge summary from the patient's existing VDoc records. Every section notes its source for verification. */
export function buildDischargeSummary(state: WorkflowState, record: Discharge, author: { name: string; role: 'doctor' | 'nurse' }, now: string): DischargeSummaryDoc {
  const patient = state.patients.find(item => item.id === record.patient_id)!;
  const history = state.histories.find(item => item.context.patient_id === record.patient_id)!;
  const encounter = history.encounters.find(item => item.id === record.encounter_id)!;
  const reports = state.reports.filter(item => item.patient_id === patient.id && item.encounter_id === record.encounter_id).sort((a, b) => a.reported_at.localeCompare(b.reported_at));
  const vitals = history.vitals.filter(item => item.encounter_id === record.encounter_id).sort((a, b) => a.recorded_at.localeCompare(b.recorded_at));
  const first = vitals[0]; const last = vitals.at(-1);
  const registration = demoRegistration(patient.uhid);
  const diagnosisText = [patient.conditions[0] ?? '', ...patient.conditions.slice(1)].join(' ');
  const advice = ADVICE.find(item => item.match.test(diagnosisText)) ?? GENERIC_ADVICE;
  const abnormal = abnormalAtLast(reports);
  const followWork = history.work_items.filter(item => item.encounter_id === record.encounter_id && item.kind === 'follow_up' && item.status === 'pending');
  const familyHistory = history.context.family_history && !/not verified|not recorded/i.test(history.context.family_history) ? ` Family history: ${history.context.family_history}.` : '';
  const procedures = history.notes.filter(note => note.encounter_id === record.encounter_id && note.kind === 'procedure').map(note => ({ name: note.title, date: formatDate(note.recorded_at), performed_by: note.author }));
  return {
    patient: {
      name: patient.name, uhid: patient.uhid, age_sex: `${patient.age} / ${patient.sex}`, dob: formatDate(history.context.dob), address: registration.address, phone: registration.phone,
      admitted_at: formatDateTime(encounter.started_at), discharged_at: formatDateTime(record.discharged_at ?? `${record.target_date}T10:00:00+05:30`),
      department: patient.department, ward_bed: encounter.location, consultant: `${encounter.owner}, Consultant - ${patient.department}`, referring_doctor: 'Self / walk-in',
    },
    primary_diagnosis: patient.conditions[0] ?? '', secondary_diagnosis: patient.conditions.slice(1).join('; '),
    presenting_complaints: history.context.presenting_complaint || encounter.reason,
    past_history: `${history.context.history}${familyHistory}`.trim(), allergies: patient.allergies.length ? patient.allergies.join(', ') : 'Not documented - verify with patient',
    examination: [first ? `On admission (${formatDateTime(first.recorded_at)}): BP ${first.systolic}/${first.diastolic} mmHg, pulse ${first.pulse}/min, temp ${first.temperature_c} C, SpO2 ${first.spo2}%, RR ${first.respiratory_rate}/min${first.oxygen_context ? ` (${first.oxygen_context})` : ''}.` : '', history.context.acuity_reason].filter(Boolean).join(' '),
    investigations: { lab: labSummary(reports), imaging: reports.filter(item => item.kind === 'imaging').map(item => `${item.title} (${formatDate(item.reported_at)}): ${item.findings}`).join('\n'), other: '' },
    hospital_course: hospitalCourse(history, record.encounter_id),
    procedures,
    condition: { general: 'Improved and haemodynamically stable', bp: last ? `${last.systolic}/${last.diastolic} mmHg` : '', pulse: last ? `${last.pulse}/min` : '', temp: last ? `${last.temperature_c} C` : '', spo2: last ? `${last.spo2}%` : '', rr: last ? `${last.respiratory_rate}/min` : '' },
    medications: medicationRows(state, history, patient.id),
    diet: advice.diet, activity: advice.activity,
    follow_up: { with: followWork.length ? followWork.map(item => item.title).join('; ') : `${encounter.owner} / ${patient.department} OPD`, date: formatDate(addDays(record.target_date, 7)),
      investigations: abnormal.length ? `Repeat ${abnormal.join(', ')}` : advice === GENERIC_ADVICE ? '' : (ADVICE.find(item => item.match.test(diagnosisText))?.followUpInvestigations ?? '') },
    warning_signs: [...advice.warning],
    discharge_status: 'Home',
    sources: {
      patient: `VDoc patient record · ${patient.uhid}; encounter ${formatDate(encounter.started_at)}; address and phone are synthetic demo values`,
      diagnosis: 'VDoc patient conditions', history: 'VDoc patient context and first recorded vitals',
      investigations: reports.length ? `${reports.length} reports for this admission (lab trends first → last)` : 'No reports linked to this admission',
      course: 'Encounter assessment, progress / ward-round notes and completed consult responses', procedures: procedures.length ? 'Procedure notes for this admission' : 'No procedure note on record - add if any',
      condition: last ? `Latest vitals · ${formatDateTime(last.recorded_at)}` : 'No vitals on record', medications: 'VDoc medication records; duration and gaps need clinician input',
      advice: 'Suggested from the diagnosis - edit as needed', follow_up: followWork.length ? 'Pending follow-up work items' : 'Suggested: owner / department, 7 days after target discharge date',
    },
    prepared_by: author.name, prepared_role: author.role, status: 'draft', signed_by: null, signed_qualification: null, signed_reg_no: null, signed_at: null, generated_at: now, edits: [],
  };
}

/** Copy one section of a freshly built document over the current one ("reset from record"). */
export function applySection(current: DischargeSummaryDoc, fresh: DischargeSummaryDoc, key: SectionKey): DischargeSummaryDoc {
  const next = structuredClone(current);
  switch (key) {
    case 'patient': next.patient = fresh.patient; next.allergies = fresh.allergies; break;
    case 'diagnosis': next.primary_diagnosis = fresh.primary_diagnosis; next.secondary_diagnosis = fresh.secondary_diagnosis; break;
    case 'history': next.presenting_complaints = fresh.presenting_complaints; next.past_history = fresh.past_history; next.examination = fresh.examination; break;
    case 'investigations': next.investigations = fresh.investigations; break;
    case 'course': next.hospital_course = fresh.hospital_course; break;
    case 'procedures': next.procedures = fresh.procedures; break;
    case 'condition': next.condition = fresh.condition; break;
    case 'medications': next.medications = fresh.medications; break;
    case 'advice': next.diet = fresh.diet; next.activity = fresh.activity; next.warning_signs = fresh.warning_signs; break;
    case 'follow_up': next.follow_up = fresh.follow_up; break;
  }
  return next;
}
