import { Space } from 'antd';
import type { Patient } from '../domain/models';
import { CreateClinicalAction } from './CreateClinicalAction';

export function NewOrderMenu({ patient }: { patient: Patient }) {
  return <Space size={4} wrap>
    <CreateClinicalAction kind="lab" patientId={patient.id} label="+ Lab" />
    <CreateClinicalAction kind="imaging" patientId={patient.id} label="+ Imaging" />
    <CreateClinicalAction kind="request" patientId={patient.id} label="+ Request" />
    <CreateClinicalAction kind="referral" patientId={patient.id} label="+ Referral" />
  </Space>;
}
