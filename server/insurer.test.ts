import { createHash } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { REQUIRED_DOCUMENT_KINDS, REQUIRED_FIELD_KEYS, type SubmissionRequest } from '../src/domain/insurer.js';
import { createInsurerStore, InsurerHttpError } from './insurer.js';

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

describe('demo insurer service', () => {
  it('starts empty, then stores the exact fields and files it received', () => {
    const store = createInsurerStore(dir);
    expect(store.list()).toEqual([]);
    const receipt = store.submit(request(), '2026-10-08T06:00:00.000Z');
    expect(receipt.claim_ref).toBe('INS-2026-0001');
    const record = store.get(receipt.claim_ref)!;
    expect(record.submissions[0].fields.find(field => field.key === 'member_id')?.value).toBe('v-member_id');
    expect(store.file(receipt.claim_ref, 'initial-summary.pdf')?.toString()).toContain('%PDF-1.4');
  });

  it('rejects missing documents and bad files with reasons', () => {
    const store = createInsurerStore(dir);
    const missing = request({ documents: request().documents.filter(item => item.kind !== 'bill') });
    expect(() => store.submit(missing)).toThrow(InsurerHttpError);
    try { store.submit(missing); } catch (error) { expect((error as InsurerHttpError).checks?.find(check => !check.ok)?.detail).toContain('bill'); }
    const notPdf = doc('summary', Buffer.from('plain text'));
    expect(() => store.submit(request({ documents: [...request().documents.filter(item => item.kind !== 'summary'), notPdf] }))).toThrow(/validation/);
    const tampered = { ...doc('summary'), sha256: 'a'.repeat(64) };
    expect(() => store.submit(request({ documents: [...request().documents.filter(item => item.kind !== 'summary'), tampered] }))).toThrow(/validation/);
    expect(store.list()).toEqual([]);
  });

  it('is idempotent per claim version', () => {
    const store = createInsurerStore(dir);
    const first = store.submit(request());
    expect(store.submit(request()).claim_ref).toBe(first.claim_ref);
    expect(store.list()).toHaveLength(1);
    expect(store.submit(request({ version: 6 })).claim_ref).toBe('INS-2026-0002');
  });

  it('carries a query and the hospital response on the same claim', () => {
    const store = createInsurerStore(dir);
    const { claim_ref } = store.submit(request());
    expect(store.query(claim_ref, { kind: 'pharmacy', note: 'Send the pharmacy bill' }).status).toBe('query');
    expect(() => store.query(claim_ref, { kind: 'pharmacy', note: 'again' })).toThrow(/already open/);
    const receipt = store.respond(claim_ref, request({ version: 8, fields: [], narrative: 'Attached', documents: [doc('pharmacy')] }));
    expect(receipt.reference).toBe(`${claim_ref}-R1`);
    const record = store.get(claim_ref)!;
    expect(record.status).toBe('response_received');
    expect(record.queries[0].status).toBe('answered');
    expect(record.submissions.map(item => item.stage)).toEqual(['initial', 'response']);
  });

  it('does not serve files outside a claim folder', () => {
    const store = createInsurerStore(dir);
    const { claim_ref } = store.submit(request());
    expect(store.file(claim_ref, '../claim.json')).toBeNull();
    expect(store.get('../x')).toBeNull();
    expect(() => store.respond('INS-2026-9999', request())).toThrow(/not found/);
  });
});
