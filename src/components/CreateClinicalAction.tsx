import { useState } from 'react';
import { Button, Form, Modal, Select, Typography } from 'antd';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { owners } from '../data/cohort';
import { VoiceTextArea } from './VoiceField';

export function CreateClinicalAction({ kind, patientId, label }: { kind: 'lab' | 'imaging' | 'request' | 'referral'; patientId?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const query = useWorkflow();
  const action = useWorkflowAction();
  const selectedId = Form.useWatch('patient_id', form) ?? patientId;
  const state = query.data;
  const patient = state?.patients.find(item => item.id === selectedId);
  const history = state?.histories.find(item => item.context.patient_id === selectedId);
  const active = history?.encounters.find(item => item.status === 'active');
  const sourceReports = state?.reports.filter(report => report.patient_id === selectedId && report.encounter_id === active?.id) ?? [];
  const isRequest = kind === 'request' || kind === 'referral';
  const title = isRequest ? `New ${kind}` : `New ${kind === 'lab' ? 'lab' : 'imaging'} order`;
  return <>
    <Button size="small" onClick={() => { form.resetFields(); form.setFieldsValue({ patient_id: patientId, priority: 'routine' }); setOpen(true); }}>{label ?? `+ ${title}`}</Button>
    <Modal title={title} open={open} onCancel={() => setOpen(false)} confirmLoading={action.isPending} okText={isRequest ? 'Review & send' : 'Review & place order'} onOk={async () => {
      try {
        const values = await form.validateFields();
        if (isRequest) await action.mutateAsync({ type: 'request.create', patient_id: values.patient_id, kind, to_department: values.department, owner: owners[values.department], priority: values.priority, reason: values.indication, source_ids: sourceReports.map(report => report.id) });
        else await action.mutateAsync({ type: 'order.create', patient_id: values.patient_id, kind, title: values.title, indication: values.indication, priority: values.priority });
        setOpen(false);
      } catch { return; }
    }}>
      <Form form={form} layout="vertical" size="small">
        <Form.Item name="patient_id" label="Patient" rules={[{ required: true }]}><Select disabled={Boolean(patientId)} showSearch optionFilterProp="label" options={state?.patients.filter(item => state.histories.some(entry => entry.context.patient_id === item.id && entry.encounters.some(encounter => encounter.status === 'active'))).map(item => ({ value: item.id, label: `${item.name} · ${item.uhid}` }))} /></Form.Item>
        {isRequest ? <Form.Item name="department" label="Receiving department" rules={[{ required: true }]}><Select options={Object.keys(owners).filter(department => department !== patient?.department).map(value => ({ value, label: `${value} · ${owners[value]}` }))} /></Form.Item>
          : <Form.Item name="title" label={kind === 'lab' ? 'Test / panel' : 'Study'} rules={[{ required: true, whitespace: true }]}><Select showSearch options={(kind === 'lab' ? ['CBC', 'KFT', 'LFT', 'HbA1c', 'Electrolytes', 'CRP'] : ['Chest X-ray', 'Ultrasound abdomen', 'CT head (non-contrast)', 'Echocardiogram']).map(value => ({ value }))} /></Form.Item>}
        <Form.Item name="indication" label={isRequest ? 'Specific question / reason' : 'Clinical indication'} rules={[{ required: true, whitespace: true }]}><VoiceTextArea rows={3} /></Form.Item>
        <Form.Item name="priority" label="Priority"><Select options={[{ value: 'routine' }, { value: 'urgent' }]} /></Form.Item>
      </Form>
      {patient && <Typography.Paragraph className="muted">{patient.name} · {patient.uhid} · {patient.conditions.join(', ')}. Allergies: {patient.allergies.join(', ') || 'Not documented'}.</Typography.Paragraph>}
      {isRequest && <Typography.Paragraph className="muted">{sourceReports.length} current-encounter reports will be attached. Full patient context remains accessible.</Typography.Paragraph>}
    </Modal>
  </>;
}
