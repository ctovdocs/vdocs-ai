import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, App, Button, Checkbox, Collapse, Descriptions, Empty, Form, Input, Modal, Progress, Segmented, Select, Space, Table, Tabs, Tag, Tooltip, Typography } from 'antd';
import { ArrowRightOutlined, CheckCircleFilled, FileTextOutlined, ReloadOutlined, SafetyCertificateOutlined, SendOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import type { ClaimAction, ClaimCase, ClaimForm } from '../domain/claims';
import { buildPacketFields, buildSubmission, fetchInsurerClaim, isInsurerReference, sendClaimToInsurer, sendResponseToInsurer } from '../services/claimsExport';
import { claimBlockers, claimStatusLabels, claimStorageKey, money, readClaims, resetClaims, saveClaimAction, transitionClaim } from '../services/claimsDemo';
import { useWorkflow } from '../services/useWorkflow';
import { readWorkflow } from '../services/workflowStore';
import { QueryState } from '../components/QueryState';
import { ClinicalDrawer } from '../components/ClinicalOverlay';

function Review({ claim, busy, formDirty, act }: { claim: ClaimCase; busy: boolean; formDirty: boolean; act: (action: ClaimAction) => void }) {
  const response = claim.status === 'response_review';
  const original = response ? claim.response : claim.narrative;
  const [text, setText] = useState(original);
  const [reviewed, setReviewed] = useState(false);
  const dirty = text !== original || formDirty;
  const canSubmit = response || (claim.status === 'review' && !claimBlockers(claim).length && Boolean(claim.clinical_review && claim.billing_review));
  return <div className="claim-review">
    {!response && <div className="claim-review-gates"><div><strong>Clinical document review</strong><p>Check diagnosis, summary and supporting investigations.</p><Button disabled={busy || dirty || claim.status !== 'review' || Boolean(claim.clinical_review)} onClick={() => act({ type: 'review_clinical', reviewed_version: claim.version })}>{claim.clinical_review ? '✓ Clinical review recorded' : 'Record clinical review'}</Button></div><div><strong>Billing & policy review</strong><p>Check member details, bill breakup and claim form.</p><Button disabled={busy || dirty || claim.status !== 'review' || Boolean(claim.billing_review)} onClick={() => act({ type: 'review_billing', reviewed_version: claim.version })}>{claim.billing_review ? '✓ Billing review recorded' : 'Record billing review'}</Button></div></div>}
    <Typography.Title level={5}>{response ? 'Review query response' : 'Review treatment narrative'}</Typography.Title>
    <p className="muted">{response ? 'Prepared from the insurer query and matching pharmacy bill.' : 'Populated from the diagnosis and discharge summary. Check against the source documents.'}</p>
    <Input.TextArea aria-label={response ? 'Query response' : 'Treatment narrative'} rows={5} value={text} disabled={busy} onChange={event => { setText(event.target.value); setReviewed(false); }} />
    {dirty && <Button className="section-gap" disabled={!text.trim()} loading={busy} onClick={() => act({ type: 'edit', text })}>Save changes for review</Button>}
    <Checkbox className="claim-review-check" checked={reviewed} disabled={dirty || busy || !canSubmit} onChange={event => setReviewed(event.target.checked)}>I reviewed the {response ? 'response and pharmacy bill' : 'claim details and attached documents'}.</Checkbox>
    <Button type="primary" size="small" icon={<ArrowRightOutlined />} disabled={!reviewed || dirty || !canSubmit} loading={busy}
      onClick={() => act({ type: response ? 'submit_response' : 'submit', reviewed_version: claim.version })}>{response ? 'Approve & send response' : 'Approve & submit claim'}</Button>
  </div>;
}

function TransferReceipt({ claim, fieldCount }: { claim: ClaimCase; fieldCount: number }) {
  const sent = claim.submission!;
  return <section className="claim-transfer" aria-label="Insurer transfer status">
    <div className="claim-transfer-head">
      <span className="claim-transfer-icon"><SendOutlined /></span>
      <div><small>Received by Northwind Assurance</small><h3>{sent.reference}</h3></div>
      <Tag color="gold">Insurer review</Tag>
      <Button size="small" href={`/insurer?ref=${encodeURIComponent(sent.reference)}`} target="_blank" rel="noreferrer">View in insurer portal ↗</Button>
    </div>
    <ol className="claim-transfer-steps">
      <li className="done"><span><CheckCircleFilled /></span><div><strong>Packet sent</strong><small>{claimTime(sent.at)} IST</small></div></li>
      <li className="done"><span><CheckCircleFilled /></span><div><strong>Validated on arrival</strong><small>{sent.documents.length} PDFs · {fieldCount} fields · checksums match</small></div></li>
      <li className="waiting"><span /><div><strong>Insurer review</strong><small>Waiting. Any query will appear here automatically.</small></div></li>
    </ol>
  </section>;
}

function downloadDocument(name: string, body: string) {
  const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = `${name.replace(/[^a-z0-9-]/gi, '-')}.txt`;
  document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Evidence({ claim, selected }: { claim: ClaimCase; selected: string }) {
  const doc = claim.documents.find(item => item.id === selected);
  const message = claim.messages.find(item => item.id === selected);
  const packet = selected === 'packet' ? claim.submission : selected === 'response' ? claim.response_submission : selected === 'settlement_packet' ? claim.settlement_submission : null;
  if (doc) return <article className="claim-document"><div className="claim-document-top"><FileTextOutlined /><Tag>{doc.source}</Tag><Tag color={doc.attached ? 'green' : 'orange'}>{doc.attached ? 'Attached' : 'Available in records'}</Tag></div><h3>{doc.title}</h3><p className="muted">Source reference: {doc.source_id}</p><pre>{doc.body}</pre><Button size="small" onClick={() => downloadDocument(`${claim.id}-${doc.id}`, doc.body)}>Download document (.txt)</Button></article>;
  if (message) return <article className="claim-document"><Tag color="blue">Demo insurer correspondence</Tag><h3>{message.title}</h3><p className="muted">{new Date(message.at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p><pre>{message.body}</pre><Button size="small" onClick={() => downloadDocument(`${claim.id}-${message.id}`, message.body)}>Download letter (.txt)</Button></article>;
  if (packet) return <article className="claim-document"><Tag color="green">Saved submitted packet</Tag><h3>{packet.reference}</h3><p>Reviewed version {packet.version} · {packet.documents.length} documents</p><pre>{packet.narrative}</pre>{packet.documents.map(item => <details key={item.id}><summary>{item.title}</summary><pre>{item.body}</pre></details>)}<Button size="small" onClick={() => downloadDocument(packet.reference, [packet.reference, packet.narrative, ...packet.documents.map(item => item.body)].join('\n\n----------------\n\n'))}>Download submitted packet (.txt)</Button></article>;
  if (selected === 'response' && claim.response) return <article className="claim-document"><h3>Draft query response</h3><pre>{claim.response}</pre></article>;
  if (selected === 'packet') return <article className="claim-document"><h3>Prepared claim packet</h3><pre>{claim.narrative}</pre><p>{claim.documents.filter(item => item.attached).map(item => item.title).join(' · ')}</p></article>;
  return <Empty description="Select a document or timeline evidence to inspect it." />;
}

const claimTime = (at: string) => new Date(at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const eventActor = (actor: string, claim: ClaimCase) => actor === 'Demo insurer / TPA' ? `${claim.insurer} · Payer desk` : actor === 'Demo hospital accounts' ? 'Rohan Mehta · Hospital accounts (demo)' : actor === 'Demo billing reviewer' ? 'Sana Kapoor · Billing reviewer (demo)' : actor;

const stageFor = (status: ClaimCase['status']) => ({ draft: 1, needs_documents: 1, review: 2, submitted: 3, query: 3, response_review: 3, response_submitted: 3, authorised: 4, settlement_submitted: 5, payment_received: 6, completed: 7 }[status]);
const nextActionFor = (status: ClaimCase['status']) => ({ draft: 'Prepare documents', needs_documents: 'Attach investigation report', review: 'Clinical & billing review', submitted: 'Await payer decision', query: 'Answer pharmacy query', response_review: 'Review query response', response_submitted: 'Await final authorisation', authorised: 'Send settlement packet', settlement_submitted: 'Await payer remittance', payment_received: 'Reconcile & close', completed: 'View closure record' }[status]);

const nextOwnerFor = (claim: ClaimCase) => ['submitted', 'response_submitted'].includes(claim.status) ? claim.insurer
  : claim.status === 'settlement_submitted' ? `${claim.insurer} · Payment processing`
  : ['authorised', 'payment_received', 'completed'].includes(claim.status) ? 'Rohan Mehta · Hospital accounts (demo)'
  : claim.status === 'review' ? 'Treating doctor & billing reviewer' : claim.owner;

function ClaimFormEditor({ claim, busy, onDirty, act }: { claim: ClaimCase; busy: boolean; onDirty: () => void; act: (action: ClaimAction) => void }) {
  const [form] = Form.useForm<ClaimForm>();
  const editable = ['needs_documents', 'review'].includes(claim.status);
  return <Collapse className="section-gap" items={[{ key: 'form', label: 'Prefilled hospital claim form · patient, policy & treatment', children: <Form form={form} initialValues={claim.form} layout="vertical" disabled={!editable || busy} onValuesChange={onDirty} onFinish={fields => act({ type: 'edit_form', fields })}>
    <div className="claim-form-grid">{([{ key: 'policy_number', label: 'Policy number' }, { key: 'member_id', label: 'Member ID' }, { key: 'relationship', label: 'Relationship to policyholder' }, { key: 'room_category', label: 'Room category' }, { key: 'treating_doctor', label: 'Treating doctor' }, { key: 'diagnosis', label: 'Episode diagnosis' }, { key: 'procedure', label: 'Treatment / procedure' }] as const).map(field => <Form.Item key={field.key} name={field.key} label={field.label} rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>)}<Form.Item name="admission_type" label="Admission type"><Select options={['Emergency', 'Planned'].map(value => ({ value }))} /></Form.Item></div>
    {editable && <Button htmlType="submit" loading={busy}>Save form & request fresh review</Button>}
  </Form> }]} />;
}

export function ClaimsPage() {
  const workflow = useWorkflow();
  const client = useQueryClient();
  const { message } = App.useApp();
  const [selected, setSelected] = useState('summary');
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [timelineOrder, setTimelineOrder] = useState('Latest first');
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [view, setView] = useState('All claims');
  const [statusFilter, setStatusFilter] = useState('');
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [dirtyForm, setDirtyForm] = useState<string | null>(null);
  const hospitalId = workflow.data?.hospital_id;
  const query = useQuery({ queryKey: ['claims-demo', hospitalId, workflow.data?.revision], enabled: Boolean(workflow.data), queryFn: () => readClaims(workflow.data!) });
  useEffect(() => {
    const refresh = (event: StorageEvent) => { if (hospitalId && event.key === claimStorageKey(hospitalId)) void client.invalidateQueries({ queryKey: ['claims-demo'] }); };
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, [client, hospitalId]);
  const mutation = useMutation({
    mutationFn: async (action: ClaimAction | { type: 'reset' | 'reset_all' }) => {
      if (!query.data) throw new Error('Claim is not loaded.');
      const current = query.data.claims.find(item => item.id === params.get('id'));
      const revision = query.data.revision;
      const write = async () => {
        const state = await readWorkflow();
        if (action.type === 'reset_all') { resetClaims(state, revision); return null; }
        if (!current) throw new Error('Select a claim first.');
        let toSave = action as ClaimAction | { type: 'reset' };
        if (action.type === 'submit' && !current.submission) {
          transitionClaim(current, action, state); // validate gates before anything leaves the hospital
          const receipt = await sendClaimToInsurer(await buildSubmission(current, state, 'initial'));
          toSave = { ...action, insurer_ref: receipt.claim_ref };
        }
        if (action.type === 'submit_response' && !current.response_submission && isInsurerReference(current.submission?.reference)) {
          transitionClaim(current, action, state);
          await sendResponseToInsurer(current.submission!.reference, await buildSubmission(current, state, 'response'));
        }
        return saveClaimAction(state, toSave, current.version, localStorage, current.id);
      };
      return navigator.locks ? navigator.locks.request('vdoc-claims-demo', write) : write();
    },
    onSuccess: (next, action) => {
      setDirtyForm(null);
      if (next) client.setQueryData(['claims-demo', hospitalId, workflow.data?.revision], { ...query.data!, revision: query.data!.revision + 1, claims: query.data!.claims.map(item => item.id === next.id ? next : item) });
      if (action.type === 'reset_all') { setRestoreOpen(false); setParams({}); }
      if (action.type === 'submit_settlement') setSelected('message-settlement_receipt');
      if (action.type === 'receive_payment') setSelected('message-remittance');
      if (action.type === 'reconcile') setSelected('message-reconciliation');
      if (action.type === 'submit') setSelected('message-receipt');
      if (action.type === 'send_query') setSelected('message-query');
      if (action.type === 'prepare_response') setSelected('pharmacy');
      if (action.type === 'submit_response') setSelected('message-response_receipt');
      if (action.type === 'authorise') setSelected('message-authorisation');
      if (action.type === 'prepare' || action.type === 'attach_report') setSelected('investigation');
      if (action.type === 'reset') { setSelected('summary'); setResetOpen(false); }
      void client.invalidateQueries({ queryKey: ['claims-demo'] });
    },
    onError: error => { void message.error(error.message); void client.invalidateQueries({ queryKey: ['claims-demo'] }); },
  });
  const openClaim = query.data?.claims.find(item => item.id === params.get('id'));
  const insurerRef = openClaim && ['submitted', 'query', 'response_submitted'].includes(openClaim.status) && isInsurerReference(openClaim.submission?.reference) ? openClaim.submission!.reference : null;
  const insurerRecord = useQuery({ queryKey: ['insurer-claim', insurerRef], enabled: Boolean(insurerRef), refetchInterval: 2000, refetchIntervalInBackground: true, queryFn: () => fetchInsurerClaim(insurerRef!) });
  const handledQueries = useRef(new Set<string>());
  useEffect(() => {
    const open = insurerRecord.data?.queries.find(item => item.status === 'open');
    if (!open || openClaim?.status !== 'submitted' || handledQueries.current.has(`${insurerRef}-${open.id}`)) return;
    handledQueries.current.add(`${insurerRef}-${open.id}`);
    mutation.mutate({ type: 'send_query', note: open.note });
  }, [insurerRecord.data, openClaim?.status, insurerRef, mutation]);
  if (!workflow.data) return <QueryState pending={workflow.isPending} error={workflow.error} />;
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const claims = query.data.claims;
  const claim = claims.find(item => item.id === params.get('id'));
  const busy = mutation.isPending;
  const formDirty = Boolean(claim && dirtyForm === `${claim.id}-${claim.version}`);
  const act = (action: ClaimAction) => {
    if (formDirty && action.type !== 'edit_form') { void message.warning('Save the claim form changes before continuing.'); return; }
    mutation.mutate(action);
  };
  if (!claim) {
    const completed = claims.filter(item => item.status === 'completed');
    const active = claims.filter(item => item.status !== 'completed');
    const rows = claims.filter(item => (view === 'All claims' || (view === 'Completed' ? item.status === 'completed' : item.status !== 'completed')) && (!statusFilter || item.status === statusFilter) && `${item.patient_name} ${item.uhid} ${item.id} ${item.insurer} ${item.diagnosis}`.toLowerCase().includes(search.toLowerCase()));
    return <section className="claims-page">
      <section className="surface workflow-page claim-worklist">
        <div className="workflow-toolbar claims-toolbar"><strong>Cashless claims</strong><Segmented size="small" value={view} onChange={value => setView(value)} options={[{ value: 'All claims', label: `All ${claims.length}` }, { value: 'In progress', label: `Active ${active.length}` }, { value: 'Completed', label: `Completed ${completed.length}` }]} /><Input size="small" aria-label="Search claims" placeholder="Patient / UHID / insurer" value={search} onChange={event => setSearch(event.target.value)} allowClear style={{ width: 210 }} /><Select size="small" aria-label="Filter claim status" value={statusFilter} onChange={setStatusFilter} style={{ width: 155 }} options={[{ value: '', label: 'All stages' }, ...Object.entries(claimStatusLabels).map(([value, label]) => ({ value, label }))]} /><Tooltip title="All payer decisions and payments are simulated. No real insurer or bank is connected."><Tag className="claim-demo-inline">Demo</Tag></Tooltip></div>
        <div className="claims-summary-line"><span><strong>{claims.filter(item => ['needs_documents', 'query'].includes(item.status)).length}</strong> need attention</span><span><strong>{claims.filter(item => ['review', 'response_review'].includes(item.status)).length}</strong> awaiting staff review</span><span>Reconciled insurer payments <strong>{money(completed.reduce((sum, item) => sum + (item.paid_amount ?? 0), 0))}</strong></span><span className="claims-summary-hint">Open a claim to verify documents, decisions and payment history.</span></div>
        {params.get('id') && <Alert type="warning" title="Claim not found. Choose a record below." />}
        <Table rowKey="id" dataSource={rows} size="small" pagination={{ pageSize: 10, hideOnSinglePage: true }} scroll={{ x: 1100 }} columns={[
          { title: 'Patient / claim', render: (_, row: ClaimCase) => <><Button type="link" className="claim-patient-name" disabled={busy} onClick={() => { setSelected('summary'); setParams({ id: row.id }); }}>{row.patient_name}</Button><div className="muted">{row.uhid} · {row.id}</div><small>{row.department}</small></> },
          { title: 'Insurer / TPA', render: (_, row: ClaimCase) => <><span>{row.insurer}</span><div className="muted">{row.form.policy_number}</div></> },
          { title: 'Bill / authorised', render: (_, row: ClaimCase) => <><strong>{money(row.bill_total)}</strong><div className="muted">{row.authorised_amount === null ? 'Approval pending' : `${money(row.authorised_amount)} authorised`}</div></> },
          { title: 'Stage / progress', width: 200, render: (_, row: ClaimCase) => <><Tag color={row.status === 'completed' ? 'green' : ['query', 'needs_documents'].includes(row.status) ? 'orange' : 'blue'}>{claimStatusLabels[row.status]}</Tag><Progress percent={Math.round(stageFor(row.status) / 7 * 100)} size="small" showInfo={false} /><small>{row.documents.filter(doc => doc.attached).length}/{row.documents.length} documents attached</small></> },
          { title: 'Latest activity · IST', width: 185, render: (_, row: ClaimCase) => { const last = row.events.at(-1); return last ? <><span>{claimTime(last.at)}</span><div className="muted">{eventActor(last.actor, row)}</div></> : '—'; } },
          { title: 'Next action', render: (_, row: ClaimCase) => <><span>{nextActionFor(row.status)}</span><div className="muted">{nextOwnerFor(row)}</div></> },
          { title: '', render: (_, row: ClaimCase) => <Button size="small" disabled={busy} onClick={() => { setSelected(row.status === 'completed' ? 'message-reconciliation' : 'summary'); setParams({ id: row.id }); }}>{row.status === 'completed' ? 'View history' : 'Open claim'}</Button> },
        ]} />
      </section>
      <Collapse className="claim-presenter" items={[{ key: 'reset', label: 'Presenter controls', children: <Space wrap><span>Restore the starting scenario: 10 claims, with 5 completed and 5 active.</span><Button danger disabled={busy} onClick={() => setRestoreOpen(true)}>Restore 10 demo records</Button></Space> }]} />
      <Modal title="Restore the 10-case demo?" open={restoreOpen} confirmLoading={busy} okText="Restore demo records" okButtonProps={{ danger: true }} onCancel={() => setRestoreOpen(false)} onOk={() => mutation.mutate({ type: 'reset_all' })}>This replaces only the claims demo worklist with its starting records. Clinical charts and discharge records are preserved.</Modal>
    </section>;
  }
  const blockers = claim.status === 'draft' ? [] : claimBlockers(claim);
  const packetFields = buildPacketFields(claim, workflow.data);
  const realInsurer = isInsurerReference(claim.submission?.reference);
  const reviewable = ['needs_documents', 'review', 'response_review'].includes(claim.status);
  const steps = ['Pre-authorised', 'Documents', 'Internal review', 'Payer review', 'Final approval', 'Settlement', 'Reconciliation'];
  const stage = stageFor(claim.status);
  const evidenceLabel = (id: string) => claim.documents.find(doc => doc.id === id)?.title ?? claim.messages.find(item => item.id === id)?.title ?? (id === 'packet' ? 'Claim packet' : id === 'settlement_packet' ? 'Settlement packet' : 'Query response');
  return <section className="claims-page">
    <div className="workflow-toolbar claims-detail-toolbar"><Button size="small" type="text" disabled={busy} onClick={() => setParams({})}>← Claims</Button><strong>{claim.id}</strong><span className="muted">{claim.owner}</span><Tooltip title="Synthetic insurer decisions and payments; no bank or payer connection."><Tag className="claim-demo-inline">Demo</Tag></Tooltip><Button size="small" href="/insurer" target="_blank" rel="noreferrer" style={{ marginLeft: 'auto' }}>Open insurer portal ↗</Button></div>
    <div className="claim-patient-bar"><div className="claim-patient-avatar">{claim.patient_name.split(' ').map(word => word[0]).slice(0, 2).join('')}</div><div><h2>{claim.patient_name}</h2><span className="muted">{claim.uhid} · {claim.diagnosis}</span><div className="muted">{claim.episode_label}</div></div><div className="claim-patient-links"><Tag color={['authorised', 'completed'].includes(claim.status) ? 'green' : 'blue'}>{claimStatusLabels[claim.status]}</Tag><Space><Link to={`/app/patients/${claim.patient_id}`}>Patient records</Link>{claim.discharge_id && <Link to={`/app/discharges?id=${claim.discharge_id}`}>Discharge workspace</Link>}</Space></div></div>
    <div className="claim-money-strip"><span>Bill <strong>{money(claim.bill_total)}</strong></span><span>Pre-auth <strong>{money(claim.preauth_amount)}</strong></span><span>Authorised <strong>{claim.authorised_amount === null ? 'Pending' : money(claim.authorised_amount)}</strong></span><span>Patient share <strong>{claim.patient_payable === null ? 'Pending' : money(claim.patient_payable)}</strong></span><span>Insurer paid <strong>{claim.paid_amount === null ? 'Pending' : money(claim.paid_amount)}</strong></span><Tag color={claim.settlement === 'reconciled' ? 'green' : 'default'}>Settlement: {claim.settlement}</Tag></div>
    <ol className="claim-progress" aria-label="Claim progress">{steps.map((step, index) => <li key={step} className={index < stage || claim.status === 'completed' ? 'complete' : index === stage ? 'current' : ''} aria-current={index === stage ? 'step' : undefined}><span>{index < stage || claim.status === 'completed' ? <CheckCircleFilled /> : index + 1}</span>{step}</li>)}</ol>
    <div className="claim-layout">
      <aside className="claim-panel claim-activity"><div className="claim-panel-heading"><h3>Audit timeline <span className="muted">({claim.events.length})</span></h3><Select size="small" aria-label="Timeline order" value={timelineOrder} onChange={setTimelineOrder} options={[{ value: 'Latest first' }, { value: 'Oldest first' }]} /></div><div role="status" aria-live="polite" className="claim-live-status">{busy ? 'Saving workflow action…' : claimStatusLabels[claim.status]}</div>
        {claim.events.length === 0 ? <div className="claim-start"><SafetyCertificateOutlined /><h3>Your claim starts here</h3><p>Gather this admission’s records and check the packet before it reaches the insurer.</p></div> : <ol className="claim-timeline">{(timelineOrder === 'Latest first' ? [...claim.events].reverse() : claim.events).map(event => <li key={event.id} className={`claim-event-${event.tone}`}><time>{claimTime(event.at)} IST</time><h4>{event.title}</h4><span className="claim-event-actor">{eventActor(event.actor, claim)}</span><p>{event.detail}</p><Space size={4} wrap>{event.evidence.map(id => <button type="button" key={id} onClick={() => { setSelected(id); setEvidenceOpen(true); }}>{evidenceLabel(id)} ↗</button>)}</Space></li>)}</ol>}
      </aside>
      <main className="claim-panel"><div className="claim-panel-heading"><div><h3>{nextActionFor(claim.status)}</h3><span className="muted">{claim.status === 'completed' ? 'Closed by' : 'Next owner'}: {nextOwnerFor(claim)}</span></div><Tag>{claimStatusLabels[claim.status]}</Tag></div>
        <Descriptions size="small" column={{ xs: 1, sm: 2 }} items={[{ key: 'insurer', label: 'Insurer / TPA', children: claim.insurer }, { key: 'member', label: 'Member ID', children: claim.member_id }, { key: 'admission', label: 'Admission', children: claim.admission_date }, { key: 'discharge', label: claim.completed_at ? 'Episode discharge' : 'Target discharge', children: claim.discharge_date }]} />
        <ClaimFormEditor key={`${claim.id}-${claim.version}`} claim={claim} busy={busy} onDirty={() => setDirtyForm(`${claim.id}-${claim.version}`)} act={act} />
        <Collapse className="section-gap" items={[{ key: 'sources', label: `Data sent to insurer · source of each field (${packetFields.length})`, children: <Table size="small" pagination={false} rowKey="key" dataSource={packetFields} columns={[
          { title: 'Field', dataIndex: 'label', width: 210 },
          { title: 'Value', render: (_, item) => <span className="claim-field-value">{item.value || '—'}</span> },
          { title: 'Source in VDoc', dataIndex: 'source', width: 230, render: value => <span className="muted">{value}</span> },
        ]} /> }]} />
        {formDirty && <Alert type="warning" title="Unsaved claim form changes" description="Save the form before reviewing or submitting this packet." />}
        {claim.status === 'draft' && <div className="claim-action-banner"><div><h3>Prepare a complete claim packet</h3><p>Collect the discharge summary, bill and authorisation, then check for missing evidence.</p></div><Button type="primary" size="small" loading={busy} icon={<ArrowRightOutlined />} onClick={() => act({ type: 'prepare' })}>Prepare claim</Button></div>}
        {claim.status === 'needs_documents' && <Alert type="warning" showIcon title="One attachment needs your attention" description={blockers.join(' · ')} action={<Button loading={busy} onClick={() => act({ type: 'attach_report' })}>Attach matching report</Button>} />}
        {claim.status === 'submitted' && (realInsurer ? <TransferReceipt claim={claim} fieldCount={packetFields.length} /> : <Alert type="info" showIcon title="Claim received by demo insurer" description="The submitted packet and receipt are saved. Waiting for the insurer’s review." />)}
        {claim.status === 'query' && <Alert type="warning" showIcon title="Insurer query: pharmacy bill breakup" description={`Provide the itemised bill supporting the ${money(claim.pharmacy_total)} pharmacy charge.`} action={<Button type="primary" loading={busy} onClick={() => act({ type: 'prepare_response' })}>Prepare response</Button>} />}
        {claim.status === 'response_submitted' && <Alert type="info" showIcon title="Query response received" description="Supporting pharmacy bill submitted. Waiting for final authorisation." />}
        {claim.status === 'authorised' && <Alert type="success" showIcon title="Final cashless authorisation received" description={`${money(claim.authorised_amount!)} authorised · ${money(claim.patient_payable!)} patient payable. Submit the settlement documents to start payment processing. Clinical discharge remains separate.`} action={<Button loading={busy} onClick={() => act({ type: 'submit_settlement' })}>Submit settlement packet</Button>} />}
        {claim.status === 'settlement_submitted' && <Alert type="info" showIcon title="Settlement packet acknowledged" description="The payer has the final documents. Waiting for remittance advice; final authorisation alone is not payment." />}
        {claim.status === 'payment_received' && <Alert type="info" showIcon title="Remittance received — accounts review required" description={`${money(claim.paid_amount!)} received under ${claim.utr}. Inspect the remittance, bill and patient liability before recording the synthetic patient receipt and closing.`} action={<Button type="primary" loading={busy} onClick={() => act({ type: 'reconcile' })}>Confirm demo receipts & reconcile</Button>} />}
        {claim.status === 'completed' && <Alert type="success" showIcon title="Claim completed · zero outstanding" description={`${money(claim.paid_amount!)} insurer payment + ${money(claim.patient_collected!)} patient receipt reconciled against ${money(claim.bill_total)}. Completed ${new Date(claim.completed_at!).toLocaleDateString('en-IN')}. All payments are synthetic.`} />}
        {['payment_received', 'completed'].includes(claim.status) && <Descriptions className="section-gap" size="small" column={2} items={[{ key: 'bank', label: 'Receiving bank', children: `${claim.bank_name} (simulated)` }, { key: 'utr', label: 'Remittance UTR', children: claim.utr }, { key: 'paid', label: 'Insurer paid', children: money(claim.paid_amount!) }, { key: 'patient', label: 'Patient collected', children: claim.patient_collected === null ? 'Awaiting reconciliation' : money(claim.patient_collected) }, { key: 'balance', label: 'Outstanding', children: money(claim.bill_total - (claim.paid_amount ?? 0) - (claim.patient_collected ?? 0)) }]} />}
        {reviewable && <><Review key={`${claim.id}-${claim.version}`} claim={claim} busy={busy} formDirty={formDirty} act={act} />{claim.status !== 'response_review' && <Button size="small" className="section-gap" icon={<ReloadOutlined />} disabled={busy} onClick={() => act({ type: 'prepare' })}>Refresh packet from patient records</Button>}</>}
        <Tabs className="claim-evidence-tabs" size="small" items={[
          { key: 'documents', label: `Documents (${claim.documents.filter(doc => doc.attached).length}/${claim.documents.length})`, children: <Table size="small" pagination={false} rowKey="id" dataSource={claim.documents} columns={[
            { title: 'Document / source', render: (_, doc) => <><button type="button" className="claim-evidence-link" onClick={() => { setSelected(doc.id); setEvidenceOpen(true); }}>{doc.title} ↗</button><div className="muted">{doc.source} · {doc.source_id}</div></> },
            { title: 'Status', width: 95, render: (_, doc) => <Tag color={doc.attached ? 'green' : 'default'}>{doc.attached ? 'Attached' : 'Available'}</Tag> },
            { title: '', width: 76, render: (_, doc) => <Button size="small" type="text" onClick={() => downloadDocument(`${claim.id}-${doc.id}`, doc.body)}>Download</Button> },
          ]} /> },
          { key: 'correspondence', label: `Payer & accounts (${claim.messages.length})`, children: <Table size="small" pagination={false} rowKey="id" dataSource={claim.messages} locale={{ emptyText: 'Correspondence appears after submission.' }} columns={[
            { title: 'Letter / receipt', render: (_, item) => <button type="button" className="claim-evidence-link" onClick={() => { setSelected(item.id); setEvidenceOpen(true); }}>{item.title} ↗</button> },
            { title: 'Received · IST', width: 180, render: (_, item) => claimTime(item.at) },
          ]} /> },
          { key: 'packets', label: 'Submitted packets', children: <Space wrap>{([{ key: 'packet', value: claim.submission, label: 'Initial submission' }, { key: 'response', value: claim.response_submission, label: 'Query response' }, { key: 'settlement_packet', value: claim.settlement_submission, label: 'Settlement packet' }]).map(item => <Button size="small" key={item.key} disabled={!item.value} onClick={() => { setSelected(item.key); setEvidenceOpen(true); }}>{item.label}{item.value ? ` · v${item.value.version}` : ' · not sent'}</Button>)}</Space> },
        ]} />

      </main>
    </div>
    <Collapse className="claim-presenter" items={[{ key: 'presenter', label: 'Presenter controls', children: <><p className="muted">Advance the simulated insurer side of this scenario. Claim preparation and staff review happen in the workspace above.</p><Space wrap><Tooltip title={realInsurer ? 'This claim is with the insurer portal. Request the document there.' : ''}><Button disabled={claim.status !== 'submitted' || busy || realInsurer} onClick={() => act({ type: 'send_query' })}>Send insurer query</Button></Tooltip><Button disabled={!['submitted', 'response_submitted'].includes(claim.status) || busy} onClick={() => act({ type: 'authorise' })}>Issue final authorisation</Button><Button disabled={claim.status !== 'settlement_submitted' || busy} onClick={() => act({ type: 'receive_payment' })}>Simulate insurer payment</Button><Button danger disabled={busy} onClick={() => setResetOpen(true)}>Reset this claim</Button></Space></> }]} />
    <ClinicalDrawer title={evidenceLabel(selected)} patientId={claim.patient_id} description={`${claim.id} · inspect the source document or saved submission`} size="large" open={evidenceOpen} onClose={() => setEvidenceOpen(false)}><div className="claim-evidence-context"><strong>{claim.patient_name} · {claim.uhid}</strong><p>{claim.submission?.reference ?? claim.id} · Episode {claim.admission_date} → {claim.discharge_date}</p></div><Evidence claim={claim} selected={selected} /><Collapse className="section-gap" items={[{ key: 'usage', label: `Linked audit events (${claim.events.filter(event => event.evidence.includes(selected)).length})`, children: <ol className="claim-evidence-audit">{claim.events.filter(event => event.evidence.includes(selected)).map(event => <li key={event.id}><strong>{event.title}</strong><div>{claimTime(event.at)} IST</div><div>{eventActor(event.actor, claim)}</div><p>{event.detail}</p></li>)}</ol> }]} /></ClinicalDrawer>
    <Modal title="Reset this claims demo?" open={resetOpen} okText="Reset claims demo" okButtonProps={{ danger: true }} confirmLoading={busy} onCancel={() => setResetOpen(false)} onOk={() => mutation.mutate({ type: 'reset' })}><p>This clears this demo claim’s packet, activity and simulated insurer responses. Patient records and clinical discharge work are preserved.</p></Modal>
  </section>;
}
