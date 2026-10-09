import { inflateSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { dischargeSummaryText, summarySignGaps } from '../domain/dischargeSummary';
import type { CommandInput, WorkflowCommand, WorkflowState } from '../domain/workflow';
import { applySection, buildDischargeSummary } from './dischargeSummaryBuilder';
import { renderDischargeSummaryPdf } from './dischargeSummaryPdf';
import { applyWorkflowCommand, initialWorkflowState } from './workflowEngine';
import { seedClaim } from './claimsDemo';
import { seedDischargeSummaries } from './dischargeSummarySeed';

const at = '2026-09-08T09:00:00.000Z';
const nurse = { name: 'Nurse Priya Nair', role: 'nurse' as const };
const doctor = { name: 'Dr. Devika Rao', role: 'doctor' as const };
const base = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
const open = (state: WorkflowState, uhid: string) => {
  const patient = state.patients.find(item => item.uhid === uhid)!;
  return { patient, record: state.discharges.find(item => item.patient_id === patient.id && !['discharged', 'cancelled'].includes(item.status))! };
};
const run = (state: WorkflowState, input: CommandInput) => applyWorkflowCommand(state, { ...input, id: crypto.randomUUID(), at, actor: input.actor ?? doctor.name } as WorkflowCommand);

/** Concatenated, inflated PDF content streams as upper-case hex, so text can be searched without a PDF text library. */
const pdfHex = (bytes: Uint8Array) => {
  const raw = Buffer.from(bytes); const out: string[] = [raw.toString('latin1')];
  for (const match of raw.toString('latin1').matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g)) { try { out.push(inflateSync(Buffer.from(match[1], 'latin1')).toString('latin1')); } catch { /* not a deflate stream */ } }
  return out.join('\n').toUpperCase();
};
const hexOf = (text: string) => Buffer.from(text, 'latin1').toString('hex').toUpperCase();

describe('discharge summary builder', () => {
  it('pre-fills Mohan (F-DEMO-0090) from his chart and records the source of each section', () => {
    const state = base(); const { patient, record } = open(state, 'F-DEMO-0090');
    const doc = buildDischargeSummary(state, record, nurse, at);
    expect(doc.patient).toMatchObject({ name: 'Mohan Subramaniam', uhid: 'F-DEMO-0090', age_sex: '68 / M', dob: '10-06-1958' });
    expect(doc.primary_diagnosis).toBe(patient.conditions[0]);
    expect(doc.investigations.lab).toMatch(/Creatinine: 2\.7.*\(H\).*→.*1\.2/);
    expect(doc.medications.some(row => /amlodipine/i.test(row.name))).toBe(true);
    expect(doc.condition.bp).toBe('126/76 mmHg');
    expect(doc.warning_signs.length).toBeGreaterThan(2);
    expect(doc.status).toBe('draft');
    expect(Object.keys(doc.sources)).toEqual(expect.arrayContaining(['patient', 'investigations', 'course', 'medications']));
    expect(doc.patient.address).toMatch(/synthetic/i);
  });

  it('builds a usable draft for a patient with no medications or allergies (Ritu, F-DEMO-0060)', () => {
    const state = base(); const { record } = open(state, 'F-DEMO-0060');
    const doc = buildDischargeSummary(state, record, nurse, at);
    expect(doc.allergies).toMatch(/not documented/i);
    expect(doc.primary_diagnosis.length).toBeGreaterThan(0);
    expect(dischargeSummaryText(doc)).toContain('Primary diagnosis');
  });

  it('resets a single section from the record without touching the rest', () => {
    const state = base(); const { record } = open(state, 'F-DEMO-0090');
    const fresh = buildDischargeSummary(state, record, nurse, at);
    const edited = { ...structuredClone(fresh), hospital_course: 'EDITED COURSE', diet: 'EDITED DIET' };
    const reset = applySection(edited, fresh, 'course');
    expect(reset.hospital_course).toBe(fresh.hospital_course);
    expect(reset.diet).toBe('EDITED DIET');
  });
});

describe('discharge summary workflow', () => {
  const draft = () => {
    const state = base(); const { patient, record } = open(state, 'F-DEMO-0090');
    const doc = buildDischargeSummary(state, record, nurse, at);
    const saved = run(state, { type: 'discharge.summary.save', patient_id: patient.id, entity_id: record.id, expected_version: record.version, role: 'nurse', actor: nurse.name, doc: { ...doc, hospital_course: 'Recovered with IV fluids. LIVE-MARKER-4471.' } });
    return { saved, patient, id: record.id };
  };

  it('saves a draft, regenerates the plain-text summary for claims, and logs who edited', () => {
    const { saved, id } = draft(); const record = saved.discharges.find(item => item.id === id)!;
    expect(record.summary_doc).toMatchObject({ status: 'draft', prepared_by: nurse.name, prepared_role: 'nurse' });
    expect(record.summary).toContain('LIVE-MARKER-4471');
    expect(record.summary_doc?.edits.at(-1)).toMatchObject({ by: nurse.name, role: 'nurse' });
  });

  it('lets only a doctor sign, requires a complete summary, and clears the signature on any edit', () => {
    const { saved, patient, id } = draft(); const version = () => saved.discharges.find(item => item.id === id)!.version;
    expect(() => run(saved, { type: 'discharge.summary.sign', patient_id: patient.id, entity_id: id, expected_version: version(), role: 'nurse', actor: nurse.name, qualification: 'RN', reg_no: '1' })).toThrow('doctor');
    const incomplete = { ...saved.discharges.find(item => item.id === id)!.summary_doc!, hospital_course: '' };
    const gappy = run(saved, { type: 'discharge.summary.save', patient_id: patient.id, entity_id: id, expected_version: version(), role: 'doctor', doc: incomplete });
    expect(summarySignGaps(gappy.discharges.find(item => item.id === id)!.summary_doc!)).toContain('Hospital course / treatment summary');
    expect(() => run(gappy, { type: 'discharge.summary.sign', patient_id: patient.id, entity_id: id, expected_version: gappy.discharges.find(item => item.id === id)!.version, role: 'doctor', qualification: 'MD', reg_no: '2' })).toThrow('incomplete');

    const signed = run(saved, { type: 'discharge.summary.sign', patient_id: patient.id, entity_id: id, expected_version: version(), role: 'doctor', qualification: 'MBBS, MD', reg_no: 'TSMC-1' });
    const record = signed.discharges.find(item => item.id === id)!;
    expect(record.summary_doc).toMatchObject({ status: 'signed', signed_by: doctor.name, signed_reg_no: 'TSMC-1' });

    const edited = run(signed, { type: 'discharge.summary.save', patient_id: patient.id, entity_id: id, expected_version: record.version, role: 'nurse', actor: nurse.name, doc: { ...record.summary_doc!, diet: 'Changed after signing' } });
    expect(edited.discharges.find(item => item.id === id)!.summary_doc).toMatchObject({ status: 'draft', signed_by: null, signed_at: null });
  });

  it('flows an edited summary into the insurer claim packet', () => {
    const { saved } = draft();
    const claim = seedClaim(saved);
    expect(claim.documents.find(doc => doc.kind === 'summary')?.body).toContain('LIVE-MARKER-4471');
  });

  it('refuses a stale version so two staff cannot overwrite each other silently', () => {
    const { saved, patient, id } = draft(); const record = saved.discharges.find(item => item.id === id)!;
    expect(() => run(saved, { type: 'discharge.summary.save', patient_id: patient.id, entity_id: id, expected_version: record.version - 1, role: 'nurse', doc: record.summary_doc! })).toThrow('changed');
  });

  it('blocks completing discharge until the summary is signed', () => {
    const { saved, patient, id } = draft();
    const record = saved.discharges.find(item => item.id === id)!;
    expect(record.status).toBe('ready');
    expect(() => run(saved, { type: 'discharge.update', patient_id: patient.id, entity_id: id, expected_version: record.version, fields: {}, status: 'discharged' })).toThrow('signed');
    const signed = run(saved, { type: 'discharge.summary.sign', patient_id: patient.id, entity_id: id, expected_version: record.version, role: 'doctor', qualification: 'MD', reg_no: '3' });
    const next = signed.discharges.find(item => item.id === id)!;
    const done = run(signed, { type: 'discharge.update', patient_id: patient.id, entity_id: id, expected_version: next.version, fields: {}, status: 'discharged' });
    expect(done.discharges.find(item => item.id === id)?.status).toBe('discharged');
  });
});

describe('discharge summary PDF', () => {
  it('renders a real PDF containing the entered text, drafts marked, signed copies clean', async () => {
    const state = base(); const { record } = open(state, 'F-DEMO-0090');
    const doc = { ...buildDischargeSummary(state, record, nurse, at), hospital_course: 'Hospital course LIVE-MARKER-4471 recorded.' };
    const draftBytes = await renderDischargeSummaryPdf(doc);
    expect(Buffer.from(draftBytes).subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect((await PDFDocument.load(draftBytes)).getPageCount()).toBeGreaterThanOrEqual(2);
    const draftHex = pdfHex(draftBytes);
    expect(draftHex).toContain(hexOf('LIVE-MARKER-4471'));
    expect(draftHex).toContain(hexOf('Mohan Subramaniam'));
    expect(draftHex).toContain(hexOf('DRAFT'));
    const signedBytes = await renderDischargeSummaryPdf({ ...doc, status: 'signed', signed_by: doctor.name, signed_qualification: 'MBBS, MD', signed_reg_no: 'TSMC-1', signed_at: at });
    const signedHex = pdfHex(signedBytes);
    expect(signedHex).not.toContain(hexOf('DRAFT'));
    expect(signedHex).toContain(hexOf('Digitally signed: Dr. Devika Rao'));
  });
});

describe('seeded discharge paperwork for the demo', () => {
  const seeded = () => seedDischargeSummaries(base());
  const byUhid = (state: WorkflowState, uhid: string) => state.discharges.filter(record => record.patient_id === state.patients.find(patient => patient.uhid === uhid)?.id && record.status !== 'cancelled');

  it('gives every completed discharge a signed summary and the planned demo patients a draft or signed one', () => {
    const state = seeded();
    const completed = state.discharges.filter(record => record.status === 'discharged');
    expect(completed.length).toBeGreaterThan(0);
    expect(completed.every(record => record.summary_doc?.status === 'signed' && record.summary_doc.signed_by === record.owner)).toBe(true);
    expect(byUhid(state, 'F-DEMO-0058')[0].summary_doc).toMatchObject({ status: 'draft', prepared_role: 'nurse', signed_by: null });
    expect(byUhid(state, 'F-DEMO-0100')[0]).toMatchObject({ status: 'ready', summary_doc: { status: 'signed' } });
  });

  it('leaves Mohan (F-DEMO-0090) and Ritu (F-DEMO-0060) to be prepared live, and is idempotent', () => {
    const state = seeded();
    expect(byUhid(state, 'F-DEMO-0090')[0].summary_doc).toBeUndefined();
    expect(byUhid(state, 'F-DEMO-0060')[0].summary_doc).toBeUndefined();
    expect(seedDischargeSummaries(state)).toBe(state);
    expect(state.revision).toBe(base().revision);
  });

  it('lets a seeded, ready, signed discharge be completed straight away', () => {
    const state = seeded(); const record = byUhid(state, 'F-DEMO-0100')[0];
    const done = run(state, { type: 'discharge.update', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version, fields: {}, status: 'discharged' });
    expect(done.discharges.find(item => item.id === record.id)?.status).toBe('discharged');
  });
});
