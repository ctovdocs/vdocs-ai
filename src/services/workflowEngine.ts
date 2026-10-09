import { workflowStateSchema, commandSchema, type WorkflowState, type WorkflowCommand, type Discharge } from '../domain/workflow.js';
import type { Patient, Report } from '../domain/models';
import type { PatientHistory } from '../domain/longitudinal';
import { buildExpansionWorkflow } from '../data/expansionWorkflow.js';
import { orderCatalog, referralDepartments } from '../data/orderCatalog.js';
import { applyShiftCommand, shiftChanged } from './shiftHandover.js';
import { seedShiftDemo, seedShiftEntries } from '../data/shiftDemo.js';
import { doctorUpdates } from './doctorUpdates.js';
import { owners } from '../data/cohort.js';
import { seedLabTrends } from '../data/labTrendDemo.js';
import { dischargeSummaryText, summarySignGaps } from '../domain/dischargeSummary.js';

export function initialWorkflowState(hospitalId: string, patients: Patient[], reports: Report[], histories: PatientHistory[]): WorkflowState {
  const state = workflowStateSchema.parse({ schema_version: 1, hospital_id: hospitalId, revision: 0,
    patients, reports, histories, discharges: [], handovers: [], reviews: {}, commands: [], audit: [] });
  for (const history of state.histories) {
    const current = history.encounters.find(encounter => encounter.status === 'active');
    for (const encounter of history.encounters) {
      if (encounter.kind !== 'IPD') continue;
      const discharged = encounter.status === 'completed';
      if (!discharged) continue;
      const record = makeDischarge(encounter.id.replace(/^.{8}/, '00000060'), history, encounter.id, encounter.owner, encounter.ended_at ?? encounter.started_at);
      if (discharged) Object.assign(record, { status: 'discharged', discharged_at: encounter.ended_at, clinical_clearance: true,
        clearance_note: 'Historical discharge record', summary: history.notes.find(note => note.kind === 'discharge' && note.encounter_id === encounter.id)?.body ?? encounter.assessment,
        medications_checked: true, documents_checked: true, follow_up_checked: true });
      state.discharges.push(record);
    }
    for (const report of reports.filter(report => report.patient_id === history.context.patient_id && report.encounter_id !== current?.id)) {
      state.reviews[report.id] = { at: report.reported_at, actor: 'Historical review fixture' };
    }
  }
  const expansion = buildExpansionWorkflow(patients, reports, histories);
  const overrides = new Map(expansion.histories.map(history => [history.context.patient_id, history]));
  state.histories = state.histories.map(history => overrides.get(history.context.patient_id) ?? history);
  const discharges = new Map(state.discharges.map(record => [record.id, record]));
  for (const record of expansion.discharges) discharges.set(record.id, record);
  state.discharges = [...discharges.values()];
  Object.assign(state.reviews, expansion.reviews);
  return state;
}

function makeDischarge(id: string, history: PatientHistory, encounterId: string, owner: string, at: string): Discharge {
  return { id, hospital_id: history.context.hospital_id, patient_id: history.context.patient_id, encounter_id: encounterId,
    owner, priority: 'routine', target_date: at.slice(0, 10), status: 'planned', summary: '', clinical_clearance: false,
    clearance_note: '', medications_checked: false, follow_up_checked: false, documents_checked: false,
    created_at: at, updated_at: at, discharged_at: null, version: 0 };
}

export function dischargeBlockers(state: WorkflowState, record: Discharge) {
  const history = state.histories.find(item => item.context.patient_id === record.patient_id)!;
  const same = (item: { encounter_id: string }) => item.encounter_id === record.encounter_id;
  return [
    ...history.orders.filter(item => same(item) && ['pending', 'processing'].includes(item.status)).map(item => `Investigation pending: ${item.title}`),
    ...history.requests.filter(item => same(item) && !['completed', 'cancelled'].includes(item.status)).map(item => `Request pending: ${item.to_department}`),
    ...history.requests.filter(item => same(item) && item.status === 'completed' && !item.reviewed_at).map(item => `Response not reviewed: ${item.to_department}`),
    ...state.reports.filter(item => item.patient_id === record.patient_id && item.encounter_id === record.encounter_id && !state.reviews[item.id]).map(item => `Result not reviewed: ${item.title}`),
    ...history.work_items.filter(item => same(item) && item.kind === 'review' && item.status === 'pending').map(item => item.title),
    ...(!record.clinical_clearance || !record.clearance_note.trim() ? ['Clinical clearance and rationale required'] : []),
    ...(!record.summary.trim() ? ['Discharge summary required'] : []),
    ...(!record.medications_checked ? ['Medication reconciliation required'] : []),
    ...(!record.follow_up_checked ? ['Follow-up instructions required'] : []),
    ...(!record.documents_checked ? ['Documents not checked'] : []),
  ];
}

export function applyWorkflowCommand(input: WorkflowState, rawCommand: WorkflowCommand): WorkflowState {
  const command = commandSchema.parse(rawCommand);
  if (command.type === 'labs.seed') {
    if (!input.patients.some(patient => patient.id === command.patient_id && patient.hospital_id === input.hospital_id)) throw new Error('Patient outside hospital scope.');
    return seedLabTrends(input, command.at, command.actor);
  }
  if (command.type === 'shift.seed') {
    if (!input.patients.some(patient => patient.id === command.patient_id && patient.hospital_id === input.hospital_id)) throw new Error('Patient outside hospital scope.');
    return seedShiftDemo(input, command.at);
  }
  if (command.type === 'shift.seed_entries') {
    if (!input.handovers.some(record => record.shift_id === command.shift_id && record.hospital_id === input.hospital_id)) throw new Error('Shift not found.');
    return seedShiftEntries(input, command.shift_id);
  }
  if (command.type === 'shift.create' || command.type === 'shift.entry' || command.type === 'shift.refresh' || command.type === 'shift.approve' || command.type === 'shift.receive') return applyShiftCommand(input, command);
  if (input.commands.includes(command.id)) return input;
  if (command.type === 'updates.read') {
    const updates = doctorUpdates(input, command.actor);
    const valid = new Set(updates.map(update => update.id));
    if (command.update_ids.some(id => !valid.has(id))) throw new Error('An update changed or is outside this doctor’s inbox. Refresh and try again.');
    if (updates.find(update => update.id === command.update_ids[0])?.patient_id !== command.patient_id) throw new Error('Update patient does not match.');
    const state = structuredClone(input);
    state.update_receipts ??= {};
    const receipts = state.update_receipts[command.actor] ??= {};
    for (const id of command.update_ids) { if (command.read) receipts[id] = command.at; else delete receipts[id]; }
    state.revision++; state.commands.push(command.id);
    state.audit.push({ id: command.id, at: command.at, actor: command.actor, action: command.type, patient_id: command.patient_id, entity_id: command.update_ids[0] });
    return workflowStateSchema.parse(state);
  }
  if (command.type === 'patient.register') {
    const owner = owners[command.department];
    if (!owner) throw new Error('Unknown department.');
    const state = structuredClone(input);
    const dob = `${new Date(command.at).getUTCFullYear() - command.age}-01-01`;
    state.patients.push({ id: command.patient_id, hospital_id: state.hospital_id, uhid: command.uhid, name: command.name,
      age: command.age, sex: command.sex, department: command.department, encounter: `${command.kind} · ${command.location}`,
      conditions: [], allergies: [], medications: [], acuity: 'noncritical', visit_count: 1 });
    state.histories.push({
      context: { id: command.id, hospital_id: state.hospital_id, patient_id: command.patient_id, dob,
        occupation: 'Not recorded', preferred_language: 'Not recorded', social_context: 'Not recorded',
        history: 'First visit to this hospital; no prior records available.', presenting_complaint: command.reason,
        acuity: 'noncritical', acuity_reason: 'Newly registered; not yet triaged.', acuity_assessed_at: command.at, acuity_source_ids: [],
        previous_records_status: 'first_hospital_visit', current_encounter_id: command.encounter_id,
        clinician_review_status: 'not_reviewed', synthetic: true, scenario_version: 'mockhis-walkin-v1', family_history: null },
      encounters: [{ id: command.encounter_id, hospital_id: state.hospital_id, patient_id: command.patient_id, department: command.department,
        kind: command.kind, started_at: command.at, ended_at: null, status: 'active', location: command.location, owner,
        reason: command.reason, assessment: 'Pending clinical assessment.', source_system: 'MockHIS' }],
      notes: [], vitals: [], medications: [], orders: [], requests: [], work_items: [],
      timeline: [{ id: command.encounter_id, hospital_id: state.hospital_id, patient_id: command.patient_id, encounter_id: command.encounter_id,
        occurred_at: command.at, available_at: command.at, kind: 'encounter', title: `${command.kind}: ${command.reason}`, source_id: command.encounter_id, source_system: 'MockHIS' }],
      immunizations: [],
    });
    state.revision++; state.commands.push(command.id);
    state.audit.push({ id: command.id, at: command.at, actor: command.actor, action: command.type, patient_id: command.patient_id, entity_id: command.patient_id });
    return workflowStateSchema.parse(state);
  }
  const state = structuredClone(input);
  const patient = state.patients.find(item => item.id === command.patient_id && item.hospital_id === state.hospital_id);
  const history = state.histories.find(item => item.context.patient_id === command.patient_id && item.context.hospital_id === state.hospital_id);
  if (!patient || !history) throw new Error('Patient record not found in this hospital.');
  const active = history.encounters.find(item => item.status === 'active');
  let entityId: string = command.id;
  let encounterId = active?.id ?? history.context.current_encounter_id;
  const requireActive = (ipd = false) => {
    if (!active || (ipd && active.kind !== 'IPD')) throw new Error(ipd ? 'An active IPD encounter is required.' : 'An active encounter is required.');
    return active;
  };
  const expectVersion = (record: { version: number } | undefined) => {
    if (!record) throw new Error('Record not found.');
    if ('expected_version' in command && record.version !== command.expected_version) throw new Error('This record changed. Refresh and review the latest version.');
  };
  const addNote = (title: string, body: string, kind: PatientHistory['notes'][number]['kind'], sourceIds: string[] = []) => {
    const id = `${command.id.slice(0, -1)}${command.id.endsWith('f') ? 'e' : 'f'}`;
    history.notes.push({ id, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounterId,
      kind, title, body, source_ids: sourceIds.filter(source => /^[0-9a-f-]{36}$/i.test(source)), source_system: 'VDoc', author: command.actor, recorded_at: command.at });
    return id;
  };
  switch (command.type) {
    case 'discharge.create': {
      const encounter = requireActive(true);
      if (state.discharges.some(item => item.encounter_id === encounter.id && item.status !== 'cancelled')) throw new Error('This encounter is already on the discharge list.');
      state.discharges.push(makeDischarge(command.id, history, encounter.id, command.actor, command.at));
      addNote('Discharge planning started', 'Patient added to the persistent working list. Clinical readiness is not yet approved.', 'progress');
      break;
    }
    case 'discharge.update': {
      const record = state.discharges.find(item => item.id === command.entity_id && item.patient_id === patient.id);
      expectVersion(record);
      if (!record || ['discharged', 'cancelled'].includes(record.status)) throw new Error('This discharge record is closed.');
      if (requireActive(true).id !== record.encounter_id) throw new Error('This discharge belongs to a different encounter.');
      const previous = record.status;
      Object.assign(record, command.fields);
      const status = command.status ?? record.status;
      if (status === 'discharged' && previous !== 'ready') throw new Error('Save clinical readiness before completing discharge.');
      if (status === 'discharged' && record.summary_doc?.status !== 'signed') throw new Error('The discharge summary must be signed by a doctor before completing discharge.');
      if (['ready', 'discharged'].includes(status)) {
        const blockers = dischargeBlockers(state, record);
        if (blockers.length) throw new Error(`Discharge still needs attention: ${blockers.join('; ')}`);
      }
      record.status = status; record.version++; record.updated_at = command.at; entityId = record.id;
      if (status === 'discharged') {
        record.discharged_at = command.at;
        const encounter = history.encounters.find(item => item.id === record.encounter_id)!;
        encounter.status = 'completed'; encounter.ended_at = command.at;
        patient.encounter = `Discharged · ${encounter.location}`;
        history.work_items.filter(item => item.encounter_id === encounter.id && item.kind === 'discharge').forEach(item => { item.status = 'completed'; item.completed_at = command.at; });
        addNote('Discharge completed', record.summary, 'discharge');
      } else addNote(`Discharge: ${status}`, record.clearance_note || 'Working-list status updated.', 'progress');
      break;
    }
    case 'discharge.summary.save': {
      const record = state.discharges.find(item => item.id === command.entity_id && item.patient_id === patient.id);
      expectVersion(record);
      if (!record || ['discharged', 'cancelled'].includes(record.status)) throw new Error('This discharge record is closed.');
      if (requireActive(true).id !== record.encounter_id) throw new Error('This discharge belongs to a different encounter.');
      const previous = record.summary_doc;
      const edits = [...(previous?.edits ?? []), { at: command.at, by: command.actor, role: command.role, note: command.note ?? (previous?.status === 'signed' ? 'Edited after sign-off; signature cleared' : 'Saved') }].slice(-40);
      // Any edit returns the document to draft: a doctor must sign the final wording.
      record.summary_doc = { ...command.doc, status: 'draft', signed_by: null, signed_qualification: null, signed_reg_no: null, signed_at: null,
        prepared_by: previous?.prepared_by ?? command.doc.prepared_by, prepared_role: previous?.prepared_role ?? command.doc.prepared_role, edits };
      record.summary = dischargeSummaryText(record.summary_doc);
      record.version++; record.updated_at = command.at; entityId = record.id;
      break;
    }
    case 'discharge.summary.sign': {
      const record = state.discharges.find(item => item.id === command.entity_id && item.patient_id === patient.id);
      expectVersion(record);
      if (!record || ['discharged', 'cancelled'].includes(record.status)) throw new Error('This discharge record is closed.');
      if (command.role !== 'doctor') throw new Error('Only a doctor can sign off the discharge summary.');
      if (!record.summary_doc) throw new Error('Save the discharge summary before signing.');
      const gaps = summarySignGaps(record.summary_doc);
      if (gaps.length) throw new Error(`The summary is incomplete: ${gaps.join(', ')}.`);
      record.summary_doc = { ...record.summary_doc, status: 'signed', signed_by: command.actor, signed_qualification: command.qualification, signed_reg_no: command.reg_no, signed_at: command.at,
        edits: [...record.summary_doc.edits, { at: command.at, by: command.actor, role: 'doctor' as const, note: 'Signed off' }].slice(-40) };
      record.version++; record.updated_at = command.at; entityId = record.id;
      addNote('Discharge summary signed', `Signed by ${command.actor} (${command.qualification}, Reg. ${command.reg_no}).`, 'progress');
      break;
    }
    case 'order.place': {
      const encounter = requireActive();
      const titles = new Set<string>();
      for (const [index, item] of command.items.entries()) {
        const catalog = item.catalog_id ? orderCatalog.find(entry => entry.id === item.catalog_id && entry.kind === command.kind) : undefined;
        if (item.catalog_id && (!catalog || catalog.title !== item.title)) throw new Error('Unknown or mismatched catalog item.');
        if (!catalog && !(command.kind === 'lab' ? item.specimen : item.modality)?.trim()) throw new Error('Custom orders require a specimen or imaging modality.');
        const normalized = item.title.toLowerCase();
        if (titles.has(normalized) || history.orders.some(order => order.encounter_id === encounter.id && order.kind === command.kind && ['pending', 'processing'].includes(order.status) && order.title.toLowerCase() === normalized)) throw new Error(`Already ordered: ${item.title}. Remove the duplicate before submitting.`);
        titles.add(normalized);
        const id = `${command.id.slice(0, 24)}${(index + 1).toString(16).padStart(12, '0')}`;
        history.orders.push({ ...item, id, batch_id: command.id, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounter.id,
          kind: command.kind, specimen: catalog?.specimen ?? item.specimen, modality: catalog?.modality ?? item.modality,
          indication: command.indication, priority: command.priority, requester: command.actor, status: 'pending', result_id: null, placed_at: command.at, source_system: 'VDoc', version: 0 });
        history.timeline.unshift({ id, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounter.id,
          occurred_at: command.at, available_at: command.at, kind: 'result', title: `Ordered: ${item.title}`, source_id: id, source_system: 'VDoc' });
        if (index === 0) entityId = id;
      }
      break;
    }
    case 'order.create': {
      const encounter = requireActive();
      if (history.orders.some(item => item.encounter_id === encounter.id && item.kind === command.kind && ['pending', 'processing'].includes(item.status) && item.title.toLowerCase() === command.title.toLowerCase())) throw new Error('An active order for this investigation already exists.');
      history.orders.push({ id: command.id, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounter.id,
        title: command.title, kind: command.kind, indication: command.indication, priority: command.priority, requester: command.actor,
        status: 'pending', result_id: null, placed_at: command.at, source_system: 'VDoc', version: 0 });
      break;
    }
    case 'order.status': {
      const order = history.orders.find(item => item.id === command.entity_id);
      expectVersion(order);
      if (!order || !['pending', 'processing'].includes(order.status)) throw new Error('Only an open order can be updated.');
      if (command.status === 'cancelled' && !command.reason?.trim()) throw new Error('A cancellation reason is required.');
      order.status = command.status; order.cancellation_reason = command.reason; order.version++; entityId = order.id; encounterId = order.encounter_id;
      break;
    }
    case 'order.publish': {
      const order = history.orders.find(item => item.id === command.entity_id);
      expectVersion(order);
      if (!order || !['pending', 'processing'].includes(order.status)) throw new Error('This order is already completed or cancelled.');
      if (command.performed_at < order.placed_at || command.performed_at > command.at) throw new Error('Collection/study time must fall between order placement and publication.');
      if (order.kind === 'lab' && !command.observations.length) throw new Error('A laboratory report needs at least one result.');
      const names = new Set<string>();
      for (const observation of command.observations) {
        if (!observation.name.trim() || !observation.value.trim() || names.has(observation.name.toLowerCase())) throw new Error('Results require unique test names and a value.');
        names.add(observation.name.toLowerCase());
      }
      const report: Report = { id: command.id, patient_id: patient.id, hospital_id: state.hospital_id, encounter_id: order.encounter_id, order_id: order.id,
        title: order.title, kind: order.kind, findings: command.findings, observations: order.kind === 'lab' ? command.observations : [],
        source: order.kind === 'lab' ? 'MockLIS' : 'MockRIS', reported_at: command.at, author: command.actor, indication: order.indication,
        ...(order.kind === 'lab' ? { specimen_at: command.performed_at } : { performed_at: command.performed_at }) };
      state.reports.unshift(report);
      state.reports.sort((first, second) => second.reported_at.localeCompare(first.reported_at));
      order.result_id = report.id; order.status = 'completed'; order.version++; encounterId = order.encounter_id;
      break;
    }
    case 'report.review': {
      const report = state.reports.find(item => item.id === command.entity_id && item.patient_id === patient.id);
      if (!report) throw new Error('Report not found.');
      state.reviews[report.id] = { at: command.at, actor: command.actor }; entityId = report.id; encounterId = report.encounter_id ?? encounterId;
      break;
    }
    case 'request.create': {
      requireActive();
      if (command.to_department === patient.department) throw new Error('Choose a receiving department different from the primary department.');
      if (!referralDepartments.includes(command.to_department)) throw new Error('Unknown department.');
      if (command.source_ids.some(id => !state.reports.some(report => report.id === id && report.patient_id === patient.id))) throw new Error('Attached sources must belong to this patient.');
      if (history.requests.some(request => request.encounter_id === encounterId && request.kind === command.kind && request.to_department === command.to_department && !['completed', 'cancelled'].includes(request.status) && request.reason.trim().toLowerCase() === command.reason.toLowerCase())) throw new Error('An identical open request already exists.');
      history.requests.push({ id: command.id, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounterId,
        requested_by: command.actor, request_type: command.request_type, contact: command.contact,
        from_department: patient.department, to_department: command.to_department, reason: command.reason, kind: command.kind, owner: command.owner,
        priority: command.priority, status: 'received', requested_at: command.at, accepted_at: null, completed_at: null, response: null,
        source_ids: command.source_ids, source_system: 'VDoc', version: 0, reviewed_at: null });
      break;
    }
    case 'request.update': {
      const request = history.requests.find(item => item.id === command.entity_id);
      expectVersion(request);
      if (!request || ['completed', 'cancelled'].includes(request.status)) throw new Error('This request is closed.');
      const sequence = ['received', 'accepted', 'in_progress', 'completed'];
      const next = command.status ?? request.status;
      if (next !== request.status && next !== 'cancelled' && sequence.indexOf(next) !== sequence.indexOf(request.status) + 1) throw new Error('Move the request through accepted and in-progress before completion.');
      if (next === 'cancelled' && !command.reason?.trim()) throw new Error('A cancellation reason is required.');
      if (next === 'completed' && !command.response?.trim()) throw new Error('A specialist response is required to complete this request.');
      request.owner = command.owner; request.priority = command.priority; request.status = next; request.version++;
      if (command.response !== undefined) request.response_draft = command.response.trim();
      if (next === 'accepted') request.accepted_at = command.at;
      if (next === 'completed') { request.completed_at = command.at; request.response = command.response!.trim(); }
      if (next === 'cancelled') request.cancellation_reason = command.reason;
      entityId = request.id; encounterId = request.encounter_id;
      addNote(`Department request: ${next}`, request.response ?? command.reason ?? `${request.to_department} · ${request.owner}`, 'progress', [request.id]);
      break;
    }
    case 'request.review': {
      const request = history.requests.find(item => item.id === command.entity_id);
      expectVersion(request);
      if (!request || request.status !== 'completed') throw new Error('Only a completed response can be reviewed.');
      request.reviewed_at = command.at; request.version++; entityId = request.id; encounterId = request.encounter_id; break;
    }
    case 'work.complete': {
      const work = history.work_items.find(item => item.id === command.entity_id);
      if (!work) throw new Error('Work item not found.');
      if (work.kind === 'discharge') throw new Error('Complete discharge through the discharge checklist, not a task shortcut.');
      work.status = 'completed'; work.completed_at = command.at; entityId = work.id; encounterId = work.encounter_id; break;
    }
    case 'note.create': {
      requireActive(); entityId = addNote('Doctor clinical note', command.body, 'progress'); break;
    }
    case 'round.create': {
      requireActive(true); entityId = addNote('Ward round', `Findings: ${command.findings}\nPlan: ${command.plan}`, 'progress'); break;
    }
    case 'handover.create': {
      requireActive(true);
      const pending = history.orders.filter(item => item.encounter_id === encounterId && ['pending', 'processing'].includes(item.status));
      const requests = history.requests.filter(item => item.encounter_id === encounterId && !['completed', 'cancelled'].includes(item.status));
      const recentReports = state.reports.filter(item => item.patient_id === patient.id && item.encounter_id === encounterId);
      const completed = history.requests.filter(item => item.encounter_id === encounterId && item.status === 'completed');
      const work = history.work_items.filter(item => item.encounter_id === encounterId && item.status === 'pending');
      const latestNotes = history.notes.filter(item => item.encounter_id === encounterId && item.kind !== 'handover').sort((first, second) => second.recorded_at.localeCompare(first.recorded_at)).slice(0, 3);
      state.handovers.push({ id: command.id, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounterId,
        from_doctor: command.actor, to_doctor: command.to_doctor, shift: command.shift, shift_at: command.shift_at, status: 'draft',
        sections: { situation: history.context.presenting_complaint, background: history.context.history,
          recent_events: [...recentReports.map(report => `${report.title} · ${report.reported_at}`), ...latestNotes.map(note => `${note.title}: ${note.body}`)].join('\n'),
          completed_actions: completed.map(item => `${item.to_department}: ${item.response}`).join('\n'),
          pending_items: [...pending.map(item => item.title), ...requests.map(item => `${item.to_department}: ${item.reason}`), ...work.map(item => item.title), ...recentReports.filter(report => !state.reviews[report.id]).map(report => `Result to review: ${report.title}`), ...completed.filter(item => !item.reviewed_at).map(item => `Response to review: ${item.to_department}`)].join('\n'),
          next_actions: '' },
        source_ids: [history.context.id, ...recentReports.map(item => item.id), ...pending.map(item => item.id), ...requests.map(item => item.id), ...completed.map(item => item.id), ...work.map(item => item.id), ...latestNotes.map(item => item.id)],
        based_on_revision: input.revision, created_at: command.at, updated_at: command.at, approved_at: null, received_at: null, version: 0 });
      break;
    }
    case 'handover.save': {
      const handover = state.handovers.find(item => item.id === command.entity_id && item.patient_id === patient.id);
      expectVersion(handover);
      if (!handover || handover.status !== 'draft') throw new Error('An approved handover cannot be edited. Create a new handover instead.');
      if (handover.shift_id && (command.actor !== handover.from_doctor || command.to_doctor !== handover.to_doctor || command.shift !== handover.shift || command.shift_at !== handover.shift_at)) throw new Error('Shift ownership and dates cannot be changed from the patient editor.');
      if (handover.shift_id && command.shift_reviewed && shiftChanged(state, handover, command.at)) throw new Error('Refresh the packet sources before marking this patient reviewed.');
      requireActive(true);
      Object.assign(handover, { sections: command.sections, to_doctor: command.to_doctor, shift: command.shift, shift_at: command.shift_at, updated_at: command.at });
      if (handover.shift_id) { handover.escalation = command.escalation ?? handover.escalation; handover.shift_reviewed = command.shift_reviewed ?? false; }
      handover.version++; entityId = handover.id; break;
    }
    case 'handover.approve': {
      const handover = state.handovers.find(item => item.id === command.entity_id && item.patient_id === patient.id);
      expectVersion(handover); requireActive(true);
      if (!handover || handover.status !== 'draft') throw new Error('Only a draft can be approved.');
      if (handover.shift_id) throw new Error('Approve the complete shift packet instead.');
      if (!handover.sections.situation.trim() || !handover.sections.next_actions.trim()) throw new Error('Situation and next actions must be reviewed and completed.');
      handover.status = 'approved'; handover.approved_at = command.at; handover.updated_at = command.at; handover.version++; entityId = handover.id;
      addNote(`Approved handover to ${handover.to_doctor}`, Object.entries(handover.sections).map(([key, value]) => `${key.replaceAll('_', ' ')}: ${value}`).join('\n'), 'handover', handover.source_ids);
      break;
    }
    case 'handover.receive': {
      const handover = state.handovers.find(item => item.id === command.entity_id && item.patient_id === patient.id);
      expectVersion(handover);
      if (!handover || handover.status !== 'approved') throw new Error('Only an approved handover can be received.');
      if (handover.shift_id) throw new Error('Acknowledge the complete shift packet instead.');
      if (command.actor !== handover.to_doctor) throw new Error('Acknowledge as the named receiving doctor.');
      handover.status = 'received'; handover.received_at = command.at; handover.updated_at = command.at; handover.version++; entityId = handover.id; encounterId = handover.encounter_id; break;
    }
  }
  for (const record of state.discharges.filter(item => item.patient_id === patient.id && item.status === 'ready')) {
    if (dischargeBlockers(state, record).length) {
      record.status = 'in_progress'; record.updated_at = command.at; record.version++;
    }
  }
  history.timeline.unshift({ id: command.id, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounterId,
    occurred_at: command.at, available_at: command.at, kind: command.type.startsWith('order') || command.type === 'report.review' ? 'result' : command.type.startsWith('request') ? 'request' : command.type === 'work.complete' ? 'task' : 'note',
    title: `${command.type.replaceAll('.', ' · ')} — ${command.actor}`, source_id: entityId, source_system: command.type === 'order.publish' ? (history.orders.find(item => item.id === command.entity_id)?.kind === 'lab' ? 'MockLIS' : 'MockRIS') : 'VDoc' });
  state.commands.push(command.id); state.revision++;
  state.audit.push({ id: command.id, at: command.at, actor: command.actor, action: command.type, patient_id: patient.id, entity_id: entityId });
  return workflowStateSchema.parse(state);
}
