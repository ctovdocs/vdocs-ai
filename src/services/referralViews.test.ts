import { describe, expect, it } from 'vitest';
import { cohort } from '../data/cohort';
import { matchesReferralDates, matchesReferralScope } from './referralViews';
import { patchArchiveParams } from './shiftArchive';

describe('referral views', () => {
  it('separates receiving clinician from referring clinician and departmental direction', () => {
    const request = { ...cohort.histories.flatMap(history => history.requests)[0], owner: 'Dr. Receiver', requested_by: 'Dr. Sender', from_department: 'Internal Medicine', to_department: 'Cardiology' };
    expect(matchesReferralScope(request, 'incoming', 'Dr. Receiver', 'Cardiology')).toBe(true);
    expect(matchesReferralScope(request, 'outgoing', 'Dr. Receiver', '')).toBe(false);
    expect(matchesReferralScope(request, 'outgoing', 'Dr. Sender', 'Internal Medicine')).toBe(true);
    expect(matchesReferralScope(request, 'incoming', '', 'Internal Medicine')).toBe(false);
    expect(matchesReferralScope({ ...request, requested_by: undefined }, 'outgoing', 'Dr. Sender', '')).toBe(false);
    expect(matchesReferralScope(request, 'incoming', '', 'Cardiology')).toBe(true);
  });
  it('uses inclusive calendar dates in IST for custom ranges', () => {
    expect(matchesReferralDates('2026-09-10T18:30:00Z', 'custom', '2026-09-11', '2026-09-11')).toBe(true);
    expect(matchesReferralDates('2026-09-11T18:29:59Z', 'custom', '2026-09-11', '2026-09-11')).toBe(true);
    expect(matchesReferralDates('2026-09-11T18:30:00Z', 'custom', '2026-09-11', '2026-09-11')).toBe(false);
    expect(matchesReferralDates('2026-09-10T10:00:00Z', 'yesterday', '', '', new Date('2026-09-11T10:00:00Z'))).toBe(true);
  });
  it('retains doctor, department, dates and page when closing referral details', () => {
    const filters = new URLSearchParams('doctor=Dr.+Receiver&department=Cardiology&direction=incoming&range=custom&from=2026-09-01&to=2026-09-11&status=received&page=2');
    const opened = patchArchiveParams(filters, { id: 'referral-id' });
    expect(patchArchiveParams(opened, { id: null }).toString()).toBe(filters.toString());
  });
});
