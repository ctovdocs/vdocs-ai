import { useMemo, useState, type ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Empty, Input, Segmented, Steps, Table, Tabs, Tag } from 'antd';
import { CheckCircleFilled, ClockCircleOutlined, FilePdfOutlined, SafetyCertificateFilled, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Navigate, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { InsurerClaimRecord, InsurerEvent, InsurerStatus, StoredSubmission } from '../domain/insurer';
import { fetchInsurerClaims, requestInsurerDocument } from '../services/claimsExport';

const stages: Record<InsurerStatus, { label: string; color: string; step: number }> = {
  received: { label: 'Under review', color: 'blue', step: 1 }, query: { label: 'Query raised', color: 'orange', step: 1 },
  response_received: { label: 'Response received', color: 'cyan', step: 1 }, authorised: { label: 'Authorised', color: 'green', step: 2 },
  settlement_received: { label: 'Settlement received', color: 'geekblue', step: 3 }, paid: { label: 'Paid', color: 'green', step: 4 }, closed: { label: 'Closed', color: 'default', step: 6 },
};
const steps = ['Received', 'Medical review', 'Authorised', 'Settlement', 'Payment', 'Closed'];
const time = (at: string) => new Date(at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
const inr = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
const initials = (name: string) => name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase();

/** Everything the insurer knows about a claim is what the hospital sent, read back from the stored packet. */
const field = (record: InsurerClaimRecord, key: string) => record.submissions[0]?.fields.find(item => item.key === key)?.value ?? '';
const view = (record: InsurerClaimRecord) => ({
  record, ref: record.ref, name: field(record, 'patient_name'), uhid: field(record, 'uhid'), member: field(record, 'member_id'), policy: field(record, 'policy_number'),
  insurer: field(record, 'insurer'), diagnosis: field(record, 'diagnosis'), amount: Number(field(record, 'bill_total')) || 0,
  last: [...(record.events ?? [])].at(-1)?.at ?? record.submissions.at(-1)?.received_at ?? '',
});
type ClaimView = ReturnType<typeof view>;
const searchText = (item: ClaimView) => `${item.ref} ${item.record.claim_id} ${item.name} ${item.uhid} ${item.member} ${item.policy} ${item.diagnosis} ${item.insurer} ${stages[item.record.status].label}`.toLowerCase();

function useClaims() {
  const query = useQuery({ queryKey: ['insurer-inbox'], refetchInterval: 2000, refetchIntervalInBackground: true, queryFn: fetchInsurerClaims });
  const claims = useMemo(() => (query.data?.claims ?? []).map(view), [query.data]);
  return { claims, error: query.error, loading: query.isPending };
}

const StatusTag = ({ status }: { status: InsurerStatus }) => <Tag color={stages[status].color} className="np-status">{stages[status].label}</Tag>;

function Shell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const go = (value: string) => navigate(value.trim() ? `/insurer?q=${encodeURIComponent(value.trim())}` : '/insurer');
  return <div className="np-shell">
    <header className="np-top">
      <Link to="/insurer" className="np-brand"><SafetyCertificateFilled /><span><span><strong>Northwind</strong> Assurance</span><small>Provider Portal</small></span></Link>
      <nav><Link to="/insurer">Dashboard</Link><Link to="/insurer?status=query">Open queries</Link></nav>
      <Input className="np-search" allowClear prefix={<SearchOutlined />} value={q} onChange={event => setQ(event.target.value)} onPressEnter={() => go(q)} placeholder="Search patient, UHID, claim ref, policy…" aria-label="Search claims" />
      <span className="np-user"><UserOutlined /> Demo Hospital · Claims desk</span>
    </header>
    <main className="np-main">{children}</main>
    <footer className="np-foot">Northwind Assurance is a fictional insurer created for the VDoc demonstration. Every record shown here was transferred from VDoc.</footer>
  </div>;
}

function Dashboard() {
  const { claims, error, loading } = useClaims();
  const [params, setParams] = useSearchParams();
  const q = (params.get('q') ?? params.get('uhid') ?? '').trim();
  const status = params.get('status') ?? 'all';
  const rows = claims.filter(item => (!q || searchText(item).includes(q.toLowerCase())) && (status === 'all' || (status === 'closed' ? item.record.status === 'closed' : status === 'query' ? item.record.status === 'query' : item.record.status !== 'closed')));
  const set = (key: string, value: string) => { const next = new URLSearchParams(params); if (value && value !== 'all') next.set(key, value); else next.delete(key); setParams(next); };
  const total = claims.reduce((sum, item) => sum + item.amount, 0);
  const kpis = [['Claims received', claims.length], ['In progress', claims.filter(item => item.record.status !== 'closed').length], ['Awaiting hospital reply', claims.filter(item => item.record.status === 'query').length], ['Closed', claims.filter(item => item.record.status === 'closed').length], ['Total claimed', inr(total)]];
  return <>
    <section className="np-hero"><div><h1>Provider claims dashboard</h1><p>Review cashless claims submitted by network hospitals, request documents and track every claim to payment.</p></div><span className="np-live"><i />Live · refreshing every 2 s</span></section>
    <div className="np-kpis">{kpis.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div>
    {error && <Alert type="error" showIcon title="Insurer service unreachable" description="The claims service did not respond. Reload in a moment." />}
    <section className="np-card">
      <div className="np-filters"><Segmented value={status} onChange={value => set('status', String(value))} options={[{ value: 'all', label: 'All' }, { value: 'open', label: 'In progress' }, { value: 'query', label: 'Query raised' }, { value: 'closed', label: 'Closed' }]} />
        {q && <Tag closable onClose={() => { const next = new URLSearchParams(params); next.delete('q'); next.delete('uhid'); setParams(next); }}>Search: {q}</Tag>}<span className="muted">{rows.length} of {claims.length} claims</span></div>
      <Table<ClaimView> rowKey="ref" size="middle" loading={loading} dataSource={rows} pagination={{ pageSize: 10, hideOnSinglePage: true }}
        locale={{ emptyText: claims.length === 0 ? <div className="np-empty"><SafetyCertificateFilled /><h3>No claims received yet</h3><p>When a hospital submits a cashless claim it appears here with its fields, PDFs and a reference number.</p></div> : <Empty description={`No claims match “${q}”`} /> }}
        columns={[
          { title: 'Claim', render: (_, item) => <><Link to={`/insurer/claims/${item.ref}`} className="np-ref">{item.ref}</Link><div className="muted">{item.record.claim_id}</div></> },
          { title: 'Patient', width: 190, render: (_, item) => <><strong>{item.name}</strong><div><Link to={`/insurer/members/${encodeURIComponent(item.uhid)}`} className="muted">{item.uhid}</Link></div></> },
          { title: 'Policy / member', width: 210, render: (_, item) => <><span>{item.policy}</span><div className="muted">{item.member}</div></> },
          { title: 'Diagnosis', dataIndex: 'diagnosis', ellipsis: true, width: 220 },
          { title: 'Claimed', align: 'right', render: (_, item) => <strong>{inr(item.amount)}</strong> },
          { title: 'Status', render: (_, item) => <StatusTag status={item.record.status} /> },
          { title: 'Last activity', render: (_, item) => <span className="muted">{item.last && time(item.last)}</span> },
          { title: '', render: (_, item) => <Link to={`/insurer/claims/${item.ref}`}>Open →</Link> },
        ]} />
    </section>
  </>;
}

function Timeline({ events, claimOf }: { events: InsurerEvent[]; claimOf?: (event: InsurerEvent) => string }) {
  if (!events.length) return <Empty description="No history recorded" />;
  return <ol className="np-timeline">{[...events].sort((a, b) => b.at.localeCompare(a.at)).map(event => <li key={`${event.id}-${event.at}`} className={`np-ev-${event.kind}`}>
    <time>{time(event.at)} IST{claimOf && <> · <Link to={`/insurer/claims/${claimOf(event)}`}>{claimOf(event)}</Link></>}</time><strong>{event.title}</strong><p>{event.detail}</p>
    {event.amount !== undefined && <Tag color="blue">{inr(event.amount)}</Tag>}{event.reference && <small> Ref {event.reference}</small>}</li>)}</ol>;
}

function Submission({ record, submission }: { record: InsurerClaimRecord; submission: StoredSubmission }) {
  const [open, setOpen] = useState(submission.documents[0]?.filename ?? '');
  const url = (name: string) => `/api/insurer/claims/${encodeURIComponent(record.ref)}/files/${encodeURIComponent(name)}`;
  return <section className="np-subcard">
    <div className="np-card-head"><h3>{submission.stage === 'initial' ? 'Initial claim packet' : 'Response to query'} <small>{submission.reference}</small></h3><span className="muted">{time(submission.received_at)} IST</span></div>
    <div className="np-checks">{submission.checks.map(check => <div key={check.name}>{check.ok ? <CheckCircleFilled className="ok" /> : <ClockCircleOutlined className="bad" />}<strong>{check.name}</strong><span>{check.detail}</span></div>)}</div>
    <div className="np-docs">
      <ul>{submission.documents.map(doc => <li key={doc.filename} className={doc.filename === open ? 'active' : ''}><button type="button" onClick={() => setOpen(doc.filename)}><FilePdfOutlined /><span><strong>{doc.title}</strong><small>{doc.bytes.toLocaleString()} bytes · sha256 {doc.sha256.slice(0, 10)}…</small></span></button><a href={url(doc.filename)} target="_blank" rel="noreferrer">Open ↗</a></li>)}</ul>
      {open && <iframe title="Received document" src={url(open)} />}
    </div>
  </section>;
}

function ClaimDetail() {
  const { ref = '' } = useParams();
  const client = useQueryClient();
  const { claims, loading } = useClaims();
  const item = claims.find(claim => claim.ref === ref);
  const [note, setNote] = useState('Please provide the itemised pharmacy bill supporting the pharmacy charge in the final bill.');
  const ask = useMutation({ mutationFn: () => requestInsurerDocument(ref, 'pharmacy', note), onSuccess: () => { void client.invalidateQueries({ queryKey: ['insurer-inbox'] }); } });
  if (!item) return loading ? <p className="muted">Loading claim…</p> : <Empty description={`No claim ${ref}`}><Link to="/insurer">Back to dashboard</Link></Empty>;
  const { record } = item;
  const facts = record.submissions[0]?.fields.filter(f => f.key !== 'discharge_summary') ?? [];
  const summary = record.submissions[0]?.fields.find(f => f.key === 'discharge_summary')?.value;
  const canAsk = record.status === 'received' || record.status === 'query';
  const open = record.queries.find(query => query.status === 'open');
  return <>
    <div className="np-crumbs"><Link to="/insurer">Dashboard</Link> / <Link to={`/insurer/members/${encodeURIComponent(item.uhid)}`}>{item.name}</Link> / <span>{item.ref}</span></div>
    <section className="np-card np-claim-head">
      <div className="np-avatar">{initials(item.name)}</div>
      <div className="np-claim-title"><small>Claim reference</small><h1>{item.ref}</h1><span>{item.name} · <Link to={`/insurer/members/${encodeURIComponent(item.uhid)}`}>{item.uhid}</Link> · Hospital claim {record.claim_id}</span></div>
      <div className="np-claim-amount"><small>Amount claimed</small><strong>{inr(item.amount)}</strong><StatusTag status={record.status} /></div>
    </section>
    <section className="np-card"><Steps size="small" current={stages[record.status].step} items={steps.map(title => ({ title }))} /></section>
    <div className="np-two">
      <section className="np-card np-col"><Tabs items={[
        { key: 'overview', label: 'Overview', children: <>
          <dl className="np-facts">{facts.map(f => <div key={f.key}><dt>{f.label}</dt><dd>{['bill_total', 'preauth_amount'].includes(f.key) && Number(f.value) ? inr(Number(f.value)) : f.value || '—'}</dd></div>)}</dl>
          {summary && <><h4>Discharge summary received</h4><pre className="np-pre">{summary}</pre></>}
          {record.submissions[0]?.narrative && <><h4>Treatment narrative</h4><pre className="np-pre">{record.submissions[0].narrative}</pre></>}</> },
        { key: 'documents', label: `Documents (${record.submissions.reduce((sum, s) => sum + s.documents.length, 0)})`, children: <div className="np-stack">{[...record.submissions].reverse().map(s => <Submission key={s.reference} record={record} submission={s} />)}</div> },
        { key: 'history', label: `History (${(record.events ?? []).length})`, children: <Timeline events={record.events ?? []} /> },
      ]} /></section>
      <aside className="np-col">
        <section className="np-card"><div className="np-card-head"><h3>Reviewer actions</h3></div>
          {open ? <Alert type="warning" showIcon title={`Query ${open.id} sent ${time(open.at)}`} description={`${open.note} Waiting for the hospital to reply.`} />
            : canAsk ? <><p className="muted">Ask the hospital for a supporting document before deciding.</p><Input.TextArea rows={3} value={note} onChange={event => setNote(event.target.value)} aria-label="Query note" /><Button type="primary" block className="section-gap" loading={ask.isPending} disabled={!note.trim()} onClick={() => ask.mutate()}>Request document</Button>{ask.error && <Alert className="section-gap" type="error" title={ask.error.message} />}</>
              : <p className="muted">No reviewer action pending. Status: <strong>{stages[record.status].label}</strong>.</p>}
        </section>
        <section className="np-card"><div className="np-card-head"><h3>Member &amp; policy</h3></div>
          <dl className="np-facts np-facts-one"><div><dt>Member</dt><dd><Link to={`/insurer/members/${encodeURIComponent(item.uhid)}`}>{item.name}</Link></dd></div><div><dt>Policy</dt><dd>{item.policy}</dd></div><div><dt>Member ID</dt><dd>{item.member}</dd></div><div><dt>Insurer / TPA</dt><dd>{item.insurer}</dd></div></dl>
        </section>
      </aside>
    </div>
  </>;
}

function MemberProfile() {
  const { uhid = '' } = useParams();
  const { claims, loading } = useClaims();
  const mine = claims.filter(item => item.uhid === uhid);
  if (!mine.length) return loading ? <p className="muted">Loading member…</p> : <Empty description={`No claims on file for ${uhid}`}><Link to="/insurer">Back to dashboard</Link></Empty>;
  const first = mine[0];
  const owner = new Map<string, string>();
  const events = mine.flatMap(item => (item.record.events ?? []).map(event => { const id = `${item.ref}-${event.id}`; owner.set(id, item.ref); return { ...event, id }; }));
  return <>
    <div className="np-crumbs"><Link to="/insurer">Dashboard</Link> / <span>Member {uhid}</span></div>
    <section className="np-card np-claim-head">
      <div className="np-avatar">{initials(first.name)}</div>
      <div className="np-claim-title"><small>Member record</small><h1>{first.name}</h1><span>UHID {uhid} · Member ID {first.member} · Policy {first.policy}</span></div>
      <div className="np-claim-amount"><small>Claims on file</small><strong>{mine.length}</strong><span className="muted">{inr(mine.reduce((sum, item) => sum + item.amount, 0))} claimed</span></div>
    </section>
    <div className="np-two">
      <section className="np-card np-col"><div className="np-card-head"><h3>Claims</h3></div>
        <Table<ClaimView> rowKey="ref" size="small" pagination={false} dataSource={mine} columns={[
          { title: 'Claim', render: (_, item) => <Link to={`/insurer/claims/${item.ref}`} className="np-ref">{item.ref}</Link> }, { title: 'Diagnosis', dataIndex: 'diagnosis', ellipsis: true },
          { title: 'Claimed', align: 'right', render: (_, item) => inr(item.amount) }, { title: 'Status', render: (_, item) => <StatusTag status={item.record.status} /> }]} />
      </section>
      <section className="np-card np-col"><div className="np-card-head"><h3>Full history</h3></div><Timeline events={events} claimOf={event => owner.get(event.id) ?? ''} /></section>
    </div>
  </>;
}

export function InsurerPortalPage() {
  const [params] = useSearchParams();
  const legacyRef = params.get('ref');
  return <Shell><Routes>
    <Route index element={legacyRef ? <Navigate to={`/insurer/claims/${legacyRef}`} replace /> : <Dashboard />} />
    <Route path="claims/:ref" element={<ClaimDetail />} />
    <Route path="members/:uhid" element={<MemberProfile />} />
    <Route path="*" element={<Navigate to="/insurer" replace />} />
  </Routes></Shell>;
}
