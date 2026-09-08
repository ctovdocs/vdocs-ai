import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cohort as sourceCohort, DEMO_HOSPITAL_ID, SCENARIO_VERSION, SNAPSHOT_AT } from '../src/data/cohort.ts';
import { validateCohort } from '../src/data/validateCohort.ts';
import { buildExpansionWorkflow } from '../src/data/expansionWorkflow.ts';

const expansion = buildExpansionWorkflow(sourceCohort.patients, sourceCohort.reports, sourceCohort.histories);
const overrides = new Map(expansion.histories.map(history => [history.context.patient_id, history]));
const cohort = { ...sourceCohort, histories: sourceCohort.histories.map(history => overrides.get(history.context.patient_id) ?? history) };

const counts = validateCohort(cohort);
const output = resolve('data/generated');
await mkdir(resolve(output, 'patients'), { recursive: true });
const sources = [
  { url: 'https://www.icmr.gov.in/standard-treatment-workflows-stws', use: 'Indian clinical topic catalogue consulted; not a source of patient records or validation of generated values.' },
  { url: 'https://clinicalestablishments.mohfw.gov.in/en/standard-treatment-guidelines', use: 'Indian specialty/trauma guideline catalogue consulted; no real patient records imported.' },
  { url: 'https://www.icmr.gov.in/icmrobject/uploads/STWs/1768823342_cardiology_1-4.pdf', use: 'NSTEMI clinical reference consulted. Synthetic scenario is not a treatment protocol.' },
];
const metadata = {
  version: SCENARIO_VERSION, snapshot_at: SNAPSHOT_AT, timezone: 'Asia/Kolkata', synthetic: true,
  clinician_review_status: 'not_reviewed', counts, sources,
  expansion: { patients: 50, critical_patients: 45, first_visits: 5, repeat_visitors: 45, active_discharge_entries: 20, planned: 5, in_progress: 13, ready: 2 },
  limitations: [
    `${counts.critical_patients}/${counts.patients} critical is a deliberately enriched demonstration mix, not Indian or Fortis prevalence.`,
    `${counts.patients_with_multiple_visits}/${counts.patients} have multiple hospital encounters. First-time patients have no invented prior encounters here.`,
    'Authored synthetic scenarios, not real, de-identified, Synthea-imported or clinician-validated patients.',
    'Medication records represent limited historical/reconciliation context, not complete emergency prescribing or administration.',
    'Imaging is report text only. No real images, DICOM, phone numbers, addresses or ABHA identifiers are included.',
    'Requests and handover drafts are proposed VDoc workflow fixtures, not observed Fortis capabilities.',
    'Critical cases require clinician review before presentation as medically validated examples.',
  ],
};
const tables: Record<string, object[]> = {
  demo_patients: cohort.patients,
  demo_encounters: cohort.histories.flatMap(history => history.encounters),
  demo_contexts: cohort.histories.map(history => history.context),
  demo_orders: cohort.histories.flatMap(history => history.orders),
  demo_reports: cohort.reports,
  demo_notes: cohort.histories.flatMap(history => history.notes),
  demo_vitals: cohort.histories.flatMap(history => history.vitals),
  demo_medications: cohort.histories.flatMap(history => history.medications),
  demo_requests: cohort.histories.flatMap(history => history.requests),
  demo_work_items: cohort.histories.flatMap(history => history.work_items),
  demo_timeline: cohort.histories.flatMap(history => history.timeline),
  demo_immunizations: cohort.histories.flatMap(history => history.immunizations),
};
await writeFile(resolve(output, 'manifest.json'), JSON.stringify(metadata, null, 2) + '\n');
await writeFile(resolve(output, 'cohort.json'), JSON.stringify({ metadata, ...cohort }, null, 2) + '\n');
await writeFile(resolve(output, 'workflow-expansion.json'), JSON.stringify(expansion, null, 2) + '\n');
await writeFile(resolve(output, 'discharge-fixtures.json'), JSON.stringify(expansion.discharges, null, 2) + '\n');
const csvCell = (value: unknown) => `"${String(Array.isArray(value) || typeof value === 'object' && value !== null ? JSON.stringify(value) : value ?? '').replaceAll('"', '""')}"`;
for (const [name, rows] of Object.entries(tables)) {
  const columns = [...new Set(rows.flatMap(row => Object.keys(row)))];
  const csv = [columns.map(csvCell).join(','), ...rows.map(row => columns.map(column => csvCell((row as Record<string, unknown>)[column])).join(','))].join('\n');
  await writeFile(resolve(output, `${name}.csv`), csv + '\n');
}
const quote = (value: string) => `'${value.replaceAll("'", "''")}'`;
const statements = [
  'begin;',
  `insert into public.hospitals (id, name) values (${quote(DEMO_HOSPITAL_ID)}, 'Fortis — synthetic demo') on conflict (id) do nothing;`,
  'set constraints all deferred;',
  `delete from public.demo_reports where hospital_id = ${quote(DEMO_HOSPITAL_ID)} and id in ('30000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000003');`,
];
for (const [name, rows] of Object.entries(tables)) {
  if (!rows.length) continue;
  const columns = [...new Set(rows.flatMap(row => Object.keys(row)))];
  const update = columns.filter(column => column !== 'id').map(column => `${column} = excluded.${column}`).join(', ');
  statements.push(`insert into public.${name} (${columns.join(', ')}) select ${columns.join(', ')} from jsonb_populate_recordset(null::public.${name}, ${quote(JSON.stringify(rows))}::jsonb) on conflict (id) do update set ${update};`);
}
statements.push('commit;');
await writeFile(resolve(output, 'seed.sql'), statements.join('\n\n') + '\n');
const expansionIds = new Set(expansion.patients.map(patient => patient.id));
const expansionStatements = ['begin;', `insert into public.hospitals (id, name) values (${quote(DEMO_HOSPITAL_ID)}, 'Fortis — synthetic demo') on conflict (id) do nothing;`, 'set constraints all deferred;'];
for (const [name, tableRows] of Object.entries(tables)) {
  const rows = tableRows.filter(row => {
    const record = row as Record<string, unknown>;
    return expansionIds.has(String(name === 'demo_patients' ? record.id : record.patient_id));
  });
  if (!rows.length) continue;
  const columns = [...new Set(rows.flatMap(row => Object.keys(row)))];
  expansionStatements.push(`insert into public.${name} (${columns.join(', ')}) select ${columns.join(', ')} from jsonb_populate_recordset(null::public.${name}, ${quote(JSON.stringify(rows))}::jsonb) on conflict (id) do nothing;`);
}
expansionStatements.push(`do $expansion$
declare
  incoming jsonb := ${quote(JSON.stringify(expansion))}::jsonb;
  current_state jsonb;
  current_revision bigint;
  missing_ids text[];
  record_group text;
  additions jsonb;
begin
  perform pg_advisory_xact_lock(hashtextextended('${DEMO_HOSPITAL_ID}', 0));
  select state, revision into current_state, current_revision from public.demo_workflow_state
    where hospital_id = '${DEMO_HOSPITAL_ID}'::uuid for update;
  if current_state is not null then
    select array_agg(item->>'id') into missing_ids from jsonb_array_elements(incoming->'patients') as item
      where not exists (select 1 from jsonb_array_elements(current_state->'patients') as existing where existing->>'id' = item->>'id');
    if coalesce(cardinality(missing_ids), 0) > 0 then
      foreach record_group in array array['patients', 'histories', 'reports', 'discharges', 'handovers'] loop
        select coalesce(jsonb_agg(item), '[]'::jsonb) into additions from jsonb_array_elements(incoming->record_group) as item
          where (case when record_group = 'patients' then item->>'id' when record_group = 'histories' then item->'context'->>'patient_id' else item->>'patient_id' end) = any(missing_ids);
        current_state := jsonb_set(current_state, array[record_group], (current_state->record_group) || additions);
      end loop;
      select coalesce(jsonb_object_agg(entry.key, entry.value), '{}'::jsonb) into additions from jsonb_each(incoming->'reviews') as entry
        where exists (select 1 from jsonb_array_elements(incoming->'reports') as report where report->>'id' = entry.key and report->>'patient_id' = any(missing_ids));
      current_state := jsonb_set(current_state, '{reviews}', (current_state->'reviews') || additions);
      current_state := jsonb_set(current_state, '{revision}', to_jsonb(current_revision + 1));
      update public.demo_workflow_state set state = current_state, revision = current_revision + 1, updated_at = now()
        where hospital_id = '${DEMO_HOSPITAL_ID}'::uuid;
    end if;
  end if;
end;
$expansion$;`, 'commit;');
await writeFile(resolve(output, 'expansion.sql'), expansionStatements.join('\n\n') + '\n');
const catalogue = ['# Synthetic patient casebook', '', `Version: ${SCENARIO_VERSION}. Snapshot: ${SNAPSHOT_AT} (Asia/Kolkata display).`, '', ...metadata.limitations.map(item => `- ${item}`), '', '## Cohort', '', '| UHID | Patient | Department | Acuity | Hospital encounters |', '|---|---|---|---|---|'];
for (const patient of cohort.patients) catalogue.push(`| ${patient.uhid} | ${patient.name}, ${patient.age}${patient.sex} | ${patient.department} | ${patient.acuity} | ${patient.visit_count} |`);
for (const patient of cohort.patients) {
  const history = cohort.histories.find(entry => entry.context.patient_id === patient.id)!;
  const reports = cohort.reports.filter(report => report.patient_id === patient.id);
  const discharges = expansion.discharges.filter(record => record.patient_id === patient.id);
  await writeFile(resolve(output, 'patients', `${patient.uhid}.json`), JSON.stringify({ metadata: { version: SCENARIO_VERSION, synthetic: true, clinician_review_status: 'not_reviewed' }, patient, ...history, reports, discharges }, null, 2) + '\n');
  const lines = [
    `## ${patient.uhid} — ${patient.name}, ${patient.age}${patient.sex}`, '',
    `Department: ${patient.department}. Acuity at snapshot: ${patient.acuity}.`, '',
    `Conditions: ${patient.conditions.join('; ')}.`, '', `Allergies: ${patient.allergies.join('; ') || 'Not documented; do not equate with no known allergy'}.`, '',
    '### Presentation and history', '', history.context.presenting_complaint, '', history.context.history, '',
    `Critical-state rationale: ${history.context.acuity_reason}`, '', `Context: ${history.context.social_context}`, '',
    `Occupation: ${history.context.occupation}. Preferred language: ${history.context.preferred_language}.`, '',
    '### Hospital encounters', '',
    ...history.encounters.flatMap(encounter => [`- ${encounter.started_at}: ${encounter.kind}, ${encounter.status}. ${encounter.reason}`, `  Record: ${encounter.id}`]), '',
    '### Investigation history', '',
    ...reports.flatMap(report => [`#### ${report.reported_at} — ${report.title}`, '', `Source: ${report.source}; record: ${report.id}; order: ${report.order_id}.`, '', report.findings, '']),
    '### Medication reconciliation', '',
    ...history.medications.map(medicine => `- ${medicine.name}, ${medicine.dose}, ${medicine.route}, ${medicine.frequency}; ${medicine.status}. ${medicine.reason}`),
    ...(history.medications.length ? [] : ['No reconciled medication record supplied.']), '',
    '### Department coordination', '',
    ...history.requests.map(request => `${request.from_department} → ${request.to_department}: ${request.reason} Status: ${request.status}. ${request.response ?? 'Response pending.'}`), '',
    '### Current notes and handover draft', '',
    ...history.notes.filter(note => note.encounter_id === history.context.current_encounter_id).flatMap(note => [`#### ${note.title}`, '', note.body, '']),
    '### Pending work', '', ...history.work_items.map(item => `- ${item.title} — ${item.owner}; due ${item.due_at}.`), '',
    ...discharges.flatMap(record => ['### Discharge working list', '', `Status: ${record.status}. Target: ${record.target_date}. Owner: ${record.owner}.`, '', `Clinical clearance: ${record.clinical_clearance ? 'Synthetic clinician fixture only' : 'Not approved'}. Documents checked: ${record.documents_checked}.`, '', record.summary || 'Summary not yet written.', '']),
  ];
  catalogue.push(...lines);
  await writeFile(resolve(output, 'patients', `${patient.uhid}.md`), lines.join('\n') + '\n');
}
catalogue.push('## Reference provenance', '', ...sources.map(source => `- [${source.url}](${source.url}): ${source.use}`));
await writeFile(resolve(output, 'CASEBOOK.md'), catalogue.join('\n') + '\n');
console.log(JSON.stringify({ output, ...counts }, null, 2));
