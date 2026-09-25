import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { LAB_TREND_SEED, labTrendPatientIds, seedLabTrends, trendPanelNames } from '../data/labTrendDemo';
import { initialWorkflowState, applyWorkflowCommand } from './workflowEngine';
import { applyWorkflowPatch, diffWorkflowState } from './workflowDiff';
import { labSampleDate, numericLabValue, panelName, parseReferenceRange, relativeToRange, selectTrendReports, trendRows } from './labTrends';

const initial = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
const at = '2026-09-25T08:00:00.000Z';
describe('complete longitudinal lab panels', () => {
  it('adds seven complete CBC, KFT, LFT and urine reports to each foundation patient, once', () => {
    const before = initial();
    const after = seedLabTrends(before, at, 'Synthetic importer');
    expect(after.reports.length - before.reports.length).toBe(140);
    expect(after.commands).toContain(LAB_TREND_SEED);
    for (const patientId of labTrendPatientIds) for (const title of trendPanelNames) {
      const reports = after.reports.filter(report => report.patient_id === patientId && report.title === title);
      expect(reports).toHaveLength(7);
      expect(new Set(reports.map(report => labSampleDate(report).slice(0, 10))).size).toBe(7);
      expect(reports.every(report => report.observations.length >= 8 && report.findings.includes('Synthetic'))).toBe(true);
      expect(reports.every(report => Date.parse(report.reported_at) >= Date.parse(labSampleDate(report)))).toBe(true);
    }
    expect(seedLabTrends(after, at, 'Another importer')).toBe(after);
    expect(after.patients).toEqual(before.patients);
    expect(after.histories.flatMap(history => history.orders)).toEqual(before.histories.flatMap(history => history.orders));
    for (const report of before.reports) expect(after.reports.find(item => item.id === report.id)).toEqual(report);
    expect(applyWorkflowPatch(before, diffWorkflowState(before, after))).toEqual(after);
  });
  it('defaults to five full reports and exposes every constituent result with source IDs', () => {
    const state = seedLabTrends(initial(), at, 'Synthetic importer');
    const labs = state.reports.filter(report => report.patient_id === labTrendPatientIds[0]);
    const selected = selectTrendReports(labs, 'CBC');
    expect(selected).toHaveLength(5);
    expect(trendRows(selected)).toHaveLength(14);
    for (const row of trendRows(selected)) expect(Object.keys(row.cells)).toEqual(selected.map(report => report.id));
    expect(selectTrendReports(labs, 'CBC', 7)).toHaveLength(7);
    expect(selected.every(report => panelName(report) === 'CBC')).toBe(true);
    const sampleDay = labSampleDate(selected[0]).slice(0, 10);
    expect(selectTrendReports(labs, 'CBC', 7, sampleDay, sampleDay)).toHaveLength(1);
    expect(selectTrendReports(labs, 'CBC', 5, '2030-01-01')).toHaveLength(0);
  });
  it('does not plot qualitative, missing or bounded results as numeric zero', () => {
    for (const value of [undefined, '', 'Negative', '2+', '0–2', '<5', '>100']) expect(numericLabValue(value)).toBeNull();
    expect(numericLabValue('0')).toBe(0);
    expect(numericLabValue('1.025')).toBe(1.025);
    const report = cohort.reports.find(report => report.kind === 'lab')!;
    const rows = trendRows([{ ...report, observations: [{ name: 'Hb', value: '12', unit: 'g/dL', reference: '12–15', flag: 'normal' }, { name: 'Hb', value: '120', unit: 'g/L', reference: '120–150', flag: 'normal' }] }]);
    expect(rows).toHaveLength(2);
  });
  it('shows mostly abnormal results for the four high-acuity demo patients and keeps Priya mostly normal', () => {
    const state = seedLabTrends(initial(), at, 'Synthetic importer');
    const abnormalShare = (patientId: string, count: number) => {
      const labs = state.reports.filter(report => report.patient_id === patientId && report.author === 'Synthetic laboratory reporting team');
      const results = ['CBC', 'KFT / renal', 'LFT / liver', 'Urine routine'].flatMap(panel => selectTrendReports(labs, panel, count)).flatMap(report => report.observations).filter(item => numericLabValue(item.value) !== null);
      return results.filter(item => item.flag !== 'normal').length / results.length;
    };
    const [rahul, priya, sunita, farah, arjun] = labTrendPatientIds;
    for (const patientId of [rahul, sunita, farah, arjun]) {
      expect(abnormalShare(patientId, 1)).toBeGreaterThanOrEqual(0.7);
      expect(abnormalShare(patientId, 5)).toBeGreaterThanOrEqual(0.6);
    }
    expect(abnormalShare(priya, 5)).toBeLessThan(0.25);
    const sunitaPotassium = selectTrendReports(state.reports.filter(report => report.patient_id === sunita), 'KFT / renal', 1)[0].observations.find(item => item.name === 'Potassium')!;
    expect(sunitaPotassium).toMatchObject({ value: '6.8', flag: 'high' });
  });
  it('upgrades an earlier lab-trend import in place without duplicating reports or timeline entries', () => {
    const current = seedLabTrends(initial(), at, 'Synthetic importer');
    const legacy = structuredClone(current);
    const target = legacy.reports.find(report => report.patient_id === labTrendPatientIds[2] && report.title === trendPanelNames[1])!;
    target.observations = target.observations.map(item => ({ ...item, value: '1.0', flag: 'normal' }));
    legacy.commands = legacy.commands.map(id => id === LAB_TREND_SEED ? 'vdoc.lab-trends.v1' : id);
    const upgraded = seedLabTrends(legacy, at, 'Synthetic importer');
    expect(upgraded.reports).toHaveLength(legacy.reports.length);
    expect(upgraded.reports.find(report => report.id === target.id)).toEqual(current.reports.find(report => report.id === target.id));
    for (const history of upgraded.histories) expect(new Set(history.timeline.map(item => item.id)).size).toBe(history.timeline.length);
    expect(upgraded.commands).toContain(LAB_TREND_SEED);
    const patch = diffWorkflowState(legacy, upgraded);
    expect(patch.reports?.upsert?.map(report => report.id)).toEqual([target.id]);
    expect(patch.histories).toBeUndefined();
    expect(applyWorkflowPatch(legacy, patch)).toEqual(upgraded);
  });
  it('validates seed commands against hospital scope', () => {
    const state = initial();
    expect(() => applyWorkflowCommand(state, { id: crypto.randomUUID(), at, actor: 'Importer', type: 'labs.seed', patient_id: crypto.randomUUID() })).toThrow('hospital scope');
    const next = applyWorkflowCommand(state, { id: crypto.randomUUID(), at, actor: 'Importer', type: 'labs.seed', patient_id: labTrendPatientIds[0] });
    expect(next.revision).toBe(state.revision + 1);
  });
});

describe('reference-relative scale for the combined graph', () => {
  it('parses simple numeric intervals and rejects anything else', () => {
    expect(parseReferenceRange('13–17')).toEqual([13, 17]);
    expect(parseReferenceRange(' 3.5 - 5.1 ')).toEqual([3.5, 5.1]);
    expect(parseReferenceRange('-2-2')).toEqual([-2, 2]);
    expect(parseReferenceRange('<5')).toBeNull();
    expect(parseReferenceRange('Negative')).toBeNull();
    expect(parseReferenceRange('17–13')).toBeNull();
    expect(parseReferenceRange('')).toBeNull();
    expect(parseReferenceRange(undefined)).toBeNull();
  });
  it('maps values onto 0–100% of the interval, including values outside it', () => {
    expect(relativeToRange(13, [13, 17])).toBe(0);
    expect(relativeToRange(17, [13, 17])).toBe(100);
    expect(relativeToRange(15, [13, 17])).toBe(50);
    expect(relativeToRange(11, [13, 17])).toBe(-50);
    expect(relativeToRange(19, [13, 17])).toBe(150);
  });
});
