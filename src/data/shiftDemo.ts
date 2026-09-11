import { workflowStateSchema, type Handover, type WorkflowState } from '../domain/workflow.js';
import { captureShift } from '../services/shiftHandover.js';

export const SHIFT_DEMO_MARKER = 'vdoc.shift-fixtures.v1';
const idFor = (category: number, sequence: number) => `${category}000000-0000-4000-8000-${String(sequence).padStart(12, '0')}`;
const baseTime = Date.parse('2026-09-08T02:00:00.000Z');
const departments = ['Internal Medicine', 'Cardiology', 'Nephrology'];
const doctors = [['Dr. Ananya Mehta', 'Dr. Rohan Desai'], ['Dr. Vikram Sethi', 'Dr. Kavita Menon'], ['Dr. Nisha Rao', 'Dr. Aditya Shah']];

export function seedShiftDemo(input: WorkflowState, at: string): WorkflowState {
  if (input.commands.includes(SHIFT_DEMO_MARKER)) return input;
  const state = structuredClone(input);
  for (let shiftIndex = 0; shiftIndex < 10; shiftIndex++) {
    const departmentIndex = shiftIndex % 3;
    const slot = Math.floor(shiftIndex / 3);
    const department = departments[departmentIndex];
    const fromDoctor = doctors[departmentIndex][slot % 2];
    const toDoctor = doctors[departmentIndex][(slot + 1) % 2];
    const time = (hours: number) => new Date(baseTime + (slot * 8 + hours) * 3600000).toISOString();
    const shiftId = idFor(71, shiftIndex + 1);
    if (state.handovers.some(record => record.shift_id === shiftId)) throw new Error('Partial shift fixtures already exist. No records were changed.');
    const admitted = state.patients.filter(patient => patient.uhid.startsWith('F-DEMO-') && state.histories.some(history => history.context.patient_id === patient.id && history.encounters.some(encounter => encounter.kind === 'IPD' && encounter.status === 'active' && encounter.started_at <= time(0))));
    const primary = admitted.filter(patient => patient.department === department).slice(0, 10);
    const consulted = admitted.filter(patient => patient.department === departments[(departmentIndex + 1) % 3]).slice(0, 2);
    const patients = [...primary, ...consulted];
    if (patients.length !== 12) throw new Error(`Need 10 department patients and 2 referred patients for ${department}. Load the 100-patient dataset first; no partial seed was saved.`);
    for (const [position, patient] of patients.entries()) {
      const sequence = (shiftIndex + 1) * 100 + position + 1;
      const history = state.histories.find(history => history.context.patient_id === patient.id)!;
      const encounter = history.encounters.find(encounter => encounter.kind === 'IPD' && encounter.status === 'active')!;
      const scope = { hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounter.id };
      const noteIds = [idFor(72, sequence), idFor(73, sequence)];
      const labId = idFor(74, sequence);
      const labReportId = idFor(75, sequence);
      const requestId = idFor(76, sequence);
      const imagingId = idFor(77, sequence);
      const imagingReportId = idFor(78, sequence);
      const problem = patient.conditions[0] ?? 'Presenting complaint';
      if (patient.department !== department) history.requests.push({ id: idFor(80, sequence), ...scope, from_department: patient.department, to_department: department,
        reason: `Synthetic incoming consultation: please assess the ${department} question in the context of ${problem}. Patient remains admitted under ${patient.department}.`,
        status: 'in_progress', priority: 'routine', owner: fromDoctor, requested_by: encounter.owner, requested_at: time(0), accepted_at: time(0.5), completed_at: null, response: null, reviewed_at: null, source_ids: [], source_system: 'VDoc', kind: 'referral', version: 0 });
      const baseline = state.reports.find(report => report.patient_id === patient.id && report.kind === 'lab' && report.reported_at <= time(0));
      const labTitle = position % 3 === 0 ? baseline?.title ?? 'Laboratory panel' : ['CBC', 'KFT', 'Electrolytes', 'CRP'][position % 4];
      const toDepartment = department === 'Internal Medicine' ? (position % 2 ? 'Gastroenterology' : 'Nephrology') : department === 'Cardiology' ? (position % 2 ? 'Gastroenterology' : 'Nephrology') : (position % 2 ? 'Cardiology' : 'Internal Medicine');
      for (const [roundIndex, id] of noteIds.entries()) history.notes.push({ id, ...scope, kind: 'progress', title: `Ward round ${roundIndex + 1} · ${department} · synthetic shift`,
        body: `Synthetic demonstration entry. ${patient.name}: ${problem}.\n${roundIndex === 0 ? `Reviewed the documented admission history, allergy list and medication reconciliation. ${labTitle} follow-up is recorded for this shift.` : `Follow-up round: checked investigation availability and the ${toDepartment} request. ${position % 3 ? 'Outstanding results and the specialist reply remain on the incoming team’s list.' : 'Available synthetic report and specialist response were reviewed; correlate against the live chart.'}`}\nNo treatment change or discharge clearance is implied by this fixture.`, author: fromDoctor, source_ids: [], source_system: 'VDoc', recorded_at: time(roundIndex === 0 ? 1 : 6) });
      const labComplete = position % 3 === 0;
      history.orders.push({ id: labId, ...scope, title: `${labTitle} · shift follow-up ${shiftIndex + 1}`, kind: 'lab', placed_at: time(2), status: labComplete ? 'completed' : position % 2 ? 'processing' : 'pending', result_id: labComplete ? labReportId : null,
        indication: `Synthetic shift reassessment for ${problem}`, requester: fromDoctor, source_system: 'VDoc', priority: patient.acuity === 'critical' ? 'urgent' : 'routine', version: 0, specimen: 'Blood', instructions: 'Synthetic fixture; receiving laboratory confirms collection requirements.' });
      if (labComplete) {
        state.reports.push({ id: labReportId, ...scope, order_id: labId, title: `${labTitle} · synthetic repeat`, kind: 'lab', findings: 'Synthetic repeat report using available baseline observations for demonstration. Not evidence of clinical improvement.', observations: structuredClone(baseline?.observations ?? []), source: 'MockLIS', reported_at: time(4), specimen_at: time(3), author: 'Synthetic laboratory team' });
        if (shiftIndex < 8) state.reviews[labReportId] = { at: time(5), actor: `${fromDoctor} · synthetic review` };
      }
      history.requests.push({ id: requestId, ...scope, from_department: department, to_department: toDepartment, reason: `Please review ${problem} and advise on ${position % 2 ? 'the documented gastrointestinal concern and medication context' : 'renal / cardiovascular findings before the next ward round'}. Synthetic coordination example.`,
        status: position % 3 === 0 ? 'completed' : position % 2 ? 'in_progress' : 'received', priority: position % 4 === 0 ? 'urgent' : 'routine', owner: `${toDepartment} receiving team`, requested_by: fromDoctor, requested_at: time(2.5), accepted_at: position % 2 || position % 3 === 0 ? time(3) : null,
        completed_at: position % 3 === 0 ? time(5) : null, response: position % 3 === 0 ? `Synthetic ${toDepartment} response: available history and reports reviewed. Requester to correlate findings at bedside and document the agreed plan; no automated treatment recommendation.` : null,
        reviewed_at: position % 3 === 0 && shiftIndex < 8 ? time(6) : null, source_ids: baseline ? [baseline.id] : [], source_system: 'VDoc', kind: position % 2 ? 'request' : 'referral', version: 0, contact: 'Synthetic ward desk · use the local directory' });
      if (position % 3 === 0) {
        const imagingComplete = position % 2 === 0;
        history.orders.push({ id: imagingId, ...scope, title: 'Chest X-ray · synthetic shift review', kind: 'imaging', placed_at: time(2), status: imagingComplete ? 'completed' : 'pending', result_id: imagingComplete ? imagingReportId : null, indication: `Synthetic imaging context for ${problem}; clinical appropriateness requires clinician validation.`, requester: fromDoctor, source_system: 'VDoc', priority: 'routine', version: 0, modality: 'X-ray' });
        if (imagingComplete) { state.reports.push({ id: imagingReportId, ...scope, order_id: imagingId, title: 'Chest X-ray · synthetic report', kind: 'imaging', findings: 'Synthetic report placeholder for handover demonstration. Compare with the existing patient imaging record; this is not a radiologist interpretation or a new clinical finding.', observations: [], source: 'MockRIS', reported_at: time(5), performed_at: time(4), author: 'Synthetic radiology team' });
          if (shiftIndex < 8) state.reviews[imagingReportId] = { at: time(6), actor: `${fromDoctor} · synthetic review` }; }
      }
      const entries = [{ id: noteIds[0], title: 'First ward round', at: time(1), kind: 'note' as const }, { id: noteIds[1], title: 'Follow-up ward round', at: time(6), kind: 'note' as const }, { id: labId, title: `Ordered ${labTitle}`, at: time(2), kind: 'result' as const }, { id: requestId, title: `${department} → ${toDepartment}`, at: time(2.5), kind: 'request' as const }];
      for (const entry of entries) history.timeline.push({ id: entry.id, ...scope, title: `${entry.title} · synthetic shift`, occurred_at: entry.at, available_at: entry.at, kind: entry.kind, source_id: entry.id, source_system: 'VDoc' });
      const sources = captureShift(state, patient.id, encounter.id, time(0), time(8), time(8));
      const status: Handover['status'] = shiftIndex < 6 ? 'received' : shiftIndex < 8 ? 'approved' : 'draft';
      const reviewed = status !== 'draft' || position < 7;
      state.handovers.push({ id: idFor(79, sequence), ...scope, shift_id: shiftId, shift_start: time(0), shift_end: time(8), shift_at: time(8), shift: ['Day', 'Evening', 'Night', 'Day'][slot], department,
        from_doctor: fromDoctor, to_doctor: toDoctor, status, captured_at: time(8), source_snapshot: sources, source_ids: sources.map(source => source.id), based_on_revision: input.revision, shift_reviewed: reviewed,
        sections: { situation: `${patient.name} · ${problem}. Recorded acuity: ${patient.acuity}. Synthetic handover, not clinically validated.`, background: `${history.context.history}\nAllergies: ${patient.allergies.join(', ') || 'Not documented'}`,
          recent_events: `Two ${department} ward rounds by ${fromDoctor}; ${labTitle} follow-up; ${toDepartment} coordination. See timestamped captured records for details.`, completed_actions: `Admission context and medication reconciliation reviewed in round one. Follow-up assessment documented in round two.${labComplete ? ' A synthetic repeat result is available.' : ''}`,
          pending_items: `${labComplete ? 'Correlate the available synthetic report with the bedside assessment.' : `Follow the ${labTitle} order through processing and result review.`} ${position % 3 ? `Await ${toDepartment} response.` : `Review the documented ${toDepartment} response.`}`,
          next_actions: reviewed ? `${toDoctor}: review outstanding results and specialist communications at the next round; document the agreed follow-up plan. Confirm any time-sensitive actions during verbal handover.` : '' },
        escalation: reviewed ? 'Synthetic instruction: for deterioration or an unresolved urgent concern, contact the responsible senior clinician via the ward escalation directory. Confirm patient-specific instructions verbally.' : '',
        created_at: time(7), updated_at: time(8), approved_at: status !== 'draft' ? time(8) : null, received_at: status === 'received' ? time(8) : null,
        readback: status === 'received' ? `Synthetic acknowledgement by ${toDoctor}: patient context, pending investigations and department requests discussed; responsibility for follow-up confirmed.` : undefined, version: 0 });
    }
  }
  state.commands.push(SHIFT_DEMO_MARKER); state.revision++;
  state.audit.push({ id: idFor(70, 1), at, actor: 'Synthetic shift fixture importer', action: 'shift.seed', patient_id: state.handovers.find(record => record.shift_id === idFor(71, 1))!.patient_id, entity_id: idFor(71, 1) });
  return workflowStateSchema.parse(state);
}
