import { useState } from 'react';
import { App, Button, Form, Input, Select, Typography } from 'antd';
import { ClinicalModal as Modal } from './ClinicalOverlay';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { owners } from '../data/cohort';
import { referralDepartments } from '../data/orderCatalog';
import { VoiceTextArea } from './VoiceField';
import { OrderBasket, type OrderItem } from './OrderBasket';
import { env } from '../lib/env';
import { formatDate } from '../lib/format';

export function CreateClinicalAction({ kind, patientId, label }: { kind: 'lab' | 'imaging' | 'request' | 'referral'; patientId?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const query = useWorkflow();
  const action = useWorkflowAction();
  const selectedId = Form.useWatch('patient_id', form) ?? patientId;
  const items: OrderItem[] = Form.useWatch('items', form) ?? [];
  const state = query.data;
  const patient = state?.patients.find(item => item.id === selectedId);
  const history = state?.histories.find(item => item.context.patient_id === selectedId);
  const active = history?.encounters.find(item => item.status === 'active');
  const sourceReports = state?.reports.filter(report => report.patient_id === selectedId) ?? [];
  const pending = history?.orders.filter(order => order.encounter_id === active?.id && order.kind === kind && ['pending', 'processing'].includes(order.status)) ?? [];
  const isRequest = kind === 'request' || kind === 'referral';
  const title = isRequest ? `New ${kind}` : `New ${kind === 'lab' ? 'lab' : 'imaging'} orders`;
  return <>
    <Button size="small" onClick={() => { form.resetFields(); form.setFieldsValue({ patient_id: patientId, priority: 'routine', items: [], request_type: 'Clinical assessment', source_ids: sourceReports.filter(report => report.encounter_id === active?.id).map(report => report.id) }); setOpen(true); }}>{label ?? `+ ${title}`}</Button>
    <Modal width={720} title={title} patientId={selectedId} description={isRequest ? 'Choose the receiving service, clinical question and supporting records.' : 'Build an order basket. Each investigation gets its own status and result.'} open={open} onCancel={() => setOpen(false)} confirmLoading={action.isPending}
      okButtonProps={{ disabled: !active || (!isRequest && !items.length) }} okText={isRequest ? 'Send to department' : `Place ${items.length} order${items.length === 1 ? '' : 's'}`} onOk={async () => {
        try {
          const values = await form.validateFields();
          if (isRequest) await action.mutateAsync({ type: 'request.create', patient_id: values.patient_id, kind, to_department: values.department, owner: values.owner, priority: values.priority, reason: values.indication, source_ids: values.source_ids ?? [], request_type: values.request_type, contact: values.contact });
          else await action.mutateAsync({ type: 'order.place', patient_id: values.patient_id, kind, items: values.items, indication: values.indication, priority: values.priority });
          void message.success(`${isRequest ? 'Request sent' : `${values.items.length} orders placed`} · ${env.mode === 'supabase' ? 'Saved to database' : 'Saved in local preview'}`);
          setOpen(false);
        } catch { return; }
      }}>
      <Form form={form} layout="vertical" size="small" disabled={action.isPending}>
        <Form.Item name="patient_id" label="Patient" hidden={Boolean(patientId)} rules={[{ required: true }]}><Select placeholder="Search name or UHID" disabled={Boolean(patientId)} showSearch optionFilterProp="label" onChange={() => form.setFieldsValue({ department: undefined, owner: undefined, source_ids: [], items: [] })} options={state?.patients.filter(item => state.histories.some(entry => entry.context.patient_id === item.id && entry.encounters.some(encounter => encounter.status === 'active'))).map(item => ({ value: item.id, label: `${item.name} · ${item.uhid}` }))} /></Form.Item>
        {isRequest ? <>
          <Form.Item name="department" label="Receiving department" rules={[{ required: true }]}><Select showSearch placeholder="Select service" onChange={value => form.setFieldValue('owner', owners[value] ?? `${value} receiving team`)} options={referralDepartments.filter(value => value !== patient?.department).map(value => ({ value }))} /></Form.Item>
          <div className="order-form-grid"><Form.Item name="owner" label="Assigned clinician / team" rules={[{ required: true, whitespace: true }]}><Input placeholder="Named clinician or receiving team" /></Form.Item>
            <Form.Item name="request_type" label="Purpose" rules={[{ required: true }]}><Select options={['Clinical assessment', 'Treatment recommendation', 'Procedure evaluation', 'Pre-operative assessment', 'Discharge clearance opinion', 'Follow-up planning', 'Other'].map(value => ({ value }))} /></Form.Item></div>
        </> : <Form.Item name="items" label={kind === 'lab' ? 'Tests and panels' : 'Imaging studies'} rules={[{ validator: async (_, selected: OrderItem[] = []) => {
          if (!selected.length) throw new Error('Select at least one investigation.');
          if (selected.some(item => !item.catalog_id && !(kind === 'lab' ? item.specimen : item.modality)?.trim())) throw new Error('Specify specimen / modality for every custom order.');
        } }]}><OrderBasket kind={kind} pendingTitles={pending.map(order => order.title)} /></Form.Item>}
        {pending.length > 0 && <p className="overlay-helper">Already pending: {pending.map(order => order.title).join(', ')}. Complete or cancel existing orders before reordering the same test.</p>}
        <Form.Item name="indication" label={isRequest ? 'Clinical question and relevant history' : 'Clinical indication for these investigations'} rules={[{ required: true, whitespace: true }]}><VoiceTextArea rows={3} placeholder={isRequest ? 'What should the team assess or respond to?' : 'What question should these investigations answer?'} /></Form.Item>
        <Form.Item name="priority" label="Priority"><Select options={[{ value: 'routine', label: 'Routine' }, { value: 'urgent', label: 'Urgent' }]} /></Form.Item>
        {isRequest && <>
          <Form.Item name="contact" label="Callback / ward contact"><Input placeholder="Team contact or ward extension (optional)" maxLength={300} /></Form.Item>
          <Form.Item name="source_ids" label="Attach supporting reports"><Select mode="multiple" showSearch optionFilterProp="label" placeholder="Select current or previous reports" options={sourceReports.map(report => ({ value: report.id, label: `${report.title} · ${formatDate(report.reported_at)}` }))} /></Form.Item>
        </>}
      </Form>
      <Typography.Paragraph className="overlay-helper">{isRequest ? 'A referral requests an opinion; it does not transfer admission or automatically clear discharge.' : kind === 'lab' ? 'Specimen labels are indicative, not collection instructions. Laboratory must confirm preparation, sample requirements and availability.' : 'Radiology must confirm protocol, contrast, pregnancy and implant safety where relevant before performing a study.'}</Typography.Paragraph>
      <Typography.Paragraph className="overlay-helper">{env.mode === 'supabase' ? 'Saves to the hospital-scoped workflow database.' : 'Local preview: saves in this browser, not Supabase. Separate hospital apps require Supabase mode.'}</Typography.Paragraph>
      <Typography.Paragraph className="overlay-helper">Demo service catalog · Availability at Fortis has not been verified.</Typography.Paragraph>
    </Modal>
  </>;
}
