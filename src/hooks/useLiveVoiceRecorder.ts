import { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { startPcmCapture } from '../lib/pcmCapture';
import { medicalVocabulary, VoiceTurns } from '../lib/voiceCleanup';
import type { VoiceRecorderStatus } from './voiceRecorderTypes';

export function useLiveVoiceRecorder(onResult: (text: string) => void) {
  const [status, setStatus] = useState<VoiceRecorderStatus>('idle');
  const [partialText, setPartialText] = useState('');
  const active = useRef(false);
  const mounted = useRef(true);
  const finishRef = useRef<(() => void) | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);
  const callback = useRef(onResult);
  useEffect(() => { callback.current = onResult; });
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; cancelRef.current?.(); }; }, []);

  const start = async () => {
    if (active.current) return;
    active.current = true;
    setStatus('transcribing');
    let disposed = false;
    const controller = new AbortController();
    const release: (() => void)[] = [() => controller.abort()];
    const cleanup = () => { disposed = true; for (const stop of release) stop(); active.current = false; };
    cancelRef.current = cleanup;
    try {
      const response = await fetch('/api/transcribe-token', { method: 'POST', signal: controller.signal });
      if (!response.ok) throw new Error('Could not start dictation. Check voice configuration.');
      const { token } = await response.json();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (disposed || !mounted.current) { stream.getTracks().forEach(track => track.stop()); return; }
      release.push(() => stream.getTracks().forEach(track => track.stop()));
      const params = new URLSearchParams({ sample_rate: '16000', speech_model: 'universal-3-5-pro', domain: 'medical-v1', mode: 'max_accuracy', min_turn_silence: '800', max_turn_silence: '3600', keyterms_prompt: JSON.stringify(medicalVocabulary) });
      params.set('token', token);
      const socket = new WebSocket(`wss://streaming.assemblyai.com/v3/ws?${params}`);
      release.push(() => socket.close());
      const turns = new VoiceTurns();
      let delivered = false;
      let stopCapture = () => {};
      const deliver = (interrupted = false) => {
        if (delivered || disposed) return;
        delivered = true;
        const text = turns.text();
        cleanup();
        if (!mounted.current) return;
        setStatus('idle'); setPartialText('');
        if (interrupted) message.warning('Dictation connection interrupted. Recovered text may be incomplete; review before saving.');
        if (text) callback.current(text);
        else message.info('No speech detected — try again.');
      };
      const connectTimeout = window.setTimeout(() => deliver(true), 15000);
      release.push(() => window.clearTimeout(connectTimeout));
      socket.onopen = () => {
        if (disposed) return;
        window.clearTimeout(connectTimeout);
        try {
          const capture = startPcmCapture(stream, chunk => { if (socket.readyState === WebSocket.OPEN) socket.send(chunk); });
          stopCapture = () => capture.stop(); release.push(stopCapture);
          setStatus('recording');
        } catch { deliver(true); }
      };
      socket.onmessage = event => {
        if (disposed) return;
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'Turn') { turns.update(data); setPartialText(turns.text()); }
          else if (data.type === 'Termination') deliver();
          else if (data.type === 'Error') deliver(true);
        } catch { deliver(true); }
      };
      socket.onerror = () => deliver(true);
      socket.onclose = () => deliver(true);
      finishRef.current = () => {
        stopCapture(); stream.getTracks().forEach(track => track.stop());
        setStatus('transcribing');
        if (socket.readyState !== WebSocket.OPEN) { deliver(true); return; }
        socket.send(JSON.stringify({ type: 'Terminate' }));
        const timeout = window.setTimeout(() => deliver(true), 5000);
        release.push(() => window.clearTimeout(timeout));
      };
    } catch {
      if (!disposed && mounted.current) { message.error('Could not start dictation. Check microphone permission and configuration.'); setStatus('idle'); }
      cleanup();
    }
  };
  return { status, partialText, start, stop: () => finishRef.current?.() };
}
