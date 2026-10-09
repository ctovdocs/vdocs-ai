import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Alert, App, Button, Collapse, Empty, Input, Modal, Segmented, Select, Space, Tabs, Tag, Tooltip } from 'antd';
import { ArrowLeftOutlined, CheckCircleFilled, DownloadOutlined, EyeOutlined, PlusOutlined, PrinterOutlined, ReloadOutlined, SafetyCertificateOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { QueryState } from '../components/QueryState';
import { RoleTag } from '../components/RoleTag';
import { VoiceTextArea } from '../components/VoiceField';
import { DISCHARGE_STATUSES, HOSPITAL_PROFILE, summarySignGaps, type DischargeSummaryDoc } from '../domain/dischargeSummary';
import { inferRole, nurses } from '../domain/roles';
import type { Discharge, WorkflowState } from '../domain/workflow';
import { applySection, buildDischargeSummary, demoDoctorCredentials, formatDate, formatDateTime, SECTION_LABELS, type SectionKey } from '../services/dischargeSummaryBuilder';
import { downloadPdf, renderDischargeSummaryPdf, summaryFilename } from '../services/dischargeSummaryPdf';
import { dischargeBlockers } from '../services/workflowEngine';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { useWorkingAs } from '../services/workingAs';
import { useActiveDoctor } from '../services/activeDoctor';

type TargetKey = 'presenting_complaints' | 'past_history' | 'examination' | 'lab' | 'imaging' | 'other' | 'hospital_course' | 'diet' | 'activity' | 'follow_up_investigations';
const TARGETS: Record<TargetKey, { label: string; get: (doc: DischargeSummaryDoc) => string; set: (doc: DischargeSummaryDoc, value: string) => void }> = {
  presenting_complaints: { label: 'Presenting complaints', get: d => d.presenting_complaints, set: (d, v) => { d.presenting_complaints = v; } },
  past_history: { label: 'Past history', get: d => d.past_history, set: (d, v) => { d.past_history = v; } },
  examination: { label: 'Examination findings', get: d => d.examination, set: (d, v) => { d.examination = v; } },
  lab: { label: 'Investigations · laboratory', get: d => d.investigations.lab, set: (d, v) => { d.investigations.lab = v; } },
  imaging: { label: 'Investigations · imaging', get: d => d.investigations.imaging, set: (d, v) => { d.investigations.imaging = v; } },
  other: { label: 'Investigations · other', get: d => d.investigations.other, set: (d, v) => { d.investigations.other = v; } },
  hospital_course: { label: 'Hospital course', get: d => d.hospital_course, set: (d, v) => { d.hospital_course = v; } },
  diet: { label: 'Diet advice', get: d => d.diet, set: (d, v) => { d.diet = v; } },
  activity: { label: 'Activity advice', get: d => d.activity, set: (d, v) => { d.activity = v; } },
  follow_up_investigations: { label: 'Follow-up investigations', get: d => d.follow_up.investigations, set: (d, v) => { d.follow_up.investigations = v; } },
};

const flagTag = (flag: string) => flag === 'high' ? <Tag color="red">H</Tag> : flag === 'low' ? <Tag color="orange">L</Tag> : null;

function SectionHead({ title, source, onReset, readOnly }: { title: string; source?: string; onReset?: () => void; readOnly: boolean }) {
  return <div className="ds-section-head"><h3>{title}</h3>{source && <span className="ds-source" title="Where this section was pre-filled from">{source}</span>}{!readOnly && onReset && <Button type="link" size="small" icon={<ReloadOutlined />} onClick={onReset}>Reset from record</Button>}</div>;
}

function Reference({ state, record, onInsert, onAddMedicine, target, setTarget }: {
  state: WorkflowState; record: Discharge; onInsert: (text: string, target?: TargetKey) => void; onAddMedicine: (name: string, dose: string, route: string, frequency: string) => void; target: TargetKey; setTarget: (key: TargetKey) => void;
}) {
  const patient = state.patients.find(item => item.id === record.patient_id)!;
  const history = state.histories.find(item => item.context.patient_id === record.patient_id)!;
  const encounter = history.encounters.find(item => item.id === record.encounter_id)!;
  const notes = history.notes.filter(note => note.encounter_id === record.encounter_id && note.kind !== 'handover').sort((a, b) => b.recorded_at.localeCompare(a.recorded_at));
  const reports = state.reports.filter(item => item.patient_id === patient.id && item.encounter_id === record.encounter_id).sort((a, b) => b.reported_at.localeCompare(a.reported_at));
  const vitals = history.vitals.filter(item => item.encounter_id === record.encounter_id).sort((a, b) => b.recorded_at.localeCompare(a.recorded_at));
  const requests = history.requests.filter(item => item.encounter_id === record.encounter_id);
  const blockers = ['discharged', 'cancelled'].includes(record.status) ? [] : dischargeBlockers(state, record);
  const timeline = history.timeline.filter(item => item.encounter_id === record.encounter_id).sort((a, b) => b.occurred_at.localeCompare(a.occurred_at));
  const latest = vitals[0];
  const insertBtn = (text: string, into?: TargetKey) => <Button size="small" type="link" icon={<PlusOutlined />} onClick={() => onInsert(text, into)}>Insert</Button>;
  return <aside className="ds-ref">
    <div className="ds-ref-head"><strong>Patient reference</strong><Select size="small" value={target} onChange={setTarget} style={{ width: 200 }} aria-label="Insert into section" options={(Object.keys(TARGETS) as TargetKey[]).map(key => ({ value: key, label: `Insert into: ${TARGETS[key].label}` }))} /></div>
    <Tabs size="small" items={[
      { key: 'overview', label: 'Overview', children: <div className="ds-ref-body">
        <div className="ds-ref-card"><h4>{patient.name} <span className="muted">{patient.age}{patient.sex} · {patient.uhid}</span></h4><p>{patient.department} · {encounter.location}</p><p className="muted">Admitted {formatDateTime(encounter.started_at)} · {encounter.owner}</p>
          <p><strong>Allergies:</strong> {patient.allergies.length ? patient.allergies.map(a => <Tag key={a} color="volcano">{a}</Tag>) : <span className="muted">Not documented</span>}</p>
          <p><strong>Conditions:</strong> {patient.conditions.join('; ') || '—'}</p></div>
        {latest && <div className="ds-ref-card"><h4>Latest vitals <span className="muted">{formatDateTime(latest.recorded_at)}</span></h4><div className="ds-vitals"><span>BP <b>{latest.systolic}/{latest.diastolic}</b></span><span>Pulse <b>{latest.pulse}</b></span><span>Temp <b>{latest.temperature_c}</b></span><span>SpO2 <b>{latest.spo2}%</b></span><span>RR <b>{latest.respiratory_rate}</b></span></div></div>}
        <div className="ds-ref-card"><h4>Discharge readiness</h4>{blockers.length ? <ul className="compact-list">{blockers.map(item => <li key={item}>{item}</li>)}</ul> : <p><CheckCircleFilled style={{ color: '#1f9d6b' }} /> No outstanding items</p>}</div>
      </div> },
      { key: 'notes', label: `Notes (${notes.length})`, children: <div className="ds-ref-body">{notes.length === 0 ? <Empty description="No notes for this admission" /> : notes.map(note => <div className="ds-ref-card" key={note.id}>
        <div className="ds-ref-meta"><span>{formatDate(note.recorded_at)} · {note.author}</span><RoleTag role={inferRole(note.author)} /></div><strong>{note.title}</strong><p>{note.body.slice(0, 420)}{note.body.length > 420 ? '…' : ''}</p>{insertBtn(`${note.body.trim()}`, 'hospital_course')}</div>)}</div> },
      { key: 'results', label: `Results (${reports.length})`, children: <div className="ds-ref-body">{reports.length === 0 ? <Empty description="No results for this admission" /> : reports.map(report => <div className="ds-ref-card" key={report.id}>
        <div className="ds-ref-meta"><span>{formatDate(report.reported_at)} · {report.source}</span><Tag>{report.kind}</Tag></div><strong>{report.title}</strong>
        {report.findings && <p>{report.findings}</p>}
        {report.observations.length > 0 && <table className="ds-obs"><tbody>{report.observations.map(obs => <tr key={obs.name}><td>{obs.name}</td><td>{obs.value} {obs.unit}</td><td>{flagTag(obs.flag)}</td><td className="muted">{obs.reference}</td></tr>)}</tbody></table>}
        {insertBtn(report.kind === 'lab' ? report.observations.map(obs => `${obs.name}: ${obs.value} ${obs.unit}${obs.flag === 'high' ? ' (H)' : obs.flag === 'low' ? ' (L)' : ''}`).join('\n') : `${report.title} (${formatDate(report.reported_at)}): ${report.findings}`, report.kind === 'lab' ? 'lab' : 'imaging')}</div>)}</div> },
      { key: 'meds', label: 'Medications', children: <div className="ds-ref-body">
        {history.medications.length === 0 && patient.medications.length === 0 ? <Empty description="No medications on record" /> : null}
        {history.medications.map(med => <div className="ds-ref-card" key={med.id}><div className="ds-ref-meta"><span>{med.status.replaceAll('_', ' ')}</span></div><strong>{med.name}</strong><p>{med.dose} · {med.route} · {med.frequency}</p><p className="muted">{med.reason}</p>
          <Button size="small" type="link" icon={<PlusOutlined />} onClick={() => onAddMedicine(med.name, med.dose, med.route === 'oral' ? 'Oral' : 'SC', med.frequency)}>Add to discharge list</Button></div>)}
        {patient.medications.filter(name => !history.medications.some(med => med.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))).map(name => <div className="ds-ref-card" key={name}><strong>{name}</strong><p className="muted">Listed on the patient chart</p><Button size="small" type="link" icon={<PlusOutlined />} onClick={() => onAddMedicine(name, '', '', '')}>Add to discharge list</Button></div>)}
      </div> },
      { key: 'consults', label: `Consults (${requests.length})`, children: <div className="ds-ref-body">{requests.length === 0 ? <Empty description="No consults or requests" /> : requests.map(request => <div className="ds-ref-card" key={request.id}>
        <div className="ds-ref-meta"><span>{request.from_department} → {request.to_department}</span><Tag>{request.status}</Tag></div><p>{request.reason}</p>{request.response && <><p><strong>Response:</strong> {request.response}</p>{insertBtn(`${request.to_department} advice: ${request.response}`, 'hospital_course')}</>}</div>)}</div> },
      { key: 'timeline', label: 'Timeline', children: <div className="ds-ref-body"><ol className="ds-timeline">{timeline.map(item => <li key={`${item.id}-${item.source_id}`}><time>{formatDateTime(item.occurred_at)}</time><span>{item.title}</span></li>)}</ol></div> },
    ]} />
  </aside>;
}

function SummaryEditor({ state, record }: { state: WorkflowState; record: Discharge }) {
  const { modal, message } = App.useApp();
  const action = useWorkflowAction();
  const working = useWorkingAs();
  const doctorName = useActiveDoctor().data.name;
  const closed = ['discharged', 'cancelled'].includes(record.status);
  const patient = state.patients.find(item => item.id === record.patient_id)!;
  const fresh = useMemo(() => buildDischargeSummary(state, record, { name: working.name, role: working.role }, new Date().toISOString()), [state, record, working.name, working.role]);
  const stored = record.summary_doc;
  const initial = stored ?? fresh;
  const [doc, setDoc] = useState<DischargeSummaryDoc>(initial);
  const [target, setTarget] = useState<TargetKey>('hospital_course');
  const [signing, setSigning] = useState(false);
  const [credentials, setCredentials] = useState(() => demoDoctorCredentials(working.name));
  const [preview, setPreview] = useState<string | null>(null);
  const dirty = JSON.stringify(doc) !== JSON.stringify(initial) || (!stored && !closed);
  const readOnly = closed;
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  const update = (change: (next: DischargeSummaryDoc) => void) => setDoc(current => { const next = structuredClone(current); change(next); return next; });
  const insert = (text: string, into?: TargetKey) => {
    const key = into ?? target; setTarget(key);
    update(next => { const current = TARGETS[key].get(next).trim(); TARGETS[key].set(next, current ? `${current}\n${text.trim()}` : text.trim()); });
    void message.success(`Added to ${TARGETS[key].label}`);
  };
  const addMedicine = (name: string, dosage: string, route: string, frequency: string) => {
    if (doc.medications.some(row => row.name.toLowerCase() === name.toLowerCase())) { void message.info(`${name} is already on the discharge list`); return; }
    update(next => { next.medications.push({ name, dosage, route, frequency, duration: 'Continue' }); }); void message.success(`${name} added to discharge medications`);
  };
  const resetSection = (key: SectionKey) => modal.confirm({ title: `Reset “${SECTION_LABELS[key]}” from the patient record?`, content: 'Your edits to this section will be replaced by the current chart data.', okText: 'Reset section', onOk: () => setDoc(current => applySection(current, fresh, key)) });
  const save = async (note?: string) => {
    await action.mutateAsync({ type: 'discharge.summary.save', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version, role: working.role, actor: working.name, note, doc });
    void message.success('Discharge summary saved');
  };
  const pdfFor = async () => renderDischargeSummaryPdf(doc);
  const download = async () => { const bytes = await pdfFor(); downloadPdf(bytes, summaryFilename(doc)); };
  const openPdf = async (print: boolean) => {
    const bytes = await pdfFor(); const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'application/pdf' }));
    if (print) { const win = window.open(url, '_blank'); if (!win) void message.warning('Allow pop-ups to print the PDF.'); } else setPreview(url);
  };
  const gaps = summarySignGaps(doc);
  const signed = stored?.status === 'signed' && !dirty;
  const canSign = working.role === 'doctor' && !dirty && Boolean(stored) && gaps.length === 0 && !closed;
  const field = (key: TargetKey, rows = 3, placeholder = '') => <VoiceTextArea autoSize={{ minRows: rows, maxRows: 18 }} value={TARGETS[key].get(doc)} placeholder={placeholder} readOnly={readOnly} onFocus={() => setTarget(key)} onChange={event => update(next => TARGETS[key].set(next, event.target.value))} aria-label={TARGETS[key].label} />;
  const cell = (label: string, node: ReactNode) => <><div className="ds-label">{label}</div><div className="ds-value">{node}</div></>;
  const text = (get: (d: DischargeSummaryDoc) => string, set: (d: DischargeSummaryDoc, v: string) => void, label: string) => <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} variant="borderless" value={get(doc)} readOnly={readOnly} aria-label={label} onChange={event => update(next => set(next, event.target.value))} />;

  return <div className="ds-page">
    <div className="ds-toolbar">
      <Link to={`/app/discharges?id=${record.id}`} className="ds-back"><ArrowLeftOutlined /> Discharge process</Link>
      <div className="ds-title"><strong>Discharge summary · {patient.name}</strong><span className="muted">{patient.uhid} · {patient.department}</span></div>
      <Tag color={doc.status === 'signed' && !dirty ? 'green' : 'gold'}>{doc.status === 'signed' && !dirty ? `Signed by ${doc.signed_by}` : dirty ? 'Unsaved changes' : 'Draft'}</Tag>
      <span className="ds-by">Prepared by {doc.prepared_by} <RoleTag role={doc.prepared_role} /></span>
      <Space className="ds-actions" wrap size={6}>
        {!readOnly && <Space.Compact size="small"><Segmented size="small" value={working.role} onChange={role => working.set({ role: role as 'doctor' | 'nurse', name: role === 'nurse' ? nurses[0] : doctorName })} options={[{ value: 'doctor', label: 'Doctor' }, { value: 'nurse', label: 'Nurse' }]} /></Space.Compact>}
        <span className="muted ds-working">Working as {working.name}</span>
        {!readOnly && <Button size="small" icon={<ReloadOutlined />} onClick={() => modal.confirm({ title: 'Reset the whole summary from the patient record?', content: 'All edits will be replaced by chart data.', okText: 'Reset all', onOk: () => setDoc(fresh) })}>Reset all</Button>}
        <Button size="small" icon={<EyeOutlined />} onClick={() => openPdf(false)}>Preview PDF</Button>
        <Button size="small" icon={<PrinterOutlined />} onClick={() => openPdf(true)}>Print</Button>
        <Button size="small" icon={<DownloadOutlined />} onClick={download}>Download PDF</Button>
        {!readOnly && <Button size="small" type={dirty ? 'primary' : 'default'} loading={action.isPending} disabled={!dirty} onClick={() => save()}>Save draft</Button>}
        {!readOnly && (working.role === 'doctor'
          ? <Tooltip title={dirty ? 'Save your changes first' : !stored ? 'Save the draft first' : gaps.length ? `Missing: ${gaps.join(', ')}` : ''}><span><Button size="small" type="primary" icon={<SafetyCertificateOutlined />} disabled={!canSign} onClick={() => setSigning(true)}>{signed ? 'Signed' : 'Sign off'}</Button></span></Tooltip>
          : <Tooltip title="A doctor must review and sign. Switch to Doctor to sign off."><span><Button size="small" disabled icon={<SafetyCertificateOutlined />}>Doctor sign-off required</Button></span></Tooltip>)}
      </Space>
    </div>
    {readOnly && <Alert type="info" showIcon className="ds-banner" title="This patient has been discharged." description={stored ? 'The signed discharge summary is read-only. Download the PDF for the patient file.' : 'This historical summary was generated from the chart and is read-only.'} />}
    {!readOnly && !stored && <Alert type="warning" showIcon className="ds-banner" title="Pre-filled from the patient record — not saved yet" description="Review each section, correct anything that is wrong, then save the draft. A doctor signs it off to complete discharge." />}
    {stored?.status === 'signed' && !dirty && !readOnly && <Alert type="success" showIcon className="ds-banner" title={`Signed by ${stored.signed_by}`} description={<>Discharge can now be completed. <Link to={`/app/discharges?id=${record.id}`}>Return to the discharge process →</Link> Editing the summary clears the signature.</>} />}
    {stored?.status === 'signed' && dirty && !readOnly && <Alert type="warning" showIcon className="ds-banner" title="Editing a signed summary clears the doctor's signature" description="Save, then have a doctor sign it off again." />}
    <div className="ds-split">
      <div className="ds-paper-wrap"><article className="ds-paper">
        <header className="ds-letterhead"><h1>{HOSPITAL_PROFILE.name}</h1><h2>{HOSPITAL_PROFILE.locality}</h2><p>{HOSPITAL_PROFILE.address}</p><p>{HOSPITAL_PROFILE.contact}</p></header>
        <h2 className="ds-doc-title">DISCHARGE SUMMARY</h2>

        <SectionHead title="PATIENT INFORMATION" source={doc.sources.patient} readOnly={readOnly} onReset={() => resetSection('patient')} />
        <div className="ds-grid">
          {cell('Patient Name', text(d => d.patient.name, (d, v) => { d.patient.name = v; }, 'Patient name'))}{cell('UHID / MRN', text(d => d.patient.uhid, (d, v) => { d.patient.uhid = v; }, 'UHID'))}
          {cell('Age / Sex', text(d => d.patient.age_sex, (d, v) => { d.patient.age_sex = v; }, 'Age and sex'))}{cell('Date of Birth', text(d => d.patient.dob, (d, v) => { d.patient.dob = v; }, 'Date of birth'))}
          {cell('Address', text(d => d.patient.address, (d, v) => { d.patient.address = v; }, 'Address'))}{cell('Contact Number', text(d => d.patient.phone, (d, v) => { d.patient.phone = v; }, 'Contact number'))}
          {cell('Admission Date', text(d => d.patient.admitted_at, (d, v) => { d.patient.admitted_at = v; }, 'Admission date'))}{cell('Discharge Date', text(d => d.patient.discharged_at, (d, v) => { d.patient.discharged_at = v; }, 'Discharge date'))}
          {cell('Department', text(d => d.patient.department, (d, v) => { d.patient.department = v; }, 'Department'))}{cell('Room / Bed No.', text(d => d.patient.ward_bed, (d, v) => { d.patient.ward_bed = v; }, 'Room and bed'))}
          {cell('Consultant / Treating Doctor', text(d => d.patient.consultant, (d, v) => { d.patient.consultant = v; }, 'Consultant'))}{cell('Referring Doctor', text(d => d.patient.referring_doctor, (d, v) => { d.patient.referring_doctor = v; }, 'Referring doctor'))}
        </div>

        <SectionHead title="DIAGNOSIS" source={doc.sources.diagnosis} readOnly={readOnly} onReset={() => resetSection('diagnosis')} />
        <label className="ds-inline"><span>Primary Diagnosis</span><Input value={doc.primary_diagnosis} readOnly={readOnly} onChange={event => update(next => { next.primary_diagnosis = event.target.value; })} /></label>
        <label className="ds-inline"><span>Secondary Diagnosis / Comorbidities</span><Input value={doc.secondary_diagnosis} readOnly={readOnly} placeholder="Enter if applicable" onChange={event => update(next => { next.secondary_diagnosis = event.target.value; })} /></label>

        <SectionHead title="PRESENTING COMPLAINTS, HISTORY AND EXAMINATION" source={doc.sources.history} readOnly={readOnly} onReset={() => resetSection('history')} />
        <label className="ds-block"><span>Presenting complaints</span>{field('presenting_complaints', 2, 'Chief complaints and duration at the time of admission')}</label>
        <label className="ds-block"><span>Past history</span>{field('past_history', 2, 'Relevant past medical / surgical / family history')}</label>
        <label className="ds-inline"><span>Allergies</span><Input value={doc.allergies} readOnly={readOnly} onChange={event => update(next => { next.allergies = event.target.value; })} /></label>
        <label className="ds-block"><span>Clinical / physical examination findings</span>{field('examination', 2, 'Key examination findings on admission')}</label>

        <SectionHead title="INVESTIGATIONS" source={doc.sources.investigations} readOnly={readOnly} onReset={() => resetSection('investigations')} />
        <label className="ds-block"><span>Laboratory findings</span>{field('lab', 2, 'Key blood work / pathology results')}</label>
        <label className="ds-block"><span>Imaging</span>{field('imaging', 2, 'X-ray / USG / CT / MRI findings')}</label>
        <label className="ds-block"><span>Other investigations</span>{field('other', 1, 'ECG, biopsy, culture, etc.')}</label>

        <SectionHead title="HOSPITAL COURSE / TREATMENT SUMMARY" source={doc.sources.course} readOnly={readOnly} onReset={() => resetSection('course')} />
        {field('hospital_course', 5, 'Narrative of treatment given, response to treatment and any complications during the stay')}

        <SectionHead title="PROCEDURE(S) PERFORMED" source={doc.sources.procedures} readOnly={readOnly} onReset={() => resetSection('procedures')} />
        {doc.procedures.length === 0 && <p className="muted">No procedure recorded.</p>}
        {doc.procedures.map((row, index) => <div className="ds-row3" key={index}>
          <Input placeholder="Procedure name" value={row.name} readOnly={readOnly} onChange={event => update(next => { next.procedures[index].name = event.target.value; })} />
          <Input placeholder="Date" value={row.date} readOnly={readOnly} onChange={event => update(next => { next.procedures[index].date = event.target.value; })} />
          <Input placeholder="Performed by" value={row.performed_by} readOnly={readOnly} onChange={event => update(next => { next.procedures[index].performed_by = event.target.value; })} />
          {!readOnly && <Button type="text" danger icon={<DeleteOutlined />} aria-label="Remove procedure" onClick={() => update(next => { next.procedures.splice(index, 1); })} />}</div>)}
        {!readOnly && <Button size="small" icon={<PlusOutlined />} onClick={() => update(next => { next.procedures.push({ name: '', date: '', performed_by: '' }); })}>Add procedure</Button>}

        <SectionHead title="CONDITION AT DISCHARGE" source={doc.sources.condition} readOnly={readOnly} onReset={() => resetSection('condition')} />
        <label className="ds-inline"><span>General Condition</span><Input value={doc.condition.general} readOnly={readOnly} placeholder="Stable / Improved / Guarded" onChange={event => update(next => { next.condition.general = event.target.value; })} /></label>
        <div className="ds-vitals-edit"><span>Vitals at Discharge</span>{(['bp', 'pulse', 'temp', 'spo2', 'rr'] as const).map(key => <label key={key}>{key.toUpperCase()}<Input size="small" value={doc.condition[key]} readOnly={readOnly} onChange={event => update(next => { next.condition[key] = event.target.value; })} /></label>)}</div>

        <SectionHead title="DISCHARGE MEDICATIONS" source={doc.sources.medications} readOnly={readOnly} onReset={() => resetSection('medications')} />
        <table className="ds-meds"><thead><tr><th>Medicine Name</th><th>Dosage</th><th>Route</th><th>Frequency</th><th>Duration</th><th /></tr></thead><tbody>
          {doc.medications.map((row, index) => <tr key={index}>{(['name', 'dosage', 'route', 'frequency', 'duration'] as const).map(key => <td key={key}><Input size="small" variant="borderless" value={row[key]} readOnly={readOnly} aria-label={`${key} ${index + 1}`} onChange={event => update(next => { next.medications[index][key] = event.target.value; })} /></td>)}
            <td>{!readOnly && <Button type="text" size="small" danger icon={<DeleteOutlined />} aria-label="Remove medicine" onClick={() => update(next => { next.medications.splice(index, 1); })} />}</td></tr>)}
          {doc.medications.length === 0 && <tr><td colSpan={6} className="muted">No discharge medications. Add from the patient reference panel or below.</td></tr>}
        </tbody></table>
        {!readOnly && <Button size="small" icon={<PlusOutlined />} onClick={() => update(next => { next.medications.push({ name: '', dosage: '', route: '', frequency: '', duration: '' }); })}>Add medicine</Button>}

        <SectionHead title="DIET & ACTIVITY ADVICE" source={doc.sources.advice} readOnly={readOnly} onReset={() => resetSection('advice')} />
        <label className="ds-block"><span>Diet</span>{field('diet', 1, 'e.g., Low-salt diabetic diet')}</label>
        <label className="ds-block"><span>Activity</span>{field('activity', 1, 'e.g., Restrict strenuous activity for 2 weeks')}</label>

        <SectionHead title="FOLLOW-UP INSTRUCTIONS" source={doc.sources.follow_up} readOnly={readOnly} onReset={() => resetSection('follow_up')} />
        <div className="ds-row2"><label className="ds-inline"><span>Follow-up with</span><Input value={doc.follow_up.with} readOnly={readOnly} onChange={event => update(next => { next.follow_up.with = event.target.value; })} /></label>
          <label className="ds-inline"><span>On (date)</span><Input value={doc.follow_up.date} readOnly={readOnly} placeholder="DD-MM-YYYY" onChange={event => update(next => { next.follow_up.date = event.target.value; })} /></label></div>
        <label className="ds-block"><span>Investigations to repeat before follow-up</span>{field('follow_up_investigations', 1, 'e.g., CBC, Lipid Profile')}</label>

        <SectionHead title="WARNING SIGNS — WHEN TO SEEK IMMEDIATE MEDICAL ATTENTION" source="Suggested from the diagnosis — edit as needed" readOnly={readOnly} onReset={() => resetSection('advice')} />
        {doc.warning_signs.map((sign, index) => <div className="ds-row-bullet" key={index}><span>•</span><Input value={sign} readOnly={readOnly} onChange={event => update(next => { next.warning_signs[index] = event.target.value; })} />
          {!readOnly && <Button type="text" danger icon={<DeleteOutlined />} aria-label="Remove warning sign" onClick={() => update(next => { next.warning_signs.splice(index, 1); })} />}</div>)}
        {!readOnly && <Button size="small" icon={<PlusOutlined />} onClick={() => update(next => { next.warning_signs.push(''); })}>Add warning sign</Button>}

        <SectionHead title="DISCHARGE STATUS" readOnly />
        <label className="ds-inline"><span>Discharged</span><Select value={doc.discharge_status} disabled={readOnly} options={DISCHARGE_STATUSES.map(value => ({ value }))} style={{ width: 180 }} onChange={value => update(next => { next.discharge_status = value; })} /></label>

        <footer className="ds-sign"><div><div className="ds-sign-line">{doc.status === 'signed' && !dirty && <em>Digitally signed: {doc.signed_by}</em>}</div><strong>Signature of Treating Consultant</strong>
          <small>{doc.status === 'signed' && !dirty ? `${doc.signed_by}, ${doc.signed_qualification}, Reg. No. ${doc.signed_reg_no}` : 'Awaiting doctor sign-off'}</small></div>
          <div><div className="ds-sign-line" /><strong>Hospital Seal / Date</strong><small>{doc.signed_at ? formatDate(doc.signed_at) : 'DD-MM-YYYY'}</small></div></footer>
        <p className="ds-foot">{HOSPITAL_PROFILE.footer}</p>
      </article>
        {doc.edits.length > 0 && <Collapse className="section-gap" size="small" items={[{ key: 'history', label: `Document history (${doc.edits.length})`, children: <ol className="ds-edits">{[...doc.edits].reverse().map((edit, index) => <li key={index}><time>{formatDateTime(edit.at)}</time> {edit.by} <RoleTag role={edit.role} /> — {edit.note}</li>)}</ol> }]} />}
      </div>
      <Reference state={state} record={record} onInsert={insert} onAddMedicine={addMedicine} target={target} setTarget={setTarget} />
    </div>

    <Modal open={signing} title="Sign off discharge summary" okText="Sign off" confirmLoading={action.isPending} onCancel={() => setSigning(false)} centered
      onOk={async () => { try { await action.mutateAsync({ type: 'discharge.summary.sign', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version, role: working.role, actor: working.name, qualification: credentials.qualification, reg_no: credentials.reg_no }); setSigning(false); void message.success('Signed. Discharge can now be completed.'); } catch { /* error toast shown by the mutation */ } }}>
      <p>You are confirming that you have reviewed this summary and that it is accurate for <strong>{patient.name}</strong>. Any later edit clears your signature.</p>
      <label className="ds-inline"><span>Qualification</span><Input value={credentials.qualification} onChange={event => setCredentials(current => ({ ...current, qualification: event.target.value }))} /></label>
      <label className="ds-inline"><span>Registration no.</span><Input value={credentials.reg_no} onChange={event => setCredentials(current => ({ ...current, reg_no: event.target.value }))} /></label>
      <p className="muted">Demo values are synthetic; a real deployment would take these from the doctor's profile.</p>
    </Modal>
    <Modal open={Boolean(preview)} title="Discharge summary preview" width={900} footer={null} centered onCancel={() => setPreview(null)}>{preview && <iframe title="Discharge summary PDF" src={preview} className="ds-preview" />}</Modal>
  </div>;
}

export function DischargeSummaryPage() {
  const { id } = useParams();
  const query = useWorkflow();
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const record = query.data.discharges.find(item => item.id === id);
  if (!record) return <Empty description="Discharge record not found"><Link to="/app/discharges">Back to discharges</Link></Empty>;
  return <SummaryEditor key={`${record.id}-${record.version}`} state={query.data} record={record} />;
}
