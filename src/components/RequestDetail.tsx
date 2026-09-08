import { Button, Form, Select, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { PatientHistory } from '../domain/longitudinal';
import type { Report } from '../domain/models';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { owners } from '../data/cohort';
import { ReportList } from './ReportList';
import { VoiceTextArea } from './VoiceField';

export function RequestDetail({ request, reports, simulator = false }: { request: PatientHistory['requests'][number]; reports: Report[]; simulator?: boolean }) {
  const action = useWorkflowAction();
  const workflow = useWorkflow();
  const patient = workflow.data?.patients.find(patient => patient.id === request.patient_id);
  const history = workflow.data?.histories.find(history => history.context.patient_id === request.patient_id);
  const [form] = Form.useForm();
  const closed = ['completed', 'cancelled'].includes(request.status);
  const next = ({ received: 'accepted', accepted: 'in_progress', in_progress: 'completed' } as const)[request.status as 'received' | 'accepted' | 'in_progress'];
  const save = async (status?: 'accepted' | 'in_progress' | 'completed' | 'cancelled') => {
    try {
      const values = await form.validateFields();
      await action.mutateAsync({ type: 'request.update', patient_id: request.patient_id, entity_id: request.id, expected_version: request.version,
        owner: values.owner, priority: values.priority, response: values.response, reason: values.reason, status, ...(simulator ? { actor: request.owner } : {}) });
    } catch { return; }
  };
  return <>
    <Space><Tag>{request.status.replaceAll('_', ' ')}</Tag><Tag color={request.priority === 'urgent' ? 'red' : 'default'}>{request.priority}</Tag><Link to={`/app/patients/${request.patient_id}`}>Open full patient context</Link></Space>
    <Typography.Paragraph className="section-gap">{request.from_department} → {request.to_department}</Typography.Paragraph>
    <Typography.Paragraph>{request.reason}</Typography.Paragraph>
    {simulator && <Tag color="gold">Simulated receiving team · {request.owner}</Tag>}
    {patient && <Typography.Paragraph className="section-gap"><strong>Patient context:</strong> {patient.conditions.join(' · ')}. Allergies: {patient.allergies.join(', ') || 'Not documented'}.</Typography.Paragraph>}
    {history && <><Typography.Paragraph>{history.context.presenting_complaint}</Typography.Paragraph>
      <Typography.Paragraph type="secondary">Medication context: {history.medications.map(medication => `${medication.name} ${medication.dose} (${medication.status.replaceAll('_', ' ')})`).join('; ') || 'Not documented'}</Typography.Paragraph></>}
    <Typography.Title level={5}>Attached reports</Typography.Title>
    <ReportList reports={reports.filter(report => request.source_ids.includes(report.id))} />
    <Form form={form} layout="vertical" size="small" className="section-gap" initialValues={{ ...request, response: request.response ?? request.response_draft ?? '' }} disabled={closed}>
      <Form.Item name="owner" label="Assigned clinician" rules={[{ required: true }]}><Select showSearch options={[...new Set([request.owner, ...Object.values(owners)])].map(value => ({ value }))} /></Form.Item>
      <Form.Item name="priority" label="Priority"><Select options={[{ value: 'routine' }, { value: 'urgent' }]} /></Form.Item>
      <Form.Item name="response" label="Specialist response"><VoiceTextArea rows={4} placeholder="Document findings and the response to the requested question" /></Form.Item>
      {!closed && <Form.Item name="reason" label="Cancellation reason (only if cancelling)"><VoiceTextArea rows={2} /></Form.Item>}
    </Form>
    {!closed && <Space wrap>
      <Button loading={action.isPending} onClick={() => save()}>Save draft / assignment</Button>
      {next && <Button type="primary" loading={action.isPending} onClick={() => save(next)}>{next === 'accepted' ? 'Accept' : next === 'in_progress' ? 'Start review' : 'Complete with response'}</Button>}
      <Button danger loading={action.isPending} onClick={() => save('cancelled')}>Cancel request</Button>
    </Space>}
    {request.status === 'completed' && <div><Typography.Paragraph>{request.response}</Typography.Paragraph>
      {request.reviewed_at ? <Tag color="green">Requester reviewed</Tag> : <Button type="primary" loading={action.isPending} onClick={() => action.mutate({ type: 'request.review', patient_id: request.patient_id, entity_id: request.id, expected_version: request.version })}>Mark response reviewed</Button>}
    </div>}
  </>;
}
