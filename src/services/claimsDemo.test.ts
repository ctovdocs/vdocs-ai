import { beforeEach, describe, expect, it } from 'vitest';
import { cohort } from '../data/cohort';
import { buildExpansionWorkflow } from '../data/expansionWorkflow';
import type { ClaimAction, ClaimCase } from '../domain/claims';
import { claimBlockers, claimStorageKey, readClaim, readClaims, resetClaims, saveClaimAction, seedClaim, seedWorklist, transitionClaim } from './claimsDemo';

let state = buildExpansionWorkflow(cohort.patients, cohort.reports, cohort.histories);
let claim: ClaimCase;
const at = '2026-10-08T06:00:00.000Z';
const run = (action: ClaimAction) => { claim = transitionClaim(claim, action, state, at); return claim; };
const prepare = () => { run({ type: 'prepare' }); run({ type: 'attach_report' }); };
const approve = () => { run({ type: 'review_clinical', reviewed_version: claim.version }); run({ type: 'review_billing', reviewed_version: claim.version }); };
const submit = () => { if (claim.status === 'review') approve(); return run({ type: 'submit', reviewed_version: claim.version }); };
beforeEach(() => { state = buildExpansionWorkflow(cohort.patients, cohort.reports, cohort.histories); claim = seedClaim(state); });

describe('cashless claims demo', () => {
  it('assembles source-linked records, resolves the missing attachment, and completes the query loop', () => {
    const unchanged = structuredClone(state);
    run({ type: 'prepare' });
    expect(claim.status).toBe('needs_documents');
    expect(claimBlockers(claim)).toEqual(['Investigation report not attached']);
    const report = claim.documents.find(doc => doc.kind === 'investigation')!;
    expect(state.reports.some(item => item.id === report.source_id && item.encounter_id === claim.encounter_id)).toBe(true);
    run({ type: 'attach_report' });
    expect(claimBlockers(claim)).toEqual([]);
    submit();
    expect(claim.submission?.documents).toHaveLength(8);
    const submitted = structuredClone(claim.submission);
    run({ type: 'send_query' });
    run({ type: 'prepare_response' });
    expect(claim.response).toContain('₹18,400');
    run({ type: 'submit_response', reviewed_version: claim.version });
    run({ type: 'authorise' });
    expect(claim.status).toBe('authorised');
    expect(claim.authorised_amount! + claim.patient_payable!).toBe(claim.bill_total);
    expect(claim.settlement).toBe('pending');
    expect(claim.submission).toEqual(submitted);
    expect(claim.messages.map(item => item.kind)).toEqual(['receipt', 'query', 'response_receipt', 'authorisation']);
    expect(state).toEqual(unchanged);
    for (const event of claim.events) for (const id of event.evidence) expect(['packet', 'response', 'settlement_packet', ...claim.documents.map(doc => doc.id), ...claim.messages.map(message => message.id)]).toContain(id);
  });

  it('blocks early submission, early authorisation, and duplicate insurer events', () => {
    expect(() => submit()).toThrow();
    expect(() => run({ type: 'authorise' })).toThrow();
    prepare(); submit(); run({ type: 'send_query' });
    expect(() => run({ type: 'send_query' })).toThrow();
    expect(() => run({ type: 'authorise' })).toThrow();
  });

  it('requires renewed review after an edit and freezes the original submitted packet', () => {
    prepare();
    const reviewed = claim.version;
    run({ type: 'edit', text: 'Reviewed narrative' });
    expect(() => run({ type: 'submit', reviewed_version: reviewed })).toThrow('packet changed');
    submit();
    expect(claim.submission?.narrative).toBe('Reviewed narrative');
    expect(() => run({ type: 'edit', text: 'Changed after submission' })).toThrow();
    run({ type: 'send_query' }); run({ type: 'prepare_response' });
    const responseVersion = claim.version;
    run({ type: 'edit', text: 'Reviewed response with attached pharmacy bill.' });
    expect(() => run({ type: 'submit_response', reviewed_version: responseVersion })).toThrow('response changed');
  });

  it('rejects changed clinical sources until the packet is refreshed and reviewed', () => {
    prepare(); const reviewed = claim.version;
    state.discharges.find(item => item.id === claim.discharge_id)!.summary += '\nNew follow-up instructions.';
    expect(() => submit()).toThrow('source records changed');
    run({ type: 'prepare' });
    expect(claim.narrative).toContain('New follow-up instructions.');
    expect(() => run({ type: 'submit', reviewed_version: reviewed })).toThrow('packet changed');
    submit();
  });

  it('rejects documents belonging to another patient or admission', () => {
    prepare();
    claim.documents[0].patient_id = cohort.patients[0].id;
    expect(() => submit()).toThrow('does not match');
  });

  it('makes repeated submissions idempotent', () => {
    prepare(); submit(); const submitted = structuredClone(claim);
    submit(); expect(claim).toEqual(submitted);
    run({ type: 'send_query' }); run({ type: 'prepare_response' });
    run({ type: 'submit_response', reviewed_version: claim.version });
    const responded = structuredClone(claim);
    run({ type: 'submit_response', reviewed_version: claim.version });
    expect(claim).toEqual(responded);
  });

  it('persists across reloads, rejects stale windows, and resets only the claims snapshot', () => {
    const saved = new Map<string, string>([['clinical-work', 'preserve me']]);
    const storage = { getItem: (key: string) => saved.get(key) ?? null, setItem: (key: string, value: string) => { saved.set(key, value); } };
    const first = saveClaimAction(state, { type: 'prepare' }, 0, storage);
    expect(readClaim(state, storage)).toEqual(first);
    expect(() => saveClaimAction(state, { type: 'attach_report' }, 0, storage)).toThrow('another window');
    const reset = saveClaimAction(state, { type: 'reset' }, first.version, storage);
    expect(reset.status).toBe('draft'); expect(reset.events).toHaveLength(1);
    expect(reset.version).toBeGreaterThan(first.version);
    expect(saved.get('clinical-work')).toBe('preserve me');
    expect(saved.size).toBe(2);
    expect(saved.has(claimStorageKey(state.hospital_id))).toBe(true);
  });

  it('surfaces failed writes and invalid saved data instead of pretending success', () => {
    const storage = { getItem: () => null, setItem: () => { throw new Error('Storage full'); } };
    expect(() => saveClaimAction(state, { type: 'prepare' }, 0, storage)).toThrow('Storage full');
    expect(() => readClaim(state, { getItem: () => '{broken' })).toThrow();
  });
});

describe('ten-patient claims worklist', () => {
  it('starts with ten distinct patients and five fully documented, reconciled claims', () => {
    const before = structuredClone(state);
    const list = seedWorklist(state);
    expect(list.claims).toHaveLength(10);
    expect(new Set(list.claims.map(item => item.patient_id)).size).toBe(10);
    expect(list.claims.slice(0, 5).map(item => item.status)).toEqual(['draft', 'needs_documents', 'review', 'query', 'authorised']);
    const completed = list.claims.filter(item => item.status === 'completed');
    expect(completed).toHaveLength(5);
    for (const item of completed) {
      expect(item.settlement).toBe('reconciled');
      expect(item.paid_amount! + item.patient_collected!).toBe(item.bill_total);
      expect(item.utr).toMatch(/^DEMO-UTR-/);
      expect(item.completed_at).not.toBeNull();
      expect(item.settlement_submission?.documents).toEqual(item.documents);
      expect(item.documents.length).toBeGreaterThanOrEqual(9);
      expect(item.documents.every(doc => doc.attached && doc.patient_id === item.patient_id && doc.encounter_id === item.encounter_id)).toBe(true);
      expect(item.messages.map(message => message.kind)).toEqual(expect.arrayContaining(['receipt', 'authorisation', 'settlement_receipt', 'remittance', 'reconciliation']));
      expect(item.events.map(event => event.title)).toEqual(expect.arrayContaining(['Clinical documents reviewed', 'Billing & policy review complete', 'Claim completed & accounts reconciled']));
      expect(item.events.map(event => event.at)).toEqual(item.events.map(event => event.at).sort());
      expect(item.episode_label).toContain('historical');
      expect(state.histories.flatMap(history => history.encounters).some(encounter => encounter.id === item.encounter_id)).toBe(false);
      expect(item.documents.find(doc => doc.kind === 'summary')?.body).toContain('independent');
    }
    expect(state).toEqual(before);
  });

  it('requires both internal approvals and invalidates them when the form changes', () => {
    prepare();
    expect(() => run({ type: 'submit', reviewed_version: claim.version })).toThrow('Clinical and billing reviews');
    run({ type: 'review_clinical', reviewed_version: claim.version });
    expect(() => run({ type: 'submit', reviewed_version: claim.version })).toThrow('Clinical and billing reviews');
    run({ type: 'review_billing', reviewed_version: claim.version });
    const oldVersion = claim.version;
    run({ type: 'edit_form', fields: { ...claim.form, room_category: 'Twin sharing' } });
    expect(claim.clinical_review).toBeNull(); expect(claim.billing_review).toBeNull();
    expect(claim.documents.find(doc => doc.kind === 'claim_form')?.body).toContain('Twin sharing');
    expect(() => run({ type: 'submit', reviewed_version: oldVersion })).toThrow('packet changed');
    approve(); run({ type: 'submit', reviewed_version: claim.version });
    expect(claim.submission?.documents.find(doc => doc.kind === 'claim_form')?.body).toContain('Twin sharing');
  });

  it('supports approval without a query and requires payment reconciliation to complete', () => {
    prepare(); submit(); run({ type: 'authorise' });
    expect(claim.status).toBe('authorised'); expect(claim.completed_at).toBeNull();
    expect(() => run({ type: 'reconcile' })).toThrow();
    expect(() => run({ type: 'receive_payment' })).toThrow();
    run({ type: 'submit_settlement' }); run({ type: 'receive_payment' });
    expect(claim.status).toBe('payment_received');
    claim.paid_amount! -= 100;
    expect(() => run({ type: 'reconcile' })).toThrow('does not reconcile');
    claim.paid_amount = claim.authorised_amount;
    run({ type: 'reconcile' });
    expect(claim.status).toBe('completed');
    expect(() => run({ type: 'reconcile' })).toThrow();
    expect(() => run({ type: 'edit', text: 'Change closed claim' })).toThrow();
  });

  it('changes only the selected claim and restores five completed cases without touching clinical data', () => {
    const saved = new Map<string, string>([['clinical-work', 'preserved']]);
    const storage = { getItem: (key: string) => saved.get(key) ?? null, setItem: (key: string, value: string) => { saved.set(key, value); } };
    const list = readClaims(state, storage);
    const target = list.claims.find(item => item.uhid === 'F-DEMO-0060')!;
    saveClaimAction(state, { type: 'attach_report' }, target.version, storage, target.id);
    const changed = readClaims(state, storage);
    expect(changed.claims.find(item => item.id === target.id)?.status).toBe('review');
    expect(changed.claims.filter(item => item.id !== target.id)).toEqual(list.claims.filter(item => item.id !== target.id));
    expect(() => resetClaims(state, list.revision, storage)).toThrow('another window');
    const restored = resetClaims(state, changed.revision, storage);
    expect(restored.claims.filter(item => item.status === 'completed')).toHaveLength(5);
    expect(restored.claims.find(item => item.id === target.id)?.status).toBe('needs_documents');
    expect(saved.get('clinical-work')).toBe('preserved');
    expect(readClaims(state, storage)).toEqual(restored);
  });

  it('preserves the original single-case submission while adding nine records', () => {
    prepare(); submit();
    const legacy = JSON.parse(JSON.stringify(claim));
    for (const key of ['form', 'department', 'owner', 'episode_label', 'pharmacy_total', 'deduction', 'clinical_review', 'billing_review', 'paid_amount', 'patient_collected', 'utr', 'completed_at']) delete legacy[key];
    legacy.documents = legacy.documents.filter((doc: { kind: string }) => ['summary', 'bill', 'investigation', 'pharmacy', 'preauth'].includes(doc.kind));
    const raw = JSON.stringify(legacy);
    const migrated = readClaims(state, { getItem: key => key.includes('.v1.') ? raw : null });
    expect(migrated.claims).toHaveLength(10);
    expect(migrated.claims[0].submission).toEqual(claim.submission);
    expect(migrated.claims[0].status).toBe('submitted');
    expect(migrated.claims[0].documents.length).toBeGreaterThan(legacy.documents.length);
    expect(migrated.claims.filter(item => item.status === 'completed')).toHaveLength(5);
  });
});
