import type { WorkflowState } from '../domain/workflow.js';
import { owners } from '../data/cohort.js';

export const UPDATE_DOCTOR = 'Dr. Ananya Mehta';
export const UPDATE_DEPARTMENT = 'Internal Medicine';
export type DoctorUpdate = { id: string; patient_id: string; patient: string; uhid: string; type: 'lab' | 'imaging' | 'referral' | 'coordination' | 'order' | 'handover' | 'discharge' | 'follow_up'; title: string; detail: string; at: string; attention: boolean; href: string; read: boolean };

function departmentOf(doctor: string): string | undefined {
  return Object.entries(owners).find(([, name]) => name === doctor)?.[0];
}

const demoPatient = (number: number) => `20000000-0000-4000-8000-${String(number).padStart(12, '0')}`;

// Hard-coded showcase updates for the demo inbox. Ids are stable so read/seen receipts persist; times are kept
// a few minutes old so they always sit at the top of the inbox.
function demoUpdates(doctor: string): Omit<DoctorUpdate, 'patient' | 'uhid' | 'read'>[] {
  const referrer = doctor === 'Dr. Devika Rao' ? 'Dr. Ananya Mehta' : 'Dr. Devika Rao';
  const accepter = doctor === 'Dr. Rohan Shah' ? 'Dr. Kavya Menon' : 'Dr. Rohan Shah';
  const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
  const rahul = demoPatient(1), sunita = demoPatient(3), farah = demoPatient(4), arjun = demoPatient(5);
  return [
    { id: 'demo:rahul-cbc-live', patient_id: rahul, type: 'lab', title: 'CBC report is live', detail: 'Laboratory published today’s CBC with differential · most values out of range · awaiting your review', at: minutesAgo(4), attention: true, href: `/app/patients/${rahul}` },
    { id: 'demo:sunita-referral', patient_id: sunita, type: 'referral', title: `${referrer} referred this patient to you`, detail: `Nephrology → Internal Medicine · ${referrer}\nPlease review glycaemic control and medication plan before the next dialysis session.`, at: minutesAgo(12), attention: true, href: '/app/referrals' },
    { id: 'demo:sunita-potassium', patient_id: sunita, type: 'lab', title: 'Critical value · Potassium 6.8 mmol/L', detail: 'Renal panel flagged a critical high potassium · laboratory has called the ward', at: minutesAgo(18), attention: true, href: `/app/patients/${sunita}` },
    { id: 'demo:rahul-referral-accepted', patient_id: rahul, type: 'referral', title: `${accepter} accepted your referral`, detail: `Internal Medicine → Cardiology · ${accepter}\nCardiovascular risk review accepted; consult note expected today.`, at: minutesAgo(35), attention: false, href: '/app/referrals' },
    { id: 'demo:farah-xray', patient_id: farah, type: 'imaging', title: 'Chest X-ray report ready', detail: 'Radiology report available · compare with the previous film', at: minutesAgo(52), attention: false, href: `/app/patients/${farah}` },
    { id: 'demo:arjun-handover', patient_id: arjun, type: 'handover', title: 'Night team handed over DKA monitoring plan', detail: 'Hourly glucose and ketone checks · potassium replacement per protocol', at: minutesAgo(75), attention: false, href: '/app/handovers' },
  ];
}

export function doctorUpdates(state: WorkflowState, doctor = UPDATE_DOCTOR): DoctorUpdate[] {
  const rows: DoctorUpdate[] = [];
  const receipts = state.update_receipts?.[doctor] ?? {};
  const department = departmentOf(doctor);
  const scoped = new Set(state.histories.filter(history => {
    const patient = state.patients.find(patient => patient.id === history.context.patient_id);
    return (department && patient?.department === department) || history.encounters.some(encounter => encounter.status === 'active' && encounter.owner === doctor)
      || history.requests.some(request => !['completed', 'cancelled'].includes(request.status) && (request.owner === doctor || (department && request.to_department === department)));
  }).map(history => history.context.patient_id));
  const add = (item: Omit<DoctorUpdate, 'patient' | 'uhid' | 'read'>) => {
    const patient = state.patients.find(patient => patient.id === item.patient_id && patient.hospital_id === state.hospital_id);
    if (patient) rows.push({ ...item, patient: patient.name, uhid: patient.uhid, read: Boolean(receipts[item.id]) });
  };
  for (const history of state.histories) {
    const patientId = history.context.patient_id;
    const current = history.context.current_encounter_id;
    if (scoped.has(patientId)) {
      for (const report of state.reports.filter(report => report.patient_id === patientId && report.encounter_id === current)) {
        const abnormal = report.observations.some(value => value.flag !== 'normal');
        add({ id: `report:${report.id}`, patient_id: patientId, type: report.kind, title: `${report.kind === 'lab' ? 'Lab' : 'Imaging'} report available: ${report.title}`, detail: `${report.author ?? report.source} · ${state.reviews[report.id] ? 'Clinically reviewed' : 'Awaiting clinical review'}${abnormal ? ' · Abnormal values recorded' : ''}`, at: report.reported_at,
          attention: !state.reviews[report.id], href: report.order_id ? `/app/${report.kind === 'lab' ? 'lab-orders' : 'imaging-orders'}?id=${report.order_id}` : `/app/patients/${patientId}` });
      }
      for (const order of history.orders.filter(order => order.encounter_id === current && order.status !== 'completed')) add({ id: `order:${order.id}:${order.version}:${order.status}`, patient_id: patientId, type: 'order', title: `${order.title} · ${order.status}`, detail: `${order.requester} · ${order.indication}`, at: state.audit.filter(event => event.entity_id === order.id).at(-1)?.at ?? order.placed_at,
        attention: order.priority === 'urgent' && order.status !== 'cancelled', href: `/app/${order.kind === 'lab' ? 'lab-orders' : 'imaging-orders'}?id=${order.id}` });
      for (const task of history.work_items.filter(task => task.kind === 'follow_up' && task.status === 'pending')) add({ id: `follow-up:${task.id}:${task.due_at}`, patient_id: patientId, type: 'follow_up', title: task.title, detail: `${task.owner} · Follow-up due ${task.due_at}`, at: task.created_at, attention: task.due_at <= new Date().toISOString(), href: `/app/patients/${patientId}` });
    }
    for (const request of history.requests) {
      const incoming = request.owner === doctor || Boolean(department && request.to_department === department);
      const outgoing = request.requested_by === doctor || Boolean(department && request.from_department === department);
      if (!incoming && !outgoing) continue;
      add({ id: `request:${request.id}:${request.version}:${request.status}:${request.owner}`, patient_id: patientId, type: request.kind === 'referral' ? 'referral' : 'coordination',
        title: `${incoming ? 'Incoming' : 'Sent'} ${request.kind} · ${request.status.replaceAll('_', ' ')}`, detail: `${request.from_department} → ${request.to_department} · ${request.owner}\n${request.reason}${request.response ? `\nResponse: ${request.response}` : ''}`,
        at: state.audit.filter(event => event.entity_id === request.id).at(-1)?.at ?? request.completed_at ?? request.accepted_at ?? request.requested_at,
        attention: (incoming && !['completed', 'cancelled'].includes(request.status)) || (outgoing && request.status === 'completed' && !request.reviewed_at), href: `/app/${request.kind === 'referral' ? 'referrals' : 'requests'}?id=${request.id}` });
    }
  }
  if (department) for (const item of demoUpdates(doctor)) add(item);
  const packets = new Set<string>();
  for (const record of state.handovers.filter(record => record.from_doctor === doctor || record.to_doctor === doctor).sort((first, second) => second.updated_at.localeCompare(first.updated_at))) {
    const key = record.shift_id ?? record.id;
    if (packets.has(key)) continue;
    packets.add(key);
    add({ id: `handover:${key}:${record.status}:${record.updated_at}`, patient_id: record.patient_id, type: 'handover', title: `${record.shift_id ? 'Shift packet' : 'Patient handover'} · ${record.status}`, detail: `${record.from_doctor} → ${record.to_doctor} · ${record.shift}${record.shift_id ? ` · ${state.handovers.filter(item => item.shift_id === key).length} patients` : ''}`,
      at: record.updated_at, attention: record.to_doctor === doctor && record.status === 'approved', href: `/app/handovers?${record.shift_id ? 'shift' : 'id'}=${key}` });
  }
  for (const record of state.discharges.filter(record => record.owner === doctor || scoped.has(record.patient_id))) add({ id: `discharge:${record.id}:${record.version}:${record.status}`, patient_id: record.patient_id, type: 'discharge', title: `Discharge process · ${record.status.replaceAll('_', ' ')}`, detail: `${record.owner} · ${record.summary || 'Summary not completed'}`, at: record.updated_at, attention: !['discharged', 'cancelled'].includes(record.status), href: `/app/discharges?id=${record.id}` });
  return rows.sort((first, second) => second.at.localeCompare(first.at) || first.id.localeCompare(second.id));
}
