import { useState } from 'react';
import { Input, Segmented, Select, Table, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useWorkflow } from '../services/useWorkflow';
import { normalWorklistPatients } from '../services/worklistSelectors';
import { owners } from '../data/cohort';
import { QueryState } from './QueryState';

const ALL_DOCTORS = 'All doctors';
const doctorOptions = Object.entries(owners).map(([department, doctor]) => ({ value: department, label: `${doctor} · ${department}` }));

export function PatientDirectoryTable({ initialDepartment, initialEncounterType = 'All' }: { initialDepartment?: string; initialEncounterType?: 'All' | 'IPD' | 'OPD' }) {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState(initialDepartment ?? ALL_DOCTORS);
  const [encounterType, setEncounterType] = useState<'All' | 'IPD' | 'OPD'>(initialEncounterType);
  const [acuity, setAcuity] = useState<'All' | 'Critical' | 'Stable'>('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const query = useWorkflow();

  const filtered = (query.data ? normalWorklistPatients(query.data) : [])
    .filter(patient => `${patient.name} ${patient.uhid}`.toLowerCase().includes(search.trim().toLowerCase()))
    .filter(patient => department === ALL_DOCTORS || patient.department === department)
    .filter(patient => encounterType === 'All' || patient.encounter.startsWith(encounterType))
    .filter(patient => acuity === 'All' || (acuity === 'Critical') === (patient.acuity === 'critical'));

  return <section className="surface">
    <div className="directory-filters">
      <Input.Search aria-label="Search patients by name or UHID" placeholder="Search name or UHID" allowClear value={search} onChange={event => { setSearch(event.target.value); setPage(1); }} className="search-input" />
      <Select value={department} onChange={value => { setDepartment(value); setPage(1); }} className="directory-doctor-select" options={[{ value: ALL_DOCTORS, label: ALL_DOCTORS }, ...doctorOptions]} />
      <Segmented size="small" value={encounterType} onChange={value => { setEncounterType(value as typeof encounterType); setPage(1); }} options={['All', 'IPD', 'OPD']} />
      <Segmented size="small" value={acuity} onChange={value => { setAcuity(value as typeof acuity); setPage(1); }} options={['All', 'Critical', 'Stable']} />
    </div>
    <QueryState pending={query.isPending} error={query.error} />
    {query.data && <Table rowKey="id" size="small" className="directory-table" dataSource={filtered} pagination={{
      current: Math.min(page, Math.max(1, Math.ceil(filtered.length / pageSize))), pageSize,
      size: 'small', showSizeChanger: true, pageSizeOptions: [10, 20, 50],
      showTotal: (total, range) => total ? `${range[0]}–${range[1]} of ${total} patients` : '0 patients',
      onChange: (nextPage, nextSize) => { setPage(nextSize === pageSize ? nextPage : 1); setPageSize(nextSize); },
    }} onChange={(_pagination, _filters, _sorter, extra) => { if (extra.action === 'sort') setPage(1); }} scroll={{ x: 700 }} columns={[
      { title: 'Patient', sorter: (first, second) => first.name.localeCompare(second.name), render: (_, patient) => <><Link className="patient-name" to={`/app/patients/${patient.id}`}>{patient.name}</Link><div className="muted">{patient.age}{patient.sex}</div></> },
      { title: 'UHID', dataIndex: 'uhid', render: uhid => <Typography.Text copyable>{uhid}</Typography.Text> },
      { title: 'Encounter', dataIndex: 'encounter' },
      { title: 'Department', dataIndex: 'department' },
      { title: 'Acuity', dataIndex: 'acuity', render: acuityValue => <Tag color={acuityValue === 'critical' ? 'red' : 'default'}>{acuityValue === 'critical' ? 'Critical' : 'Stable'}</Tag> },
      { title: 'Documented conditions', dataIndex: 'conditions', render: (conditions: string[]) => conditions.join(' · ') },
    ]} />}
  </section>;
}
