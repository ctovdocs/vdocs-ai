import { Typography } from 'antd';
import { PatientDirectoryTable } from '../components/PatientDirectoryTable';

export function PatientsPage() {
  return <>
    <Typography.Title level={4} className="page-title-tight">Patients</Typography.Title>
    <PatientDirectoryTable />
  </>;
}
