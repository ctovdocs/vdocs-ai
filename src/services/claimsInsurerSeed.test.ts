import { describe, expect, it } from 'vitest';
import { cohort } from '../data/cohort';
import { buildExpansionWorkflow } from '../data/expansionWorkflow';
import { createInsurerStore, memoryBackend } from '../../server/insurer';
import type { InsurerClaimRecord, InsurerReceipt, SubmissionRequest } from '../domain/insurer';
import { seedWorklist } from './claimsDemo';
import { needsInsurerSeed, replayClaimToInsurer, type InsurerClient } from './claimsInsurerSeed';

const state = buildExpansionWorkflow(cohort.patients, cohort.reports, cohort.histories);
const clientFor = (store: ReturnType<typeof createInsurerStore>): InsurerClient => ({
  send: request => store.submit(request) as Promise<InsurerReceipt>,
  respond: (ref, request: SubmissionRequest) => store.respond(ref, request),
  get: async ref => (await store.get(ref)) as InsurerClaimRecord,
  query: (ref, note, at) => store.query(ref, { kind: 'pharmacy', note, at }),
  event: (ref, event) => store.event(ref, event),
});

describe('replaying seeded claims into the insurer service', () => {
  const list = seedWorklist(state);
  const claim = (status: string) => list.claims.find(item => item.status === status)!;

  it('only claims past submission with a demo reference need replay (7 of 10)', () => {
    expect(list.claims.filter(needsInsurerSeed)).toHaveLength(7);
    expect(needsInsurerSeed(list.claims[0])).toBe(false);
  });

  it('replays a fully completed claim with real PDFs, the query, the response and every decision, on the claim timeline', async () => {
    const store = createInsurerStore(memoryBackend()); const done = list.claims.find(item => item.status === 'completed' && item.messages.some(message => message.kind === 'query'))
      ?? claim('completed');
    const ref = await replayClaimToInsurer(done, state, clientFor(store));
    const record = (await store.get(ref))!;
    expect(record.status).toBe('closed');
    expect(record.events!.map(event => event.kind)).toEqual(expect.arrayContaining(['received', 'authorisation', 'settlement', 'payment', 'reconciliation']));
    expect(record.submissions[0].documents.length).toBeGreaterThanOrEqual(8);
    expect(record.submissions[0].received_at).toBe(done.submission!.at);
    expect(record.events!.at(-1)!.at).toBe(done.messages.find(message => message.kind === 'reconciliation')!.at);
    expect(Buffer.from((await store.file(ref, record.submissions[0].documents[0].filename))!).subarray(0, 5).toString('latin1')).toBe('%PDF-');
  });

  it.each(['submitted', 'query', 'authorised', 'settlement_submitted', 'payment_received'])('replays a %s claim to the matching insurer status', async status => {
    const store = createInsurerStore(memoryBackend());
    const ref = await replayClaimToInsurer(claim(status), state, clientFor(store));
    const expected = { submitted: 'received', query: 'query', authorised: 'authorised', settlement_submitted: 'settlement_received', payment_received: 'paid' }[status];
    expect((await store.get(ref))!.status).toBe(expected);
  });

  it('is idempotent and resumes a partly replayed claim without duplicating history', async () => {
    const store = createInsurerStore(memoryBackend()); const client = clientFor(store); const target = claim('payment_received');
    const first = await replayClaimToInsurer(target, state, client);
    const again = await replayClaimToInsurer(target, state, client);
    expect(again).toBe(first);
    const record = (await store.get(first))!;
    expect(record.events!.map(event => event.kind).sort()).toEqual([...new Set(record.events!.map(event => event.kind))].sort());
    expect(await store.list()).toHaveLength(1);
  });

  it('gives different claims different insurer references', async () => {
    const store = createInsurerStore(memoryBackend()); const client = clientFor(store);
    const refs = [await replayClaimToInsurer(claim('submitted'), state, client), await replayClaimToInsurer(claim('authorised'), state, client)];
    expect(new Set(refs).size).toBe(2);
  });
});
