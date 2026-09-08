import { Button, Input, Tooltip, type InputProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import { AudioOutlined, LoadingOutlined } from '@ant-design/icons';
import { useVoiceRecorder, type VoiceRecorderStatus } from '../hooks/useVoiceRecorder';

function appendTranscript(current: string | undefined, text: string) {
  const trimmed = (current ?? '').trim();
  return trimmed ? `${trimmed} ${text}` : text;
}

export function Waveform() {
  return <span className="voice-waveform" aria-hidden="true"><span /><span /><span /><span /></span>;
}

function MicButton({ status, partialText, onStart, onStop, className }: {
  status: VoiceRecorderStatus; partialText?: string; onStart: () => void; onStop: () => void; className?: string;
}) {
  if (status === 'unavailable') return <Tooltip title="Voice input isn't available (microphone permission denied, or not configured)"><Button type="text" size="small" shape="circle" disabled icon={<AudioOutlined />} className={className} /></Tooltip>;
  if (status === 'transcribing') return <Button type="text" size="small" shape="circle" disabled icon={<LoadingOutlined spin />} className={className} />;
  if (status === 'recording') return <span className="voice-mic-active-wrap">
    <Tooltip title="Stop and insert"><Button type="text" size="small" shape="circle" danger icon={<Waveform />} className={`${className} voice-mic-recording`} onClick={onStop} /></Tooltip>
    {partialText && <span className="voice-live-caption">{partialText}</span>}
  </span>;
  return <Tooltip title="Speak to fill this field"><Button type="text" size="small" shape="circle" icon={<AudioOutlined />} className={className} onClick={onStart} /></Tooltip>;
}

export function VoiceInput({ value, onChange, ...rest }: InputProps) {
  const recorder = useVoiceRecorder(text => onChange?.({ target: { value: appendTranscript(value as string, text) } } as Parameters<NonNullable<InputProps['onChange']>>[0]));
  return <Input value={value} onChange={onChange} {...rest} suffix={<MicButton status={recorder.status} partialText={recorder.partialText} onStart={recorder.start} onStop={recorder.stop} className="voice-mic-btn" />} />;
}

export function VoiceTextArea({ value, onChange, ...rest }: TextAreaProps) {
  const recorder = useVoiceRecorder(text => onChange?.({ target: { value: appendTranscript(value as string, text) } } as Parameters<NonNullable<TextAreaProps['onChange']>>[0]));
  return <div className="voice-field-wrap">
    <Input.TextArea value={value} onChange={onChange} {...rest} />
    <MicButton status={recorder.status} partialText={recorder.partialText} onStart={recorder.start} onStop={recorder.stop} className="voice-mic-btn voice-mic-btn-overlay" />
  </div>;
}
