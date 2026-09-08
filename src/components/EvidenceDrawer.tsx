import { Table, Tag, Typography } from 'antd';
import { ClinicalDrawer as Drawer } from './ClinicalOverlay';
import { Link } from 'react-router-dom';
import type { PatientHistory } from '../domain/longitudinal';
import type { Report } from '../domain/models';
import { formatDate } from '../lib/format';

export interface EvidenceRef { record_type: string; record_id: string }

interface Resolved { title: string; typeLabel: string; meta: string; body?: string; observations?: Report['observations']; sourcePath?: string }

function resolve(ref: EvidenceRef, history: PatientHistory, reports: Report[]): Resolved | null {
  switch (ref.record_type) {
    case 'encounter': { const record = history.encounters.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: `${record.kind} · ${record.department}`, typeLabel: 'Encounter', meta: `${record.owner} · ${formatDate(record.started_at)} · ${record.status}`, body: `${record.reason}${record.assessment !== record.reason ? `\n\nAssessment: ${record.assessment}` : ''}` }; }
    case 'note': { const record = history.notes.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: record.title, typeLabel: 'Note', meta: `${record.author} · ${formatDate(record.recorded_at)} · ${record.source_system}`, body: record.body }; }
    case 'vital': { const record = history.vitals.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: 'Vitals', typeLabel: 'Vitals', meta: formatDate(record.recorded_at), body: `BP ${record.systolic}/${record.diastolic} mmHg · Pulse ${record.pulse}/min · RR ${record.respiratory_rate}/min · SpO₂ ${record.spo2}% (${record.oxygen_context}) · Temp ${record.temperature_c}°C` }; }
    case 'medication': { const record = history.medications.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: record.name, typeLabel: 'Medication', meta: `${record.author} · ${formatDate(record.recorded_at)} · ${record.status.replaceAll('_', ' ')}`, body: `${record.dose} · ${record.route} · ${record.frequency}\n\n${record.reason}` }; }
    case 'order': { const record = history.orders.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: record.title, typeLabel: `${record.kind === 'lab' ? 'Lab' : 'Imaging'} order`, meta: `${record.requester} · ${formatDate(record.placed_at)} · ${record.status}`, body: record.indication, sourcePath: `/app/${record.kind === 'lab' ? 'lab-orders' : 'imaging-orders'}?id=${record.id}` }; }
    case 'request': { const record = history.requests.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: `${record.kind === 'referral' ? 'Referral' : 'Request'} to ${record.to_department}`, typeLabel: 'Coordination', meta: `${record.owner} · ${formatDate(record.requested_at)} · ${record.status.replaceAll('_', ' ')}`, body: `${record.reason}${record.response ? `\n\nResponse: ${record.response}` : ''}`, sourcePath: `/app/${record.kind === 'referral' ? 'referrals' : 'requests'}?id=${record.id}` }; }
    case 'work_item': { const record = history.work_items.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: record.title, typeLabel: 'Pending work', meta: `Owner ${record.owner} · Due ${formatDate(record.due_at)}`, body: `Status: ${record.status}` }; }
    case 'immunization': { const record = history.immunizations.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: record.name, typeLabel: 'Immunization', meta: formatDate(record.administered_at) }; }
    case 'report': { const record = reports.find(item => item.id === ref.record_id); if (!record) return null;
      return { title: record.title, typeLabel: record.kind === 'lab' ? 'Lab report' : 'Imaging report', meta: `${record.source} · ${formatDate(record.reported_at)}${record.author ? ` · ${record.author}` : ''}`, body: record.findings, observations: record.observations, sourcePath: `/app/results?id=${record.id}` }; }
    default: return null;
  }
}

export function EvidenceDrawer({ evidence, history, reports, onClose }: { evidence: EvidenceRef | null; history: PatientHistory; reports: Report[]; onClose: () => void }) {
  const resolved = evidence ? resolve(evidence, history, reports) : null;
  return <Drawer title={resolved?.title ?? 'Source record'} patientId={history.context.patient_id} description="Supporting evidence · Original chart content, not an AI interpretation." open={Boolean(evidence)} onClose={onClose} size="large">
    {evidence && !resolved && <Typography.Paragraph type="secondary">This source record could not be found — it may have been superseded.</Typography.Paragraph>}
    {resolved && <>
      <Tag color="blue">{resolved.typeLabel}</Tag>
      <Typography.Paragraph type="secondary" className="section-gap">{resolved.meta}</Typography.Paragraph>
      {resolved.body && <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }}>{resolved.body}</Typography.Paragraph>}
      {resolved.observations && resolved.observations.length > 0 && <Table rowKey="name" size="small" pagination={false} dataSource={resolved.observations} columns={[
        { title: 'Test', dataIndex: 'name' },
        { title: 'Result', render: (_, observation) => <span>{observation.value} {observation.unit} {observation.flag !== 'normal' && <Tag color="orange">{observation.flag === 'high' ? 'High' : 'Low'}</Tag>}</span> },
        { title: 'Reference', dataIndex: 'reference' },
      ]} />}
      {resolved.sourcePath && <Typography.Paragraph className="section-gap"><Link to={resolved.sourcePath} onClick={onClose}>Open in workflow →</Link></Typography.Paragraph>}
      <Typography.Text type="secondary">Record ID: {evidence!.record_id}</Typography.Text>
    </>}
  </Drawer>;
}
