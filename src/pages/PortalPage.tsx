import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, Empty, Input, Space, Table, Typography } from 'antd';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { patientService, labService, imagingService } from '../services/clinical';
import { QueryState } from '../components/QueryState';
import { ReportList } from '../components/ReportList';
import type { Patient } from '../domain/models';
import { PatientHistoryPanel } from '../components/PatientHistoryPanel';

const portalNames: Record<string, string> = {
  his: 'Hospital information system', lab: 'Laboratory portal', radiology: 'Advanced imaging reports',
  pharmacy: 'Pharmacy portal', referrals: 'Department requests',
};

export function PortalPage() {
  const { portal = 'his' } = useParams();
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const [input, setInput] = useState(search);
  const [selected, setSelected] = useState<Patient | null>(null);
  const patients = useQuery({ queryKey: ['portal-patients', search], queryFn: () => patientService.search(search), enabled: Boolean(search) || portal === 'his' });
  const reports = useQuery({ queryKey: ['portal-reports', portal, selected?.id], queryFn: () => portal === 'lab' ? labService.listReports(selected!.id) : imagingService.listReports(selected!.id), enabled: Boolean(selected) && ['lab', 'radiology'].includes(portal) });
  if (!portalNames[portal]) return <Empty description="Unknown simulator"><a href="/demo">Back to demo launcher</a></Empty>;
  return <>
    <div className="page-heading"><div><div className="eyebrow">FORTIS WORKFLOW DEMO</div><Typography.Title level={2}>{portalNames[portal]}</Typography.Title><Typography.Paragraph type="secondary">{portal === 'referrals' ? 'Proposed VDoc department workflow simulator.' : 'Separate source-system interface · shared synthetic patient records.'}</Typography.Paragraph></div></div>
    {['pharmacy', 'referrals'].includes(portal) ? <section className="surface tab-padding"><Empty description={portal === 'pharmacy' ? 'Prescription readback will be connected in the next build.' : 'Request assignment, status and response will be connected in the next build.'} /></section> : <>
      <section className="surface tab-padding">
        <Space className="section-toolbar-inline"><Typography.Text strong>Patient lookup</Typography.Text>{['lab', 'radiology'].includes(portal) && <Link to={`/demo/${portal}/orders`}><Button type="primary">Order inbox / publish results</Button></Link>}</Space>
        <Space.Compact className="portal-search"><Input aria-label="Source portal patient search" placeholder="Enter UHID or patient name" value={input} onChange={event => setInput(event.target.value)} onPressEnter={() => { setParams({ search: input.trim() }); setSelected(null); }} /><Button type="primary" onClick={() => { setParams({ search: input.trim() }); setSelected(null); }}>Search</Button></Space.Compact>
        {!search && <p className="muted">Try F-DEMO-0001. Each source portal starts with its own patient lookup.</p>}
        {(search || portal === 'his') && <><QueryState pending={patients.isPending} error={patients.error} />{patients.data && <Table className="section-gap" size="small" rowKey="id" pagination={{ pageSize: 10 }} dataSource={patients.data} columns={[
          { title: 'UHID', dataIndex: 'uhid' }, { title: 'Patient', dataIndex: 'name' },
          { title: 'Department', dataIndex: 'department' }, { title: 'Acuity', dataIndex: 'acuity' }, { title: 'Visits', dataIndex: 'visit_count' },
          { title: 'Action', render: (_, patient) => <Button onClick={() => setSelected(patient)}>Open record</Button> },
        ]} />}</>}
      </section>
      {selected && <section className="surface section-gap tab-padding"><Typography.Title level={4}>{selected.name}</Typography.Title><Typography.Paragraph copyable>{selected.uhid}</Typography.Paragraph>
        {portal === 'his' ? <><p>{selected.encounter} · {selected.department}</p><p>{selected.conditions.join(' · ')}</p><Space wrap><a href="/demo/lab" target="_blank" rel="noreferrer">Open separate Lab portal ↗</a><a href="/demo/radiology" target="_blank" rel="noreferrer">Open separate imaging portal ↗</a></Space></> : <><QueryState pending={reports.isPending} error={reports.error} />{reports.data && <ReportList reports={reports.data} />}</>}
      </section>}
      {selected && portal === 'his' && <section className="surface section-gap"><PatientHistoryPanel patientId={selected.id} sourceOnly /></section>}
    </>}
    <Alert className="section-gap" type="info" showIcon title="Workflow simulation only" description="These screens are not copies of Fortis software and do not demonstrate a live hospital integration." />
  </>;
}
