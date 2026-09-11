import { z } from 'zod';

export const medicalVocabulary = ['creatinine', 'potassium', 'HbA1c', 'metformin', 'atorvastatin', 'amlodipine', 'losartan', 'nephrology', 'troponin', 'haemoglobin'];
export const cleanupRequestSchema = z.object({ transcript: z.string().trim().min(1).max(20000), purpose: z.string().max(200).default('Clinical dictation') });
export const cleanupResultSchema = z.object({ cleanedText: z.string().trim().min(1).max(24000), reviewWarnings: z.array(z.string().max(500)).max(20) });
export type CleanupResult = z.infer<typeof cleanupResultSchema>;

export function validateCleanup(original: string, proposed: CleanupResult): CleanupResult {
  const markers = (text: string) => text.toLowerCase().match(/\d+(?:\.\d+)?|\b(?:no|not|denies|without|suspected|possible|possibly|uncertain|mg|mcg|ml|mmol|units)\b/g) ?? [];
  if (JSON.stringify(markers(original)) !== JSON.stringify(markers(proposed.cleanedText))) return { cleanedText: original, reviewWarnings: ['Possible change to a number, unit, negation or uncertainty. Original dictation retained for review.'] };
  if (proposed.reviewWarnings.length) return { ...proposed, cleanedText: original };
  return proposed;
}

export function appendDictation(current: string, text: string) {
  return current ? `${current}${/\s$/.test(current) ? '' : ' '}${text}` : text;
}

export class VoiceTurns {
  private turns = new Map<number, { text: string; final: boolean }>();
  update(turn: { turn_order?: number; transcript?: string; end_of_turn?: boolean }) {
    if (!Number.isInteger(turn.turn_order) || turn.turn_order! < 0 || typeof turn.transcript !== 'string') return;
    const previous = this.turns.get(turn.turn_order!);
    if (previous?.final && !turn.end_of_turn) return;
    this.turns.set(turn.turn_order!, { text: turn.transcript, final: Boolean(turn.end_of_turn) });
  }
  text() { return [...this.turns].sort(([first], [second]) => first - second).map(([, turn]) => turn.text.trim()).filter(Boolean).join(' '); }
}
