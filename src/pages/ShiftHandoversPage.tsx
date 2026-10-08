import { useEffect, useRef, useState } from 'react';
import { Alert, App, Button, Checkbox, Collapse, Form, Input, Segmented, Select, Table, Tabs, Tag } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { ClinicalDrawer, ClinicalModal } from '../components/ClinicalOverlay';
import { VoiceTextArea } from '../components/VoiceField';
import { QueryState } from '../components/QueryState';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { shiftChanged } from '../services/shiftHandover';
import type { Handover, WorkflowState } from '../domain/workflow';
import { owners } from '../data/cohort';
import { formatDate } from '../lib/format';
import { toLocalDateTime } from '../lib/dateRange';
import { HandoversPage as LegacyHandoversPage } from './HandoversPage';
import { SHIFT_DEMO_MARKER } from '../data/shiftDemo';
import { env } from '../lib/env';
import { patchArchiveParams, shiftRoster } from '../services/shiftArchive';
import { useActiveDoctor } from '../services/activeDoctor';
import { RoleTag } from '../components/RoleTag';
import { entryCategories, inferRole, nurses, type AuthorRole, type ClinicianRole } from '../domain/roles';
import { useWorkingAs, type WorkingAs } from '../services/workingAs';

type Source = NonNullable<Handover['source_snapshot']>[number];
const roleOf = (source: Source): AuthorRole => source.role ?? inferRole(source.author);

function WorkingAsBar({ who, doctors }: { who: WorkingAs & { set: (next: WorkingAs) => void }; doctors: string[] }) {
  const names = who.role === 'nurse' ? nurses : doctors;
  return <div className="working-as" role="group" aria-label="Working as">
    <span className="working-as-label">Working as</span>
    <Segmented<ClinicianRole> value={who.role} options={[{ value: 'doctor', label: 'Doctor' }, { value: 'nurse', label: 'Nurse' }]} onChange={role => who.set({ role, name: role === 'nurse' ? nurses[0] : doctors[0] })} />
    <Select aria-label="Your name" showSearch style={{ minWidth: 220 }} value={who.name} options={names.map(value => ({ value }))} onChange={name => who.set({ role: who.role, name } satisfies WorkingAs)} />
    <RoleTag role={who.role} />
    <small className="history-small">Entries are stamped with this role and name. The demo does not verify identity.</small>
  </div>;
}

function EntryModal({ record, entry, who, doctors, open, onClose }: { record: Handover; entry?: Source; who: WorkingAs & { set: (next: WorkingAs) => void }; doctors: string[]; open: boolean; onClose: () => void }) {
  const [form] = Form.useForm();
  const [picked, setPicked] = useState<WorkingAs>(who);
  const by = entry ? { role: (entry.role === 'nurse' ? 'nurse' : 'doctor') as ClinicianRole, name: entry.author } : picked;
  const action = useWorkflowAction();
  return <ClinicalModal width={600} title={entry ? 'Edit entry' : 'Add handover entry'} description={entry ? `Written by ${entry.author}. Only the author can edit this entry.` : 'Choose who is writing this entry.'} open={open} destroyOnHidden afterOpenChange={visible => { if (visible) setPicked({ role: who.role, name: who.name }); if (visible) form.setFieldsValue(entry ? { title: entry.title, category: entry.category ?? 'Other', body: entry.body } : { category: 'Observation', title: '', body: '' }); }} onCancel={onClose} confirmLoading={action.isPending} okText={entry ? 'Save entry' : 'Add entry'} onOk={async () => {
    try { const values = await form.validateFields(); await action.mutateAsync({ type: 'shift.entry', patient_id: record.patient_id, shift_id: record.shift_id!, handover_id: record.id, role: by.role, actor: by.name, op: entry ? 'edit' : 'add', entry_id: entry?.id, ...values }); if (!entry) who.set(picked); onClose(); } catch { return; }
  }}><Form form={form} layout="vertical" disabled={action.isPending}>
    {!entry && <WorkingAsBar who={{ ...picked, set: setPicked }} doctors={doctors} />}
    <Form.Item name="category" label="Type"><Select options={entryCategories.map(value => ({ value }))} /></Form.Item>
    <Form.Item name="title" label="Title" rules={[{ required: true, whitespace: true }]}><Input maxLength={200} placeholder="e.g. Reduced oral intake this shift" /></Form.Item>
    <Form.Item name="body" label="Details" rules={[{ required: true, whitespace: true }]}><VoiceTextArea rows={4} /></Form.Item>
  </Form></ClinicalModal>;
}

const labels = { situation: 'Current situation & recorded severity', background: 'Important history & allergies', recent_events: 'Shift events / rounds', completed_actions: 'Completed actions / assessments', pending_items: 'Pending work & responses', next_actions: 'Next actions — owner and timing' };

function PatientHandoverEditor({ record, onDirty }: { record: Handover; onDirty: (dirty: boolean) => void }) {
  const [form] = Form.useForm();
  const action = useWorkflowAction();
  return <Form form={form} layout="vertical" initialValues={record} disabled={record.status !== 'draft' || action.isPending} onValuesChange={() => onDirty(true)}>
    {Object.entries(labels).map(([key, label]) => <Form.Item key={key} name={['sections', key]} label={label} rules={['situation', 'next_actions'].includes(key) ? [{ required: true, whitespace: true }] : []}><VoiceTextArea rows={key === 'next_actions' ? 3 : 2} /></Form.Item>)}
    <Form.Item name="escalation" label="Contingencies / escalation — what to watch, who to contact" rules={[{ required: true, whitespace: true }]}><VoiceTextArea rows={3} placeholder="Document clinician-approved watch points and escalation instructions. Do not rely on generated treatment advice." /></Form.Item>
    {record.status === 'draft' && <><Form.Item name="shift_reviewed" valuePropName="checked"><Checkbox>I reviewed the captured sources and updated the plan for the incoming doctor.</Checkbox></Form.Item>
      <Button type="primary" loading={action.isPending} onClick={async () => {
        try { const values = await form.validateFields(); await action.mutateAsync({ type: 'handover.save', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version,
          actor: record.from_doctor, to_doctor: record.to_doctor, shift: record.shift, shift_at: record.shift_at, sections: values.sections, escalation: values.escalation, shift_reviewed: values.shift_reviewed }); onDirty(false); } catch { return; }
      }}>Save patient handover</Button></>}
  </Form>;
}

function ShiftPacket({ records, state, dirty, onDirty }: { records: Handover[]; state: WorkflowState; dirty: boolean; onDirty: (dirty: boolean) => void }) {
  const [selectedId, setSelectedId] = useState(records[0].id);
  const [search, setSearch] = useState('');
  const [sourceType, setSourceType] = useState('all');
  const [sourceSearch, setSourceSearch] = useState('');
  const [readback, setReadback] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editing, setEditing] = useState<Source | 'new' | null>(null);
  const who = useWorkingAs();
  const { modal } = App.useApp();
  const action = useWorkflowAction();
  const head = records[0];
  const selected = records.find(record => record.id === selectedId) ?? head;
  const patient = state.patients.find(patient => patient.id === selected.patient_id)!;
  const changed = head.status === 'draft' && records.some(record => shiftChanged(state, record));
  const visible = records.filter(record => {
    const patient = state.patients.find(patient => patient.id === record.patient_id)!;
    return `${patient.name} ${patient.uhid} ${record.sections.situation}`.toLowerCase().includes(search.toLowerCase());
  });
  const sources = (selected.source_snapshot ?? []).filter(source => (sourceType === 'all' || source.type === sourceType) && (roleFilter === 'all' || roleOf(source) === roleFilter) && `${source.title} ${source.author} ${source.body}`.toLowerCase().includes(sourceSearch.toLowerCase()));
  return <>
    {head.status === 'draft' && <WorkingAsBar who={who} doctors={[...new Set([head.from_doctor, head.to_doctor, ...Object.values(owners)])]} />}
    <div className="shift-packet-meta"><strong>{head.from_doctor} → {head.to_doctor}</strong><span>{head.department} · {head.shift}{head.created_by_role && <> · prepared by <RoleTag role={head.created_by_role} /></>}</span><span>{formatDate(head.shift_start!)} → {formatDate(head.shift_end!)}</span><Tag>{head.status}</Tag></div>
    {changed && <Alert type="warning" showIcon title="Patient records changed since capture" description="Refresh the sources, then review every patient again. Your edited summaries are kept; reconcile them with the refreshed records." />}
    <div className="workflow-toolbar">
      <span>{records.filter(record => record.shift_reviewed).length}/{records.length} patients reviewed</span>
      {dirty && <Tag color="gold">Save patient edits before switching or approving</Tag>}
      {head.status === 'draft' && <><Button disabled={dirty} loading={action.isPending} onClick={() => action.mutate({ type: 'shift.refresh', patient_id: head.patient_id, shift_id: head.shift_id!, expected_revision: state.revision, actor: head.from_doctor })}>Refresh chart sources</Button>
        <Button type="primary" disabled={dirty || changed || records.some(record => !record.shift_reviewed)} loading={action.isPending} onClick={() => modal.confirm({ title: 'Approve this complete shift packet?', content: 'All patient summaries and captured sources become read-only. Continue the verbal handover and resolve questions with the incoming clinician.', okText: 'Approve packet', onOk: () => action.mutateAsync({ type: 'shift.approve', patient_id: head.patient_id, shift_id: head.shift_id!, expected_revision: state.revision, actor: head.from_doctor }) })}>Approve shift packet</Button></>}
    </div>
    <div className="shift-packet-layout"><aside className="shift-patient-roster"><Input.Search disabled={dirty} value={search} onChange={event => setSearch(event.target.value)} placeholder="Search patients in this shift" aria-label="Search shift patients" />
      {visible.map(record => { const patient = state.patients.find(patient => patient.id === record.patient_id)!; return <button type="button" disabled={dirty || action.isPending} key={record.id} className={`history-visit${record.id === selected.id ? ' is-selected' : ''}`} aria-pressed={record.id === selected.id} onClick={() => setSelectedId(record.id)}><strong>{patient.name}</strong><small>{patient.uhid} · {patient.department === record.department ? 'Department patient' : `Referred from ${patient.department}`}</small><span>{record.shift_reviewed ? 'Reviewed' : 'Needs review'} · {record.source_snapshot?.length ?? 0} sources</span></button>; })}
    </aside><div className="shift-patient-content"><div className="history-detail-heading"><h4>{patient.name} · {patient.age}{patient.sex}</h4><Link to={`/app/patients/${patient.id}`} target="_blank" rel="noreferrer">Open live chart ↗</Link></div>
      <p className="history-small">Sources captured {formatDate(selected.captured_at!)}. Carry-forward items show open work and context at capture time, not reconstructed historical statuses.</p>
      <Tabs items={[
        { key: 'summary', label: 'Editable handover', children: <PatientHandoverEditor key={`${selected.id}-${selected.version}`} record={selected} onDirty={onDirty} /> },
        { key: 'sources', label: `Captured records · ${selected.source_snapshot?.length ?? 0}`, children: <>
          <div className="workflow-toolbar"><Select aria-label="Source record type" value={sourceType} onChange={setSourceType} options={[{ value: 'all', label: 'All records' }, ...[...new Set((selected.source_snapshot ?? []).map(source => source.type))].map(value => ({ value, label: value === 'manual' ? 'Handover entries' : value }))]} />
            <Select aria-label="Written by" value={roleFilter} onChange={setRoleFilter} style={{ width: 150 }} options={[{ value: 'all', label: 'All authors' }, { value: 'doctor', label: 'Doctor' }, { value: 'nurse', label: 'Nurse' }, { value: 'system', label: 'Lab / system' }]} />
            {head.status === 'draft' && <Button type="primary" onClick={() => setEditing('new')}>+ Add entry</Button>}</div>
          <Input.Search className="section-gap" value={sourceSearch} onChange={event => setSourceSearch(event.target.value)} placeholder="Search rounds, notes, clinician or result" aria-label="Search captured sources" allowClear />
          <Collapse className="section-gap" items={sources.map((source, index) => ({ key: `${source.type}-${source.id}-${index}`, label: <span><RoleTag role={roleOf(source)} />{source.title}<small className="shift-source-meta">{source.author} · {formatDate(source.at)} · {source.manual ? `${source.category ?? 'Entry'} · Manual entry${source.edited_at ? ` · edited ${formatDate(source.edited_at)}` : ''}` : source.scope === 'shift' ? 'During shift' : 'Carry-forward context'}</small></span>, children: <><p style={{ whiteSpace: 'pre-wrap' }}>{source.body}</p>
            {source.manual && head.status === 'draft' && source.author === who.name && source.role === who.role && <div className="entry-actions"><Button size="small" onClick={() => setEditing(source)}>Edit</Button><Button size="small" danger loading={action.isPending} onClick={() => modal.confirm({ title: 'Delete this entry?', okText: 'Delete', okButtonProps: { danger: true }, onOk: () => action.mutateAsync({ type: 'shift.entry', patient_id: selected.patient_id, shift_id: selected.shift_id!, handover_id: selected.id, role: who.role, actor: who.name, op: 'delete', entry_id: source.id }) })}>Delete</Button></div>}
            <small className="history-small">{source.manual ? `Entry ID: ${source.id} · Written in this handover` : `Source ID: ${source.id} · Captured snapshot`}</small></> }))} />
          <EntryModal doctors={[...new Set([head.from_doctor, head.to_doctor, ...Object.values(owners)])]} key={`${selected.id}-${typeof editing === 'object' && editing ? editing.id : 'new'}`} record={selected} entry={typeof editing === 'object' && editing ? editing : undefined} who={who} open={editing !== null} onClose={() => setEditing(null)} />
        </> },
      ]} />
    </div></div>
    {head.status === 'approved' && <div className="shift-receipt"><h4>Incoming doctor: {head.to_doctor}</h4><VoiceTextArea rows={3} value={readback} onChange={event => setReadback(event.target.value)} placeholder="Summarise your understanding, confirmed pending actions and any clarifications from the verbal handover." />
      <Button className="section-gap" type="primary" disabled={!readback.trim()} loading={action.isPending} onClick={() => modal.confirm({ title: `Acknowledge as ${head.to_doctor}?`, content: 'This demo records the named incoming doctor and your readback. It does not authenticate a separate clinician identity.', okText: 'Acknowledge receipt', onOk: () => action.mutateAsync({ type: 'shift.receive', patient_id: head.patient_id, shift_id: head.shift_id!, expected_revision: state.revision, actor: head.to_doctor, readback }) })}>Acknowledge full packet</Button></div>}
    {head.status === 'received' && <Alert type="success" title={`Received by ${head.to_doctor} · ${formatDate(head.received_at!)}`} description={head.readback} />}
  </>;
}

export function ShiftHandoversPage() {
  const query = useWorkflow();
  const action = useWorkflowAction();
  const activeDoctor = useActiveDoctor();
  const who = useWorkingAs();
  const { modal } = App.useApp();
  const [params, setParams] = useSearchParams();
  const updateParams = (updates: Record<string, string | null>, replace = false) => setParams(current => patchArchiveParams(current, updates), { replace });
  const search = params.get('search') ?? '', doctor = params.get('doctor') ?? '', incoming = params.get('incoming') ?? '', department = params.get('department') ?? '', status = params.get('status') ?? '', fromDate = params.get('from') ?? '', toDate = params.get('to') ?? '';
  const setFilter = (key: string, value: string) => updateParams({ [key]: value, page: null }, true);
  const setSearch = (value: string) => setFilter('search', value);
  const setDoctor = (value: string) => setFilter('doctor', value);
  const setIncoming = (value: string) => setFilter('incoming', value);
  const setDepartment = (value: string) => setFilter('department', value);
  const setStatus = (value: string) => setFilter('status', value);
  const setFromDate = (value: string) => setFilter('from', value);
  const setToDate = (value: string) => setFilter('to', value);
  // Supabase is seeded once with `npm run seed:shifts`. Only the browser-only mock mode builds the demo shifts itself.
  const seed = useWorkflowAction().mutate;
  const attemptedSeed = useRef(false);
  const seedPatientId = query.data?.patients[0]?.id;
  const mockSeedNeeded = env.mode === 'mock' && query.data && !query.data.commands.includes(SHIFT_DEMO_MARKER);
  useEffect(() => {
    if (mockSeedNeeded && seedPatientId && !attemptedSeed.current) { attemptedSeed.current = true; seed({ type: 'shift.seed', patient_id: seedPatientId }); }
  }, [mockSeedNeeded, seedPatientId, seed]);
  const [adding, setAdding] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [form] = Form.useForm();
  const creationDepartment = Form.useWatch('department', form);
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const state = query.data;
  const packets = [...new Set(state.handovers.map(record => record.shift_id).filter(Boolean))].map(id => {
    const records = state.handovers.filter(record => record.shift_id === id);
    return { ...records[0], records };
  });
  const selected = packets.find(packet => packet.shift_id === params.get('shift') || packet.records.some(record => record.id === params.get('id')));
  const rows = packets.filter(packet => (!doctor || packet.from_doctor === doctor) && (!incoming || packet.to_doctor === incoming) && (!department || packet.department === department) && (!status || packet.status === status))
    .filter(packet => (!fromDate || packet.shift_start! >= new Date(`${fromDate}T00:00:00+05:30`).toISOString()) && (!toDate || packet.shift_start! <= new Date(`${toDate}T23:59:59+05:30`).toISOString()))
    .filter(packet => `${packet.from_doctor} ${packet.to_doctor} ${packet.shift} ${packet.records.map(record => `${state.patients.find(patient => patient.id === record.patient_id)?.name} ${state.patients.find(patient => patient.id === record.patient_id)?.uhid} ${Object.values(record.sections).join(' ')} ${record.source_snapshot?.map(source => `${source.title} ${source.body} ${source.author}`).join(' ')}`).join(' ')}`.toLowerCase().includes(search.toLowerCase()))
    .sort((first, second) => second.shift_start!.localeCompare(first.shift_start!));
  const eligible = shiftRoster(state, creationDepartment);
  const closePacket = () => { if (dirty) modal.confirm({ title: 'Discard unsaved patient edits?', onOk: () => { setDirty(false); updateParams({ shift: null, id: null }); } }); else updateParams({ shift: null, id: null }); };
  const legacyId = params.get('id') && !selected;
  return <Tabs activeKey={selected ? 'shifts' : legacyId ? 'legacy' : params.get('tab') ?? 'shifts'} onChange={tab => updateParams({ tab, shift: null, id: null })} items={[
    { key: 'shifts', label: 'Shift handovers', children: <section className="surface workflow-page">
      <div className="workflow-toolbar"><strong>Doctor shift archive</strong>
        <Input.Search aria-label="Search shift packets" placeholder="Patient, UHID, note or action" value={search} onChange={event => setSearch(event.target.value)} style={{ width: 230 }} />
        <Select aria-label="Outgoing doctor" value={doctor} onChange={setDoctor} options={[{ value: '', label: 'All outgoing doctors' }, ...[...new Set(packets.map(packet => packet.from_doctor))].map(value => ({ value }))]} style={{ width: 190 }} />
        <Select aria-label="Incoming doctor" value={incoming} onChange={setIncoming} options={[{ value: '', label: 'All incoming doctors' }, ...[...new Set(packets.map(packet => packet.to_doctor))].map(value => ({ value }))]} style={{ width: 190 }} />
        <Select aria-label="Shift department" value={department} onChange={setDepartment} options={[{ value: '', label: 'All departments' }, ...Object.keys(owners).map(value => ({ value }))]} />
        <Select aria-label="Packet status" value={status} onChange={setStatus} options={[{ value: '', label: 'All statuses' }, ...['draft', 'approved', 'received'].map(value => ({ value }))]} />
        <Input aria-label="Shifts from date" type="date" value={fromDate} onChange={event => setFromDate(event.target.value)} style={{ width: 140 }} /><Input aria-label="Shifts to date" type="date" value={toDate} onChange={event => setToDate(event.target.value)} style={{ width: 140 }} />
        <Button onClick={() => { const end = new Date(); const start = new Date(end.getTime() - 7 * 86400000); updateParams({ from: toLocalDateTime(start.toISOString()).slice(0, 10), to: toLocalDateTime(end.toISOString()).slice(0, 10), page: null }, true); }}>Last 7 days</Button>
        <Button onClick={() => updateParams({ search: null, doctor: null, incoming: null, department: null, status: null, from: null, to: null, page: null }, true)}>Clear filters</Button>
        <Button type="primary" onClick={() => { const patient = state.patients.find(patient => patient.id === params.get('patient')); const end = new Date(); form.resetFields(); form.setFieldsValue({ department: patient?.department ?? activeDoctor.data.department, from_doctor: activeDoctor.data.name, patient_ids: patient ? [patient.id] : [], shift: 'Day', starts_at: toLocalDateTime(new Date(end.getTime() - 8 * 3600000).toISOString()), ends_at: toLocalDateTime(end.toISOString()) }); setAdding(true); }}>New shift packet</Button>
      </div>
      <Table size="small" rowKey="shift_id" dataSource={rows} pagination={{ current: Math.min(Math.max(1, Number(params.get('page')) || 1), Math.max(1, Math.ceil(rows.length / ([5, 10, 20].includes(Number(params.get('size'))) ? Number(params.get('size')) : 10)))), pageSize: [5, 10, 20].includes(Number(params.get('size'))) ? Number(params.get('size')) : 10, showTotal: total => `${total} shifts`, showSizeChanger: true, pageSizeOptions: [5, 10, 20], onChange: (page, size) => updateParams({ page: String(page), size: String(size) }, true) }} scroll={{ x: 900 }} columns={[
        { title: 'Shift · IST', render: (_, packet) => <><strong>{packet.shift}</strong><div className="history-small">{formatDate(packet.shift_start!)} → {formatDate(packet.shift_end!)}</div></> },
        { title: 'Outgoing → incoming', render: (_, packet) => `${packet.from_doctor} → ${packet.to_doctor}` }, { title: 'Department', dataIndex: 'department' }, { title: 'Patients', render: (_, packet) => packet.records.length },
        { title: 'Contributors', render: (_, packet) => { const roles = new Set(packet.records.flatMap(record => (record.source_snapshot ?? []).filter(source => source.manual).map(roleOf))); return roles.size ? [...roles].map(role => <RoleTag key={role} role={role} />) : <span className="history-small">No manual entries</span>; } },
        { title: 'Reviewed', render: (_, packet) => `${packet.records.filter(record => record.shift_reviewed).length}/${packet.records.length}` }, { title: 'Status', dataIndex: 'status', render: value => <Tag>{value}</Tag> },
        { title: 'Action', render: (_, packet) => <Button onClick={() => updateParams({ shift: packet.shift_id!, id: null })}>Open packet</Button> },
      ]} />
      <ClinicalDrawer width={1100} title="Shift handover packet" extra={<Button onClick={closePacket}>← Back to filtered shifts</Button>} open={Boolean(selected)} onClose={closePacket}>
        {selected && <ShiftPacket key={selected.shift_id} records={selected.records} state={state} dirty={dirty} onDirty={setDirty} />}
      </ClinicalDrawer>
      <ClinicalModal width={700} title="Create doctor shift packet" description="Choose the actual shift window and patients covered. Times use your browser’s local timezone." open={adding} onCancel={() => setAdding(false)} confirmLoading={action.isPending} okText="Prepare patient drafts" onOk={async () => {
        try { const values = await form.validateFields(); const id = await action.mutateAsync({ type: 'shift.create', patient_id: values.patient_ids[0], patient_ids: values.patient_ids, actor: values.from_doctor, created_by_role: who.role, to_doctor: values.to_doctor, department: values.department, shift: values.shift, starts_at: new Date(values.starts_at).toISOString(), ends_at: new Date(values.ends_at).toISOString() }); setAdding(false); updateParams({ shift: id, id: null }); } catch { return; }
      }}><Form form={form} layout="vertical" disabled={action.isPending}>
        <WorkingAsBar who={who} doctors={[...new Set([activeDoctor.data.name, ...Object.values(owners)])]} />
        <div className="order-form-grid"><Form.Item name="from_doctor" label="Outgoing doctor (approves the packet)" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item><Form.Item name="to_doctor" label="Incoming doctor" rules={[{ required: true, whitespace: true }]}><Input placeholder="Named receiving clinician" /></Form.Item></div>
        <Form.Item name="department" label="Department" rules={[{ required: true }]}><Select onChange={() => form.setFieldValue('patient_ids', [])} options={Object.keys(owners).map(value => ({ value }))} /></Form.Item>
        <div className="order-form-grid"><Form.Item name="starts_at" label="Outgoing shift starts" rules={[{ required: true }]}><Input type="datetime-local" /></Form.Item><Form.Item name="ends_at" label="Outgoing shift ends" rules={[{ required: true }]}><Input type="datetime-local" /></Form.Item></div>
        <Form.Item name="shift" label="Shift label" rules={[{ required: true }]}><Select options={['Day', 'Evening', 'Night', 'On call'].map(value => ({ value }))} /></Form.Item>
        <Button className="section-gap" onClick={() => form.setFieldValue('patient_ids', eligible.map(patient => patient.id))}>Select all department & referred patients ({eligible.length})</Button>
        <Form.Item name="patient_ids" label="Patients covered this shift — department census and incoming consultations" rules={[{ type: 'array', required: true, min: 1 }]}><Select mode="multiple" showSearch optionFilterProp="label" options={eligible.map(patient => ({ value: patient.id, label: `${patient.name} · ${patient.uhid}${patient.department !== creationDepartment ? ` · Referred from ${patient.department}` : ' · Department patient'}` }))} /></Form.Item>
        <p className="history-small">Includes all recorded team activity in the shift window with original authors. This is not proof that the outgoing doctor personally performed each action. Existing browser-only notes must be saved to the shared chart to appear.</p>
      </Form></ClinicalModal>
    </section> },
    { key: 'legacy', label: 'Individual / legacy handovers', children: <LegacyHandoversPage /> },
  ]} />;
}
