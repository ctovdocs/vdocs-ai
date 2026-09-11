import { Button, ConfigProvider, Input, Tooltip, type InputProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import { AudioOutlined, LoadingOutlined } from '@ant-design/icons';
import type { VoiceRecorderStatus } from '../hooks/useVoiceRecorder';
import { useDictationField } from '../hooks/useDictationField';

export function Waveform() {
  return <span className="voice-waveform" aria-hidden="true"><span /><span /><span /><span /></span>;
}

function MicButton({ status, partialText, onStart, onStop, className, disabled }: {
  status: VoiceRecorderStatus; partialText?: string; onStart: () => void; onStop: () => void; className?: string; disabled?: boolean;
}) {
  if (status === 'unavailable') return <Tooltip title="Microphone unavailable"><Button aria-label="Microphone unavailable" type="text" size="small" disabled icon={<AudioOutlined />} className={className} /></Tooltip>;
  if (status === 'transcribing' || status === 'cleaning') return <span className="voice-progress" role="status"><LoadingOutlined spin /> {status === 'cleaning' ? 'Cleaning dictation…' : 'Processing speech…'}</span>;
  if (status === 'recording') return <span className="voice-mic-active-wrap">
    <Tooltip title="Stop and clean"><Button aria-label="Stop dictation" type="text" size="small" danger icon={<Waveform />} className={className} onClick={onStop} /></Tooltip>
    {partialText && <span className="voice-live-caption">{partialText}</span>}
  </span>;
  return <Tooltip title="Dictate in English"><Button aria-label="Start English dictation" disabled={disabled} type="text" size="small" icon={<AudioOutlined />} className={className} onClick={onStart} /></Tooltip>;
}


export function VoiceInput({ value, onChange, ...rest }: InputProps) {
  const { componentDisabled } = ConfigProvider.useConfig();
  const disabled = (rest.disabled ?? componentDisabled) || rest.readOnly;
  const emit = (next: string) => onChange?.({ target: { value: next } } as Parameters<NonNullable<InputProps['onChange']>>[0]);
  const field = useDictationField(String(value ?? ''), emit, String(rest.placeholder ?? 'Clinical field'), disabled);
  return <div><Input value={value} onChange={onChange} {...rest} suffix={<MicButton {...field.recorder} onStart={field.recorder.start} onStop={field.recorder.stop} disabled={disabled} className="voice-mic-btn" />} />{field.controls}</div>;
}

export function VoiceTextArea({ value, onChange, ...rest }: TextAreaProps) {
  const { componentDisabled } = ConfigProvider.useConfig();
  const disabled = (rest.disabled ?? componentDisabled) || rest.readOnly;
  const emit = (next: string) => onChange?.({ target: { value: next } } as Parameters<NonNullable<TextAreaProps['onChange']>>[0]);
  const field = useDictationField(String(value ?? ''), emit, String(rest.placeholder ?? 'Clinical note'), disabled);
  return <div><div className="voice-field-wrap">
    <Input.TextArea value={value} onChange={onChange} {...rest} />
    <MicButton {...field.recorder} onStart={field.recorder.start} onStop={field.recorder.stop} disabled={disabled} className="voice-mic-btn voice-mic-btn-overlay" />
    </div>
    {field.controls}
  </div>;
}
