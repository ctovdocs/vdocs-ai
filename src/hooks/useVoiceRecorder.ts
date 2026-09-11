import { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { blobToWav } from '../lib/wavEncode';
import { useVoiceMode } from '../lib/voiceMode';
import { useLiveVoiceRecorder } from './useLiveVoiceRecorder';
import type { VoiceRecorderStatus } from './voiceRecorderTypes';
import { cleanupResultSchema, type CleanupResult } from '../lib/voiceCleanup';

export type { VoiceRecorderStatus };

function useSyncVoiceRecorder(onResult: (text: string) => void) {
  const [status, setStatus] = useState<VoiceRecorderStatus>('idle');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const onResultRef = useRef(onResult);
  const mounted = useRef(true);
  const busy = useRef(false);
  const request = useRef<AbortController | null>(null);
  useEffect(() => { mounted.current = true; return () => {
    mounted.current = false;
    request.current?.abort();
    const recorder = mediaRecorderRef.current;
    if (recorder) { recorder.onstop = null; if (recorder.state !== 'inactive') recorder.stop(); recorder.stream.getTracks().forEach(track => track.stop()); }
  }; }, []);
  useEffect(() => { onResultRef.current = onResult; });

  const start = async () => {
    if (busy.current) return;
    busy.current = true;
    if (!navigator.mediaDevices?.getUserMedia) { busy.current = false; setStatus('unavailable'); return; }
    setStatus('transcribing');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) { stream.getTracks().forEach(track => track.stop()); return; }
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = event => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const recordedBlob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setStatus('transcribing');
        const abort = new AbortController(); request.current = abort;
        const timeout = window.setTimeout(() => abort.abort(), 60000);
        try {
          const wavBlob = await blobToWav(recordedBlob);
          if (!mounted.current) return;
          const response = await fetch('/api/transcribe', { method: 'POST', headers: { 'content-type': 'audio/wav' }, body: wavBlob, signal: abort.signal });
          if (!mounted.current) return;
          if (response.status === 503) { setStatus('unavailable'); return; }
          if (!response.ok) {
            const payload = await response.json().catch(() => null);
            message.error(payload?.error ?? 'Voice transcription failed');
            setStatus('idle');
            return;
          }
          const data = await response.json();
          if (!mounted.current) return;
          setStatus('idle');
          if (data.text) onResultRef.current(data.text);
          else message.info('No speech detected — try again.');
        } catch (error) {
          if (!mounted.current) return;
          message.error(error instanceof Error ? error.message : 'Voice transcription failed');
          setStatus('idle');
        } finally { busy.current = false; window.clearTimeout(timeout); }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setStatus('recording');
    } catch { busy.current = false; if (mounted.current) setStatus('unavailable'); }
  };

  const stop = () => { if (mediaRecorderRef.current?.state === 'recording') { setStatus('transcribing'); mediaRecorderRef.current.stop(); } };

  return { status, partialText: undefined as string | undefined, start, stop };
}

/** Mode-aware voice recorder: delegates to push-to-talk (AssemblyAI Sync API) or live streaming
 * (AssemblyAI Streaming API) based on the app-wide VoiceModeToggle. Both sub-hooks are always
 * called (Rules of Hooks) — the inactive one is simply never started, so it stays inert. */
export function useVoiceRecorder(onResult: (text: string, original: string, warnings: string[]) => void, purpose = 'Clinical dictation') {
  const [mode] = useVoiceMode();
  const [sessionMode, setSessionMode] = useState(mode);
  const [cleaning, setCleaning] = useState(false);
  const callback = useRef(onResult);
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  useEffect(() => { callback.current = onResult; });
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; controller.current?.abort(); }; }, []);
  const complete = async (original: string) => {
    setCleaning(true);
    const abort = new AbortController(); controller.current = abort;
    const timeout = window.setTimeout(() => abort.abort(), 11000);
    let result: CleanupResult = { cleanedText: original, reviewWarnings: ['Cleanup unavailable. Original dictation retained.'] };
    try {
      const response = await fetch('/api/voice-cleanup', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ transcript: original, purpose: purpose.slice(0, 200) }), signal: abort.signal });
      if (response.ok) result = cleanupResultSchema.parse(await response.json());
    } catch { result = { cleanedText: original, reviewWarnings: ['Cleanup failed or timed out. Original dictation retained.'] }; }
    finally { window.clearTimeout(timeout); }
    if (!mounted.current) return;
    setCleaning(false);
    callback.current(result.cleanedText, original, result.reviewWarnings);
  };
  const sync = useSyncVoiceRecorder(text => { void complete(text); });
  const live = useLiveVoiceRecorder(text => { void complete(text); });
  const recorder = sessionMode === 'live' ? live : sync;
  return { ...recorder, status: cleaning ? 'cleaning' as const : recorder.status, start: () => {
    if (cleaning || !['idle', 'unavailable'].includes(recorder.status)) return;
    setSessionMode(mode);
    void (mode === 'live' ? live : sync).start();
  } };
}
