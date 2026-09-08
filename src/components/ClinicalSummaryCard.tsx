import { useEffect, useRef, useState } from 'react';
import { Button, Tag, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, EditOutlined, WarningOutlined } from '@ant-design/icons';
import type { Patient } from '../domain/models';
import type { PatientHistory } from '../domain/longitudinal';
import { VoiceInput, VoiceTextArea } from './VoiceField';
import { getDoctorKey } from '../lib/aiChatStore';
import { loadDoctorNote, saveDoctorNote } from '../lib/doctorNotesStore';

function seedText(patient: Patient, history: PatientHistory) {
  return `${patient.name} — ${history.context.presenting_complaint} ${history.context.acuity_reason}`;
}

export function ClinicalSummaryCard({ patient, history, abnormalCount, activeCoordinationCount, pendingOrdersCount, dischargeReady }: {
  patient: Patient; history?: PatientHistory | null; abnormalCount: number; activeCoordinationCount: number; pendingOrdersCount: number; dischargeReady: boolean;
}) {
  const [customHighlights, setCustomHighlights] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');

  const [noteText, setNoteText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const doctorKeyRef = useRef<string | null>(null);
  const loadedForPatient = useRef<string | null>(null);

  useEffect(() => {
    if (!history || loadedForPatient.current === patient.id) return;
    let active = true;
    getDoctorKey().then(doctorKey => {
      if (!active) return;
      doctorKeyRef.current = doctorKey;
      loadedForPatient.current = patient.id;
      const stored = loadDoctorNote(doctorKey, patient.id);
      const initial = stored?.text ?? seedText(patient, history);
      setNoteText(initial);
      setSavedText(initial);
      setSavedAt(stored?.savedAt ?? null);
      setReady(true);
    });
    return () => { active = false; };
  }, [patient, history]);

  const dirty = noteText !== savedText;
  const save = () => {
    if (!doctorKeyRef.current) return;
    const note = saveDoctorNote(doctorKeyRef.current, patient.id, noteText);
    setSavedText(note.text);
    setSavedAt(note.savedAt);
  };
  const revert = () => setNoteText(savedText);

  const submit = () => {
    if (draft.trim()) setCustomHighlights(current => [...current, draft.trim()]);
    setDraft('');
    setAdding(false);
  };

  return <section className="surface clinical-summary">
    <div className="section-toolbar">
      <Typography.Title level={5}><EditOutlined /> Doctor's Notes</Typography.Title>
      {dirty
        ? <div className="notes-save-actions">
          <Tag color="gold">Unsaved changes</Tag>
          <Button size="small" type="text" onClick={revert}>Revert</Button>
          <Button size="small" type="primary" onClick={save}>Save</Button>
        </div>
        : savedAt && <Typography.Text type="secondary" className="notes-saved-at">Saved {new Date(savedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</Typography.Text>}
    </div>
    {!ready
      ? <Typography.Text type="secondary">Waiting on the chart to finish loading…</Typography.Text>
      : <VoiceTextArea className="clinical-summary-text" autoSize={{ minRows: 2, maxRows: 8 }} value={noteText} onChange={event => setNoteText(event.target.value)} placeholder="Write or speak your assessment for this patient…" />}
    <div className="highlight-row">
      {abnormalCount > 0 && <Tag color="orange">{abnormalCount} abnormal result{abnormalCount > 1 ? 's' : ''}</Tag>}
      {activeCoordinationCount > 0 && <Tag color="blue">{activeCoordinationCount} active coordination request{activeCoordinationCount > 1 ? 's' : ''}</Tag>}
      {pendingOrdersCount > 0 && <Tag>{pendingOrdersCount} pending order{pendingOrdersCount > 1 ? 's' : ''}</Tag>}
      {patient.allergies.length > 0 && <Tag color="red" icon={<WarningOutlined />}>Allergy on record</Tag>}
      {dischargeReady && <Tag color="gold">Flagged for discharge</Tag>}
      {customHighlights.map((highlight, index) => <Tag key={`${highlight}-${index}`} color="purple" closable onClose={() => setCustomHighlights(current => current.filter((_, itemIndex) => itemIndex !== index))} closeIcon={<CloseOutlined />}>{highlight}</Tag>)}
      {adding
        ? <span className="highlight-add-input">
          <VoiceInput size="small" autoFocus value={draft} onChange={event => setDraft(event.target.value)} onPressEnter={submit} placeholder="Type or speak a highlight" style={{ width: 240 }} />
          <Button size="small" type="text" icon={<CheckOutlined />} onClick={submit} />
          <Button size="small" type="text" icon={<CloseOutlined />} onClick={() => { setDraft(''); setAdding(false); }} />
        </span>
        : <Button size="small" type="dashed" onClick={() => setAdding(true)}>+ Add highlight</Button>}
    </div>
  </section>;
}
