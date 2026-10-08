import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  queryRequestSchema, REQUIRED_DOCUMENT_KINDS, REQUIRED_FIELD_KEYS, submissionRequestSchema,
  type InsurerClaimRecord, type InsurerReceipt, type StoredSubmission, type SubmissionRequest, type ValidationCheck,
} from '../src/domain/insurer.js';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_BODY_BYTES = 25 * 1024 * 1024;

export class InsurerHttpError extends Error {
  constructor(readonly status: number, message: string, readonly checks?: ValidationCheck[]) { super(message); }
}

/** Validates a packet the way the fictional insurer's intake would. Decodes every file, so checks are real. */
export function validatePacket(request: SubmissionRequest, stage: 'initial' | 'response'): ValidationCheck[] {
  const checks: ValidationCheck[] = [];
  const present = new Map(request.fields.map(field => [field.key, field.value.trim()]));
  if (stage === 'initial') {
    const missing = REQUIRED_FIELD_KEYS.filter(key => !present.get(key));
    checks.push({ name: 'Required claim fields', ok: !missing.length, detail: missing.length ? `Missing: ${missing.join(', ')}` : `${REQUIRED_FIELD_KEYS.length} required fields present` });
    const kinds = new Set(request.documents.map(doc => doc.kind));
    const absent = REQUIRED_DOCUMENT_KINDS.filter(kind => !kinds.has(kind));
    checks.push({ name: 'Required documents', ok: !absent.length, detail: absent.length ? `Missing: ${absent.join(', ')}` : `${REQUIRED_DOCUMENT_KINDS.length} required document types present` });
  } else {
    checks.push({ name: 'Supporting document', ok: request.documents.length > 0, detail: request.documents.length ? `${request.documents.length} document(s) supplied` : 'Response has no document' });
  }
  checks.push({ name: 'Narrative', ok: Boolean(request.narrative.trim()), detail: request.narrative.trim() ? 'Provided' : 'Narrative is empty' });
  for (const doc of request.documents) {
    const bytes = Buffer.from(doc.content_base64, 'base64');
    const isPdf = bytes.subarray(0, 5).toString('latin1') === '%PDF-';
    const hash = createHash('sha256').update(bytes).digest('hex');
    const problems = [
      !isPdf && 'not a PDF', bytes.length !== doc.bytes && `size ${bytes.length} ≠ declared ${doc.bytes}`,
      hash !== doc.sha256 && 'checksum mismatch', bytes.length > MAX_FILE_BYTES && 'file too large',
    ].filter(Boolean);
    checks.push({ name: `File · ${doc.filename}`, ok: !problems.length, detail: problems.length ? problems.join('; ') : `PDF · ${bytes.length} bytes · sha256 ${hash.slice(0, 12)}…` });
  }
  return checks;
}

const safeSegment = (value: string) => /^[A-Za-z0-9._-]+$/.test(value) && !value.includes('..');

/** Where the insurer demo keeps its data: a local folder in dev and tests, Supabase on Vercel. */
export interface InsurerBackend {
  list(): Promise<InsurerClaimRecord[]>;
  read(ref: string): Promise<InsurerClaimRecord | null>;
  write(record: InsurerClaimRecord): Promise<void>;
  writeFile(ref: string, filename: string, bytes: Buffer): Promise<void>;
  readFile(ref: string, filename: string): Promise<Buffer | null>;
  reset(): Promise<void>;
}

export function fileBackend(dir = join(process.cwd(), '.insurer-inbox')): InsurerBackend {
  const recordPath = (ref: string) => join(dir, ref, 'claim.json');
  const read = (ref: string): InsurerClaimRecord | null => existsSync(recordPath(ref)) ? JSON.parse(readFileSync(recordPath(ref), 'utf8')) as InsurerClaimRecord : null;
  return {
    async list() {
      if (!existsSync(dir)) return [];
      return readdirSync(dir).sort().map(read).filter((item): item is InsurerClaimRecord => item !== null);
    },
    async read(ref) { return read(ref); },
    async write(record) { mkdirSync(join(dir, record.ref, 'files'), { recursive: true }); writeFileSync(recordPath(record.ref), JSON.stringify(record, null, 2)); },
    async writeFile(ref, filename, bytes) { mkdirSync(join(dir, ref, 'files'), { recursive: true }); writeFileSync(join(dir, ref, 'files', filename), bytes); },
    async readFile(ref, filename) { const path = join(dir, ref, 'files', filename); return existsSync(path) ? readFileSync(path) : null; },
    async reset() { rmSync(dir, { recursive: true, force: true }); },
  };
}

export function memoryBackend(): InsurerBackend {
  const records = new Map<string, InsurerClaimRecord>(); const files = new Map<string, Buffer>();
  return {
    async list() { return [...records.values()].sort((a, b) => a.ref.localeCompare(b.ref)).map(item => structuredClone(item)); },
    async read(ref) { const item = records.get(ref); return item ? structuredClone(item) : null; },
    async write(record) { records.set(record.ref, structuredClone(record)); },
    async writeFile(ref, filename, bytes) { files.set(`${ref}/${filename}`, bytes); },
    async readFile(ref, filename) { return files.get(`${ref}/${filename}`) ?? null; },
    async reset() { records.clear(); files.clear(); },
  };
}

export function createInsurerStore(backend: InsurerBackend = fileBackend()) {
  const read = async (ref: string) => safeSegment(ref) ? backend.read(ref) : null;
  const receiptFor = (submission: StoredSubmission, ref: string): InsurerReceipt => ({
    claim_ref: ref, reference: submission.reference, received_at: submission.received_at, stage: submission.stage,
    files: submission.documents.map(doc => ({ filename: doc.filename, sha256: doc.sha256, bytes: doc.bytes })),
  });

  async function accept(request: SubmissionRequest, stage: 'initial' | 'response', existing: InsurerClaimRecord | null, now: string): Promise<InsurerReceipt> {
    const checks = validatePacket(request, stage);
    if (checks.some(check => !check.ok)) throw new InsurerHttpError(422, 'Packet failed insurer validation', checks);
    const ref = existing?.ref ?? `INS-${now.slice(0, 4)}-${String((await backend.list()).length + 1).padStart(4, '0')}`;
    const reference = stage === 'initial' ? ref : `${ref}-R1`;
    const record: InsurerClaimRecord = existing ?? { ref, claim_id: request.claim_id, hospital: request.hospital, status: 'received', submissions: [], queries: [] };
    const documents = await Promise.all(request.documents.map(async doc => {
      const filename = `${stage}-${doc.id}.pdf`;
      await backend.writeFile(ref, filename, Buffer.from(doc.content_base64, 'base64'));
      return { id: doc.id, kind: doc.kind, title: doc.title, filename, sha256: doc.sha256, bytes: doc.bytes };
    }));
    const submission: StoredSubmission = { stage, reference, claim_version: request.version, received_at: now, narrative: request.narrative, fields: request.fields, documents, checks };
    record.submissions.push(submission);
    if (stage === 'response') { record.queries.forEach(query => { query.status = 'answered'; }); record.status = 'response_received'; }
    await backend.write(record);
    return receiptFor(submission, ref);
  }

  return {
    async submit(input: unknown, now = new Date().toISOString()): Promise<InsurerReceipt> {
      const request = submissionRequestSchema.parse(input);
      const duplicate = (await backend.list()).find(item => item.claim_id === request.claim_id && item.submissions.some(s => s.stage === 'initial' && s.claim_version === request.version));
      if (duplicate) return receiptFor(duplicate.submissions.find(s => s.stage === 'initial')!, duplicate.ref);
      return accept(request, 'initial', null, now);
    },
    async respond(ref: string, input: unknown, now = new Date().toISOString()): Promise<InsurerReceipt> {
      const record = await read(ref);
      if (!record) throw new InsurerHttpError(404, 'Claim not found');
      const request = submissionRequestSchema.parse(input);
      const duplicate = record.submissions.find(s => s.stage === 'response' && s.claim_version === request.version);
      if (duplicate) return receiptFor(duplicate, ref);
      return accept(request, 'response', record, now);
    },
    async query(ref: string, input: unknown, now = new Date().toISOString()): Promise<InsurerClaimRecord> {
      const record = await read(ref);
      if (!record) throw new InsurerHttpError(404, 'Claim not found');
      const { kind, note } = queryRequestSchema.parse(input);
      if (record.queries.some(query => query.status === 'open')) throw new InsurerHttpError(409, 'A query is already open on this claim');
      record.queries.push({ id: `Q${record.queries.length + 1}`, at: now, kind, note, status: 'open' });
      record.status = 'query'; await backend.write(record); return record;
    },
    get: read,
    async list() { return (await backend.list()).reverse(); },
    async file(ref: string, name: string): Promise<Buffer | null> {
      if (!safeSegment(ref) || !safeSegment(name)) return null;
      return backend.readFile(ref, name);
    },
    reset: () => backend.reset(),
  };
}

export type InsurerStore = ReturnType<typeof createInsurerStore>;

async function readBody(req: IncomingMessage & { body?: unknown }): Promise<unknown> {
  if (req.body !== undefined && req.body !== null && req.body !== '') return typeof req.body === 'string' ? JSON.parse(req.body) : req.body; // Vercel pre-parses the body
  const chunks: Buffer[] = []; let size = 0;
  for await (const chunk of req) {
    size += Buffer.byteLength(chunk);
    if (size > MAX_BODY_BYTES) throw new InsurerHttpError(413, 'Packet too large');
    chunks.push(Buffer.from(chunk));
  }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new InsurerHttpError(400, 'Body must be JSON'); }
}

/** Handles /api/insurer/*. Mounted with a prefix-stripping middleware, so req.url starts at /claims. */
export async function handleInsurerRequest(req: IncomingMessage & { body?: unknown }, res: ServerResponse, store: InsurerStore) {
  const json = (status: number, body: unknown) => { res.statusCode = status; res.setHeader('content-type', 'application/json'); res.setHeader('cache-control', 'no-store'); res.end(JSON.stringify(body)); };
  try {
    const parts = new URL(req.url ?? '/', 'http://local').pathname.split('/').filter(Boolean).map(decodeURIComponent);
    if (parts[0] === 'api' && parts[1] === 'insurer') parts.splice(0, 2); // Vercel passes the full path
    const method = req.method ?? 'GET';
    if (parts[0] === 'reset' && method === 'POST') { await store.reset(); return json(200, { ok: true }); }
    if (parts[0] !== 'claims') return json(404, { error: 'Not found' });
    if (parts.length === 1 && method === 'GET') return json(200, { claims: await store.list() });
    if (parts.length === 1 && method === 'POST') return json(201, await store.submit(await readBody(req)));
    const ref = parts[1];
    if (parts.length === 2 && method === 'GET') { const record = await store.get(ref); return record ? json(200, record) : json(404, { error: 'Claim not found' }); }
    if (parts[2] === 'query' && method === 'POST') return json(201, await store.query(ref, await readBody(req)));
    if (parts[2] === 'response' && method === 'POST') return json(201, await store.respond(ref, await readBody(req)));
    if (parts[2] === 'files' && parts[3] && method === 'GET') {
      const bytes = await store.file(ref, parts[3]);
      if (!bytes) return json(404, { error: 'File not found' });
      res.statusCode = 200; res.setHeader('content-type', 'application/pdf'); res.setHeader('content-disposition', `inline; filename="${parts[3]}"`); res.end(bytes); return;
    }
    return json(405, { error: 'Method not allowed' });
  } catch (error) {
    if (error instanceof InsurerHttpError) return json(error.status, { error: error.message, checks: error.checks });
    if (error && typeof error === 'object' && 'issues' in error) return json(400, { error: 'Malformed packet' });
    return json(500, { error: error instanceof Error ? error.message : 'Insurer service failed' });
  }
}
