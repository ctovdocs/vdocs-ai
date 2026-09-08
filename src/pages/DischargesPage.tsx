import { useState } from 'react';
import { Alert, App, Button, Checkbox, Form, Input, Segmented, Select, Space, Table, Tag, Typography } from 'antd';
import { ClinicalDrawer as Drawer, ClinicalModal as Modal } from '../components/ClinicalOverlay';
import { Link, useSearchParams } from 'react-router-dom';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { dischargeBlockers } from '../services/workflowEngine';
import type { Discharge, WorkflowState } from '../domain/workflow';
import { QueryState } from '../components/QueryState';
import { WorkflowToolbar } from '../components/WorkflowToolbar';
import { dateRangeOptions, withinDateRange } from '../lib/dateRange';
import { owners } from '../data/cohort';
import { VoiceTextArea } from '../components/VoiceField';
import { dischargeViewRecords } from '../services/worklistSelectors';

function DischargeEditor({ record, state }: { record: Discharge; state: WorkflowState }) {
  const { modal } = App.useApp();
  const action = useWorkflowAction();
  const [form] = Form.useForm();
  const history = state.histories.find(item => item.context.patient_id === record.patient_id)!;
  const blockers = dischargeBlockers(state, record);
  const closed = ['discharged', 'cancelled'].includes(record.status);
  const save = async (status?: Discharge['status']) => {
    try {
      const fields = await form.validateFields();
      await action.mutateAsync({ type: 'discharge.update', patient_id: record.patient_id, entity_id: record.id, expected_version: record.version, fields, status });
    } catch (error) { if (status === 'discharged') throw error; }
  };
  return <>
    <Space wrap><Tag>{record.status.replaceAll('_', ' ')}</Tag><Link to={`/app/patients/${record.patient_id}`}>Open patient</Link></Space>
    {!closed && blockers.length > 0 && <Alert className="section-gap" type="warning" title={`${blockers.length} items need attention before discharge`} description={<><ul className="compact-list">{blockers.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul><Space><Link to="/app/results">Review results</Link><Link to="/app/requests">Requests</Link></Space></>} />}
    <Form form={form} layout="vertical" size="small" initialValues={record} disabled={closed} className="section-gap">
      <Space align="start"><Form.Item name="owner" label="Owner" rules={[{ required: true }]}><Select style={{ width: 210 }} options={Object.values(owners).map(value => ({ value }))} /></Form.Item>
        <Form.Item name="priority" label="Priority"><Select style={{ width: 110 }} options={['routine', 'urgent'].map(value => ({ value }))} /></Form.Item>
        <Form.Item name="target_date" label="Target date" rules={[{ required: true }]}><Input type="date" /></Form.Item></Space>
      <Form.Item name="summary" label="Discharge summary / working draft"><VoiceTextArea rows={5} placeholder="Clinician-authored summary" /></Form.Item>
      <Form.Item name="clinical_clearance" valuePropName="checked"><Checkbox>I have reviewed the patient and documented clinical suitability for discharge.</Checkbox></Form.Item>
      <Form.Item name="clearance_note" label="Clinical clearance rationale"><VoiceTextArea rows={2} /></Form.Item>
      <Form.Item name="medications_checked" valuePropName="checked"><Checkbox>Medication reconciliation reviewed</Checkbox></Form.Item>
      <Form.Item name="follow_up_checked" valuePropName="checked"><Checkbox>Follow-up and return instructions reviewed</Checkbox></Form.Item>
      <Form.Item name="documents_checked" valuePropName="checked"><Checkbox>Discharge documents checked</Checkbox></Form.Item>
    </Form>
    {!closed && <>
      <Typography.Title level={5}>Outstanding work</Typography.Title>
      {history.work_items.filter(item => item.encounter_id === record.encounter_id && item.status === 'pending' && item.kind !== 'discharge').map(item => <div className="workflow-work-row" key={item.id}><span>{item.title}</span><Button size="small" loading={action.isPending} onClick={() => action.mutate({ type: 'work.complete', patient_id: record.patient_id, entity_id: item.id })}>Mark done</Button></div>)}
      <Space wrap className="section-gap">
        <Button loading={action.isPending} onClick={() => save('in_progress')}>Save working draft</Button>
        <Button loading={action.isPending} onClick={() => save('ready')}>Mark ready</Button>
        {record.status === 'ready' && <Button type="primary" loading={action.isPending} onClick={() => modal.confirm({ className: 'clinical-modal', centered: true, title: `Complete discharge for ${state.patients.find(patient => patient.id === record.patient_id)?.name}?`, content: 'This closes the current IPD encounter and moves the record to discharged history. Confirm that the patient’s clearance and documents have been reviewed.', okText: 'Complete discharge', cancelText: 'Keep in process', onOk: () => save('discharged') })}>Complete discharge</Button>}
        <Button danger loading={action.isPending} onClick={() => save('cancelled')}>Cancel planning</Button>
      </Space>
    </>}
  </>;
}

export function DischargesPage() {
  const query = useWorkflow();
  const action = useWorkflowAction();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [range, setRange] = useState('all');
  const [view, setView] = useState('Active');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [adding, setAdding] = useState(false);
  const [patientId, setPatientId] = useState<string>();
  if (!query.data) return <QueryState pending={query.isPending} error={query.error} />;
  const state = query.data;
  const selected = state.discharges.find(record => record.id === params.get('id'));
  const rows = dischargeViewRecords(state, view).map(record => ({ ...record, patient: state.patients.find(patient => patient.id === record.patient_id)!, blockers: dischargeBlockers(state, record) }))
    .filter(record => !department || record.patient.department === department)
    .filter(record => !owner || record.owner === owner).filter(record => !status || record.status === status)
    .filter(record => !priority || record.priority === priority)
    .filter(record => `${record.patient.name} ${record.patient.uhid} ${record.summary}`.toLowerCase().includes(search.toLowerCase()))
    .filter(record => withinDateRange(record.discharged_at ?? record.target_date, range))
    .sort((first, second) => (second.discharged_at ?? second.created_at).localeCompare(first.discharged_at ?? first.created_at));
  const eligible = state.patients.filter(patient => state.histories.some(history => history.context.patient_id === patient.id && history.encounters.some(encounter => encounter.kind === 'IPD' && encounter.status === 'active' && !state.discharges.some(record => record.encounter_id === encounter.id && record.status !== 'cancelled'))));
  return <section className="surface workflow-page">
    <WorkflowToolbar title="Discharges" search={search} onSearch={value => { setSearch(value); setPage(1); }} department={department} onDepartment={value => { setDepartment(value); setPage(1); }}>
      <Segmented size="small" value={view} onChange={value => { setView(value); setStatus(''); setPage(1); }} options={['Active', 'Discharged', 'Cancelled']} />
      <Select size="small" aria-label="Discharge dates" value={range} onChange={value => { setRange(value); setPage(1); }} options={dateRangeOptions} style={{ width: 125 }} />
      <Select size="small" aria-label="Discharge owner" value={owner} onChange={value => { setOwner(value); setPage(1); }} options={[{ value: '', label: 'All owners' }, ...Object.values(owners).map(value => ({ value }))]} style={{ width: 175 }} />
      <Select size="small" aria-label="Discharge status" value={status} onChange={value => { setStatus(value); setPage(1); }} options={[{ value: '', label: 'All statuses' }, ...(view === 'Active' ? ['planned', 'in_progress', 'ready'] : view === 'Discharged' ? ['discharged'] : ['cancelled']).map(value => ({ value, label: value === 'ready' ? 'Ready · in process' : value.replaceAll('_', ' ') }))]} style={{ width: 155 }} />
      <Select size="small" aria-label="Discharge priority" value={priority} onChange={value => { setPriority(value); setPage(1); }} options={[{ value: '', label: 'Any priority' }, { value: 'routine' }, { value: 'urgent' }]} style={{ width: 110 }} />
      <Button size="small" type="primary" onClick={() => { setPatientId(undefined); setAdding(true); }}>Send patient to discharge</Button>
    </WorkflowToolbar>
    <Table size="small" rowKey="id" dataSource={rows} pagination={{
      current: Math.min(page, Math.max(1, Math.ceil(rows.length / pageSize))), pageSize, showSizeChanger: true, pageSizeOptions: [10, 20, 50],
      showTotal: total => `${total} discharge records`,
      onChange: (nextPage, nextSize) => { setPage(nextSize === pageSize ? nextPage : 1); setPageSize(nextSize); },
    }} onChange={(_pagination, _filters, _sorter, extra) => { if (extra.action === 'sort') setPage(1); }} scroll={{ x: 900 }} columns={[
      { title: 'Patient', render: (_, row) => <Link to={`/app/patients/${row.patient_id}`}>{row.patient.name}<div className="muted">{row.patient.uhid}</div></Link> },
      { title: 'Owner', dataIndex: 'owner' }, { title: 'Department', render: (_, row) => row.patient.department },
      { title: 'Target', dataIndex: 'target_date', sorter: (first, second) => first.target_date.localeCompare(second.target_date) },
      { title: 'Priority', dataIndex: 'priority' }, { title: 'Status', dataIndex: 'status', render: value => <Tag>{value.replaceAll('_', ' ')}</Tag> },
      { title: 'Pending', render: (_, row) => ['discharged', 'cancelled'].includes(row.status) ? '—' : row.blockers.length },
      { title: 'Action', render: (_, row) => <Button size="small" onClick={() => setParams({ id: row.id })}>Open</Button> },
    ]} />
    <Drawer patientId={selected?.patient_id} description="Review outstanding work, clinical clearance and discharge documentation." open={Boolean(selected)} title="Discharge process" size="large" onClose={() => setParams({})}>
      {selected && <DischargeEditor key={`${selected.id}-${selected.version}`} record={selected} state={state} />}
    </Drawer>
    <Modal title="Start discharge process" patientId={patientId} description="Start a working list entry—not a clinical clearance or completed discharge." okText="Send to discharge" open={adding} onCancel={() => setAdding(false)} confirmLoading={action.isPending} onOk={async () => {
      if (!patientId) return;
      try { const id = await action.mutateAsync({ type: 'discharge.create', patient_id: patientId }); setAdding(false); setParams({ id }); } catch { return; }
    }} okButtonProps={{ disabled: !patientId }}>
      <Select showSearch optionFilterProp="label" aria-label="Patient for discharge planning" style={{ width: '100%' }} value={patientId} onChange={setPatientId} options={eligible.map(patient => ({ value: patient.id, label: `${patient.name} · ${patient.uhid}` }))} />
      <p className="muted">Moves this patient from the normal patient list to discharge processing. The patient remains admitted and clinical alerts stay visible until discharge is completed. Readiness alone never adds a patient here.</p>
    </Modal>
  </section>;
}
