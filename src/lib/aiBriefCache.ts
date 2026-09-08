import type { AiSummaryResult } from '../services/aiAssistant';

function fingerprint(payload: unknown): string {
  const text = JSON.stringify(payload);
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

interface CachedBrief { fingerprint: string; result: AiSummaryResult }

function storageKey(patientId: string) {
  return `vdoc-ai-brief:${patientId}`;
}

export function computeBriefFingerprint(payload: unknown): string {
  return fingerprint(payload);
}

export function loadCachedBrief(patientId: string): CachedBrief | null {
  try {
    const raw = localStorage.getItem(storageKey(patientId));
    return raw ? JSON.parse(raw) as CachedBrief : null;
  } catch { return null; }
}

export function saveCachedBrief(patientId: string, fingerprintValue: string, result: AiSummaryResult) {
  try { localStorage.setItem(storageKey(patientId), JSON.stringify({ fingerprint: fingerprintValue, result })); } catch { /* storage unavailable */ }
}
