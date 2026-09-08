export type VoiceRecorderStatus = 'idle' | 'recording' | 'transcribing' | 'unavailable';

export interface VoiceRecorderHandle {
  status: VoiceRecorderStatus;
  partialText?: string;
  start: () => void;
  stop: () => void;
}
