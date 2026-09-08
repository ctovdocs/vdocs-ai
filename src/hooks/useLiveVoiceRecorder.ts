import { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { startPcmCapture, type PcmCapture } from '../lib/pcmCapture';
import type { VoiceRecorderStatus } from './voiceRecorderTypes';

interface TurnMessage {
  type: 'Turn';
  transcript?: string;
  end_of_turn?: boolean;
  turn_is_formatted?: boolean;
}
interface ErrorMessage { type: 'Error'; error?: string }
type StreamMessage = TurnMessage | ErrorMessage | { type: 'Begin' | 'Termination' | 'SpeechStarted' | 'Heartbeat' };

const CONNECTION_PARAMS = {
  sample_rate: '16000',
  speech_model: 'universal-3-5-pro',
  domain: 'medical-v1',
  mode: 'max_accuracy',
  min_turn_silence: '800',
  max_turn_silence: '3600',
};

export function useLiveVoiceRecorder(onResult: (text: string) => void) {
  const [status, setStatus] = useState<VoiceRecorderStatus>('idle');
  const [partialText, setPartialText] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const captureRef = useRef<PcmCapture | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const onResultRef = useRef(onResult);
  useEffect(() => { onResultRef.current = onResult; });

  const cleanup = () => {
    captureRef.current?.stop();
    captureRef.current = null;
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    wsRef.current = null;
  };

  useEffect(() => () => { wsRef.current?.close(); cleanup(); }, []);

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setStatus('unavailable'); return; }
    try {
      const tokenResponse = await fetch('/api/transcribe-token', { method: 'POST' });
      if (tokenResponse.status === 503) { setStatus('unavailable'); return; }
      if (!tokenResponse.ok) { message.error('Could not start live dictation'); setStatus('idle'); return; }
      const { token } = await tokenResponse.json() as { token: string };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const params = new URLSearchParams({ ...CONNECTION_PARAMS, token });
      const ws = new WebSocket(`wss://streaming.assemblyai.com/v3/ws?${params.toString()}`);
      wsRef.current = ws;
      setPartialText('');

      ws.onopen = () => {
        captureRef.current = startPcmCapture(stream, chunk => { if (ws.readyState === WebSocket.OPEN) ws.send(chunk); });
        setStatus('recording');
      };
      ws.onmessage = event => {
        const data = JSON.parse(event.data) as StreamMessage;
        if (data.type === 'Turn') {
          if (data.end_of_turn && data.turn_is_formatted) {
            setPartialText('');
            if (data.transcript) onResultRef.current(data.transcript);
          } else {
            setPartialText(data.transcript ?? '');
          }
        } else if (data.type === 'Error') {
          message.error(data.error ?? 'Live dictation error');
        } else if (data.type === 'Termination') {
          cleanup();
          setStatus('idle');
          setPartialText('');
        }
      };
      ws.onerror = () => message.error('Live dictation connection failed');
      ws.onclose = () => { cleanup(); setStatus('idle'); setPartialText(''); };
    } catch {
      setStatus('unavailable');
    }
  };

  const stop = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'Terminate' }));
      setStatus('transcribing');
    } else {
      cleanup();
      setStatus('idle');
    }
  };

  return { status, partialText, start, stop };
}
