import { useState } from 'react';
import { Button, Collapse, Empty, Input, Pagination, Segmented, Select, Table, Tabs, Tag } from 'antd';
import { CalendarOutlined, FileTextOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/format';
import { QueryState } from './QueryState';
import { useWorkflow } from '../services/useWorkflow';
import { historyTimeline, historyVisits } from '../services/historyView';
import { EvidenceDrawer, type EvidenceRef } from './EvidenceDrawer';
import { ReportList } from './ReportList';

const shortDate = (value: string) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(value));
const pagination = { defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 50], showTotal: (total: number) => `${total} records` };

export function PatientHistoryPanel({ patientId, sourceOnly = false }: { patientId: string; sourceOnly?: boolean }) {
  const query = useWorkflow();
  const [visitId, setVisitId] = useState<string>();
  const [visitSearch, setVisitSearch] = useState('');
  const [visitKind, setVisitKind] = useState('all');
  const [visitPage, setVisitPage] = useState(1);
  const [noteSearch, setNoteSearch] = useState('');
  const [noteKind, setNoteKind] = useState('all');
  const [noteVisit, setNoteVisit] = useState('all');
  const [eventSearch, setEventSearch] = useState('');
  const [eventKind, setEventKind] = useState('all');
  const [eventPage, setEventPage] = useState(1);
  const [evidence, setEvidence] = useState<EvidenceRef | null>(null);
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const state = query.data;
  const history = state.histories.find(history => history.context.patient_id === patientId);
  if (!history) return <Empty description="No history recorded for this patient" />;
  const reports = state.reports.filter(report => report.patient_id === patientId);
  const notes = history.notes.filter(note => !sourceOnly || note.source_system === 'MockHIS');
  const visits = historyVisits(history, visitSearch, visitKind);
  const currentPage = Math.min(visitPage, Math.max(1, Math.ceil(visits.length / 6)));
  const visibleVisits = visits.slice((currentPage - 1) * 6, currentPage * 6);
  const selected = visibleVisits.find(visit => visit.id === visitId) ?? visibleVisits[0];
  const selectedNotes = notes.filter(note => note.encounter_id === selected?.id).sort((first, second) => second.recorded_at.localeCompare(first.recorded_at));
  const selectedReports = reports.filter(report => report.encounter_id === selected?.id).sort((first, second) => second.reported_at.localeCompare(first.reported_at));
  const selectedOrders = history.orders.filter(order => order.encounter_id === selected?.id);
  const selectedRequests = history.requests.filter(request => request.encounter_id === selected?.id);
  const filteredNotes = notes.filter(note => (noteKind === 'all' || note.kind === noteKind) && (noteVisit === 'all' || note.encounter_id === noteVisit)
    && `${note.title} ${note.body} ${note.author}`.toLowerCase().includes(noteSearch.trim().toLowerCase())).sort((first, second) => second.recorded_at.localeCompare(first.recorded_at));
  const events = historyTimeline(history, eventSearch, eventKind);
  const currentEventPage = Math.min(eventPage, Math.max(1, Math.ceil(events.length / 15)));
  const sourceFor = (id: string): EvidenceRef | null => {
    if (reports.some(record => record.id === id)) return { record_type: 'report', record_id: id };
    const groups = { encounter: history.encounters, note: notes, medication: history.medications, request: history.requests, order: history.orders, work_item: history.work_items };
    for (const [type, records] of Object.entries(groups)) if (records.some(record => record.id === id)) return { record_type: type, record_id: id };
    return null;
  };
  const noteList = (records: typeof notes) => records.length ? <div className="history-note-list">{records.map(note => <button type="button" className="history-note-row" key={note.id} onClick={() => setEvidence({ record_type: 'note', record_id: note.id })}>
    <FileTextOutlined /><span><strong>{note.title}</strong><span className="history-note-preview">{note.body}</span><small>{note.author} · {formatDate(note.recorded_at)} · {note.source_system}</small></span><RightOutlined />
  </button>)}</div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No notes recorded" />;

  return <section className="patient-history">
    <div className="history-heading"><div><h3>Patient history</h3><p>Visits, clinical records and care decisions in one place.</p></div>
      <div className="history-counts"><span><strong>{history.encounters.length}</strong> visits</span><span><strong>{notes.length}</strong> notes</span><span><strong>{reports.length}</strong> reports</span></div>
    </div>
    <Collapse ghost size="small" className="history-background" items={[{ key: 'background', label: 'Clinical background & patient context', extra: <span className="history-small">{history.context.previous_records_status === 'first_hospital_visit' ? 'First hospital visit' : 'Longitudinal record'}</span>, children: <div className="history-background-grid">
      <div><h4>Presenting complaint</h4><p>{history.context.presenting_complaint}</p><h4>Relevant history</h4><p>{history.context.history}</p></div>
      <div><h4>Clinical status</h4><div className={`history-acuity${history.context.acuity === 'critical' ? ' is-critical' : ''}`}>
        <div className="history-acuity-heading"><strong>{history.context.acuity === 'critical' ? 'Critical' : 'Non-critical'}</strong><span>Assessed {formatDate(history.context.acuity_assessed_at)}</span></div>
        <p>{history.context.acuity_reason}</p>
      </div>
        <h4>Social & family context</h4><p>{history.context.social_context}</p>{history.context.family_history && <p>{history.context.family_history}</p>}<p>Preferred language: {history.context.preferred_language}</p></div>
    </div> }]} />
    <Tabs size="small" className="history-tabs" items={[
      { key: 'visits', label: 'Visit journey', children: <>
        <div className="history-filters"><Input.Search aria-label="Search visits" placeholder="Search diagnosis, clinician or department" allowClear value={visitSearch} onChange={event => { setVisitSearch(event.target.value); setVisitPage(1); }} />
          <Segmented size="small" value={visitKind} onChange={value => { setVisitKind(value); setVisitPage(1); }} options={[{ value: 'all', label: 'All visits' }, 'IPD', 'OPD']} /></div>
        {selected ? <div className="history-journey"><aside className="history-visit-list" aria-label="Choose a visit">
          {visibleVisits.map(visit => <button type="button" key={visit.id} aria-pressed={selected.id === visit.id} className={`history-visit${selected.id === visit.id ? ' is-selected' : ''}`} onClick={() => setVisitId(visit.id)}>
            <span className="history-visit-top"><span><CalendarOutlined /> {shortDate(visit.started_at)}</span><Tag color={visit.status === 'active' ? 'green' : 'default'}>{visit.status === 'active' ? 'Current' : visit.kind}</Tag></span>
            <strong>{visit.department}</strong><span className="history-note-preview">{visit.reason}</span><small>{visit.owner} · {visit.kind}</small>
          </button>)}
          {visits.length > 6 && <Pagination size="small" simple current={currentPage} pageSize={6} total={visits.length} onChange={setVisitPage} />}
        </aside><div className="history-visit-detail" key={selected.id}>
          <div className="history-detail-heading"><div><h4>{selected.kind === 'IPD' ? 'Inpatient admission' : 'Outpatient consultation'}</h4><span>{formatDate(selected.started_at)}{selected.ended_at ? ` → ${formatDate(selected.ended_at)}` : ''}</span></div><Tag color={selected.status === 'active' ? 'green' : 'default'}>{selected.status}</Tag></div>
          <p className="history-small">{selected.owner} · {selected.department} · {selected.location}</p>
          <div className="history-assessment"><h4>Documented assessment</h4><p>{selected.assessment}</p>{selected.reason !== selected.assessment && <p className="history-small">Presentation: {selected.reason}</p>}</div>
          <Tabs size="small" items={[
            { key: 'notes', label: `Notes · ${selectedNotes.length}`, children: noteList(selectedNotes) },
            { key: 'reports', label: `Reports · ${selectedReports.length}`, children: <ReportList reports={selectedReports} /> },
            { key: 'orders', label: `Orders · ${selectedOrders.length}`, children: selectedOrders.length ? <div className="history-linked-list">{selectedOrders.map(order => <Link key={order.id} to={`/app/${order.kind === 'lab' ? 'lab-orders' : 'imaging-orders'}?id=${order.id}`}><span>{order.title}<small>{formatDate(order.placed_at)}</small></span><Tag>{order.status}</Tag></Link>)}</div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No investigations ordered" /> },
            ...(!sourceOnly ? [{ key: 'requests', label: `Coordination · ${selectedRequests.length}`, children: selectedRequests.length ? <div className="history-linked-list">{selectedRequests.map(request => <Link key={request.id} to={`/app/${request.kind === 'referral' ? 'referrals' : 'requests'}?id=${request.id}`}><span>{request.to_department}<small>{request.reason}</small></span><Tag>{request.status.replaceAll('_', ' ')}</Tag></Link>)}</div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No requests from this visit" /> }] : []),
          ]} />
        </div></div> : <Empty description="No visits match these filters" />}
      </> },
      { key: 'notes', label: 'Clinical notes', children: <>
        <div className="history-filters"><Input.Search aria-label="Search clinical notes" placeholder="Search note text or author" allowClear value={noteSearch} onChange={event => setNoteSearch(event.target.value)} />
          <Select aria-label="Note type" value={noteKind} onChange={setNoteKind} options={[{ value: 'all', label: 'All note types' }, ...[...new Set(notes.map(note => note.kind))].map(value => ({ value }))]} />
          <Select aria-label="Notes from visit" value={noteVisit} onChange={setNoteVisit} options={[{ value: 'all', label: 'All visits' }, ...historyVisits(history, '', 'all').map(visit => ({ value: visit.id, label: `${shortDate(visit.started_at)} · ${visit.kind}` }))]} /></div>
        <Table key={`${noteKind}-${noteVisit}-${noteSearch}`} size="small" rowKey="id" dataSource={filteredNotes} pagination={pagination} scroll={{ x: 580 }} columns={[
          { title: 'Note', render: (_, note) => <Button type="link" className="history-text-button" onClick={() => setEvidence({ record_type: 'note', record_id: note.id })}>{note.title}</Button> },
          { title: 'Author', dataIndex: 'author' }, { title: 'Type', dataIndex: 'kind' }, { title: 'Recorded · IST', dataIndex: 'recorded_at', render: formatDate },
        ]} />
      </> },
      { key: 'vitals', label: 'Vitals', children: <Table size="small" rowKey="id" pagination={pagination} dataSource={[...history.vitals].sort((first, second) => second.recorded_at.localeCompare(first.recorded_at))} scroll={{ x: 750 }} columns={[
        { title: 'Recorded · IST', dataIndex: 'recorded_at', render: formatDate }, { title: 'BP · mmHg', render: (_, vital) => `${vital.systolic}/${vital.diastolic}` },
        { title: 'Pulse /min', dataIndex: 'pulse' }, { title: 'RR /min', dataIndex: 'respiratory_rate' }, { title: 'SpO₂ %', dataIndex: 'spo2' }, { title: 'Oxygen context', dataIndex: 'oxygen_context' }, { title: 'Temp °C', dataIndex: 'temperature_c' },
      ]} /> },
      { key: 'medications', label: 'Medication history', children: <><p className="history-small">Documented home, held and historical medications—not an inpatient administration chart.</p><Table size="small" rowKey="id" pagination={pagination} dataSource={[...history.medications].sort((first, second) => second.recorded_at.localeCompare(first.recorded_at))} scroll={{ x: 750 }} columns={[
        { title: 'Medication', dataIndex: 'name' }, { title: 'Dose / route', render: (_, medicine) => `${medicine.dose} · ${medicine.route}` }, { title: 'Frequency', dataIndex: 'frequency' },
        { title: 'Status', dataIndex: 'status', render: status => <Tag>{status.replaceAll('_', ' ')}</Tag> }, { title: 'Recorded · IST', dataIndex: 'recorded_at', render: formatDate },
        { title: 'Source', render: (_, medicine) => <Button size="small" onClick={() => setEvidence({ record_type: 'medication', record_id: medicine.id })}>View context</Button> },
      ]} /></> },
      ...(!sourceOnly ? [{ key: 'coordination', label: 'Coordination', children: <>
        <Table size="small" rowKey="id" pagination={pagination} dataSource={[...history.requests].sort((first, second) => second.requested_at.localeCompare(first.requested_at))} scroll={{ x: 650 }} columns={[
          { title: 'Receiving team', render: (_, request) => <Link to={`/app/${request.kind === 'referral' ? 'referrals' : 'requests'}?id=${request.id}`}>{request.to_department}</Link> },
          { title: 'Question', dataIndex: 'reason' }, { title: 'Status', dataIndex: 'status', render: status => <Tag>{status.replaceAll('_', ' ')}</Tag> },
          { title: 'Response', dataIndex: 'response', render: response => response ?? 'Not recorded' },
        ]} />
        <h4>Pending work across visits</h4>
        {history.work_items.some(item => item.status === 'pending') ? <div className="history-linked-list">{history.work_items.filter(item => item.status === 'pending').map(item => <Button className="history-text-button" key={item.id} type="link" onClick={() => setEvidence({ record_type: 'work_item', record_id: item.id })}>{item.title} · {item.owner} · Due {formatDate(item.due_at)}</Button>)}</div> : <p className="history-small">No pending work recorded.</p>}
      </> }, { key: 'timeline', label: 'Activity timeline', children: <>
        <div className="history-filters"><Input.Search aria-label="Search activity" placeholder="Search activity or source" allowClear value={eventSearch} onChange={event => { setEventSearch(event.target.value); setEventPage(1); }} />
          <Select aria-label="Activity type" value={eventKind} onChange={value => { setEventKind(value); setEventPage(1); }} options={[{ value: 'all', label: 'All activity' }, ...['encounter', 'result', 'note', 'medication', 'request', 'task'].map(value => ({ value }))]} /></div>
        <div className="history-events">{events.slice((currentEventPage - 1) * 15, currentEventPage * 15).map(entry => {
          const source = sourceFor(entry.source_id);
          const discharge = state.discharges.find(record => record.id === entry.source_id);
          const handover = state.handovers.find(record => record.id === entry.source_id);
          return <div className="history-event" key={entry.id}><span className={`history-event-dot kind-${entry.kind}`} /><div><strong>{entry.title}</strong><small>{formatDate(entry.available_at)} · {entry.source_system} · {entry.kind}</small></div>
            {source ? <Button size="small" onClick={() => setEvidence(source)}>View source</Button> : discharge || handover ? <Link to={`/app/${discharge ? 'discharges' : 'handovers'}?id=${entry.source_id}`}>Open record</Link> : <span className="history-small">Source unavailable</span>}</div>;
        })}</div>
        {!events.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No matching activity" />}
        {events.length > 15 && <Pagination size="small" current={currentEventPage} total={events.length} pageSize={15} showSizeChanger={false} onChange={setEventPage} />}
      </> }] : []),
    ]} />
    <div className="history-footer">Synthetic patient record · Times shown in IST · Source records remain available for review</div>
    <EvidenceDrawer evidence={evidence} history={history} reports={reports} onClose={() => setEvidence(null)} />
  </section>;
}
