import type { PatientHistory } from '../domain/longitudinal';

export function historyVisits(history: PatientHistory, search: string, kind: string) {
  const term = search.trim().toLowerCase();
  return [...history.encounters].filter(encounter => (kind === 'all' || encounter.kind === kind)
    && `${encounter.department} ${encounter.owner} ${encounter.reason} ${encounter.assessment} ${encounter.location}`.toLowerCase().includes(term))
    .sort((first, second) => second.started_at.localeCompare(first.started_at));
}

export function historyTimeline(history: PatientHistory, search: string, kind: string) {
  const term = search.trim().toLowerCase();
  return [...history.timeline].filter(entry => (kind === 'all' || entry.kind === kind)
    && `${entry.title} ${entry.source_system}`.toLowerCase().includes(term))
    .sort((first, second) => second.available_at.localeCompare(first.available_at));
}
