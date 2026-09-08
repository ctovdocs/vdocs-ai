import { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { blobToWav } from '../lib/wavEncode';
import { useVoiceMode } from '../lib/voiceMode';
import { useLiveVoiceRecorder } from './useLiveVoiceRecorder';
import type { VoiceRecorderStatus } from './voiceRecorderTypes';

export type { VoiceRecorderStatus };

function useSyncVoiceRecorder(onResult: (text: string) => void) {
  const [status, setStatus] = useState<VoiceRecorderStatus>('idle');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const onResultRef = useRef(onResult);
  useEffect(() => { onResultRef.current = onResult; });

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setStatus('unavailable'); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = event => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const recordedBlob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setStatus('transcribing');
        try {
          const wavBlob = await blobToWav(recordedBlob);
          const response = await fetch('/api/transcribe', { method: 'POST', headers: { 'content-type': 'audio/wav' }, body: wavBlob });
          if (response.status === 503) { setStatus('unavailable'); return; }
          if (!response.ok) {
            const payload = await response.json().catch(() => null);
            message.error(payload?.error ?? 'Voice transcription failed');
            setStatus('idle');
            return;
          }
          const data = await response.json();
          setStatus('idle');
          if (data.text) onResultRef.current(data.text);
          else message.info('No speech detected — try again.');
        } catch (error) {
          message.error(error instanceof Error ? error.message : 'Voice transcription failed');
          setStatus('idle');
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setStatus('recording');
    } catch { setStatus('unavailable'); }
  };

  const stop = () => mediaRecorderRef.current?.stop();

  return { status, partialText: undefined as string | undefined, start, stop };
}

/** Mode-aware voice recorder: delegates to push-to-talk (AssemblyAI Sync API) or live streaming
 * (AssemblyAI Streaming API) based on the app-wide VoiceModeToggle. Both sub-hooks are always
 * called (Rules of Hooks) — the inactive one is simply never started, so it stays inert. */
export function useVoiceRecorder(onResult: (text: string) => void) {
  const [mode] = useVoiceMode();
  const sync = useSyncVoiceRecorder(onResult);
  const live = useLiveVoiceRecorder(onResult);
  return mode === 'live' ? live : sync;
}
