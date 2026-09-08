import { useState } from 'react';
import { Button, Select, Table, Tag } from 'antd';
import { ClinicalDrawer as Drawer } from '../components/ClinicalOverlay';
import { Link, useSearchParams } from 'react-router-dom';
import { useWorkflow } from '../services/useWorkflow';
import { WorkflowToolbar } from '../components/WorkflowToolbar';
import { RequestDetail } from '../components/RequestDetail';
import { QueryState } from '../components/QueryState';
import { CreateClinicalAction } from '../components/CreateClinicalAction';
import { formatDate } from '../lib/format';
import { dateRangeOptions, withinDateRange } from '../lib/dateRange';

export function CoordinationPage({ kind, simulator = false }: { kind?: 'request' | 'referral'; simulator?: boolean }) {
  const query = useWorkflow();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [direction, setDirection] = useState('incoming');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [owner, setOwner] = useState('');
  const [range, setRange] = useState('all');
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const state = query.data;
  const all = state.histories.flatMap(history => history.requests).map(request => ({ ...request, patient: state.patients.find(patient => patient.id === request.patient_id)! }));
  const selected = all.find(request => request.id === params.get('id'));
  const rows = all.filter(request => !kind || request.kind === kind)
    .filter(request => !department || (direction === 'incoming' ? request.to_department : request.from_department) === department)
    .filter(request => !status || (status === 'unreviewed' ? request.status === 'completed' && !request.reviewed_at : request.status === status))
    .filter(request => !priority || request.priority === priority).filter(request => !owner || request.owner === owner)
    .filter(request => withinDateRange(request.requested_at, range))
    .filter(request => `${request.patient.name} ${request.patient.uhid} ${request.reason}`.toLowerCase().includes(search.toLowerCase()));
  return <section className="surface workflow-page">
    <WorkflowToolbar title={simulator ? 'Department portal' : kind === 'referral' ? 'Referrals' : 'Department requests'} search={search} onSearch={setSearch} department={department} onDepartment={setDepartment}>
      <Select size="small" value={direction} onChange={setDirection} aria-label="Request direction" options={[{ value: 'incoming', label: 'Receiving team' }, { value: 'outgoing', label: 'Requesting team' }]} style={{ width: 140 }} />
      <Select size="small" value={status} onChange={setStatus} aria-label="Request status" options={[{ value: '', label: 'All statuses' }, ...['received', 'accepted', 'in_progress', 'completed', 'cancelled', 'unreviewed'].map(value => ({ value, label: value === 'unreviewed' ? 'Response needs review' : value.replaceAll('_', ' ') }))]} style={{ width: 150 }} />
      <Select size="small" value={priority} onChange={setPriority} aria-label="Request priority" options={[{ value: '', label: 'Any priority' }, { value: 'urgent' }, { value: 'routine' }]} style={{ width: 110 }} />
      <Select size="small" value={owner} onChange={setOwner} aria-label="Request owner" options={[{ value: '', label: 'All owners' }, ...[...new Set(all.map(request => request.owner))].map(value => ({ value }))]} style={{ width: 180 }} />
      <CreateClinicalAction kind={kind ?? 'request'} />
      <Select size="small" value={range} onChange={setRange} aria-label="Request dates" options={dateRangeOptions} style={{ width: 125 }} />
    </WorkflowToolbar>
    <Table size="small" rowKey="id" dataSource={rows} pagination={{ pageSize: 15 }} scroll={{ x: 1000 }} columns={[
      { title: 'Patient', render: (_, request) => <Link to={`/app/patients/${request.patient_id}`}>{request.patient.name}<div className="muted">{request.patient.uhid}</div></Link> },
      { title: 'From → to', render: (_, request) => `${request.from_department} → ${request.to_department}` },
      { title: 'Question', dataIndex: 'reason' , width: 300,ellipsis: true,}, { title: 'Owner', dataIndex: 'owner' },
      { title: 'Priority', dataIndex: 'priority', render: priority => <Tag color={priority === 'urgent' ? 'red' : 'default'}>{priority}</Tag> },
      { title: 'Status', dataIndex: 'status', render: status => status.replaceAll('_', ' ') },
      { title: 'Requested', dataIndex: 'requested_at', render: formatDate, sorter: (first, second) => first.requested_at.localeCompare(second.requested_at) },
      { title: 'Action', render: (_, request) => <Button size="small" onClick={() => setParams({ id: request.id })}>Open</Button> },
    ]} />
    <Drawer size="large" patientId={selected?.patient_id} description="Track ownership, review clinical context and close the response loop." title={selected ? `${selected.kind === 'referral' ? 'Referral' : 'Request'} · ${selected.to_department}` : 'Request'} open={Boolean(selected)} onClose={() => setParams({})}>
      {selected && <RequestDetail key={`${selected.id}-${selected.version}`} request={selected} reports={state.reports.filter(report => report.patient_id === selected.patient_id)} simulator={simulator} />}
    </Drawer>
  </section>;
}
