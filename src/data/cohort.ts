import { patientSchema, reportSchema, type Patient, type Report } from '../domain/models.ts';
import { historySchema, type PatientHistory } from '../domain/longitudinal.ts';
import { scenarios as originalScenarios } from './scenarios.ts';
import { expandedScenarios } from './expandedScenarios.ts';

export const scenarios = [...originalScenarios, ...expandedScenarios];

export const DEMO_HOSPITAL_ID = '10000000-0000-4000-8000-000000000001';
export const SCENARIO_VERSION = 'india-high-acuity-100-v3';
export const SNAPSHOT_AT = '2026-09-08T07:30:00.000Z';

export function recordId(category: number, patientNumber: number, sequence = 1) {
  return `${String(category).padStart(8, '0')}-0000-4000-8000-${String(patientNumber * 1000 + sequence).padStart(12, '0')}`;
}

function dateRelative(daysBefore: number, hour = 3, minute = 0, anchor = '2026-09-07') {
  const date = new Date(`${anchor}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - daysBefore);
  date.setUTCHours(hour, minute);
  return date.toISOString();
}

export const owners: Record<string, string> = {
  'Internal Medicine': 'Dr. Ananya Mehta', 'Cardiology': 'Dr. Rohan Shah',
  'Gastroenterology': 'Dr. Kavya Menon', 'Orthopaedics': 'Dr. Nikhil Joshi', 'Nephrology': 'Dr. Devika Rao',
};
const STANDARD_IMMUNIZATIONS = [
  { name: 'Influenza (seasonal)', daysBefore: 200 },
  { name: 'Hepatitis B', daysBefore: 1200 },
];

export function buildCohort() {
  const patients: Patient[] = [];
  const reports: Report[] = [];
  const histories: PatientHistory[] = [];
  for (const scenario of scenarios) {
    const dateAt = (daysBefore: number, hour = 3, minute = 0) => dateRelative(daysBefore, hour, minute, scenario.number > 50 ? '2026-09-08' : '2026-09-07');
    const patientId = `20000000-0000-4000-8000-${String(scenario.number).padStart(12, '0')}`;
    const scope = { hospital_id: DEMO_HOSPITAL_ID, patient_id: patientId };
    const days = scenario.visitDays ?? (scenario.firstVisit ? [0] : [540, 270, 90, 14, 0]);
    const owner = owners[scenario.department];
    const history: PatientHistory = {
      context: {
        id: recordId(40, scenario.number), ...scope, dob: `${2026 - scenario.age}-06-10`,
        occupation: scenario.occupation, preferred_language: scenario.language, social_context: scenario.social,
        history: scenario.story, presenting_complaint: scenario.presentation,
        acuity: scenario.critical ? 'critical' : 'noncritical', acuity_reason: scenario.acuityReason,
        acuity_assessed_at: dateAt(0, 5, 30), acuity_source_ids: [],
        previous_records_status: scenario.firstVisit ? 'first_hospital_visit' : 'hospital_records_available',
        current_encounter_id: recordId(41, scenario.number, days.length), clinician_review_status: 'not_reviewed',
        synthetic: true, scenario_version: SCENARIO_VERSION, family_history: scenario.familyHistory,
      }, encounters: [], notes: [], vitals: [], medications: [], orders: [], requests: [], work_items: [], timeline: [],
      immunizations: (scenario.number > 50 ? [] : STANDARD_IMMUNIZATIONS).map((immunization, index) => ({
        id: recordId(57, scenario.number, index + 1), ...scope, name: immunization.name,
        administered_at: dateAt(immunization.daysBefore, 9), source_system: 'MockHIS',
      })),
    };
    days.forEach((daysBefore, visitIndex) => {
      const current = daysBefore === 0;
      const encounterId = recordId(41, scenario.number, visitIndex + 1);
      const clinicalScope = { ...scope, encounter_id: encounterId };
      const reason = current ? scenario.presentation : scenario.priorVisits[visitIndex];
      const inpatient = current ? scenario.inpatient ?? (scenario.critical || scenario.number === 1) : /admission|initiation/i.test(reason);
      const visitDetail = !current ? scenario.opdVisitHistory?.[visitIndex] : undefined;
      const visitDepartment = visitDetail?.department ?? scenario.department;
      const iterationOwner = visitDetail ? owners[visitDetail.department] : owner;
      history.encounters.push({
        id: encounterId, ...scope, department: visitDepartment, kind: inpatient ? 'IPD' : 'OPD',
        started_at: dateAt(current ? scenario.admissionDaysBefore ?? daysBefore : daysBefore, 2),
        ended_at: current ? null : dateAt(inpatient ? daysBefore - 2 : daysBefore, 8),
        status: current ? 'active' : 'completed', location: current ? scenario.location : `${visitDepartment} / historical encounter`,
        owner: iterationOwner, reason, assessment: current ? scenario.story : (visitDetail?.diagnosis ?? reason), source_system: 'MockHIS',
      });
      const labObservations = scenario.labs.filter(series => current || series.values.length > 1).map(series => {
        const value = series.values.length === 1 ? series.values[0] : series.values[visitIndex];
        return { name: series.name, value: String(value), unit: series.unit, reference: `${series.low}–${series.high}`,
          flag: value < series.low ? 'low' as const : value > series.high ? 'high' as const : 'normal' as const };
      });
      const reportId = recordId(42, scenario.number, visitIndex + 1);
      const orderId = recordId(43, scenario.number, visitIndex + 1);
      if (labObservations.length) {
        const title = scenario.number === 1 ? 'Kidney function and metabolic review' : `${visitDepartment} laboratory review`;
        reports.push(reportSchema.parse({ id: reportId, ...scope, encounter_id: encounterId, order_id: orderId,
          kind: 'lab', title, source: 'MockLIS', specimen_at: dateAt(daysBefore, 2, 30),
          reported_at: dateAt(daysBefore, 3, 30), indication: reason, author: 'Dr. Aditi Sen · Pathology (synthetic)',
          findings: `Synthetic results associated with this encounter. ${labObservations.map(observation => `${observation.name} ${observation.value} ${observation.unit} (${observation.flag})`).join('; ')}. Laboratory reference flags are distinct from patient acuity and individual treatment targets.`, observations: labObservations,
        }));
        history.orders.push({ id: orderId, ...clinicalScope, title, kind: 'lab', placed_at: dateAt(daysBefore, 2, 10), status: 'completed', result_id: reportId, indication: reason, requester: iterationOwner, source_system: 'MockLIS', priority: 'routine', version: 0 });
      }
      const noteId = recordId(44, scenario.number, visitIndex + 1);
      const resultText = labObservations.map(observation => `${observation.name} ${observation.value} ${observation.unit}`).join('; ');
      history.notes.push({
        id: noteId, ...clinicalScope, kind: 'consultation', recorded_at: dateAt(daysBefore, 5, 30), author: iterationOwner,
        title: current ? 'Current clinical assessment' : `Hospital review ${visitIndex + 1}`,
        body: current
          ? `${scenario.presentation}\nBackground: ${scenario.story}\nRecorded acuity: ${scenario.acuityReason}\nHistory source and context: ${scenario.social}\nAvailable results: ${resultText || 'No laboratory results recorded'}.\nAssessment is a synthetic authored scenario, not an AI diagnosis. ${scenario.critical ? 'Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.' : 'No critical state is asserted.'}`
          : `${visitDetail ? `Seen in ${visitDetail.department}. Diagnosis: ${visitDetail.diagnosis}` : reason}\nThis is a retained encounter at the demo hospital. Recorded investigations: ${resultText || 'None attached'}.\nNo current-admission diagnosis or future result is backdated into this visit.`,
        source_ids: labObservations.length ? [reportId] : [], source_system: 'MockHIS',
      });
      if (!current && inpatient) history.notes.push({
        id: recordId(45, scenario.number, visitIndex + 1), ...clinicalScope, kind: 'discharge', recorded_at: dateAt(daysBefore - 2, 8), author: iterationOwner, title: 'Historical discharge record',
        body: `Prior admission completed. Admission context: ${reason} The hospital retained this discharge record and the linked investigations. Subsequent outpatient reviews are separate encounters; current critical status must not be applied to this historical discharge.`, source_ids: [noteId], source_system: 'MockHIS',
      });
      if (current) {
        const [systolic, diastolic, pulse, respiratoryRate, spo2, temperature] = scenario.vitals;
        const vitalId = recordId(46, scenario.number);
        history.vitals.push({ id: vitalId, ...clinicalScope, recorded_at: dateAt(0, 2, 45), systolic, diastolic, pulse, respiratory_rate: respiratoryRate, spo2, temperature_c: temperature,
          oxygen_context: 'Room air at the recorded assessment; subsequent support and response not represented.', source_system: 'MockHIS' });
        history.context.acuity_source_ids = [noteId, vitalId, ...(labObservations.length ? [reportId] : [])];
      }
    });
    scenario.opdVisitHistory?.forEach((visitDetail, index) => {
      if (!visitDetail.referral) return;
      const visitEncounterId = recordId(41, scenario.number, index + 1);
      const daysBefore = days[index];
      history.requests.push({ id: recordId(58, scenario.number, index + 1), ...scope, encounter_id: visitEncounterId,
        from_department: visitDetail.department, to_department: visitDetail.referral.department, reason: visitDetail.referral.reason,
        status: 'completed', priority: 'routine', requested_at: dateAt(daysBefore, 5, 35), accepted_at: dateAt(daysBefore, 5, 45), completed_at: dateAt(daysBefore - 1, 10),
        response: visitDetail.referral.outcome, owner: owners[visitDetail.referral.department], source_ids: [], source_system: 'VDoc', kind: 'referral', version: 0, reviewed_at: dateAt(daysBefore - 1, 11),
      });
    });
    const currentEncounter = history.encounters.at(-1)!;
    const clinicalScope = { ...scope, encounter_id: currentEncounter.id };
    if (scenario.admissionLabs?.length) {
      const reportId = recordId(64, scenario.number);
      const orderId = recordId(65, scenario.number);
      const daysBefore = scenario.admissionDaysBefore ?? 0;
      const observations = scenario.admissionLabs.map(series => ({ name: series.name, value: String(series.values[0]), unit: series.unit,
        reference: `${series.low}–${series.high}`, flag: series.values[0] < series.low ? 'low' as const : series.values[0] > series.high ? 'high' as const : 'normal' as const }));
      reports.push(reportSchema.parse({ id: reportId, ...clinicalScope, order_id: orderId, kind: 'lab', title: 'Admission laboratory assessment', source: 'MockLIS',
        specimen_at: dateAt(daysBefore, 2, 30), reported_at: dateAt(daysBefore, 3, 30), indication: scenario.admissionFindings,
        author: 'Dr. Aditi Sen · Pathology (synthetic)', findings: `Synthetic admission results, before the separate recovery report: ${observations.map(observation => `${observation.name} ${observation.value} ${observation.unit}`).join('; ')}.`, observations }));
      history.orders.push({ id: orderId, ...clinicalScope, title: 'Admission laboratory assessment', kind: 'lab', placed_at: dateAt(daysBefore, 2, 10), status: 'completed', result_id: reportId,
        indication: scenario.admissionFindings ?? 'Admission assessment', requester: owner, source_system: 'MockLIS', priority: 'routine', version: 0 });
      history.notes.push({ id: recordId(66, scenario.number), ...clinicalScope, kind: 'consultation', recorded_at: dateAt(daysBefore, 4), author: owner,
        title: 'Admission assessment and hospital course', body: scenario.admissionFindings ?? 'Synthetic admission assessment', source_ids: [reportId], source_system: 'MockHIS' });
    }
    scenario.imaging.forEach((study, index) => {
      const reportId = recordId(47, scenario.number, index + 1);
      const orderId = recordId(48, scenario.number, index + 1);
      reports.push(reportSchema.parse({ id: reportId, ...scope, encounter_id: currentEncounter.id, order_id: orderId,
        kind: 'imaging', title: study.title, source: 'MockRIS', reported_at: dateAt(0, 4, 30 + index),
        performed_at: dateAt(0, 3, 45 + index), indication: study.indication, author: 'Dr. Tara Bose · Reporting clinician (synthetic)',
        findings: `${study.findings}\nSynthetic report text only; no DICOM acquisition or diagnostic image is supplied.`, observations: [],
      }));
      history.orders.push({ id: orderId, ...clinicalScope, title: study.title, kind: 'imaging', placed_at: dateAt(0, 3, 35), status: 'completed', result_id: reportId, indication: study.indication, requester: owner, source_system: 'MockRIS', priority: 'routine', version: 0 });
    });
    scenario.medicines.forEach((medicine, index) => {
      history.medications.push({ id: recordId(49, scenario.number, index + 1), ...clinicalScope,
        name: medicine.name, dose: medicine.dose, route: medicine.name.startsWith('Insulin') ? 'subcutaneous' : 'oral', frequency: medicine.frequency,
        status: medicine.status, started_at: dateAt(14, 5), ended_at: medicine.status === 'documented_home' ? null : dateAt(0, 2, 5),
        recorded_at: dateAt(0, 5, 40), reason: medicine.reason, author: owner, source_system: 'MockHIS',
      });
    });
    const relevantReports = reports.filter(report => report.patient_id === patientId && report.encounter_id === currentEncounter.id);
    const requestIds = scenario.consults.filter(consult => consult.department !== scenario.department).map((consult, index) => {
      const requestId = recordId(50, scenario.number, index + 1);
      history.requests.push({ id: requestId, ...clinicalScope, from_department: scenario.department, to_department: consult.department,
        reason: consult.question, status: consult.status, priority: scenario.critical ? 'urgent' : 'routine', requested_at: dateAt(0, 5, 35 + index * 5),
        accepted_at: consult.status === 'received' ? null : dateAt(0, 5, 45 + index * 5), completed_at: consult.status === 'completed' ? dateAt(0, 6, index * 5) : null,
        response: consult.response ?? null, owner: owners[consult.department], source_ids: relevantReports.map(report => report.id), source_system: 'VDoc', kind: 'request', version: 0, reviewed_at: null,
      });
      return requestId;
    });
    scenario.pending.forEach((title, index) => {
      const kind = title.toLowerCase().includes('discharge') ? 'discharge' : /follow-up|outpatient|appointment/.test(title.toLowerCase()) ? 'follow_up' : 'review';
      history.work_items.push({ id: recordId(51, scenario.number, index + 1), ...clinicalScope, title, kind, status: 'pending', owner,
        created_at: dateAt(0, 6, 5), due_at: dateAt(kind === 'follow_up' ? -7 : 0, kind === 'follow_up' ? 4 : 8),
        source_ids: [...requestIds, ...relevantReports.map(report => report.id)], source_system: 'VDoc',
      });
    });
    scenario.consults.filter(consult => consult.department === scenario.department).forEach((consult, index) => {
      history.work_items.push({ id: recordId(61, scenario.number, index + 1), ...clinicalScope, title: consult.question, kind: 'review',
        status: consult.status === 'completed' ? 'completed' : 'pending', owner, created_at: dateAt(0, 5, 35), due_at: dateAt(0, 8),
        source_ids: relevantReports.map(report => report.id), source_system: 'VDoc' });
    });
    if (scenario.labs.length && !(scenario.number > 50 && !scenario.critical)) history.orders.push({ id: recordId(43, scenario.number, 100), ...clinicalScope,
      title: scenario.pending.find(title => /repeat|serial/i.test(title)) ?? 'Follow-up laboratory review', kind: 'lab', placed_at: dateAt(0, 6, 5), status: 'pending', result_id: null,
      indication: 'Synthetic clinician-authored follow-up request; no future result has been generated.', requester: owner, source_system: 'MockLIS', priority: scenario.critical ? 'urgent' : 'routine', version: 0,
    });
    if (scenario.procedure) history.notes.push({ id: recordId(52, scenario.number), ...clinicalScope, kind: 'procedure', recorded_at: dateAt(0, 3, 15), author: owner,
      title: 'Procedure / physiological study record', body: scenario.procedure, source_ids: [], source_system: 'MockHIS',
    });
    scenario.pastProcedures?.forEach((pastProcedure, index) => {
      history.notes.push({ id: recordId(56, scenario.number, index + 1), ...clinicalScope, kind: 'procedure', recorded_at: dateAt(2500, 3, 15), author: owner,
        title: `${pastProcedure.title} — ${pastProcedure.whenLabel}`, body: pastProcedure.notes, source_ids: [], source_system: 'MockHIS',
      });
    });
    scenario.wardRounds?.forEach((round, index) => {
      const daysBefore = scenario.wardRounds!.length - 1 - index;
      history.notes.push({ id: recordId(59, scenario.number, index + 1), ...clinicalScope, kind: 'progress', recorded_at: dateAt(daysBefore, 7),
        author: owner, title: `Ward round — ${round.whenLabel}`, body: `Findings: ${round.findings}\nPlan: ${round.plan}`, source_ids: [], source_system: 'MockHIS',
      });
    });
    history.notes.push({ id: recordId(53, scenario.number), ...clinicalScope, kind: 'progress', recorded_at: dateAt(0, 6, 10), author: owner, title: 'Latest progress and pending work',
      body: `${scenario.handover}\nPending: ${scenario.pending.join('; ')}.\n${scenario.consults.map(consult => `Department question (${consult.department}): ${consult.question} Status: ${consult.status}. ${consult.response ?? 'No completed specialist response available.'}`).join('\n')}`,
      source_ids: [...requestIds, ...relevantReports.map(report => report.id)], source_system: 'MockHIS',
    });
    history.notes.push({ id: recordId(54, scenario.number), ...clinicalScope, kind: 'handover', recorded_at: dateAt(0, 6, 15), author: owner,
      title: 'Synthetic handover draft — not approved', body: `Situation: ${scenario.presentation}\nBackground: ${scenario.story}\nRecent results: ${relevantReports.map(report => report.title).join('; ') || 'No investigations available.'}\nPending: ${scenario.pending.join('; ')}.\nContinuity: ${scenario.handover}\nThis is a seeded VDoc draft, not evidence of a Fortis handover system.`,
      source_ids: [recordId(53, scenario.number)], source_system: 'VDoc',
    });
    const addEvent = (sourceId: string, encounterId: string, occurredAt: string, availableAt: string, kind: PatientHistory['timeline'][number]['kind'], title: string, sourceSystem: PatientHistory['timeline'][number]['source_system']) => {
      history.timeline.push({ id: recordId(55, scenario.number, history.timeline.length + 1), ...scope, encounter_id: encounterId,
        occurred_at: occurredAt, available_at: availableAt, kind, title, source_id: sourceId, source_system: sourceSystem });
    };
    history.encounters.forEach(encounter => addEvent(encounter.id, encounter.id, encounter.started_at, encounter.started_at, 'encounter', `${encounter.kind}: ${encounter.reason}`, 'MockHIS'));
    reports.filter(report => report.patient_id === patientId).forEach(report => addEvent(report.id, report.encounter_id!, report.performed_at ?? report.specimen_at!, report.reported_at, 'result', report.title, report.source));
    history.notes.forEach(note => addEvent(note.id, note.encounter_id, note.recorded_at, note.recorded_at, 'note', note.title, note.source_system));
    history.medications.forEach(medicine => addEvent(medicine.id, medicine.encounter_id, medicine.recorded_at, medicine.recorded_at, 'medication', `${medicine.name}: ${medicine.status}`, 'MockHIS'));
    history.requests.forEach(request => addEvent(request.id, request.encounter_id, request.requested_at, request.requested_at, 'request', `${request.to_department}: ${request.reason}`, 'VDoc'));
    history.work_items.forEach(item => addEvent(item.id, item.encounter_id, item.created_at, item.created_at, 'task', item.title, 'VDoc'));
    history.timeline.sort((first, second) => second.available_at.localeCompare(first.available_at));
    patients.push(patientSchema.parse({ id: patientId, hospital_id: DEMO_HOSPITAL_ID, uhid: `F-DEMO-${String(scenario.number).padStart(4, '0')}`,
      name: scenario.name, age: scenario.age, sex: scenario.sex, department: scenario.department,
      encounter: `${currentEncounter.kind} · ${scenario.location}`, conditions: scenario.conditions, allergies: scenario.allergies,
      medications: scenario.medicines.filter(medicine => medicine.status === 'documented_home').map(medicine => medicine.name), acuity: history.context.acuity, visit_count: days.length,
    }));
    histories.push(historySchema.parse(history));
  }
  reports.sort((first, second) => second.reported_at.localeCompare(first.reported_at));
  return { patients, reports, histories };
}

export const cohort = buildCohort();
