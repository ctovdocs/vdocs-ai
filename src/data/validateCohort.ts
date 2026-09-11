import { patientSchema, reportSchema } from '../domain/models.js';
import { historySchema } from '../domain/longitudinal.js';
import { SNAPSHOT_AT, type buildCohort } from './cohort.js';
import { scenarios } from './cohort.js';

export function validateCohort(dataset: ReturnType<typeof buildCohort>) {
  const failures: string[] = [];
  const check = (condition: boolean, message: string) => { if (!condition) failures.push(message); };
  const { patients, reports, histories } = dataset;
  check(patients.length === scenarios.length, 'Patient count must match the authored scenarios.');
  check(patients.filter(patient => patient.acuity === 'critical').length === scenarios.filter(scenario => scenario.critical).length, 'Acuity count must match the authored scenarios.');
  check(histories.filter(history => history.encounters.length > 1).length === scenarios.filter(scenario => !scenario.firstVisit).length, 'Hospital history must match the authored scenarios.');
  const departments = new Set(patients.map(patient => patient.department));
  check(departments.size === 5, 'Expected five clinical departments.');
  for (const department of departments) check(patients.filter(patient => patient.department === department).length === scenarios.filter(scenario => scenario.department === department).length, `Department count mismatch: ${department}.`);
  check(new Set(patients.map(patient => patient.uhid)).size === patients.length, 'UHIDs must be unique.');
  const identifiers = new Set<string>();
  const recordIdentity = (id: string) => { check(!identifiers.has(id), `Duplicate ID: ${id}`); identifiers.add(id); };
  patients.forEach(patient => { patientSchema.parse(patient); recordIdentity(patient.id); });
  reports.forEach(report => { reportSchema.parse(report); recordIdentity(report.id); });
  for (const history of histories) {
    historySchema.parse(history);
    const patient = patients.find(candidate => candidate.id === history.context.patient_id);
    check(Boolean(patient), 'History has no patient.');
    if (!patient) continue;
    check(patient.visit_count === history.encounters.length, `Visit count mismatch: ${patient.uhid}`);
    check(patient.acuity === history.context.acuity, `Acuity mismatch: ${patient.uhid}`);
    check(history.context.clinician_review_status === 'not_reviewed', 'Do not claim clinical sign-off.');
    const patientReports = reports.filter(report => report.patient_id === patient.id);
    const groups = [history.encounters, history.notes, history.vitals, history.medications, history.orders, history.requests, history.work_items, history.timeline];
    const records = [history.context, ...groups.flat()];
    const sources = new Map([...records, ...patientReports].map(record => [record.id, record]));
    const encounters = new Map(history.encounters.map(encounter => [encounter.id, encounter]));
    for (const record of records) {
      recordIdentity(record.id);
      check(record.patient_id === patient.id && record.hospital_id === patient.hospital_id, `Scope mismatch: ${record.id}`);
      if ('encounter_id' in record) check(encounters.has(record.encounter_id), `Missing encounter: ${record.id}`);
      if ('source_ids' in record) record.source_ids.forEach(sourceId => check(sources.has(sourceId), `Missing source ${sourceId} on ${record.id}`));
    }
    check(encounters.has(history.context.current_encounter_id), `Missing current encounter: ${patient.uhid}`);
    check(history.encounters.filter(encounter => encounter.status === 'active').length === 1, `Expected one active encounter: ${patient.uhid}`);
    for (const encounter of history.encounters) {
      check(encounter.started_at <= SNAPSHOT_AT, 'Encounter starts after snapshot.');
      if (encounter.ended_at) check(encounter.ended_at >= encounter.started_at && encounter.ended_at <= SNAPSHOT_AT, 'Invalid historical encounter end.');
    }
    if (history.encounters.length === 1) check(history.context.previous_records_status === 'first_hospital_visit', 'First visit must not claim hospital history.');
    for (const report of patientReports) {
      check(report.hospital_id === patient.hospital_id, `Wrong-hospital report: ${report.id}`);
      const encounter = encounters.get(report.encounter_id ?? '');
      const order = history.orders.find(candidate => candidate.id === report.order_id);
      check(Boolean(encounter) && Boolean(order), `Unlinked report: ${report.id}`);
      check(order?.status === 'completed' && order.result_id === report.id, `Report/order mismatch: ${report.id}`);
      const performedAt = report.specimen_at ?? report.performed_at ?? '';
      check(Boolean(performedAt) && performedAt >= (order?.placed_at ?? '') && report.reported_at >= performedAt && report.reported_at <= SNAPSHOT_AT, `Invalid report chronology: ${report.id}`);
      for (const observation of report.observations) {
        const value = Number(observation.value);
        const [low, high] = observation.reference.split('–').map(Number);
        const expected = value < low ? 'low' : value > high ? 'high' : 'normal';
        check(Number.isFinite(value) && Number.isFinite(low) && Number.isFinite(high) && low <= high, `Invalid numeric observation: ${report.id}`);
        check(observation.flag === expected, `Incorrect reference flag: ${report.id}`);
      }
    }
    for (const order of history.orders) {
      check(order.status === 'pending' ? order.result_id === null : patientReports.some(report => report.id === order.result_id), `Order/result state invalid: ${order.id}`);
    }
    for (const request of history.requests) {
      check(request.to_department !== request.from_department, 'Interdepartmental request must cross departments.');
      check(departments.has(request.to_department), 'Unknown receiving department.');
      check(request.status === 'completed' ? Boolean(request.response && request.completed_at) : request.response === null && request.completed_at === null, 'Request response/state mismatch.');
      if (request.accepted_at) check(request.accepted_at >= request.requested_at, 'Acceptance precedes request.');
      if (request.completed_at) check(request.completed_at >= (request.accepted_at ?? request.requested_at), 'Completion precedes acceptance.');
    }
    for (const event of history.timeline) {
      check(sources.has(event.source_id), `Timeline source missing: ${event.id}`);
      check(event.available_at >= event.occurred_at && event.available_at <= SNAPSHOT_AT, 'Timeline chronology invalid.');
    }
    history.context.acuity_source_ids.forEach(sourceId => check(sources.has(sourceId), `Missing acuity evidence: ${patient.uhid}`));
    if (patient.acuity === 'critical') {
      check(history.context.acuity_source_ids.length >= 2 && history.context.acuity_reason.length > 40, 'Critical case requires explicit supporting records.');
    }
  }
  if (failures.length) throw new Error(failures.join('\n'));
  return {
    patients: patients.length, critical_patients: patients.filter(patient => patient.acuity === 'critical').length, patients_with_multiple_visits: histories.filter(history => history.encounters.length > 1).length,
    encounters: histories.reduce((total, history) => total + history.encounters.length, 0),
    lab_reports: reports.filter(report => report.kind === 'lab').length,
    lab_observations: reports.reduce((total, report) => total + report.observations.length, 0),
    imaging_reports: reports.filter(report => report.kind === 'imaging').length,
    notes: histories.reduce((total, history) => total + history.notes.length, 0),
    requests: histories.reduce((total, history) => total + history.requests.length, 0),
    timeline_events: histories.reduce((total, history) => total + history.timeline.length, 0),
  };
}
