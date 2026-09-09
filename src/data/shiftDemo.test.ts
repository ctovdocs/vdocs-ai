import { describe, expect, it } from 'vitest';
import { cohort, DEMO_HOSPITAL_ID } from './cohort';
import { initialWorkflowState } from '../services/workflowEngine';
import { seedShiftDemo, SHIFT_DEMO_MARKER } from './shiftDemo';

describe('ten synthetic shift packets', () => {
  const base = () => initialWorkflowState(DEMO_HOSPITAL_ID, cohort.patients, cohort.reports, cohort.histories);
  const at = '2026-09-09T12:00:00.000Z';
  it('loads fixed-date demonstration fixtures without waiting for the browser clock', () => {
    const state = seedShiftDemo(base(), '2026-09-08T07:31:00.000Z');
    expect(state.handovers).toHaveLength(120);
    expect(state.commands).toContain(SHIFT_DEMO_MARKER);
    expect(state.audit.at(-1)?.at).toBe('2026-09-08T07:31:00.000Z');
  });
  it('adds ten complete packets with twelve patients each, clinical activity and varied workflow states', () => {
    const before = base();
    const state = seedShiftDemo(before, at);
    const packets = [...new Set(state.handovers.map(record => record.shift_id))];
    expect(packets).toHaveLength(10);
    for (const packet of packets) expect(state.handovers.filter(record => record.shift_id === packet)).toHaveLength(12);
    for (const packet of packets) expect(state.handovers.filter(record => record.shift_id === packet && state.patients.find(patient => patient.id === record.patient_id)?.department !== record.department)).toHaveLength(2);
    expect(state.handovers.filter(record => record.status === 'draft')).toHaveLength(24);
    expect(state.handovers.filter(record => record.status === 'approved')).toHaveLength(24);
    expect(state.handovers.filter(record => record.status === 'received')).toHaveLength(72);
    expect(state.histories.flatMap(history => history.notes).length - before.histories.flatMap(history => history.notes).length).toBe(240);
    for (const record of state.handovers) {
      expect(record.source_snapshot?.filter(source => /^7[23]000000/.test(source.id) && source.scope === 'shift' && source.author === record.from_doctor)).toHaveLength(2);
      expect(record.source_snapshot?.every(source => source.at <= record.captured_at!)).toBe(true);
      expect(record.source_snapshot?.some(source => source.type === 'request')).toBe(true);
    }
  });
  it('preserves existing edits and is idempotent', () => {
    const before = base();
    before.histories[0].notes[0].body = 'Preserve clinician edits';
    const state = seedShiftDemo(before, at);
    expect(state.histories[0].notes[0].body).toBe('Preserve clinician edits');
    expect(state.patients).toEqual(before.patients);
    expect(state.commands).toContain(SHIFT_DEMO_MARKER);
    expect(state.revision).toBe(before.revision + 1);
    expect(seedShiftDemo(state, at)).toBe(state);
    expect(before.commands).not.toContain(SHIFT_DEMO_MARKER);
  });
  it('fails without partial writes when the required patient cohort is missing', () => {
    const before = base();
    before.patients = before.patients.slice(0, 10);
    expect(() => seedShiftDemo(before, at)).toThrow('10 department');
    expect(before.handovers).toHaveLength(0);
  });
});
