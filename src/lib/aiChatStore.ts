import { supabase } from './supabase';
import type { AiChatTurn, AiCitation } from '../services/aiAssistant';

export interface StoredChatMessage extends AiChatTurn {
  citations?: AiCitation[];
  error?: boolean;
  at: string;
}

const ANON_KEY_STORAGE = 'vdoc-anon-doctor-id';
let cachedDoctorKey: string | null = null;

export async function getDoctorKey(): Promise<string> {
  if (cachedDoctorKey) return cachedDoctorKey;
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user.id) { cachedDoctorKey = data.session.user.id; return cachedDoctorKey; }
  }
  const stored = localStorage.getItem(ANON_KEY_STORAGE);
  if (stored) { cachedDoctorKey = stored; return stored; }
  const generated = crypto.randomUUID();
  localStorage.setItem(ANON_KEY_STORAGE, generated);
  cachedDoctorKey = generated;
  return generated;
}

function storageKey(doctorKey: string, patientId: string) {
  return `vdoc-ai-chat:${doctorKey}:${patientId}`;
}

export function loadChat(doctorKey: string, patientId: string): StoredChatMessage[] {
  try {
    const raw = localStorage.getItem(storageKey(doctorKey, patientId));
    return raw ? JSON.parse(raw) as StoredChatMessage[] : [];
  } catch { return []; }
}

export function saveChat(doctorKey: string, patientId: string, messages: StoredChatMessage[]) {
  try { localStorage.setItem(storageKey(doctorKey, patientId), JSON.stringify(messages)); } catch { /* storage unavailable */ }
}
