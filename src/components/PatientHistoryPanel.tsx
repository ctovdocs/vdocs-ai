import { useState, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Collapse, Descriptions, Empty, Table, Tabs, Tag, Typography } from 'antd';
import { FileTextOutlined, ExperimentOutlined, MedicineBoxOutlined, SolutionOutlined, SwapOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { patientService } from '../services/clinical';
import { formatDate } from '../lib/format';
import { QueryState } from './QueryState';
import type { PatientHistory } from '../domain/longitudinal';
import { useWorkflow } from '../services/useWorkflow';
import { Link } from 'react-router-dom';

type TimelineEntry = PatientHistory['timeline'][number];

const KIND_ICON: Record<TimelineEntry['kind'], ReactNode> = {
  encounter: <SolutionOutlined />, result: <ExperimentOutlined />, note: <FileTextOutlined />,
  medication: <MedicineBoxOutlined />, request: <SwapOutlined />, task: <CheckSquareOutlined />,
};

function dayLabel(iso: string) {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
}
function timeLabel(iso: string) {
  return new Intl.DateTimeFormat('en-IN', { timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
}

function timelineDetail(entry: TimelineEntry, history: PatientHistory) {
  switch (entry.kind) {
    case 'encounter': { const record = history.encounters.find(item => item.id === entry.source_id); return record && `${record.reason} ${record.assessment !== record.reason ? `— ${record.assessment}` : ''}`.trim(); }
    case 'note': { const record = history.notes.find(item => item.id === entry.source_id); return record?.body; }
    case 'medication': { const record = history.medications.find(item => item.id === entry.source_id); return record && `${record.dose} · ${record.frequency} — ${record.reason}`; }
    case 'request': { const record = history.requests.find(item => item.id === entry.source_id); return record && `${record.reason}${record.response ? `\nResponse: ${record.response}` : ''}`; }
    case 'task': { const record = history.work_items.find(item => item.id === entry.source_id); return record && `Owner: ${record.owner} · Due ${formatDate(record.due_at)}`; }
    default: return undefined;
  }
}

function Timeline({ history }: { history: PatientHistory }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const workflow = useWorkflow();
  const groups = new Map<string, TimelineEntry[]>();
  for (const entry of history.timeline) {
    const label = dayLabel(entry.available_at);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(entry);
  }
  return <div className="timeline">
    {[...groups.entries()].map(([label, entries]) => <div className="timeline-day" key={label}>
      <div className="timeline-day-label">{label}</div>
      {entries.map(entry => {
        const detail = timelineDetail(entry, history);
        const report = workflow.data?.reports.find(report => report.id === entry.source_id);
        const order = history.orders.find(order => order.id === entry.source_id || order.id === report?.order_id);
        const request = history.requests.find(request => request.id === entry.source_id);
        const discharge = workflow.data?.discharges.find(record => record.id === entry.source_id);
        const handover = workflow.data?.handovers.find(record => record.id === entry.source_id);
        const sourcePath = order ? `/app/${order.kind === 'lab' ? 'lab-orders' : 'imaging-orders'}?id=${order.id}`
          : request ? `/app/${request.kind === 'referral' ? 'referrals' : 'requests'}?id=${request.id}`
          : discharge ? `/app/discharges?id=${discharge.id}` : handover ? `/app/handovers?id=${handover.id}` : null;
        const isOpen = expanded === entry.id;
        return <div key={entry.id} className={`timeline-item kind-${entry.kind}`} onClick={() => detail && setExpanded(isOpen ? null : entry.id)} style={{ cursor: detail ? 'pointer' : 'default' }}>
          <span className="timeline-item-icon">{KIND_ICON[entry.kind]}</span>
          <div className="timeline-item-body">
            <span className="timeline-item-title">{entry.title}</span>
            <span className="timeline-item-meta">{timeLabel(entry.available_at)} · {entry.source_system}</span>
            {sourcePath && <Link to={sourcePath} onClick={event => event.stopPropagation()}>Open source</Link>}
            {isOpen && detail && <div className="timeline-item-detail">{detail}</div>}
          </div>
        </div>;
      })}
    </div>)}
  </div>;
}

export function PatientHistoryPanel({ patientId, sourceOnly = false }: { patientId: string; sourceOnly?: boolean }) {
  const query = useQuery({ queryKey: ['history', patientId], queryFn: () => patientService.history(patientId) });
  if (!query.data) return query.isPending || query.error ? <QueryState pending={query.isPending} error={query.error} /> : <Empty description="Longitudinal records have not been loaded for this patient" />;
  const history = query.data;
  const notes = history.notes.filter(note => !sourceOnly || note.source_system === 'MockHIS');
  return <div className="tab-padding">
    <Alert type={history.context.acuity === 'critical' ? 'error' : 'info'} showIcon
      title={`${history.context.acuity === 'critical' ? 'Critical scenario' : 'Noncritical scenario'} · ${formatDate(history.context.acuity_assessed_at)}`}
      description={history.context.acuity_reason} />
    <Typography.Paragraph className="section-gap">{history.context.presenting_complaint}</Typography.Paragraph>
    <Typography.Paragraph>{history.context.history}</Typography.Paragraph>
    <Descriptions size="small" column={{ xs: 1, md: 2 }} items={[
      { key: 'history', label: 'Hospital history', children: history.context.previous_records_status === 'first_hospital_visit' ? 'First visit — no previous hospital records' : `${history.encounters.length} encounters on record` },
      { key: 'language', label: 'Preferred language', children: history.context.preferred_language },
      { key: 'context', label: 'Patient context', span: 2, children: history.context.social_context },
      ...(history.context.family_history ? [{ key: 'family', label: 'Family history', span: 2, children: history.context.family_history }] : []),
    ]} />
    <Tabs size="small" items={[
      { key: 'encounters', label: `Visits (${history.encounters.length})`, children: <Collapse size="small" items={[...history.encounters].reverse().map(encounter => {
        const tests = history.orders.filter(order => order.encounter_id === encounter.id);
        const referral = history.requests.find(request => request.encounter_id === encounter.id);
        return { key: encounter.id,
          label: `${formatDate(encounter.started_at)} · ${encounter.kind} · ${encounter.department}`,
          extra: <Tag>{encounter.status}</Tag>,
          children: <>
            <p><strong>Diagnosis / assessment:</strong> {encounter.assessment}</p>
            {encounter.assessment !== encounter.reason && <p className="muted">{encounter.reason}</p>}
            {tests.length > 0 && <p><strong>Tests:</strong> {tests.map(test => test.title).join(', ')}</p>}
            {referral
              ? <Tag color="purple">Referred to {referral.to_department} — {referral.status.replaceAll('_', ' ')}</Tag>
              : <Tag>No referral from this visit</Tag>}
            <div className="section-gap"><Typography.Text type="secondary">{encounter.owner} · {encounter.department} · {encounter.id}</Typography.Text></div>
          </>,
        };
      })} /> },
      { key: 'notes', label: `Notes (${notes.length})`, children: <Collapse size="small" items={[...notes].sort((first, second) => second.recorded_at.localeCompare(first.recorded_at)).map(note => ({ key: note.id,
        label: `${formatDate(note.recorded_at)} · ${note.title}`, children: <><Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }}>{note.body}</Typography.Paragraph><Typography.Text type="secondary">{note.author} · {note.source_system} · {note.id}</Typography.Text></>,
      }))} /> },
      { key: 'vitals', label: 'Vitals', children: <Table size="small" rowKey="id" pagination={false} dataSource={history.vitals} scroll={{ x: 600 }} columns={[
        { title: 'Recorded · IST', dataIndex: 'recorded_at', render: formatDate },
        { title: 'BP · mmHg', render: (_, vital) => `${vital.systolic}/${vital.diastolic}` },
        { title: 'Pulse /min', dataIndex: 'pulse' }, { title: 'RR /min', dataIndex: 'respiratory_rate' },
        { title: 'SpO₂ % · room air', dataIndex: 'spo2' }, { title: 'Temp °C', dataIndex: 'temperature_c' },
      ]} /> },
      { key: 'medications', label: 'Medication history', children: <><Typography.Paragraph type="secondary">Historical and reconciliation records; not a complete inpatient administration chart.</Typography.Paragraph><Table size="small" rowKey="id" pagination={false} dataSource={history.medications} scroll={{ x: 650 }} columns={[
        { title: 'Medication', dataIndex: 'name' }, { title: 'Dose / route', render: (_, medicine) => `${medicine.dose} · ${medicine.route}` },
        { title: 'Frequency', dataIndex: 'frequency' }, { title: 'Status', dataIndex: 'status', render: status => <Tag>{status.replaceAll('_', ' ')}</Tag> },
        { title: 'Documented context', dataIndex: 'reason' },
      ]} /></> },
      ...(!sourceOnly ? [
        { key: 'coordination', label: 'Coordination', children: <><Typography.Paragraph type="secondary">Seeded VDoc workflow examples. These are not an existing Fortis request system.</Typography.Paragraph><Table size="small" rowKey="id" pagination={false} dataSource={history.requests} columns={[
          { title: 'Receiving department', dataIndex: 'to_department' }, { title: 'Question', dataIndex: 'reason' },
          { title: 'Status', dataIndex: 'status' }, { title: 'Response', dataIndex: 'response', render: (value: string | null) => value ?? 'Pending' },
        ]} /><Typography.Title level={5}>Pending work</Typography.Title>{history.work_items.filter(item => item.status === 'pending').map(item => <p key={item.id}>{item.title} · <Typography.Text type="secondary">{item.owner}</Typography.Text></p>)}</> },
        { key: 'timeline', label: 'Timeline', children: <Timeline history={history} /> },
      ] : []),
    ]} />
    <Typography.Paragraph type="secondary" className="section-gap">Synthetic case · Clinical review pending · High-acuity cohort deliberately selected for demonstration.</Typography.Paragraph>
  </div>;
}
