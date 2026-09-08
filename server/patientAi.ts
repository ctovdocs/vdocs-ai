import { callProvider, type AiProvider } from './aiProviders.js';

export type RecordType = 'encounter' | 'note' | 'vital' | 'medication' | 'order' | 'request' | 'work_item' | 'immunization' | 'report';
const RECORD_TYPES: RecordType[] = ['encounter', 'note', 'vital', 'medication', 'order', 'request', 'work_item', 'immunization', 'report'];

interface Citation { record_type: string; record_id: string; label?: string }
interface FindingCitation { text: string; record_type: string; record_id: string }

interface PatientAiRequest {
  mode: 'summary' | 'ask';
  patient: Record<string, unknown>;
  history: {
    encounters?: { id: string }[]; notes?: { id: string }[]; vitals?: { id: string }[]; medications?: { id: string }[];
    orders?: { id: string }[]; requests?: { id: string }[]; work_items?: { id: string }[]; immunizations?: { id: string }[];
  };
  reports?: { id: string }[];
  question?: string;
  priorTurns?: { role: 'user' | 'assistant'; content: string }[];
}

function buildIdIndex(request: PatientAiRequest): Record<RecordType, Set<string>> {
  const history = request.history ?? {};
  return {
    encounter: new Set((history.encounters ?? []).map(record => record.id)),
    note: new Set((history.notes ?? []).map(record => record.id)),
    vital: new Set((history.vitals ?? []).map(record => record.id)),
    medication: new Set((history.medications ?? []).map(record => record.id)),
    order: new Set((history.orders ?? []).map(record => record.id)),
    request: new Set((history.requests ?? []).map(record => record.id)),
    work_item: new Set((history.work_items ?? []).map(record => record.id)),
    immunization: new Set((history.immunizations ?? []).map(record => record.id)),
    report: new Set((request.reports ?? []).map(record => record.id)),
  };
}

function isValidCitation(index: Record<RecordType, Set<string>>, citation: { record_type?: string; record_id?: string }) {
  if (!citation.record_type || !citation.record_id) return false;
  if (!RECORD_TYPES.includes(citation.record_type as RecordType)) return false;
  return index[citation.record_type as RecordType].has(citation.record_id);
}

const SHARED_RULES = `You are a clinical chart assistant embedded in a hospital workspace. You will be given one patient's full record as JSON: demographics, encounters, notes, vitals, medications, orders, care-coordination requests, work items, immunizations, and lab/imaging reports.

Rules:
- Answer only from the JSON provided. Never invent a value, date, name, or record that is not present.
- Every factual statement must be traceable to a specific record via its "id" field and its record type.
- record_type must be exactly one of: encounter, note, vital, medication, order, request, work_item, immunization, report.
- If the data does not contain the answer, say so plainly instead of guessing — do not produce a citation for something not present.
- Distinguish historical/past findings from the patient's current status when it matters.
- Respond with ONLY a single valid JSON object. No markdown fences, no commentary, no text outside the JSON.`;

function buildSystemPrompt(mode: 'summary' | 'ask') {
  if (mode === 'summary') {
    return `${SHARED_RULES}

Task: produce a short clinical brief for the treating doctor.
JSON shape required:
{
  "summary": string (3-5 sentences covering presentation, current status, and what's notable),
  "criticalFindings": [{ "text": string, "record_type": string, "record_id": string }],
  "pendingWork": [{ "text": string, "record_type": string, "record_id": string }]
}
Only include a criticalFinding if it is a genuinely abnormal or urgent documented finding (not routine/normal results). Only include pendingWork for orders/requests/tasks that are actually pending. Omit either array if there is nothing to report (use an empty array).`;
  }
  return `${SHARED_RULES}

Task: answer the doctor's question about this specific patient, briefly (1-3 sentences).
JSON shape required:
{
  "answer": string,
  "citations": [{ "record_type": string, "record_id": string, "label": string (a short human-readable label for this source, e.g. "CBC — 4 Sep 2026") }]
}
If the question asks for a value or event not present in the data, say so directly in "answer" and return an empty citations array.`;
}

function buildUserContent(request: PatientAiRequest) {
  const context = { patient: request.patient, history: request.history, reports: request.reports ?? [] };
  if (request.mode === 'summary') return `Patient record:\n${JSON.stringify(context)}`;
  const priorTurns = request.priorTurns?.length ? `\n\nPrior conversation turns:\n${JSON.stringify(request.priorTurns)}` : '';
  return `Patient record:\n${JSON.stringify(context)}\n\nDoctor's question: ${request.question}${priorTurns}`;
}

function extractJson(raw: string): unknown {
  const trimmed = raw.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  const candidate = start >= 0 && end > start ? trimmed.slice(start, end + 1) : trimmed;
  return JSON.parse(candidate);
}

export interface ProviderEnv { provider: AiProvider; model: string; apiKey: string }

export function resolveProviderEnv(env: Record<string, string | undefined>): ProviderEnv | null {
  const provider = env.AI_PROVIDER as AiProvider | undefined;
  const model = env.AI_MODEL;
  if (!provider || !model) return null;
  const apiKey = provider === 'anthropic' ? env.ANTHROPIC_API_KEY : provider === 'openai' ? env.OPENAI_API_KEY : provider === 'gemini' ? env.GEMINI_API_KEY : undefined;
  if (!apiKey) return null;
  return { provider, model, apiKey };
}

export async function handlePatientAiRequest(body: PatientAiRequest, providerEnv: ProviderEnv) {
  const system = buildSystemPrompt(body.mode);
  const user = buildUserContent(body);
  const raw = await callProvider(providerEnv, system, user);
  const parsed = extractJson(raw) as Record<string, unknown>;
  const index = buildIdIndex(body);

  if (body.mode === 'summary') {
    const criticalFindings = (Array.isArray(parsed.criticalFindings) ? parsed.criticalFindings as FindingCitation[] : []).filter(finding => isValidCitation(index, finding));
    const pendingWork = (Array.isArray(parsed.pendingWork) ? parsed.pendingWork as FindingCitation[] : []).filter(finding => isValidCitation(index, finding));
    return { summary: String(parsed.summary ?? ''), criticalFindings, pendingWork, generatedAt: new Date().toISOString() };
  }
  const citations = (Array.isArray(parsed.citations) ? parsed.citations as Citation[] : []).filter(citation => isValidCitation(index, citation));
  return { answer: String(parsed.answer ?? ''), citations, generatedAt: new Date().toISOString() };
}
