import { useState } from 'react';
import { Alert, Button, Form, Input, Select, Space, Table, Tag, Typography } from 'antd';
import { ClinicalDrawer as Drawer } from '../components/ClinicalOverlay';
import { Link, useSearchParams } from 'react-router-dom';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { WorkflowToolbar } from '../components/WorkflowToolbar';
import { dateRangeOptions, withinDateRange } from '../lib/dateRange';
import { CreateClinicalAction } from '../components/CreateClinicalAction';
import { ReportList } from '../components/ReportList';
import { QueryState } from '../components/QueryState';
import { VoiceTextArea } from '../components/VoiceField';
import { formatDate } from '../lib/format';
import type { PatientHistory } from '../domain/longitudinal';
import type { WorkflowState } from '../domain/workflow';

function OrderDetail({ order, state, simulator }: { order: PatientHistory['orders'][number]; state: WorkflowState; simulator: boolean }) {
  const action = useWorkflowAction();
  const [form] = Form.useForm();
  const [reason, setReason] = useState('');
  const result = state.reports.find(report => report.id === order.result_id);
  const pending = ['pending', 'processing'].includes(order.status);
  const [specimen] = useState(() => new Date(Math.max(Date.now(), new Date(order.placed_at).getTime())));
  const localTime = new Date(specimen.getTime() - specimen.getTimezoneOffset() * 60_000).toISOString().slice(0, 23);
  return <>
    <Space><Tag>{order.status}</Tag><Tag>{order.priority}</Tag><Link to={`/app/patients/${order.patient_id}`}>Open patient</Link></Space>
    <Typography.Paragraph className="section-gap">{order.indication}</Typography.Paragraph>
    <Typography.Paragraph type="secondary">Ordered by {order.requester} · {formatDate(order.placed_at)}</Typography.Paragraph>
    {(order.specimen || order.modality) && <Typography.Paragraph><strong>{order.kind === 'lab' ? 'Specimen' : 'Modality'}:</strong> {order.specimen ?? order.modality}</Typography.Paragraph>}
    {order.site && <Typography.Paragraph><strong>Site / collection detail:</strong> {order.site}</Typography.Paragraph>}
    {order.instructions && <Typography.Paragraph><strong>Instructions:</strong> {order.instructions}</Typography.Paragraph>}
    {order.batch_id && <Typography.Paragraph type="secondary">Placed together with {state.histories.flatMap(history => history.orders).filter(item => item.batch_id === order.batch_id && item.id !== order.id).map(item => item.title).join(', ') || 'no other investigations'}</Typography.Paragraph>}
    {result && <ReportList reports={[result]} />}
    {result && !state.reviews[result.id] && <Button type="primary" className="section-gap" loading={action.isPending} onClick={() => action.mutate({ type: 'report.review', patient_id: order.patient_id, entity_id: result.id })}>Mark result reviewed</Button>}
    {result && state.reviews[result.id] && <Tag color="green">Reviewed · {state.reviews[result.id].actor}</Tag>}
    {pending && simulator && <>
      {order.status === 'pending' && <Button loading={action.isPending} onClick={() => action.mutate({ type: 'order.status', patient_id: order.patient_id, entity_id: order.id, expected_version: order.version, status: 'processing', actor: order.kind === 'lab' ? 'Demo laboratory operator' : 'Demo radiology operator' })}>Start processing</Button>}
      <Form form={form} layout="vertical" size="small" className="section-gap" initialValues={{ performed_at: localTime, observations: [{ name: '', value: '', unit: '', reference: '', flag: 'normal' }] }}>
        <Form.Item name="performed_at" label="Collection / study time (local time)" rules={[{ required: true }]}><Input type="datetime-local" step="0.001" /></Form.Item>
        {order.kind === 'lab' && <Form.List name="observations">{(fields, { add, remove }) => <>
          {fields.map(field => <div className="result-input-row" key={field.key}>
            <Form.Item name={[field.name, 'name']} label="Test" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
            <Form.Item name={[field.name, 'value']} label="Result" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
            <Form.Item name={[field.name, 'unit']} label="Unit"><Input /></Form.Item>
            <Form.Item name={[field.name, 'reference']} label="Reference"><Input /></Form.Item>
            <Form.Item name={[field.name, 'flag']} label="Flag"><Select options={['normal', 'high', 'low'].map(value => ({ value }))} /></Form.Item>
            <Button size="small" danger onClick={() => remove(field.name)}>Remove</Button>
          </div>)}
          <Button size="small" onClick={() => add({ name: '', value: '', unit: '', reference: '', flag: 'normal' })}>+ Test result</Button>
        </>}</Form.List>}
        <Form.Item name="findings" label={order.kind === 'lab' ? 'Report comment' : 'Findings and impression'} rules={[{ required: true, whitespace: true }]} className="section-gap"><Input.TextArea rows={4} /></Form.Item>
      </Form>
      <Button type="primary" loading={action.isPending} onClick={async () => {
        try {
          const values = await form.validateFields();
          await action.mutateAsync({ type: 'order.publish', patient_id: order.patient_id, entity_id: order.id, expected_version: order.version,
            findings: values.findings, observations: order.kind === 'lab' ? values.observations.map((observation: Record<string, string>) => ({ name: observation.name, value: observation.value, unit: observation.unit ?? '', reference: observation.reference ?? '', flag: observation.flag as 'normal' | 'high' | 'low' })) : [],
            performed_at: new Date(values.performed_at).toISOString(), actor: order.kind === 'lab' ? 'Demo laboratory operator' : 'Demo radiology operator' });
        } catch { return; }
      }}>Publish synthetic report</Button>
    </>}
    {pending && !simulator && <p className="muted">Awaiting the {order.kind === 'lab' ? 'Lab' : 'Radiology'} portal. The published report will appear here automatically.</p>}
    {pending && <div className="section-gap"><VoiceTextArea rows={2} value={reason} onChange={event => setReason(event.target.value)} placeholder="Reason for cancelling this order" /><Button size="small" danger className="section-gap" loading={action.isPending} disabled={!reason.trim()} onClick={() => action.mutate({ type: 'order.status', patient_id: order.patient_id, entity_id: order.id, expected_version: order.version, status: 'cancelled', reason })}>Cancel order</Button></div>}
    {order.status === 'cancelled' && <Alert type="info" title="Order cancelled" description={order.cancellation_reason} />}
  </>;
}

export function InvestigationsPage({ kind, reviewOnly = false, simulator = false }: { kind?: 'lab' | 'imaging'; reviewOnly?: boolean; simulator?: boolean }) {
  const query = useWorkflow();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [range, setRange] = useState('all');
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const state = query.data;
  const all = state.histories.flatMap(history => history.orders).map(order => ({ ...order, patient: state.patients.find(patient => patient.id === order.patient_id)! }));
  const selected = all.find(order => order.id === params.get('id'));
  const rows = all.filter(order => !kind || order.kind === kind)
    .filter(order => !reviewOnly || order.result_id && !state.reviews[order.result_id])
    .filter(order => !department || order.patient.department === department)
    .filter(order => !status || order.status === status).filter(order => !priority || order.priority === priority)
    .filter(order => withinDateRange(order.placed_at, range))
    .filter(order => `${order.patient.name} ${order.patient.uhid} ${order.title}`.toLowerCase().includes(search.toLowerCase()))
    .sort((first, second) => second.placed_at.localeCompare(first.placed_at));
  const title = reviewOnly ? 'Results to review' : kind === 'imaging' ? 'Imaging orders' : 'Lab orders';
  return <section className="surface workflow-page">
    <WorkflowToolbar title={simulator ? `${title} · source portal` : title} search={search} onSearch={setSearch} department={department} onDepartment={setDepartment}>
      <Select size="small" value={status} onChange={setStatus} aria-label="Investigation status" options={[{ value: '', label: 'All statuses' }, ...['pending', 'processing', 'completed', 'cancelled'].map(value => ({ value }))]} style={{ width: 140 }} />
      <Select size="small" value={priority} onChange={setPriority} aria-label="Investigation priority" options={[{ value: '', label: 'Any priority' }, { value: 'urgent' }, { value: 'routine' }]} style={{ width: 110 }} />
      <Select size="small" value={range} onChange={setRange} options={dateRangeOptions} aria-label="Order dates" style={{ width: 125 }} />
      {!reviewOnly && <CreateClinicalAction kind={kind ?? 'lab'} />}
    </WorkflowToolbar>
    <Table size="small" rowKey="id" dataSource={rows} pagination={{ pageSize: 15 }} scroll={{ x: 950 }} columns={[
      { title: 'Patient', render: (_, order) => <Link to={`/app/patients/${order.patient_id}`}>{order.patient.name}<div className="muted">{order.patient.uhid}</div></Link> },
      { title: 'Investigation', dataIndex: 'title' }, { title: 'Department', render: (_, order) => order.patient.department },
      { title: 'Priority', dataIndex: 'priority' }, { title: 'Status', dataIndex: 'status', render: value => <Tag>{value}</Tag> },
      { title: 'Ordered · IST', dataIndex: 'placed_at', render: formatDate },
      { title: 'Review', render: (_, order) => order.result_id ? state.reviews[order.result_id] ? 'Reviewed' : <Tag color="blue">New result</Tag> : order.status === 'cancelled' ? '—' : 'Awaiting result' },
      { title: 'Action', render: (_, order) => <Button size="small" onClick={() => setParams({ id: order.id })}>Open</Button> },
    ]} />
    <Drawer patientId={selected?.patient_id} description="Investigation details · Indication, order status and linked result." open={Boolean(selected)} title={selected?.title ?? title} size="large" onClose={() => setParams({})}>
      {selected && <OrderDetail key={`${selected.id}-${selected.version}`} order={selected} state={state} simulator={simulator} />}
    </Drawer>
  </section>;
}
