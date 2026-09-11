import { useRef, useState } from 'react';
import { Alert, Button, Popover, Space } from 'antd';
import { useVoiceRecorder } from './useVoiceRecorder';
import { appendDictation } from '../lib/voiceCleanup';

type Recovery = { original: string; cleaned: string; warnings: string[]; inserted: string | null; before: string };
export function useDictationField(value: string, emit: (value: string) => void, purpose: string, disabled?: boolean) {
  const baseline = useRef(value);
  const [recovery, setRecovery] = useState<Recovery | null>(null);
  const recorder = useVoiceRecorder((cleaned, original, warnings) => {
    const unchanged = value === baseline.current && !disabled;
    const inserted = unchanged ? appendDictation(value, cleaned) : null;
    setRecovery({ original, cleaned, warnings, inserted, before: value });
    if (inserted !== null) emit(inserted);
  }, purpose);
  const start = () => { baseline.current = value; setRecovery(null); recorder.start(); };
  const insert = (original = false) => {
    if (!recovery || disabled) return;
    const text = original ? recovery.original : recovery.cleaned;
    const inserted = appendDictation(value, text);
    emit(inserted);
    setRecovery({ ...recovery, before: value, inserted });
  };
  const undo = () => {
    if (!recovery || recovery.inserted !== value || disabled) return;
    const inserted = appendDictation(recovery.before, recovery.original);
    emit(inserted); setRecovery({ ...recovery, cleaned: recovery.original, inserted });
  };
  const controls = recovery && <div className="voice-recovery">
    {recovery.warnings.length > 0 && <Alert type="warning" showIcon title={recovery.warnings.join(' ')} />}
    {recovery.inserted === null && <span role="status">Field changed while processing. Review and insert dictation below.</span>}
    <Space size={4} wrap>
      <Popover trigger="click" title="Original dictation" content={<div className="voice-original">{recovery.original}</div>}><Button size="small" type="link">Original</Button></Popover>
      {recovery.inserted === null ? <><Popover trigger="click" title="Dictation to insert" content={<div className="voice-original">{recovery.cleaned}</div>}><Button size="small" type="link">Preview</Button></Popover><Button disabled={disabled} size="small" onClick={() => insert()}>Insert dictation</Button><Button disabled={disabled} size="small" onClick={() => insert(true)}>Insert original</Button></>
        : recovery.cleaned !== recovery.original && <Button size="small" type="link" disabled={disabled || value !== recovery.inserted} onClick={undo}>Undo cleanup</Button>}
      <Button size="small" type="text" onClick={() => setRecovery(null)}>Dismiss</Button>
    </Space>
  </div>;
  return { recorder: { ...recorder, start }, controls };
}
