import { useState } from 'react';
import { Alert, Button, Drawer, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { WorkflowToolbar } from '../components/WorkflowToolbar';
import { QueryState } from '../components/QueryState';
import type { Handover, WorkflowState } from '../domain/workflow';
import { formatDate } from '../lib/format';
import { dateRangeOptions, withinDateRange, toLocalDateTime } from '../lib/dateRange';
import { ReportList } from '../components/ReportList';
import { VoiceInput, VoiceTextArea } from '../components/VoiceField';

const sectionLabels = { situation: 'Current situation', background: 'Important history', recent_events: 'Recent events', completed_actions: 'Completed actions', pending_items: 'Pending items', next_actions: 'Next actions' };

function HandoverEditor({ record, state }: { record: Handover; state: WorkflowState }) {
  const [form] = Form.useForm();
  const action = useWorkflowAction();
  const readOnly = record.status !== 'draft';
  const changed = state.audit.filter(event => event.patient_id === record.patient_id && event.at > record.created_at && !event.action.startsWith('handover.'));
  return <>
    <Space><Tag>{record.status}</Tag><Link to={`/app/patients/${record.patient_id}`}>Open patient</Link></Space>
    {changed.length > 0 && <Alert className="section-gap" type="warning" title={`${changed.length} patient actions since this draft was created`} description="Review the latest chart and update the draft before approval. Approved handovers remain snapshots; later work stays in the live queues." />}
    <Form form={form} layout="vertical" size="small" initialValues={{ ...record, shift_at: toLocalDateTime(record.shift_at) }} disabled={readOnly} className="section-gap">
      <Form.Item name="to_doctor" label="Incoming doctor" rules={[{ required: true, whitespace: true }]}><VoiceInput /></Form.Item>
      <Form.Item name="shift" label="Shift" rules={[{ required: true, whitespace: true }]}><Select options={['Morning', 'Evening', 'Night'].map(value => ({ value }))} /></Form.Item>
      <Form.Item name="shift_at" label="Shift starts (local date and time)" rules={[{ required: true }]}><Input type="datetime-local" /></Form.Item>
      {Object.entries(sectionLabels).map(([key, label]) => <Form.Item key={key} name={['sections', key]} label={label} rules={['situation', 'next_actions'].includes(key) ? [{ required: true, whitespace: true }] : []}><VoiceTextArea rows={key === 'pending_items' ? 4 : 3} /></Form.Item>)}
    </Form>
    {!readOnly && <Space>
      <Button loading={action.isPending} onClick={async () => {
        try { const values = await form.validateFields(); await action.mutateAsync({ type: 'handover.save', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version, ...values, shift_at: new Date(values.shift_at).toISOString() }); } catch { return; }
      }}>Save draft</Button>
      <Button type="primary" loading={action.isPending} onClick={() => {
        if (form.isFieldsTouched()) { Modal.info({ title: 'Save your edits first', content: 'Approval applies to the saved version, so incoming staff receive exactly the reviewed content.' }); return; }
        action.mutate({ type: 'handover.approve', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version });
      }}>Approve handover</Button>
    </Space>}
    {record.status === 'approved' && <Button type="primary" loading={action.isPending} onClick={() => Modal.confirm({ title: `Acknowledge as ${record.to_doctor}?`, content: 'This is a simulated incoming-doctor action recorded in the demo audit history.', onOk: () => action.mutateAsync({ type: 'handover.receive', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version, actor: record.to_doctor }) })}>Incoming doctor: acknowledge receipt</Button>}
    {record.received_at && <p className="muted">Received by {record.to_doctor} · {formatDate(record.received_at)}</p>}
    <details className="section-gap"><summary>Source reports and record references ({record.source_ids.length})</summary>
      <ReportList reports={state.reports.filter(report => record.source_ids.includes(report.id))} />
      <p className="muted">Other source notes, pending orders and tasks are available in the linked patient record.</p>
      <ul className="compact-list">{record.source_ids.filter(id => !state.reports.some(report => report.id === id)).map(id => <li key={id}><code>{id}</code></li>)}</ul>
    </details>
  </>;
}

export function HandoversPage() {
  const query = useWorkflow();
  const action = useWorkflowAction();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [shift, setShift] = useState('');
  const [recipient, setRecipient] = useState('');
  const [range, setRange] = useState('all');
  const [adding, setAdding] = useState(false);
  const [form] = Form.useForm();
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const state = query.data;
  const selected = state.handovers.find(record => record.id === params.get('id'));
  const ipd = state.patients.filter(patient => state.histories.some(history => history.context.patient_id === patient.id && history.encounters.some(encounter => encounter.status === 'active' && encounter.kind === 'IPD')));
  const rows = state.handovers.map(record => ({ ...record, patient: state.patients.find(patient => patient.id === record.patient_id)! }))
    .filter(record => !department || record.patient.department === department).filter(record => !status || record.status === status)
    .filter(record => !shift || record.shift === shift).filter(record => !recipient || record.to_doctor === recipient)
    .filter(record => withinDateRange(record.shift_at, range))
    .filter(record => `${record.patient.name} ${record.patient.uhid} ${record.from_doctor} ${record.to_doctor}`.toLowerCase().includes(search.toLowerCase()));
  return <section className="surface workflow-page">
    <WorkflowToolbar title="IPD handovers" search={search} onSearch={setSearch} department={department} onDepartment={setDepartment}>
      <Select size="small" value={status} onChange={setStatus} aria-label="Handover status" options={[{ value: '', label: 'All statuses' }, ...['draft', 'approved', 'received'].map(value => ({ value }))]} style={{ width: 130 }} />
      <Select size="small" value={shift} onChange={setShift} aria-label="Shift filter" options={[{ value: '', label: 'All shifts' }, ...['Morning', 'Evening', 'Night'].map(value => ({ value }))]} style={{ width: 110 }} />
      <Select size="small" value={recipient} onChange={setRecipient} aria-label="Incoming doctor filter" options={[{ value: '', label: 'All incoming doctors' }, ...[...new Set(state.handovers.map(record => record.to_doctor))].map(value => ({ value }))]} style={{ width: 180 }} />
      <Select size="small" value={range} onChange={setRange} aria-label="Shift dates" options={dateRangeOptions} style={{ width: 125 }} />
      <Button type="primary" size="small" onClick={() => { form.resetFields(); form.setFieldsValue({ patient_id: params.get('patient') ?? undefined, shift: 'Night', shift_at: toLocalDateTime(new Date().toISOString()) }); setAdding(true); }}>+ Handover</Button>
    </WorkflowToolbar>
    <Table size="small" rowKey="id" dataSource={rows} pagination={{ pageSize: 15 }} columns={[
      { title: 'Patient', render: (_, record) => <Link to={`/app/patients/${record.patient_id}`}>{record.patient.name}</Link> },
      { title: 'From', dataIndex: 'from_doctor' }, { title: 'Incoming doctor', dataIndex: 'to_doctor' },
      { title: 'Shift', dataIndex: 'shift' }, { title: 'Starts · IST', dataIndex: 'shift_at', render: formatDate },
      { title: 'Status', dataIndex: 'status', render: value => <Tag>{value}</Tag> },
      { title: 'Action', render: (_, record) => <Button size="small" onClick={() => setParams({ id: record.id })}>Open</Button> },
    ]} />
    <Drawer size="large" open={Boolean(selected)} title={selected ? `Handover · ${state.patients.find(patient => patient.id === selected.patient_id)?.name}` : 'Handover'} onClose={() => setParams({})}>
      {selected && <HandoverEditor key={`${selected.id}-${selected.version}`} record={selected} state={state} />}
    </Drawer>
    <Modal title="Create IPD shift handover" open={adding} onCancel={() => setAdding(false)} confirmLoading={action.isPending} okText="Prepare draft" onOk={async () => {
      try { const values = await form.validateFields(); const id = await action.mutateAsync({ type: 'handover.create', ...values, shift_at: new Date(values.shift_at).toISOString() }); setAdding(false); setParams({ id }); } catch { return; }
    }}>
      <Form form={form} layout="vertical" size="small">
        <Form.Item name="patient_id" label="IPD patient" rules={[{ required: true }]}><Select showSearch optionFilterProp="label" options={ipd.map(patient => ({ value: patient.id, label: `${patient.name} · ${patient.uhid}` }))} /></Form.Item>
        <Form.Item name="to_doctor" label="Incoming doctor" rules={[{ required: true, whitespace: true }]}><VoiceInput placeholder="Dr. …" /></Form.Item>
        <Form.Item name="shift" label="Shift"><Select options={['Morning', 'Evening', 'Night'].map(value => ({ value }))} /></Form.Item>
        <Form.Item name="shift_at" label="Shift starts (local date and time)" rules={[{ required: true }]}><Input type="datetime-local" /></Form.Item>
      </Form>
      <p className="muted">A structured draft uses the current record. Review and add next actions before approving; no AI treatment decisions are generated.</p>
    </Modal>
  </section>;
}
