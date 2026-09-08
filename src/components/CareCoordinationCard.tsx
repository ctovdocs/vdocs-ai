import { useState } from 'react';
import { Button, Drawer, Tag } from 'antd';
import type { PatientHistory } from '../domain/longitudinal';
import type { Report } from '../domain/models';
import { RequestDetail } from './RequestDetail';
import { useWorkflowAction } from '../services/useWorkflow';
import { Link } from 'react-router-dom';

export function CareCoordinationCard({ requests, workItems, reports }: {
  requests: PatientHistory['requests']; workItems: PatientHistory['work_items']; reports: Report[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const action = useWorkflowAction();
  const open = requests.find(request => request.id === openId);
  return <div className="side-card coordination-card">
    <h5>Care coordination</h5>
    <div className="coordination-list">{requests.map(request => <div key={request.id} className="coordination-entry">
      <div className="coordination-head"><span className="coordination-route">{request.to_department}</span><Tag color={request.priority === 'urgent' ? 'red' : 'default'}>{request.status.replaceAll('_', ' ')}</Tag></div>
      <p className="coordination-reason">{request.reason}</p>
      <div className="coordination-actions"><Button size="small" onClick={() => setOpenId(request.id)}>{request.status === 'completed' && !request.reviewed_at ? 'Review response' : 'Open request'}</Button></div>
    </div>)}</div>
    <ul className="work-items">{workItems.filter(item => item.status === 'pending').map(item => <li key={item.id}><span>{item.title}</span>{item.kind === 'discharge' ? <Link to="/app/discharges">Discharge list</Link> : <Button size="small" loading={action.isPending} onClick={() => action.mutate({ type: 'work.complete', patient_id: item.patient_id, entity_id: item.id })}>Done</Button>}</li>)}</ul>
    <Drawer title="Care coordination" open={Boolean(open)} onClose={() => setOpenId(null)} size="large">
      {open && <RequestDetail key={`${open.id}-${open.version}`} request={open} reports={reports} />}
    </Drawer>
  </div>;
}
