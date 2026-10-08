import { createHash } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { REQUIRED_DOCUMENT_KINDS, REQUIRED_FIELD_KEYS, type SubmissionRequest } from '../src/domain/insurer.js';
import { createInsurerStore, fileBackend, handleInsurerRequest, InsurerHttpError, memoryBackend, type InsurerBackend } from './insurer.js';

const pdf = (text: string) => Buffer.from(`%PDF-1.4\n${text}\n%%EOF`);
const doc = (kind: string, bytes = pdf(kind)) => ({ id: kind, kind, title: kind, filename: `${kind}.pdf`, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length, content_base64: bytes.toString('base64') });
const request = (overrides: Partial<SubmissionRequest> = {}): SubmissionRequest => ({
  claim_id: 'cashless-0090', version: 5, hospital: 'Demo Hospital', narrative: 'Narrative',
  fields: REQUIRED_FIELD_KEYS.map(key => ({ key, label: key, value: `v-${key}`, source: 'test' })),
  documents: REQUIRED_DOCUMENT_KINDS.map(kind => doc(kind)), ...overrides,
});

let dir: string;
beforeEach(() => { dir = mkdtempSync(join(tmpdir(), 'insurer-')); });
afterEach(() => { rmSync(dir, { recursive: true, force: true }); });

const backends: Array<[string, () => InsurerBackend]> = [['local folder', () => fileBackend(dir)], ['in-memory (same contract as Supabase)', () => memoryBackend()]];

describe.each(backends)('demo insurer service · %s', (_name, make) => {
  it('starts empty, then stores the exact fields and files it received', async () => {
    const store = createInsurerStore(make());
    expect(await store.list()).toEqual([]);
    const receipt = await store.submit(request(), '2026-10-08T06:00:00.000Z');
    expect(receipt.claim_ref).toBe('INS-2026-0001');
    const record = (await store.get(receipt.claim_ref))!;
    expect(record.submissions[0].fields.find(field => field.key === 'member_id')?.value).toBe('v-member_id');
    expect((await store.file(receipt.claim_ref, 'initial-summary.pdf'))?.toString()).toContain('%PDF-1.4');
  });

  it('rejects missing documents and bad files with reasons', async () => {
    const store = createInsurerStore(make());
    const missing = request({ documents: request().documents.filter(item => item.kind !== 'bill') });
    const error = await store.submit(missing).catch(e => e) as InsurerHttpError;
    expect(error).toBeInstanceOf(InsurerHttpError);
    expect(error.checks?.find(check => !check.ok)?.detail).toContain('bill');
    const notPdf = doc('summary', Buffer.from('plain text'));
    await expect(store.submit(request({ documents: [...request().documents.filter(item => item.kind !== 'summary'), notPdf] }))).rejects.toThrow(/validation/);
    const tampered = { ...doc('summary'), sha256: 'a'.repeat(64) };
    await expect(store.submit(request({ documents: [...request().documents.filter(item => item.kind !== 'summary'), tampered] }))).rejects.toThrow(/validation/);
    expect(await store.list()).toEqual([]);
  });

  it('is idempotent per claim version', async () => {
    const store = createInsurerStore(make());
    const first = await store.submit(request());
    expect((await store.submit(request())).claim_ref).toBe(first.claim_ref);
    expect(await store.list()).toHaveLength(1);
    expect((await store.submit(request({ version: 6 }))).claim_ref).toBe('INS-2026-0002');
  });

  it('carries a query and the hospital response on the same claim', async () => {
    const store = createInsurerStore(make());
    const { claim_ref } = await store.submit(request());
    expect((await store.query(claim_ref, { kind: 'pharmacy', note: 'Send the pharmacy bill' })).status).toBe('query');
    await expect(store.query(claim_ref, { kind: 'pharmacy', note: 'again' })).rejects.toThrow(/already open/);
    const receipt = await store.respond(claim_ref, request({ version: 8, fields: [], narrative: 'Attached', documents: [doc('pharmacy')] }));
    expect(receipt.reference).toBe(`${claim_ref}-R1`);
    const record = (await store.get(claim_ref))!;
    expect(record.status).toBe('response_received');
    expect(record.queries[0].status).toBe('answered');
    expect(record.submissions.map(item => item.stage)).toEqual(['initial', 'response']);
  });

  it('keeps a full insurer-side history, in order, across the whole claim', async () => {
    const store = createInsurerStore(make());
    const { claim_ref } = await store.submit(request(), '2026-10-08T06:00:00.000Z');
    await store.query(claim_ref, { kind: 'pharmacy', note: 'Send the pharmacy bill' }, '2026-10-08T06:05:00.000Z');
    await store.respond(claim_ref, request({ version: 8, fields: [], documents: [doc('pharmacy')] }), '2026-10-08T06:10:00.000Z');
    await expect(store.event(claim_ref, { kind: 'payment', detail: 'too early' })).rejects.toThrow(/before settlement/);
    await store.event(claim_ref, { kind: 'authorisation', detail: 'Authorised', amount: 64400 }, '2026-10-08T06:15:00.000Z');
    await store.event(claim_ref, { kind: 'settlement', detail: 'Packet received', reference: 'DEMO-SET-0090' }, '2026-10-08T06:20:00.000Z');
    await store.event(claim_ref, { kind: 'payment', detail: 'Remitted', amount: 64400, reference: 'UTR1' }, '2026-10-08T06:25:00.000Z');
    const again = await store.event(claim_ref, { kind: 'payment', detail: 'Remitted', amount: 64400 }); // retry is a no-op
    expect(again.events).toHaveLength(6);
    const closed = await store.event(claim_ref, { kind: 'reconciliation', detail: 'Closed' }, '2026-10-08T06:30:00.000Z');
    expect(closed.status).toBe('closed');
    expect(closed.events?.map(event => event.kind)).toEqual(['received', 'query', 'response', 'authorisation', 'settlement', 'payment', 'reconciliation']);
    expect(closed.events?.find(event => event.kind === 'authorisation')?.amount).toBe(64400);
    expect((await store.get(claim_ref))?.events).toHaveLength(7); // persisted, not recomputed
  });

  it('rejects unknown event kinds and unknown claims', async () => {
    const store = createInsurerStore(make());
    const { claim_ref } = await store.submit(request());
    await expect(store.event(claim_ref, { kind: 'refund', detail: 'x' })).rejects.toThrow();
    await expect(store.event('INS-2026-9999', { kind: 'authorisation', detail: 'x' })).rejects.toThrow(/not found/);
  });

  it('does not serve files outside a claim folder', async () => {
    const store = createInsurerStore(make());
    const { claim_ref } = await store.submit(request());
    expect(await store.file(claim_ref, '../claim.json')).toBeNull();
    expect(await store.get('../x')).toBeNull();
    await expect(store.respond('INS-2026-9999', request())).rejects.toThrow(/not found/);
  });
});

describe('insurer HTTP handler', () => {
  const call = async (store: ReturnType<typeof createInsurerStore>, method: string, url: string, body?: unknown) => {
    let status = 0; let payload = '';
    const res = { statusCode: 200, setHeader() {}, end(chunk?: string | Buffer) { status = this.statusCode; payload = chunk?.toString() ?? ''; } };
    await handleInsurerRequest({ method, url, body } as never, res as never, store);
    return { status, json: payload.startsWith('{') ? JSON.parse(payload) : payload };
  };

  it('accepts the Vercel shape: full /api/insurer path and a pre-parsed body', async () => {
    const store = createInsurerStore(memoryBackend());
    const created = await call(store, 'POST', '/api/insurer/claims', request());
    expect(created.status).toBe(201);
    expect(created.json.claim_ref).toBe('INS-2026-0001');
    const listed = await call(store, 'GET', '/api/insurer/claims');
    expect(listed.json.claims).toHaveLength(1);
    const file = await call(store, 'GET', `/api/insurer/claims/${created.json.claim_ref}/files/initial-bill.pdf`);
    expect(file.status).toBe(200);
  });

  it('maps failures to status codes', async () => {
    const store = createInsurerStore(memoryBackend());
    expect((await call(store, 'POST', '/claims', { claim_id: 'x' })).status).toBe(400);
    expect((await call(store, 'GET', '/claims/INS-2026-9999')).status).toBe(404);
    const rejected = await call(store, 'POST', '/claims', request({ documents: [] }));
    expect(rejected.status).toBe(422);
    expect(rejected.json.checks.some((check: { ok: boolean }) => !check.ok)).toBe(true);
    expect((await call(store, 'DELETE', '/claims')).status).toBe(405);
  });
});
