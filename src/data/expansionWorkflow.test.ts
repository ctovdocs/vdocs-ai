import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID, scenarios, SNAPSHOT_AT } from './cohort';
import { expandedScenarios } from './expandedScenarios';
import { buildExpansionWorkflow, mergeNewPatients } from './expansionWorkflow';
import { initialWorkflowState, dischargeBlockers, applyWorkflowCommand } from '../services/workflowEngine';
import { encodeWorkflow, decodeWorkflow } from '../services/workflowStorageCodec';

const expansion = () => buildExpansionWorkflow(cohort.patients, cohort.reports, cohort.histories);

describe('additional 50 synthetic patients', () => {
  it('adds exactly 45 critical cases, five stable recoveries and five first-time visitors', () => {
    expect(expandedScenarios).toHaveLength(50);
    expect(expandedScenarios.filter(patient => patient.critical)).toHaveLength(45);
    expect(expandedScenarios.filter(patient => patient.firstVisit)).toHaveLength(5);
    expect(new Set(expandedScenarios.map(patient => patient.conditions[0])).size).toBe(50);
    expect(scenarios.filter(patient => patient.number <= 50 && patient.critical)).toHaveLength(43);
    for (const department of new Set(expandedScenarios.map(patient => patient.department))) {
      expect(expandedScenarios.filter(patient => patient.department === department)).toHaveLength(10);
    }
  });

  it('links longitudinal records and does not invent earlier hospital visits for newcomers', () => {
    const seed = expansion();
    for (const patient of seed.patients) {
      const history = seed.histories.find(history => history.context.patient_id === patient.id)!;
      const first = Number(patient.uhid.slice(-4)) % 10 === 1;
      expect(history.encounters).toHaveLength(first ? 1 : 5);
      expect(history.immunizations).toEqual([]);
      expect(history.notes.length).toBeGreaterThanOrEqual(first ? 4 : 8);
      expect(seed.reports.some(report => report.patient_id === patient.id && report.kind === 'imaging')).toBe(true);
      const ownSources = new Set([history.context, ...history.encounters, ...history.notes, ...history.vitals, ...history.medications, ...history.orders, ...history.requests, ...history.work_items, ...seed.reports.filter(report => report.patient_id === patient.id)].map(record => record.id));
      for (const event of history.timeline) {
        expect(ownSources.has(event.source_id)).toBe(true);
        expect(event.available_at <= SNAPSHOT_AT).toBe(true);
      }
      for (const note of history.notes) {
        const encounter = history.encounters.find(encounter => encounter.id === note.encounter_id)!;
        expect(note.recorded_at >= encounter.started_at).toBe(true);
      }
    }
  });

  it('adds twenty discharge entries across all five departments, with no critical patient ready', () => {
    const state = expansion();
    expect(state.discharges).toHaveLength(20);
    expect(state.discharges.filter(record => record.status === 'planned')).toHaveLength(5);
    expect(state.discharges.filter(record => record.status === 'in_progress')).toHaveLength(13);
    expect(state.discharges.filter(record => record.status === 'ready')).toHaveLength(2);
    for (const record of state.discharges) {
      const patient = state.patients.find(patient => patient.id === record.patient_id)!;
      const blockers = dischargeBlockers(state, record);
      if (patient.acuity === 'critical') {
        expect(record.clinical_clearance).toBe(false);
        expect(record.status).not.toBe('ready');
        expect(blockers.length).toBeGreaterThan(0);
      }
      if (record.status === 'ready') expect(blockers).toEqual([]);
    }
    const summary = state.discharges.find(record => record.patient_id.endsWith('000060'))!;
    const documents = state.discharges.find(record => record.patient_id.endsWith('000070'))!;
    const approval = state.discharges.find(record => record.patient_id.endsWith('000080'))!;
    expect(dischargeBlockers(state, summary)).toContain('Discharge summary required');
    expect(dischargeBlockers(state, documents)).toContain('Documents not checked');
    expect(dischargeBlockers(state, approval)).toContain('Clinical clearance and rationale required');
  });

  it('merges missing patients once without resetting existing clinical work or discharge history', () => {
    const patientIds = new Set(cohort.patients.slice(0, 50).map(patient => patient.id));
    const current = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients.slice(0, 50), cohort.reports.filter(report => patientIds.has(report.patient_id)), cohort.histories.filter(history => patientIds.has(history.context.patient_id)));
    current.patients[0].name = 'Existing edited record';
    current.revision = 12;
    const merged = mergeNewPatients(current, expansion());
    expect(merged.patients).toHaveLength(100);
    expect(merged.patients[0].name).toBe('Existing edited record');
    expect(merged.histories.slice(0, 50)).toEqual(current.histories);
    expect(merged.discharges.slice(0, current.discharges.length)).toEqual(current.discharges);
    expect(merged.revision).toBe(13);
    expect(mergeNewPatients(merged, expansion())).toBe(merged);
    expect(current.patients).toHaveLength(50);
  });

  it('allows ready stable fixtures to complete and retain their discharge records', () => {
    let state = expansion();
    for (const record of state.discharges.filter(record => record.status === 'ready')) {
      state = applyWorkflowCommand(state, { type: 'discharge.update', id: crypto.randomUUID(), at: '2026-09-08T08:00:00.000Z', actor: record.owner,
        patient_id: record.patient_id, entity_id: record.id, expected_version: record.version, fields: {}, status: 'discharged' });
      expect(state.patients.find(patient => patient.id === record.patient_id)?.encounter).toMatch(/^Discharged/);
      expect(state.discharges.find(item => item.id === record.id)?.status).toBe('discharged');
    }
  });

  it('compresses the full cohort for browser storage and reads legacy uncompressed snapshots', async () => {
    const state = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
    const encoded = await encodeWorkflow(state);
    expect(encoded.length * 2).toBeLessThan(2_000_000);
    expect(await decodeWorkflow(encoded)).toEqual(state);
    expect(await decodeWorkflow(JSON.stringify(state))).toEqual(state);
  });
});
