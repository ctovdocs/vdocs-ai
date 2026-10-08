import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Input, Table, Tag } from 'antd';
import { FileProtectOutlined, InboxOutlined, SafetyCertificateOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { InsurerClaimRecord, StoredSubmission } from '../domain/insurer';
import { fetchInsurerClaims, requestInsurerDocument } from '../services/claimsExport';

const defaultNote = 'Please provide the itemised pharmacy bill supporting the pharmacy charge in the final bill.';
const time = (at: string) => new Date(at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const statusLabel: Record<InsurerClaimRecord['status'], string> = { received: 'Received · under review', query: 'Query raised · awaiting hospital', response_received: 'Response received' };

function Submission({ record, submission }: { record: InsurerClaimRecord; submission: StoredSubmission }) {
  const [openFile, setOpenFile] = useState(submission.documents[0]?.filename ?? '');
  const fileUrl = (name: string) => `/api/insurer/claims/${encodeURIComponent(record.ref)}/files/${encodeURIComponent(name)}`;
  return <section className="ins-card">
    <header><h3>{submission.stage === 'initial' ? 'Initial claim packet' : 'Response to query'} <small>{submission.reference}</small></h3><span>{time(submission.received_at)} IST · hospital version {submission.claim_version}</span></header>
    <div className="ins-checks">{submission.checks.map(check => <div key={check.name}><Tag color={check.ok ? 'green' : 'red'}>{check.ok ? 'PASS' : 'FAIL'}</Tag><strong>{check.name}</strong><span>{check.detail}</span></div>)}</div>
    {submission.fields.length > 0 && <Table size="small" pagination={false} rowKey="key" dataSource={submission.fields} columns={[
      { title: 'Field received', dataIndex: 'label', width: 220 }, { title: 'Value', render: (_, item) => <span className="ins-value">{item.value}</span> },
    ]} />}
    <h4>Narrative</h4><pre className="ins-narrative">{submission.narrative}</pre>
    <h4>Documents received ({submission.documents.length})</h4>
    <div className="ins-files">
      <ul>{submission.documents.map(doc => <li key={doc.filename} className={doc.filename === openFile ? 'active' : ''}><button type="button" onClick={() => setOpenFile(doc.filename)}>{doc.title}</button><small>{doc.bytes.toLocaleString()} bytes · sha256 {doc.sha256.slice(0, 10)}…</small><a href={fileUrl(doc.filename)} target="_blank" rel="noreferrer">Open PDF ↗</a></li>)}</ul>
      {openFile && <iframe title="Received document" src={fileUrl(openFile)} />}
    </div>
  </section>;
}

export function InsurerPortalPage() {
  const client = useQueryClient();
  const [selected, setSelected] = useState<string | null>(() => new URLSearchParams(window.location.search).get('ref'));
  const [note, setNote] = useState(defaultNote);
  const inbox = useQuery({ queryKey: ['insurer-inbox'], refetchInterval: 2000, refetchIntervalInBackground: true, queryFn: fetchInsurerClaims });
  const claims = inbox.data?.claims ?? [];
  const record = claims.find(item => item.ref === selected) ?? claims[0];
  const ask = useMutation({ mutationFn: () => requestInsurerDocument(record!.ref, 'pharmacy', note), onSuccess: () => { void client.invalidateQueries({ queryKey: ['insurer-inbox'] }); } });
  const openQuery = record?.queries.find(query => query.status === 'open');
  return <div className="ins-shell">
    <header className="ins-top"><div><strong>Northwind Assurance</strong><span>Provider claims portal · demo</span></div><span className="ins-note">Fictional insurer. Everything received here was transferred from VDoc.</span></header>
    <div className="ins-stats"><span><strong>{claims.length}</strong> received</span><span><strong>{claims.filter(item => item.status === 'received').length}</strong> under review</span><span><strong>{claims.filter(item => item.status === 'query').length}</strong> awaiting hospital reply</span><span><strong>{claims.filter(item => item.status === 'response_received').length}</strong> response received</span></div>
    {inbox.error && <Alert type="error" showIcon title="Insurer service unreachable" description="Start VDoc with `npm run dev`; the intake service runs inside the dev server." />}
    <div className="ins-body">
      <aside className="ins-inbox"><h3>Inbox ({claims.length})</h3>
        {claims.length === 0 ? <div className="ins-inbox-empty"><InboxOutlined /><strong>Inbox is empty</strong><span>New claims appear here the moment a hospital submits them.</span></div> : <ul>{claims.map(item => <li key={item.ref}><button type="button" className={item.ref === record?.ref ? 'active' : ''} onClick={() => setSelected(item.ref)}><strong>{item.ref}</strong><span>{item.submissions[0]?.fields.find(field => field.key === 'patient_name')?.value}</span><small>{statusLabel[item.status]}</small></button></li>)}</ul>}
      </aside>
      <main className="ins-main">
        {!record ? <section className="ins-empty">
          <span className="ins-live"><i />Listening for submissions · checking every 2 seconds</span>
          <h2>No claims received yet</h2>
          <p>When a hospital submits a cashless claim, it opens here with a reference number, the exact fields it sent and every attached PDF.</p>
          <div className="ins-empty-cards">
            <div><UnorderedListOutlined /><strong>Claim fields</strong><span>Patient, policy, diagnosis, dates and bill, as entered by the hospital.</span></div>
            <div><FileProtectOutlined /><strong>PDF documents</strong><span>Summary, bill, reports and forms. Open each one here, with its checksum.</span></div>
            <div><SafetyCertificateOutlined /><strong>Automatic validation</strong><span>Required fields, document types and file integrity are checked on arrival.</span></div>
          </div>
        </section> : <>
          <div className="ins-receipt"><div><small>Claim reference issued</small><h2>{record.ref}</h2></div><Tag color={record.status === 'query' ? 'orange' : 'blue'}>{statusLabel[record.status]}</Tag><span>Hospital claim: {record.claim_id}</span></div>
          <section className="ins-card"><header><h3>Request additional document</h3></header>
            {openQuery ? <Alert type="warning" showIcon title={`Query ${openQuery.id} sent ${time(openQuery.at)} IST`} description={`${openQuery.note} Waiting for the hospital to reply.`} />
              : <><Input.TextArea rows={2} value={note} onChange={event => setNote(event.target.value)} aria-label="Query note" /><Button type="primary" className="section-gap" loading={ask.isPending} disabled={!note.trim() || record.status === 'response_received'} onClick={() => ask.mutate()}>Request itemised pharmacy bill</Button>{ask.error && <Alert type="error" title={ask.error.message} />}</>}
            {record.status === 'response_received' && <Alert className="section-gap" type="success" showIcon title="Response received against this claim" />}
          </section>
          {[...record.submissions].reverse().map(submission => <Submission key={submission.reference} record={record} submission={submission} />)}
        </>}
      </main>
    </div>
  </div>;
}
