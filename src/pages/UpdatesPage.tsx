import { Badge, Button, Empty, Input, Segmented, Select, Table, Tag, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { ClinicalDrawer } from '../components/ClinicalOverlay';
import { QueryState } from '../components/QueryState';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { doctorUpdates, type DoctorUpdate } from '../services/doctorUpdates';
import { useActiveDoctor } from '../services/activeDoctor';
import { patchArchiveParams } from '../services/shiftArchive';
import { formatDate } from '../lib/format';

export function UpdatesPage() {
  const query = useWorkflow();
  const action = useWorkflowAction();
  const activeDoctor = useActiveDoctor();
  const [params, setParams] = useSearchParams();
  const change = (updates: Record<string, string | null>, replace = false) => setParams(current => patchArchiveParams(current, updates), { replace });
  const search = params.get('search') ?? '';
  const view = params.get('view') ?? 'all';
  const category = params.get('category') ?? '';
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const all = doctorUpdates(query.data, activeDoctor.data.name);
  const unread = all.filter(item => !item.read).length;
  const attention = all.filter(item => item.attention).length;
  const rows = all.filter(item => (!category || item.type === category) && (view === 'all' || (view === 'unread' ? !item.read : item.attention))
    && `${item.title} ${item.detail} ${item.patient} ${item.uhid}`.toLowerCase().includes(search.trim().toLowerCase()));
  const selected = all.find(item => item.id === params.get('update'));
  const mark = (items: DoctorUpdate[], read: boolean) => {
    if (items.length) action.mutate({ type: 'updates.read', patient_id: items[0].patient_id, actor: activeDoctor.data.name, update_ids: items.slice(0, 500).map(item => item.id), read });
  };
  const open = (item: DoctorUpdate) => { change({ update: item.id }); if (!item.read) mark([item], true); };
  // Report update ids are built as `report:${report.id}` in doctorUpdates.ts — jump straight to that report in the patient view instead of a plain patient link, so opening a lab/imaging update takes one click instead of several.
  const patientHref = (item: DoctorUpdate) => item.id.startsWith('report:')
    ? `/app/patients/${item.patient_id}?report=${item.id.slice(item.id.indexOf(':') + 1)}`
    : `/app/patients/${item.patient_id}`;
  const pageSize = 15;
  const page = Math.min(Math.max(1, Number(params.get('page')) || 1), Math.max(1, Math.ceil(rows.length / pageSize)));
  return <section className="surface workflow-page updates-page">
    <div className="updates-heading"><div><h3>Updates <Badge count={unread} overflowCount={999} /></h3><p>{activeDoctor.data.name} · {activeDoctor.data.department} and incoming consultations</p></div><span className="history-small">Marking an update seen does not complete clinical review.</span></div>
    {query.error && <QueryState pending={false} error={query.error} />}
    <div className="workflow-toolbar updates-toolbar">
      <Segmented size="small" value={view} onChange={value => change({ view: value, page: null }, true)} options={[{ value: 'all', label: `All (${all.length})` }, { value: 'unread', label: `Unread (${unread})` }, { value: 'attention', label: `Needs attention (${attention})` }]} />
      <Input.Search value={search} aria-label="Search updates" placeholder="Patient, UHID, report or request" allowClear onChange={event => change({ search: event.target.value, page: null }, true)} style={{ width: 260 }} />
      <Select value={category} aria-label="Update category" onChange={value => change({ category: value, page: null }, true)} options={[{ value: '', label: 'All categories' }, ...['lab', 'imaging', 'referral', 'coordination', 'order', 'handover', 'discharge', 'follow_up'].map(value => ({ value, label: value.replaceAll('_', ' ') }))]} style={{ width: 155 }} />
      <Button onClick={() => change({ search: null, category: null, view: null, page: null }, true)}>Clear filters</Button>
    </div>
    <Table size="small" rowKey="id" dataSource={rows} rowClassName={item => item.read ? '' : 'update-row-unread'} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={view === 'unread' ? 'You’re caught up on these updates' : 'No updates match these filters'} /> }} scroll={{ x: 850 }} pagination={{ pageSize, current: page, showSizeChanger: false, showTotal: total => `${total} updates`, onChange: page => change({ page: String(page) }, true) }} columns={[
      { title: '#', width: 48, align: 'center', render: (_, item, index) => <span className="update-number" aria-label={item.read ? 'Seen' : 'Not seen'}>{(page - 1) * pageSize + index + 1}</span> },
      { title: 'Update', render: (_, item) => <button className="update-open" type="button" onClick={() => open(item)}><strong>{item.title}</strong><small>{item.type.replaceAll('_', ' ')}{item.attention ? ' · Needs attention' : ''}</small></button> },
      { title: 'Patient', render: (_, item) => <><Link to={patientHref(item)}>{item.patient}</Link><div className="history-small">{item.uhid}</div></> },
      { title: 'Updated · IST', dataIndex: 'at', render: formatDate, width: 170 },
      { title: 'Seen', width: 96, align: 'center', render: (_, item) => <span className="update-seen">
        <Tooltip title="Mark as seen"><button type="button" className={`update-seen-box seen${item.read ? ' active' : ''}`} aria-label="Mark as seen" aria-pressed={item.read} disabled={action.isPending} onClick={() => { if (!item.read) mark([item], true); }}><CheckOutlined /></button></Tooltip>
        <Tooltip title="Mark as not seen"><button type="button" className={`update-seen-box unseen${item.read ? '' : ' active'}`} aria-label="Mark as not seen" aria-pressed={!item.read} disabled={action.isPending} onClick={() => { if (item.read) mark([item], false); }}><CloseOutlined /></button></Tooltip>
      </span> },
    ]} />
    <ClinicalDrawer title={selected?.title ?? 'Update'} patientId={selected?.patient_id} description="Inbox read status and clinical completion are tracked separately." open={Boolean(selected)} onClose={() => change({ update: null })} extra={<Button onClick={() => change({ update: null })}>← Back to updates</Button>}>
      {selected && <><Tag>{selected.type.replaceAll('_', ' ')}</Tag>{selected.attention && <Tag color="gold">Needs attention</Tag>}<p className="history-small">{formatDate(selected.at)} · {selected.read ? 'Seen' : 'Not seen'}</p>
        <p className="update-detail">{selected.detail}</p><Link to={selected.href}><Button type="primary">Open related workflow</Button></Link><p className="history-small">Use your browser’s Back button to return with inbox filters intact.</p>
      </>}
    </ClinicalDrawer>
  </section>;
}
