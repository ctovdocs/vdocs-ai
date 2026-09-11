export type VoiceRecorderStatus = 'idle' | 'recording' | 'transcribing' | 'cleaning' | 'unavailable';

export interface VoiceRecorderHandle {
  status: VoiceRecorderStatus;
  partialText?: string;
  start: () => void;
  stop: () => void;
}
