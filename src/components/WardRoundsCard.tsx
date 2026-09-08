import { useState } from 'react';
import { Button, Form, Typography } from 'antd';
import { ClinicalModal as Modal } from './ClinicalOverlay';
import { formatDate } from '../lib/format';
import { VoiceTextArea } from './VoiceField';

export type WardRound = { id: string; recordedAt: string; title: string; body: string };

export function WardRoundsCard({ rounds, onAddRound, patientId }: { rounds: WardRound[]; onAddRound: (round: { findings: string; plan: string }) => Promise<void>; patientId?: string }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const sorted = [...rounds].sort((first, second) => second.recordedAt.localeCompare(first.recordedAt));

  const submit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await onAddRound(values);
      setOpen(false); form.resetFields();
    } catch { return; }
    finally { setSaving(false); }
  };

  return <div className="side-card">
    <div className="section-toolbar-inline">
      <h5>Ward rounds</h5>
      <Button size="small" onClick={() => setOpen(true)}>+ Add round</Button>
    </div>
    <ul className="ward-rounds-list">
      {sorted.map(round => <li key={round.id}>
        <div className="ward-round-head"><strong>{round.title}</strong><Typography.Text type="secondary">{formatDate(round.recordedAt)}</Typography.Text></div>
        <p className="ward-round-body">{round.body}</p>
      </li>)}
    </ul>
    <Modal title="Document ward round" patientId={patientId} description="Record your assessment and the next steps for the care team." open={open} onCancel={() => setOpen(false)} onOk={submit} confirmLoading={saving} okText="Save round note">
      <Form form={form} layout="vertical">
        <Form.Item name="findings" label="Findings" rules={[{ required: true, message: 'Findings are required' }]}>
          <VoiceTextArea rows={2} placeholder="What did you observe on this round?" />
        </Form.Item>
        <Form.Item name="plan" label="Plan" rules={[{ required: true, message: 'Plan is required' }]}>
          <VoiceTextArea rows={2} placeholder="What is the plan going forward?" />
        </Form.Item>
      </Form>
    </Modal>
  </div>;
}
