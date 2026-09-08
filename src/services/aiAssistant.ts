import type { Patient, Report } from '../domain/models';
import type { PatientHistory } from '../domain/longitudinal';

export interface AiCitation { record_type: string; record_id: string; label?: string }
export interface AiFinding { text: string; record_type: string; record_id: string }
export interface AiSummaryResult { summary: string; criticalFindings: AiFinding[]; pendingWork: AiFinding[]; generatedAt: string }
export interface AiAskResult { answer: string; citations: AiCitation[]; generatedAt: string }
export interface AiChatTurn { role: 'user' | 'assistant'; content: string }

export type AiOutcome<T> = { status: 'ok'; data: T } | { status: 'unavailable' } | { status: 'error'; message: string };

const proxyUrl = import.meta.env.VITE_AI_PROXY_URL as string | undefined;

async function callProxy<T>(body: Record<string, unknown>): Promise<AiOutcome<T>> {
  if (!proxyUrl) return { status: 'unavailable' };
  try {
    const response = await fetch(proxyUrl, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (response.status === 503) return { status: 'unavailable' };
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      return { status: 'error', message: payload?.error ?? `AI request failed (${response.status})` };
    }
    return { status: 'ok', data: await response.json() as T };
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : 'AI request failed' };
  }
}

export function summarizePatient(patient: Patient, history: PatientHistory, reports: Report[]) {
  return callProxy<AiSummaryResult>({ mode: 'summary', patient, history, reports });
}

export function askAboutPatient(patient: Patient, history: PatientHistory, reports: Report[], question: string, priorTurns: AiChatTurn[] = []) {
  return callProxy<AiAskResult>({ mode: 'ask', patient, history, reports, question, priorTurns });
}
