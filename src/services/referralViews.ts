import type { PatientHistory } from '../domain/longitudinal';
import { withinDateRange } from '../lib/dateRange';

type Request = PatientHistory['requests'][number];
export function matchesReferralScope(request: Request, direction: string, doctor: string, department: string) {
  return (!doctor || (direction === 'incoming' ? request.owner : request.requested_by) === doctor)
    && (!department || (direction === 'incoming' ? request.to_department : request.from_department) === department);
}

export function matchesReferralDates(at: string, range: string, from: string, to: string, now = new Date()) {
  if (range !== 'custom') return withinDateRange(at, range, now);
  const value = new Date(at).getTime();
  return (!from || value >= new Date(`${from}T00:00:00+05:30`).getTime())
    && (!to || value < new Date(`${to}T00:00:00+05:30`).getTime() + 86_400_000);
}
