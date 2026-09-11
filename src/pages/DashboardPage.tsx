import { useState } from 'react';
import { Segmented, Typography } from 'antd';
import { owners } from '../data/cohort';
import { doctorSchedules, TODAY } from '../data/schedule';
import { PatientDirectoryTable } from '../components/PatientDirectoryTable';
import { Link } from 'react-router-dom';
import { useWorkflow } from '../services/useWorkflow';
import { normalWorklistPatients } from '../services/worklistSelectors';

const departments = Object.keys(owners);

export function DashboardPage() {
  const [department, setDepartment] = useState(departments[0]);
  const doctor = owners[department];
  const workflow = useWorkflow();

  const clinicalPatients = (workflow.data?.patients ?? []).filter(patient => patient.department === department);
  const patients = (workflow.data ? normalWorklistPatients(workflow.data) : []).filter(patient => patient.department === department);
  const critical = patients.filter(patient => patient.acuity === 'critical').length;
  const ipd = patients.filter(patient => patient.encounter.startsWith('IPD')).length;
  const opd = patients.filter(patient => patient.encounter.startsWith('OPD')).length;
  const todayBlocks = doctorSchedules.find(schedule => schedule.doctor === doctor)?.blocks.filter(block => block.days.includes(TODAY)).length ?? 0;
  const patientIds = new Set(clinicalPatients.map(patient => patient.id));
  const results = workflow.data?.reports.filter(report => patientIds.has(report.patient_id) && !workflow.data?.reviews[report.id]).length ?? 0;
  const openRequests = workflow.data?.histories.flatMap(history => history.requests).filter(request => patientIds.has(request.patient_id) && !['completed', 'cancelled'].includes(request.status)) ?? [];
  const requests = openRequests.filter(request => request.kind === 'request').length;
  const referrals = openRequests.filter(request => request.kind === 'referral').length;
  const discharges = workflow.data?.discharges.filter(record => patientIds.has(record.patient_id) && !['discharged', 'cancelled'].includes(record.status)).length ?? 0;

  return <>
    <div className="page-heading"><div>
      <Typography.Title level={4} className="page-title-tight">Dashboard</Typography.Title>
    </div>
    <Segmented size="small" value={department} onChange={value => setDepartment(value as string)} options={departments.map(dept => ({ value: dept, label: owners[dept] }))} />
    </div>

    <div className="stat-row">
      <div className="stat-tile"><span className="stat-value">{patients.length}</span><span className="stat-label">Patients · {department}</span></div>
      <div className="stat-tile"><span className="stat-value">{critical}</span><span className="stat-label">Critical</span></div>
      <div className="stat-tile"><span className="stat-value">{ipd}</span><span className="stat-label">IPD</span></div>
      <div className="stat-tile"><span className="stat-value">{opd}</span><span className="stat-label">OPD</span></div>
      <div className="stat-tile"><span className="stat-value">{todayBlocks}</span><span className="stat-label">Scheduled today</span></div>
    </div>

    <div className="workflow-toolbar" aria-label="Work requiring attention">
      <strong>Attention</strong><Link to="/app/results">{results} results to review</Link>
      <Link to="/app/requests">{requests} pending requests</Link>
      <Link to="/app/referrals">{referrals} pending referrals</Link>
      <Link to="/app/discharges">{discharges} active discharges</Link>
      <Link to="/app/handovers">Shift handovers</Link>
    </div>
    <PatientDirectoryTable initialDepartment={department} key={department} />
  </>;
}
