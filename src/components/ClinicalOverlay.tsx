import { Drawer, Modal, Tag, type DrawerProps, type ModalProps } from 'antd';
import { useWorkflow } from '../services/useWorkflow';

export function OverlayPatientContext({ patientId }: { patientId?: string }) {
  const workflow = useWorkflow();
  const patient = workflow.data?.patients.find(patient => patient.id === patientId);
  if (!patient) return null;
  return <div className="overlay-patient-context">
    <div className="overlay-patient-identity"><strong>{patient.name}</strong><span>{patient.age}{patient.sex} · {patient.uhid}</span></div>
    <div className="overlay-patient-meta">{patient.department} · {patient.encounter}</div>
    <div className="overlay-patient-allergies"><span>Allergies</span>{patient.allergies.length
      ? patient.allergies.map(allergy => <Tag key={allergy} color="volcano">{allergy}</Tag>) : <span>Not documented</span>}</div>
  </div>;
}

type ContextProps = { patientId?: string; description?: string };

export function ClinicalModal({ title, description, patientId, children, confirmLoading, ...props }: ModalProps & ContextProps) {
  return <Modal width={560} centered maskClosable={false} cancelText="Cancel" {...props}
    className={`clinical-modal ${props.className ?? ''}`} confirmLoading={confirmLoading}
    closable={!confirmLoading} keyboard={!confirmLoading} cancelButtonProps={{ ...props.cancelButtonProps, disabled: confirmLoading }}
    title={<div className="overlay-heading"><span>{title}</span>{description && <p>{description}</p>}</div>}>
    <OverlayPatientContext patientId={patientId} />
    {children}
  </Modal>;
}

export function ClinicalDrawer({ title, description, patientId, children, ...props }: DrawerProps & ContextProps) {
  return <Drawer {...props} rootClassName={`clinical-drawer ${props.rootClassName ?? ''}`}
    title={<div className="overlay-heading"><span>{title}</span>{description && <p>{description}</p>}</div>}>
    <OverlayPatientContext patientId={patientId} />
    {children}
  </Drawer>;
}
