import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type VoiceMode = 'pushToTalk' | 'live';

const STORAGE_KEY = 'vdoc-voice-mode';
const VoiceModeContext = createContext<[VoiceMode, (mode: VoiceMode) => void] | null>(null);

function readStored(): VoiceMode {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'live' ? 'live' : 'pushToTalk';
}

export function VoiceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<VoiceMode>(readStored);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, mode); }, [mode]);
  return <VoiceModeContext.Provider value={[mode, setMode]}>{children}</VoiceModeContext.Provider>;
}

export function useVoiceMode() {
  const context = useContext(VoiceModeContext);
  if (!context) throw new Error('useVoiceMode must be used within VoiceModeProvider');
  return context;
}
