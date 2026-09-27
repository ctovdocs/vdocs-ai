import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Space, Typography } from 'antd';
import { EditOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import type { Patient } from '../domain/models';
import type { PatientHistory } from '../domain/longitudinal';
import { VoiceTextArea } from './VoiceField';
import type { VoiceRecorderStatus } from '../hooks/voiceRecorderTypes';
import { getDoctorKey } from '../lib/aiChatStore';
import { loadDoctorNote } from '../lib/doctorNotesStore';
import { useWorkflowAction } from '../services/useWorkflow';
import { env } from '../lib/env';
import { formatDate } from '../lib/format';

export function ClinicalSummaryCard({ patient, history, abnormalCount, activeCoordinationCount, pendingOrdersCount, dischargeReady }: {
  patient: Patient; history?: PatientHistory | null; abnormalCount: number; activeCoordinationCount: number; pendingOrdersCount: number; dischargeReady: boolean;
}) {
  const action = useWorkflowAction();
  const [noteText, setNoteText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [hasSaved, setHasSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceRecorderStatus>('idle');
  const [editorVersion, setEditorVersion] = useState(0);
  const [saveError, setSaveError] = useState(false);
  const loadedForPatient = useRef<string | null>(null);
  const busy = ['recording', 'transcribing', 'cleaning'].includes(voiceStatus);
  const latest = history?.notes.filter(note => note.title === 'Doctor clinical note' && note.encounter_id === history.context.current_encounter_id)
    .sort((first, second) => second.recorded_at.localeCompare(first.recorded_at))[0];

  useEffect(() => {
    if (!history || loadedForPatient.current === patient.id) return;
    let active = true;
    getDoctorKey().then(doctorKey => {
      if (!active) return;
      const stored = loadDoctorNote(doctorKey, patient.id);
      const initial = latest?.body ?? stored?.text ?? '';
      setNoteText(initial); setSavedText(latest?.body ?? '');
      setHasSaved(Boolean(latest));
      loadedForPatient.current = patient.id;
      setReady(true);
    }).catch(() => {
      if (!active) return;
      setNoteText(latest?.body ?? ''); setSavedText(latest?.body ?? '');
      setHasSaved(Boolean(latest)); loadedForPatient.current = patient.id; setReady(true);
    });
    return () => { active = false; };
  }, [patient.id, history, latest]);

  const dirty = noteText !== savedText;
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const save = async () => {
    if (busy || action.isPending || !noteText.trim()) return;
    const submitted = noteText;
    setSaveError(false);
    try {
      await action.mutateAsync({ type: 'note.create', patient_id: patient.id, body: submitted });
      setSavedText(submitted); setHasSaved(true); setEditorVersion(version => version + 1);
    } catch { setSaveError(true); }
  };
  const undo = () => { setNoteText(savedText); setSaveError(false); setEditorVersion(version => version + 1); };
  const activeEncounter = history?.encounters.some(encounter => encounter.id === history.context.current_encounter_id && encounter.status === 'active');
  return <section className="surface clinical-summary doctor-note-editor">
    <div className="doctor-note-heading"><strong><EditOutlined /> Doctor notes</strong>
      <span className={dirty ? 'note-draft-state' : 'muted'}>{busy ? 'Dictation in progress' : dirty ? 'Unsaved draft' : hasSaved ? 'Saved to chart' : 'New note'}</span>
    </div>
    {!ready ? <Typography.Text type="secondary">Loading notes…</Typography.Text>
      : <VoiceTextArea key={editorVersion} aria-label="Doctor clinical note" className="clinical-summary-text" autoSize={{ minRows: 2, maxRows: 10 }}
        value={noteText} disabled={action.isPending || !activeEncounter} onVoiceStatusChange={setVoiceStatus}
        onChange={event => setNoteText(event.target.value)} placeholder="Assessment, findings and plan. Type here or use the microphone to dictate in English." />}
    {saveError && <Alert type="error" showIcon title="Note was not saved. Your draft is retained — try again." />}
    {!activeEncounter && ready && <span className="muted">This encounter is closed. Notes are read-only.</span>}
    <div className="doctor-note-footer">
      <span className="notes-saved-at">{latest ? `${latest.author} · ${formatDate(latest.recorded_at)}` : 'Review dictation before saving.'}
        {env.mode !== 'supabase' && <span> · Local preview only</span>}</span>
      <Space size={6}>
        <Button size="small" icon={<UndoOutlined />} disabled={!dirty || busy || action.isPending} onClick={undo}>Undo changes</Button>
        <Button size="small" type="primary" icon={<SaveOutlined />} loading={action.isPending}
          disabled={!ready || !activeEncounter || busy || !noteText.trim() || (!dirty && hasSaved)} onClick={save}>{hasSaved ? 'Update note' : 'Save note'}</Button>
      </Space>
    </div>
    {(abnormalCount > 0 || activeCoordinationCount > 0 || pendingOrdersCount > 0 || dischargeReady) && <div className="doctor-note-context">
      {abnormalCount > 0 && <span>{abnormalCount} abnormal observations in chart</span>}
      {activeCoordinationCount > 0 && <span>{activeCoordinationCount} coordination items</span>}
      {pendingOrdersCount > 0 && <span>{pendingOrdersCount} pending orders</span>}
      {dischargeReady && <span>Discharge in progress</span>}
    </div>}
  </section>;
}
