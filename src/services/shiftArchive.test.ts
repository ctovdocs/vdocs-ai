import { describe, expect, it } from 'vitest';
import { patchArchiveParams, shiftRoster } from './shiftArchive';
import { cohort, DEMO_HOSPITAL_ID } from '../data/cohort';
import { initialWorkflowState } from './workflowEngine';

describe('shift archive navigation and coverage', () => {
  it('preserves all filters and page size when opening and closing a packet', () => {
    const before = new URLSearchParams('doctor=Dr.+Mehta&search=renal&department=Nephrology&status=draft&from=2026-09-01&to=2026-09-09&page=2&size=5');
    const open = patchArchiveParams(before, { shift: 'packet-id' });
    expect(open.get('page')).toBe('2');
    expect(patchArchiveParams(open, { shift: null, id: null }).toString()).toBe(before.toString());
    expect(before.has('shift')).toBe(false);
  });
  it('includes department patients and open incoming referrals, but excludes unrelated patients and OPD', () => {
    const state = initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
    const roster = shiftRoster(state, 'Nephrology');
    for (const patient of roster) {
      const history = state.histories.find(history => history.context.patient_id === patient.id)!;
      const active = history.encounters.find(encounter => encounter.kind === 'IPD' && encounter.status === 'active')!;
      expect(active).toBeDefined();
      expect(patient.department === 'Nephrology' || history.requests.some(request => request.encounter_id === active.id && request.to_department === 'Nephrology' && !['completed', 'cancelled'].includes(request.status))).toBe(true);
    }
    expect(roster.some(patient => patient.department !== 'Nephrology')).toBe(true);
    expect(roster.some(patient => state.discharges.some(record => record.patient_id === patient.id && record.status === 'planned'))).toBe(true);
  });
});
