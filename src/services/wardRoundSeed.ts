import { recordId } from '../data/cohort';
import type { PatientHistory } from '../domain/longitudinal';
import type { WorkflowState } from '../domain/workflow';

const flagMark = (flag: string) => (flag === 'high' ? ' (H)' : flag === 'low' ? ' (L)' : '');
const isRound = (note: PatientHistory['notes'][number]) => note.title.startsWith('Ward round');

/**
 * Gives every demo inpatient the same pair of ward rounds Rahul Sharma has ("admission day" and "today, morning round").
 * Patients 1-50 already have them; patients 51-100 had a single generic review and #25 had none. The text is built from each
 * patient's own vitals, results, consults and pending work. Pure, deterministic, in-memory: no revision bump and nothing is
 * written until someone edits the record (like the discharge-summary overlay). OPD patients and new registrations are left alone.
 */
export function seedWardRounds(state: WorkflowState): WorkflowState {
  let next: WorkflowState | null = null;
  for (const [index, source] of state.histories.entries()) {
    const patient = state.patients.find(item => item.id === source.context.patient_id);
    const number = Number(/^F-DEMO-(\d{4})$/.exec(patient?.uhid ?? '')?.[1]);
    const encounter = source.encounters.find(item => item.status === 'active');
    if (!patient || !number || number > 100 || !encounter || encounter.kind !== 'IPD') continue;
    const existing = source.notes.filter(note => note.encounter_id === encounter.id && isRound(note));
    if (existing.length >= 2) continue;

    const anchor = number > 50 ? '2026-09-08' : '2026-09-07';
    const morningAt = `${anchor}T01:30:00.000Z`;
    const admissionAt = new Date(Math.min(new Date(encounter.started_at).getTime() + 2 * 3_600_000, new Date(morningAt).getTime() - 3 * 3_600_000)).toISOString();
    const vitals = source.vitals.filter(item => item.encounter_id === encounter.id).sort((a, b) => a.recorded_at.localeCompare(b.recorded_at));
    const reports = state.reports.filter(item => item.patient_id === patient.id && item.encounter_id === encounter.id).sort((a, b) => a.reported_at.localeCompare(b.reported_at));
    const describe = (vital: (typeof vitals)[number]) => `BP ${vital.systolic}/${vital.diastolic}, pulse ${vital.pulse}, SpO2 ${vital.spo2}%, temp ${vital.temperature_c} C`;

    const series = new Map<string, Array<{ text: string; flag: string }>>();
    for (const report of reports.filter(item => item.kind === 'lab')) for (const obs of report.observations) series.set(obs.name, [...(series.get(obs.name) ?? []), { text: `${obs.value}${obs.unit ? ` ${obs.unit}` : ''}`, flag: obs.flag }]);
    const labLines = [...series].sort((a, b) => Number(b[1].at(-1)!.flag !== 'normal') - Number(a[1].at(-1)!.flag !== 'normal')).slice(0, 4)
      .map(([name, values]) => `${name} ${values.map(item => item.text).join(' → ')}${flagMark(values.at(-1)!.flag)}`);
    const advice = source.requests.filter(item => item.encounter_id === encounter.id && item.status === 'completed' && item.response?.trim()).slice(0, 2)
      .map(item => `${item.to_department} advice: ${item.response!.trim().slice(0, 160)}`);
    const pending = [
      ...source.orders.filter(item => item.encounter_id === encounter.id && ['pending', 'processing'].includes(item.status)).map(item => `${item.title} result`),
      ...source.requests.filter(item => item.encounter_id === encounter.id && !['completed', 'cancelled'].includes(item.status)).map(item => `${item.to_department} response`),
      ...source.work_items.filter(item => item.encounter_id === encounter.id && item.status === 'pending' && item.kind !== 'discharge').map(item => item.title),
    ].slice(0, 4);
    const impression = source.context.acuity_reason.split(/(?<=\.)\s/)[0];

    const rounds: Array<{ seq: number; title: string; at: string; findings: string; plan: string }> = [];
    if (existing.length === 0) rounds.push({
      seq: 1, title: 'Ward round — admission day', at: admissionAt,
      findings: `${encounter.reason}${vitals[0] ? ` On arrival: ${describe(vitals[0])}.` : ''} Assessment started; investigations sent.`,
      plan: encounter.assessment.trim() || 'Investigations, symptomatic treatment and monitoring; review once results are back.',
    });
    rounds.push({
      seq: 2, title: 'Ward round — today, morning round', at: morningAt,
      findings: [vitals.at(-1) ? `Vitals: ${describe(vitals.at(-1)!)}.` : '', impression, labLines.length ? `Results: ${labLines.join('; ')}.` : '', ...advice].filter(Boolean).join(' '),
      plan: pending.length ? `Continue current treatment. Awaiting: ${pending.join('; ')}. Review again once these are back.` : 'Continue current treatment. No investigations or consults pending; review for discharge readiness.',
    });

    next ??= structuredClone(state);
    const target = next.histories[index];
    for (const round of rounds) {
      const id = recordId(71, number, round.seq);
      if (target.notes.some(note => note.id === id)) continue;
      target.notes.push({ id, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounter.id, kind: 'progress', recorded_at: round.at, author: encounter.owner,
        title: round.title, body: `Findings: ${round.findings}\nPlan: ${round.plan}`, source_ids: [], source_system: 'MockHIS' });
      target.timeline.push({ id: recordId(72, number, round.seq), hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounter.id,
        occurred_at: round.at, available_at: round.at, kind: 'note', title: round.title, source_id: id, source_system: 'MockHIS' });
    }
    target.timeline.sort((a, b) => b.available_at.localeCompare(a.available_at));
  }
  return next ?? state;
}
