import type { Report } from '../domain/models';

export function panelName(report: Report) {
  const title = report.title.toLowerCase();
  if (/\b(cbc|fbc)\b|complete blood count/.test(title)) return 'CBC';
  if (/\b(kft|rft)\b|renal|kidney function/.test(title)) return 'KFT / renal';
  if (/\blft\b|liver|hepatic/.test(title)) return 'LFT / liver';
  if (/urine routine|urinalysis|urine.*microscopy/.test(title)) return 'Urine routine';
  return report.title;
}
export const labSampleDate = (report: Report) => report.specimen_at ?? report.performed_at ?? report.reported_at;
export function selectTrendReports(reports: Report[], panel: string, count = 5, from = '', to = '') {
  return reports.filter(report => report.kind === 'lab' && panelName(report) === panel)
    .filter(report => (!from || Date.parse(labSampleDate(report)) >= Date.parse(`${from}T00:00:00+05:30`)) && (!to || Date.parse(labSampleDate(report)) < Date.parse(`${to}T00:00:00+05:30`) + 86400000))
    .sort((first, second) => Date.parse(labSampleDate(second)) - Date.parse(labSampleDate(first)) || first.id.localeCompare(second.id)).slice(0, count);
}
export function trendRows(reports: Report[]) {
  const rows = new Map<string, { key: string; name: string; unit: string; cells: Record<string, Report['observations'][number]> }>();
  for (const report of reports) for (const observation of report.observations) {
    const key = `${observation.name.trim().toLowerCase()}|${observation.unit.trim()}`;
    const row = rows.get(key) ?? { key, name: observation.name, unit: observation.unit, cells: {} };
    row.cells[report.id] = observation;
    rows.set(key, row);
  }
  return [...rows.values()];
}
export function numericLabValue(value: string | undefined) {
  return value !== undefined && /^-?\d+(\.\d+)?$/.test(value.trim()) ? Number(value) : null;
}
export function parseReferenceRange(reference: string | undefined): [number, number] | null {
  const match = reference?.match(/^\s*(-?\d+(?:\.\d+)?)\s*[–-]\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!match) return null;
  const low = Number(match[1]), high = Number(match[2]);
  return low < high ? [low, high] : null;
}
export const relativeToRange = (value: number, [low, high]: [number, number]) => (value - low) / (high - low) * 100;
export const flagStyle = {
  normal: { label: 'Within reference', colour: '#2e8b57', tint: '#e8f4ec', arrow: '' },
  low: { label: 'Below reference', colour: '#d9822b', tint: '#fbefe2', arrow: '↓' },
  high: { label: 'Above reference', colour: '#c0392b', tint: '#f9e6e4', arrow: '↑' },
} as const;
