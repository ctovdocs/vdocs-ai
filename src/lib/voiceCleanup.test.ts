import { afterEach, describe, expect, it, vi } from 'vitest';
import { appendDictation, cleanupRequestSchema, validateCleanup, VoiceTurns } from './voiceCleanup';
import { cleanVoice } from '../../server/voiceCleanup';

afterEach(() => vi.unstubAllGlobals());
describe('English dictation cleanup', () => {
  it('replaces turn revisions, deduplicates deliveries and preserves meaningful repetitions', () => {
    const turns = new VoiceTurns();
    turns.update({ turn_order: 0, transcript: 'patient' });
    turns.update({ turn_order: 0, transcript: 'Patient is stable.', end_of_turn: true });
    turns.update({ turn_order: 0, transcript: 'Patient is stable.', end_of_turn: true });
    turns.update({ turn_order: 0, transcript: 'stale partial' });
    turns.update({ turn_order: 1, transcript: 'No, no fever.', end_of_turn: true });
    expect(turns.text()).toBe('Patient is stable. No, no fever.');
    expect(new VoiceTurns().text()).toBe('');
  });
  it('rejects changes to safety markers and retains ambiguous input', () => {
    for (const cleanedText of ['Give 50 mg.', 'Give 5 mcg.']) expect(validateCleanup('Give 5 mg.', { cleanedText, reviewWarnings: [] }).cleanedText).toBe('Give 5 mg.');
    expect(validateCleanup('No fever.', { cleanedText: 'Fever.', reviewWarnings: [] }).cleanedText).toBe('No fever.');
    expect(validateCleanup('Possible infection.', { cleanedText: 'Infection.', reviewWarnings: [] }).cleanedText).toBe('Possible infection.');
    expect(validateCleanup('Five, no fifty.', { cleanedText: 'Fifty.', reviewWarnings: ['Ambiguous correction'] }).cleanedText).toBe('Five, no fifty.');
    expect(validateCleanup('Um creatinine 2.1 mg.', { cleanedText: 'Creatinine 2.1 mg.', reviewWarnings: [] }).cleanedText).toBe('Creatinine 2.1 mg.');
  });
  it('preserves existing whitespace and validates length and silence', () => {
    expect(appendDictation('Existing note.\n', 'New text.')).toBe('Existing note.\nNew text.');
    expect(cleanupRequestSchema.safeParse({ transcript: ' ' }).success).toBe(false);
    expect(cleanupRequestSchema.safeParse({ transcript: 'a'.repeat(20001) }).success).toBe(false);
  });
  it('falls back without configuration or on provider failures', async () => {
    const body = { transcript: 'Original dictation.' };
    expect((await cleanVoice(body, {})).cleanedText).toBe(body.transcript);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('timeout')));
    expect(await cleanVoice(body, { GEMINI_API_KEY: 'test', VOICE_CLEANUP_MODEL: 'test' })).toMatchObject({ cleanedText: body.transcript });
  });
  it.each([undefined, '', 'custom-model'])('uses the existing Gemini key with model override %s', async model => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify({ cleanedText: 'Patient is stable.', reviewWarnings: [] }) }] } }] }) });
    vi.stubGlobal('fetch', fetcher);
    expect(await cleanVoice({ transcript: 'Um patient patient is stable.' }, { GEMINI_API_KEY: 'test', VOICE_CLEANUP_MODEL: model })).toEqual({ cleanedText: 'Patient is stable.', reviewWarnings: [] });
    expect(fetcher.mock.calls[0][0]).toContain(`/models/${model || 'gemini-2.5-flash'}:generateContent`);
    expect(fetcher.mock.calls[0][1].headers['x-goog-api-key']).toBe('test');
    expect(JSON.parse(fetcher.mock.calls[0][1].body).generationConfig.responseMimeType).toBe('application/json');
    expect(fetcher.mock.calls[0][0]).not.toContain('key=');
  });
  it('retains original when provider output is malformed', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: '{}' }] } }] }) }));
    expect((await cleanVoice({ transcript: 'Keep this.' }, { GEMINI_API_KEY: 'test', VOICE_CLEANUP_MODEL: 'test' })).cleanedText).toBe('Keep this.');
  });
});
