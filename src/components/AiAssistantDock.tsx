import { useEffect, useRef, useState } from 'react';
import { Bubble, Prompts, Sender } from '@ant-design/x';
import { Button, Tag, Tooltip, Typography, message } from 'antd';
import { AudioOutlined, CloseOutlined, ExperimentOutlined, FileSearchOutlined, LoadingOutlined, RobotOutlined, ScheduleOutlined, ThunderboltFilled } from '@ant-design/icons';
import type { Patient, Report } from '../domain/models';
import type { PatientHistory } from '../domain/longitudinal';
import { askAboutPatient, type AiChatTurn } from '../services/aiAssistant';
import { getDoctorKey, loadChat, saveChat, type StoredChatMessage } from '../lib/aiChatStore';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { Waveform } from './VoiceField';
import type { EvidenceRef } from './EvidenceDrawer';

const QUICK_PROMPTS = [
  { key: 'labs', icon: <ExperimentOutlined />, label: 'Latest labs' },
  { key: 'changed', icon: <ScheduleOutlined />, label: 'What changed?' },
  { key: 'pending', icon: <FileSearchOutlined />, label: 'Pending work' },
  { key: 'specialist', icon: <RobotOutlined />, label: 'Latest specialist response' },
];
const QUICK_PROMPT_TEXT: Record<string, string> = {
  labs: 'What are the latest lab results?', changed: 'What has changed recently?',
  pending: 'What work is still pending for this patient?', specialist: 'What did the specialist say in the latest consult?',
};

export function AiAssistantDock({ open, onOpenChange, patient, history, reports, onEvidence }: {
  open: boolean; onOpenChange: (open: boolean) => void; patient: Patient; history: PatientHistory; reports: Report[]; onEvidence: (evidence: EvidenceRef) => void;
}) {
  const [messages, setMessages] = useState<StoredChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const doctorKeyRef = useRef<string | null>(null);
  const loadedForPatient = useRef<string | null>(null);
  const voice = useVoiceRecorder(text => setDraft(current => (current.trim() ? `${current.trim()} ${text}` : text)));

  useEffect(() => {
    let active = true;
    if (loadedForPatient.current === patient.id) return;
    getDoctorKey().then(doctorKey => {
      if (!active) return;
      doctorKeyRef.current = doctorKey;
      loadedForPatient.current = patient.id;
      setMessages(loadChat(doctorKey, patient.id));
    });
    return () => { active = false; };
  }, [patient.id]);

  const persist = (next: StoredChatMessage[]) => {
    setMessages(next);
    if (doctorKeyRef.current) saveChat(doctorKeyRef.current, patient.id, next);
  };

  const ask = async (question: string) => {
    if (!question.trim() || pending) return;
    setDraft('');
    const priorTurns: AiChatTurn[] = messages.map(item => ({ role: item.role, content: item.content }));
    const withUser = [...messages, { role: 'user' as const, content: question, at: new Date().toISOString() }];
    persist(withUser);
    setPending(true);
    const outcome = await askAboutPatient(patient, history, reports, question, priorTurns);
    setPending(false);
    if (outcome.status === 'unavailable') { setUnavailable(true); return; }
    if (outcome.status === 'error') {
      message.error('AI request failed — see the chat for details.');
      persist([...withUser, { role: 'assistant', content: outcome.message, error: true, at: new Date().toISOString() }]);
      return;
    }
    persist([...withUser, { role: 'assistant', content: outcome.data.answer, citations: outcome.data.citations, at: new Date().toISOString() }]);
  };

  return <>
    <button type="button" className="ai-dock-launcher" onClick={() => onOpenChange(!open)} aria-label="Ask AI about this patient">
      {open ? <CloseOutlined /> : <ThunderboltFilled />}
      {!open && <span>Ask AI</span>}
    </button>

    {open && <div className="ai-dock-panel">
      <div className="ai-dock-header">
        <span className="ai-dock-title"><RobotOutlined /> AI patient assistant</span>
        <span className="ai-dock-subtitle">{patient.name} · {patient.uhid}</span>
        <Button size="small" type="text" icon={<CloseOutlined />} onClick={() => onOpenChange(false)} />
      </div>

      <div className="ai-dock-body">
        {unavailable && <Typography.Paragraph type="secondary" className="ai-dock-empty">AI assistant requires configuration (set an AI provider and key on the server). Not available in this environment.</Typography.Paragraph>}
        {!unavailable && messages.length === 0 && <div className="ai-dock-empty">
          <Typography.Paragraph type="secondary">Ask anything about {patient.name}'s chart — every answer links back to its source record.</Typography.Paragraph>
        </div>}
        {!unavailable && messages.length > 0 && <Bubble.List
          className="ai-dock-bubbles"
          autoScroll
          items={messages.map((item, index) => ({
            key: index, role: item.role === 'user' ? 'user' : 'ai', placement: item.role === 'user' ? 'end' : 'start',
            content: <div>
              <Typography.Text type={item.error ? 'danger' : undefined}>{item.content}</Typography.Text>
              {item.citations && item.citations.length > 0 && <div className="ask-citation-row">
                {item.citations.map((citation, citationIndex) => <Tag key={citationIndex} className="ai-citation-chip" onClick={() => onEvidence({ record_type: citation.record_type, record_id: citation.record_id })}>{citationIndex + 1} · {citation.label ?? citation.record_type}</Tag>)}
              </div>}
            </div>,
          }))}
          role={{ ai: { avatar: <RobotOutlined /> }, user: { variant: 'filled' } }}
        />}
        {pending && <div className="ai-dock-typing"><Bubble avatar={<RobotOutlined />} content="Checking the chart…" loading /></div>}
      </div>

      {!unavailable && <div className="ai-dock-footer">
        {voice.status === 'recording' && voice.partialText && <div className="ai-dock-live-caption">{voice.partialText}</div>}
        <Prompts items={QUICK_PROMPTS} onItemClick={info => ask(QUICK_PROMPT_TEXT[info.data.key])} className="ai-dock-prompts" />
        <Sender value={draft} onChange={setDraft} onSubmit={ask} loading={pending} placeholder="Ask a question about this patient, or tap the mic to speak"
          prefix={voice.status === 'unavailable'
            ? <Tooltip title="Voice input isn't available"><Button type="text" shape="circle" disabled icon={<AudioOutlined />} /></Tooltip>
            : voice.status === 'transcribing'
              ? <Button type="text" shape="circle" disabled icon={<LoadingOutlined spin />} />
              : voice.status === 'recording'
                ? <Tooltip title="Stop and insert"><Button type="text" shape="circle" danger className="voice-mic-recording" icon={<Waveform />} onClick={voice.stop} /></Tooltip>
                : <Tooltip title="Speak your question"><Button type="text" shape="circle" icon={<AudioOutlined />} onClick={voice.start} /></Tooltip>} />
      </div>}
    </div>}
  </>;
}
