import { useState } from 'react';
import { Button, Input, Segmented, Select, Table, Tag } from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { ClinicalDrawer as Drawer } from '../components/ClinicalOverlay';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useWorkflow } from '../services/useWorkflow';
import { RequestDetail } from '../components/RequestDetail';
import { QueryState } from '../components/QueryState';
import { CreateClinicalAction } from '../components/CreateClinicalAction';
import { formatDate } from '../lib/format';
import { dateRangeOptions } from '../lib/dateRange';
import { patchArchiveParams } from '../services/shiftArchive';
import { matchesReferralDates, matchesReferralScope } from '../services/referralViews';
import { owners } from '../data/cohort';
import { useActiveDoctor } from '../services/activeDoctor';

export function CoordinationPage({ kind = 'request', simulator = false }: { kind?: 'request' | 'referral'; simulator?: boolean }) {
  const query = useWorkflow();
  const location = useLocation();
  const activeDoctor = useActiveDoctor();
  const [params, setParams] = useSearchParams();
  const [pinned, setPinned] = useState<string | null>(() => {
    try { return localStorage.getItem('vdoc.referrals.doctor'); } catch { return null; }
  });
  const referral = kind === 'referral';
  const title = referral ? 'Referrals' : 'Department coordination';
  const doctor = params.get('doctor') ?? (referral ? (pinned ?? activeDoctor.data.name) : '');
  const department = params.get('department') ?? '';
  const direction = params.get('direction') === 'outgoing' ? 'outgoing' : 'incoming';
  const search = params.get('search') ?? '';
  const status = params.get('status') ?? '';
  const range = params.get('range') ?? 'all';
  const from = params.get('from') ?? '';
  const to = params.get('to') ?? '';
  const patch = (values: Record<string, string | null>) => setParams(current => patchArchiveParams(current, values), { replace: true });
  const filter = (values: Record<string, string | null>) => patch({ ...values, page: null });
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const state = query.data;
  const all = state.histories.flatMap(history => history.requests).filter(request => request.kind === kind)
    .map(request => ({ ...request, patient: state.patients.find(patient => patient.id === request.patient_id) }));
  const selected = all.find(request => request.id === params.get('id'));
  const dated = all.filter(request => matchesReferralDates(request.requested_at, range, from, to))
    .filter(request => `${request.patient?.name} ${request.patient?.uhid} ${request.reason}`.toLowerCase().includes(search.toLowerCase()));
  const incoming = dated.filter(request => matchesReferralScope(request, 'incoming', doctor, department));
  const outgoing = dated.filter(request => matchesReferralScope(request, 'outgoing', doctor, department));
  const scoped = direction === 'incoming' ? incoming : outgoing;
  const pending = scoped.filter(request => !['completed', 'cancelled'].includes(request.status));
  const rows = scoped.filter(request => !status || (status === 'unreviewed' ? request.status === 'completed' && !request.reviewed_at : status === 'open' ? !['completed', 'cancelled'].includes(request.status) : request.status === status))
    .sort((first, second) => second.requested_at.localeCompare(first.requested_at));
  const doctors = [...new Set([...Object.values(owners), pinned, ...all.flatMap(request => [request.owner, request.requested_by ?? ''])])].filter(Boolean).sort();
  const departments = [...new Set([...state.patients.map(patient => patient.department), ...all.flatMap(request => [request.from_department, request.to_department])])].sort();
  const returnState = { returnTo: location.pathname + location.search, returnLabel: title };
  const pin = () => { try { localStorage.setItem('vdoc.referrals.doctor', doctor); } catch { return; } setPinned(doctor); };
  return <section className="surface workflow-page">
    <div className="workflow-toolbar"><strong>{simulator ? 'Department portal' : title}</strong>
      <span className="muted">{referral ? 'Patient consultations · received and sent' : 'Shared questions, actions and responses · not patient referrals'}</span>
      <CreateClinicalAction kind={kind} />
    </div>
    <div className="workflow-toolbar">
      <Select size="small" showSearch value={doctor} onChange={value => filter({ doctor: value })} aria-label="Doctor" options={[{ value: '', label: 'All doctors / department view' }, ...doctors.map(value => ({ value, label: value }))]} style={{ width: 240 }} />
      {referral && <Button size="small" icon={<PushpinOutlined />} disabled={doctor === pinned} onClick={pin}>{doctor === pinned ? 'Pinned default' : 'Pin as default'}</Button>}
      <Select size="small" showSearch value={department} onChange={value => filter({ department: value })} aria-label="Department" options={[{ value: '', label: 'All departments' }, ...departments.map(value => ({ value, label: value }))]} style={{ width: 190 }} />
      <Segmented size="small" value={direction} onChange={value => filter({ direction: value })} options={[{ value: 'incoming', label: `Received (${incoming.length})` }, { value: 'outgoing', label: `Sent (${outgoing.length})` }]} />
    </div>
    <div className="workflow-toolbar">
      <Input.Search size="small" allowClear value={search} onChange={event => filter({ search: event.target.value })} placeholder="Patient, UHID or reason" aria-label="Search referrals or coordination" style={{ width: 220 }} />
      <Select size="small" value={status} onChange={value => filter({ status: value })} aria-label="Status" options={[{ value: '', label: 'All statuses' }, { value: 'open', label: 'Awaiting completion' }, ...['received', 'accepted', 'in_progress', 'completed', 'cancelled', 'unreviewed'].map(value => ({ value, label: value === 'unreviewed' ? 'Response needs review' : value.replaceAll('_', ' ') }))]} style={{ width: 175 }} />
      <Select size="small" value={range} onChange={value => filter({ range: value })} aria-label="Requested date" options={[...dateRangeOptions, { value: 'custom', label: 'Custom dates' }]} style={{ width: 135 }} />
      {range === 'custom' && <><Input size="small" type="date" aria-label="From date" value={from} max={to || undefined} onChange={event => filter({ from: event.target.value })} style={{ width: 145 }} /><Input size="small" type="date" aria-label="To date" value={to} min={from || undefined} onChange={event => filter({ to: event.target.value })} style={{ width: 145 }} /></>}
      <Button size="small" onClick={() => filter({ doctor: null, department: null, status: null, range: null, from: null, to: null, search: null })}>Reset filters</Button>
      <span className="muted">{new Set(pending.map(request => request.patient_id)).size} patients · {pending.length} {referral ? 'consultations' : 'actions'} awaiting completion</span>
    </div>
    {query.error && <QueryState pending={false} error={query.error} />}
    <Table size="small" rowKey="id" dataSource={rows} pagination={{ pageSize: 15, current: Math.min(Math.max(1, Number(params.get('page')) || 1), Math.max(1, Math.ceil(rows.length / 15))), showSizeChanger: false, showTotal: total => `${total} ${referral ? 'referrals' : 'coordination requests'}`, onChange: page => patch({ page: String(page) }) }} scroll={{ x: 950 }} columns={[
      { title: 'Patient', render: (_, request) => <Link state={returnState} to={`/app/patients/${request.patient_id}`}>{request.patient?.name ?? 'Patient'}<div className="muted">{request.patient?.uhid}</div></Link> },
      { title: referral ? 'Reason for consultation' : 'Collaboration needed', dataIndex: 'reason', width: 260, ellipsis: true },
      { title: direction === 'incoming' ? 'Referred by / from' : 'Assigned to / department', render: (_, request) => <>{direction === 'incoming' ? request.requested_by || 'Sender not recorded' : request.owner}<div className="muted">{direction === 'incoming' ? request.from_department : request.to_department}</div></> },
      { title: 'Status', render: (_, request) => <>{request.priority === 'urgent' && <Tag color="red">Urgent</Tag>}{request.status.replaceAll('_', ' ')}</> },
      { title: 'Requested · IST', dataIndex: 'requested_at', render: formatDate },
      { title: '', render: (_, request) => <Button size="small" onClick={() => patch({ id: request.id })}>Details</Button> },
    ]} />
    <Drawer size="large" patientId={selected?.patient_id} description={referral ? 'Consultation ownership, clinical assessment and specialist response.' : 'Coordinate a specific question or action without transferring patient care.'} title={selected ? `${referral ? 'Referral' : 'Coordination'} · ${selected.to_department}` : title} open={Boolean(selected)} onClose={() => patch({ id: null })} extra={<Button size="small" onClick={() => patch({ id: null })}>← Back to {title.toLowerCase()}</Button>}>
      {selected && <RequestDetail key={`${selected.id}-${selected.version}`} request={selected} reports={state.reports.filter(report => report.patient_id === selected.patient_id)} simulator={simulator} />}
    </Drawer>
  </section>;
}
