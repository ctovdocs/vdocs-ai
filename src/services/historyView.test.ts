import { describe, expect, it } from 'vitest';
import { cohort } from '../data/cohort';
import { historyTimeline, historyVisits } from './historyView';

describe('patient history navigation', () => {
  const history = cohort.histories[0];
  it('orders visits newest first without changing source records', () => {
    const before = structuredClone(history);
    const visits = historyVisits(history, '', 'all');
    expect(visits.map(visit => visit.started_at)).toEqual([...visits.map(visit => visit.started_at)].sort().reverse());
    expect(history).toEqual(before);
  });
  it('filters by visit type and case-insensitive clinician or assessment search', () => {
    expect(historyVisits(history, '', 'IPD').every(visit => visit.kind === 'IPD')).toBe(true);
    expect(historyVisits(history, `  ${history.encounters[0].owner.toUpperCase()}  `, 'all').some(visit => visit.id === history.encounters[0].id)).toBe(true);
    expect(historyVisits(history, 'no-such-clinician-or-diagnosis', 'all')).toEqual([]);
  });
  it('filters and chronologically sorts timeline activity without mutating it', () => {
    const before = structuredClone(history.timeline);
    const events = historyTimeline(history, '', 'note');
    expect(events.every(entry => entry.kind === 'note')).toBe(true);
    expect(events.map(entry => entry.available_at)).toEqual([...events.map(entry => entry.available_at)].sort().reverse());
    expect(historyTimeline(history, 'missing-source-or-event', 'all')).toEqual([]);
    expect(history.timeline).toEqual(before);
  });
});
