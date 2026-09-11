import { workflowStateSchema, type Handover, type WorkflowCommand, type WorkflowState } from '../domain/workflow.js';
import { shiftRoster } from './shiftArchive.js';

type Source = NonNullable<Handover['source_snapshot']>[number];
type ShiftCommand = Extract<WorkflowCommand, { type: 'shift.create' | 'shift.refresh' | 'shift.approve' | 'shift.receive' }>;

export function captureShift(state: WorkflowState, patientId: string, encounterId: string, start: string, end: string, at: string): Source[] {
  const history = state.histories.find(history => history.context.patient_id === patientId)!;
  const through = end < at ? end : at;
  const inShift = (date: string) => date >= start && date < end && date <= at;
  const sources: Source[] = [];
  const encounter = history.encounters.find(encounter => encounter.id === encounterId)!;
  const patient = state.patients.find(patient => patient.id === patientId)!;
  sources.push({ id: encounter.id, type: 'encounter', title: 'Encounter and patient context', body: `${encounter.status} · ${encounter.location}\n${encounter.assessment}\nRecorded acuity: ${patient.acuity}\nAllergies: ${patient.allergies.join(', ') || 'Not documented'}`, author: encounter.owner, at: encounter.started_at, scope: 'carry_forward' });
  const add = (id: string, type: string, title: string, body: string, author: string, date: string, carry = false) => {
    if (date > at || (!inShift(date) && !carry)) return;
    sources.push({ id, type, title, body, author, at: date, scope: inShift(date) ? 'shift' : 'carry_forward' });
  };
  const notes = history.notes.filter(note => note.encounter_id === encounterId && note.kind !== 'handover');
  const previous = [...notes].filter(note => note.recorded_at <= at && !inShift(note.recorded_at)).sort((first, second) => second.recorded_at.localeCompare(first.recorded_at)).slice(0, 2);
  for (const note of notes) add(note.id, 'note', note.title, note.body, note.author, note.recorded_at, previous.some(item => item.id === note.id));
  for (const order of history.orders.filter(order => order.encounter_id === encounterId)) add(order.id, 'order', order.title,
    `${order.status} · ${order.priority}\n${order.indication}\n${order.site ?? ''} ${order.instructions ?? ''}`, order.requester, order.placed_at, ['pending', 'processing'].includes(order.status));
  for (const report of state.reports.filter(report => report.patient_id === patientId && report.encounter_id === encounterId)) add(report.id, 'report', report.title,
    `${report.findings}\n${report.observations.map(value => `${value.name}: ${value.value} ${value.unit} (${value.flag}; ref ${value.reference})`).join('\n')}\n${state.reviews[report.id] ? `Reviewed by ${state.reviews[report.id].actor}` : 'Not reviewed'}`, report.author ?? report.source, report.reported_at, !state.reviews[report.id]);
  for (const request of history.requests.filter(request => request.encounter_id === encounterId)) add(request.id, 'request', `${request.from_department} → ${request.to_department}`,
    `${request.status} · ${request.priority} · Owner: ${request.owner}\n${request.reason}\nResponse: ${request.response ?? 'Pending'}${request.response && !request.reviewed_at ? '\nResponse not reviewed' : ''}`, request.requested_by ?? request.owner,
    request.completed_at ?? request.accepted_at ?? request.requested_at, !['completed', 'cancelled'].includes(request.status) || (request.status === 'completed' && !request.reviewed_at));
  for (const medication of history.medications.filter(item => item.encounter_id === encounterId)) add(medication.id, 'medication', medication.name,
    `${medication.dose} · ${medication.route} · ${medication.frequency} · ${medication.status}\n${medication.reason}`, medication.author, medication.recorded_at, medication.status !== 'historical');
  const vitals = history.vitals.filter(item => item.encounter_id === encounterId && item.recorded_at <= through).sort((first, second) => second.recorded_at.localeCompare(first.recorded_at));
  for (const vital of vitals) add(vital.id, 'vital', 'Recorded observations', `BP ${vital.systolic}/${vital.diastolic} · Pulse ${vital.pulse} · RR ${vital.respiratory_rate} · SpO₂ ${vital.spo2}% (${vital.oxygen_context}) · Temp ${vital.temperature_c}°C`, vital.source_system, vital.recorded_at, vital.id === vitals[0]?.id);
  for (const task of history.work_items.filter(item => item.encounter_id === encounterId && item.status === 'pending')) add(task.id, 'work_item', task.title, `Owner: ${task.owner} · Due: ${task.due_at}`, task.owner, task.created_at, true);
  for (const discharge of state.discharges.filter(record => record.patient_id === patientId && record.encounter_id === encounterId)) add(discharge.id, 'discharge', 'Discharge process',
    `${discharge.status} · Owner: ${discharge.owner}\n${discharge.summary}\nClearance: ${discharge.clinical_clearance ? discharge.clearance_note : 'Not approved'}\nDocuments checked: ${discharge.documents_checked}`, discharge.owner, discharge.updated_at, !['discharged', 'cancelled'].includes(discharge.status));
  return sources.sort((first, second) => second.at.localeCompare(first.at) || first.id.localeCompare(second.id));
}

export function shiftChanged(state: WorkflowState, record: Handover, at = new Date().toISOString()) {
  return Boolean(record.shift_id && JSON.stringify(record.source_snapshot) !== JSON.stringify(captureShift(state, record.patient_id, record.encounter_id, record.shift_start!, record.shift_end!, at)));
}

export function applyShiftCommand(input: WorkflowState, command: ShiftCommand): WorkflowState {
  if (input.commands.includes(command.id)) return input;
  const state = structuredClone(input);
  let records: Handover[];
  if (command.type === 'shift.create') {
    if (command.starts_at >= command.ends_at || command.starts_at > command.at) throw new Error('Choose a shift that has started and ends after its start.');
    if (new Date(command.ends_at).getTime() - new Date(command.starts_at).getTime() > 24 * 60 * 60 * 1000) throw new Error('A shift cannot exceed 24 hours.');
    if (new Set(command.patient_ids).size !== command.patient_ids.length || command.patient_id !== command.patient_ids[0]) throw new Error('Choose distinct patients and a matching primary patient.');
    if (state.handovers.some(record => record.shift_id && record.from_doctor === command.actor && record.shift_start === command.starts_at && record.shift_end === command.ends_at && record.department === command.department)) throw new Error('This doctor already has a packet for this shift.');
    records = command.patient_ids.map((patientId, index) => {
      const patient = state.patients.find(patient => patient.id === patientId && patient.hospital_id === state.hospital_id);
      const history = state.histories.find(history => history.context.patient_id === patientId && history.context.hospital_id === state.hospital_id);
      const encounter = history?.encounters.find(encounter => encounter.kind === 'IPD' && encounter.status === 'active');
      if (!patient || !history || !encounter || encounter.started_at >= command.ends_at || !shiftRoster(state, command.department).some(patient => patient.id === patientId)) throw new Error('Each patient needs an active IPD encounter and must belong to the department or have an open incoming referral/request.');
      const sources = captureShift(state, patientId, encounter.id, command.starts_at, command.ends_at, command.at);
      return { id: `${command.id.slice(0, 24)}${(index + 1).toString(16).padStart(12, '0')}`, shift_id: command.id, hospital_id: state.hospital_id, patient_id: patientId, encounter_id: encounter.id,
        from_doctor: command.actor, to_doctor: command.to_doctor, shift: command.shift, shift_at: command.ends_at, shift_start: command.starts_at, shift_end: command.ends_at, department: command.department,
        status: 'draft', shift_reviewed: false, escalation: '', captured_at: command.at, source_snapshot: sources,
        sections: { situation: `${patient.name} · Recorded acuity: ${patient.acuity}\n${history.context.presenting_complaint}`, background: `${history.context.history}\nAllergies: ${patient.allergies.join(', ') || 'Not documented'}`,
          recent_events: sources.filter(source => source.scope === 'shift').map(source => `${source.title} · ${source.author} · ${source.at}`).join('\n'),
          completed_actions: sources.filter(source => source.type === 'note' && source.scope === 'shift').map(source => `${source.title}: ${source.body}`).join('\n'),
          pending_items: sources.filter(source => source.type === 'work_item' || (source.type === 'order' && /^(pending|processing)/.test(source.body)) || (source.type === 'request' && (/^(received|accepted|in_progress)/.test(source.body) || source.body.includes('Response not reviewed'))) || (source.type === 'report' && source.body.endsWith('Not reviewed'))).map(source => `${source.title}: ${source.body}`).join('\n'), next_actions: '' },
        source_ids: sources.map(source => source.id), based_on_revision: state.revision, created_at: command.at, updated_at: command.at, approved_at: null, received_at: null, version: 0 };
    });
    state.handovers.push(...records);
  } else {
    if (command.expected_revision !== state.revision) throw new Error('The chart changed. Reload the shift before continuing.');
    records = state.handovers.filter(record => record.shift_id === command.shift_id && record.hospital_id === state.hospital_id);
    if (!records.length || !records.some(record => record.patient_id === command.patient_id)) throw new Error('Shift packet not found.');
    for (const record of records) {
      if (command.type === 'shift.receive') {
        if (record.status !== 'approved' || record.to_doctor !== command.actor) throw new Error('Only the named incoming doctor can acknowledge an approved packet.');
        record.status = 'received'; record.received_at = command.at; record.readback = command.readback;
      } else {
        if (record.status !== 'draft' || record.from_doctor !== command.actor) throw new Error('Only the outgoing doctor can change this draft packet.');
        if (command.type === 'shift.refresh') {
          record.source_snapshot = captureShift(state, record.patient_id, record.encounter_id, record.shift_start!, record.shift_end!, command.at);
          record.source_ids = record.source_snapshot.map(source => source.id); record.captured_at = command.at; record.shift_reviewed = false; record.based_on_revision = state.revision;
        } else {
          if (record.shift_end! > command.at) throw new Error('The shift has not ended. Save drafts now and approve after the shift ends.');
          if (shiftChanged(state, record, command.at)) throw new Error('Patient records changed. Refresh sources and review each patient again.');
          if (!record.shift_reviewed || !record.sections.situation.trim() || !record.sections.next_actions.trim() || !record.escalation?.trim()) throw new Error('Review every patient and document next actions and escalation instructions before approving.');
          record.status = 'approved'; record.approved_at = command.at;
        }
      }
      record.version++; record.updated_at = command.at;
    }
  }
  for (const record of records) {
    const history = state.histories.find(history => history.context.patient_id === record.patient_id)!;
    const id = `${command.id.slice(0, 24)}${(records.indexOf(record) + 1).toString(16).padStart(12, '0')}`;
    history.timeline.unshift({ id, patient_id: record.patient_id, hospital_id: state.hospital_id, encounter_id: record.encounter_id, kind: 'note', title: `${command.type} · ${command.actor}`, occurred_at: command.at, available_at: command.at, source_id: record.id, source_system: 'VDoc' });
    state.audit.push({ id, at: command.at, actor: command.actor, action: command.type, patient_id: record.patient_id, entity_id: record.id });
  }
  state.commands.push(command.id); state.revision++;
  return workflowStateSchema.parse(state);
}
