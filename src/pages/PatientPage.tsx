import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Empty, Segmented, Tag, Typography } from 'antd';
import { ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { patientService, labService, imagingService } from '../services/clinical';
import type { Report } from '../domain/models';
import { ReportList } from '../components/ReportList';
import { LabTrends } from '../components/LabTrends';
import { QueryState } from '../components/QueryState';
import { PatientHistoryPanel } from '../components/PatientHistoryPanel';
import { CareCoordinationCard } from '../components/CareCoordinationCard';
import { ClinicalSummaryCard } from '../components/ClinicalSummaryCard';
import { AiBriefCard } from '../components/AiBriefCard';
import { AiAssistantDock } from '../components/AiAssistantDock';
import { EvidenceDrawer, type EvidenceRef } from '../components/EvidenceDrawer';
import { NewOrderMenu } from '../components/NewOrderMenu';
import { WardRoundsCard, type WardRound } from '../components/WardRoundsCard';
import { GENERAL_LENS, specialtyFocus, type VitalKey } from '../data/specialtyFocus';
import type { Department } from '../data/scenarios';
import { formatDate } from '../lib/format';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { PatientBackButton } from '../components/PatientBackButton';

const VITAL_STATS: { key: VitalKey; label: string }[] = [
  { key: 'systolic', label: 'BP' }, { key: 'pulse', label: 'Pulse' }, { key: 'respiratory_rate', label: 'RR' },
  { key: 'spo2', label: 'SpO₂' }, { key: 'temperature_c', label: 'Temp' },
];

const SHOW_SPECIALTY_LENS = false;

export function PatientPage() {
  const { patientId = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const focusReportId = params.get('report') ?? undefined;
  const [lens, setLens] = useState<string>(GENERAL_LENS);
  const [reportFilter, setReportFilter] = useState<'All' | 'Labs' | 'Imaging'>('All');
  const [evidence, setEvidence] = useState<EvidenceRef | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const workflow = useWorkflow();
  const action = useWorkflowAction();

  const query = useQuery({ queryKey: ['workspace', patientId], queryFn: async () => {
    const [patient, labs, imaging] = await Promise.all([patientService.get(patientId), labService.listReports(patientId), imagingService.listReports(patientId)]);
    return { patient, labs, imaging };
  } });
  const historyQuery = useQuery({ queryKey: ['history', patientId], queryFn: () => patientService.history(patientId) });

  if (!query.data) return <><PatientBackButton /><QueryState pending={query.isPending} error={query.error} /></>;
  const { patient, labs, imaging } = query.data;
  if (!patient) return <Empty description="Patient not found or access unavailable"><PatientBackButton /></Empty>;
  const history = historyQuery.data;
  const requests = history?.requests ?? [];
  const activeEncounter = history?.encounters.find(encounter => encounter.status === 'active');
  const pendingOrders = history?.orders.filter(order => ['pending', 'processing'].includes(order.status)) ?? [];
  const discharge = workflow.data?.discharges.find(record => record.patient_id === patientId && record.encounter_id === activeEncounter?.id && record.status !== 'cancelled');
  const dischargeReady = Boolean(discharge);
  const isIPD = activeEncounter?.kind === 'IPD';
  const wardRounds: WardRound[] = [
    ...(history?.notes.filter(note => note.title.startsWith('Ward round')).map(note => ({ id: note.id, recordedAt: note.recorded_at, title: note.title, body: note.body })) ?? []),
  ];

  const relevantDepartments = new Set<string>([patient.department, ...requests.map(request => request.to_department)].filter(department => department in specialtyFocus));
  const lensOptions = [GENERAL_LENS, ...relevantDepartments];
  const activeFocus = lens !== GENERAL_LENS && lens in specialtyFocus ? specialtyFocus[lens as Department] : null;

  const allReports: Report[] = [...labs, ...imaging];
  const filteredReports = allReports.filter(report => reportFilter === 'All' || (reportFilter === 'Labs' ? report.kind === 'lab' : report.kind === 'imaging'));
  const sortedReports = activeFocus
    ? [...filteredReports].sort((first, second) => Number(isRelevant(second, activeFocus.relevantLabs)) - Number(isRelevant(first, activeFocus.relevantLabs)))
    : filteredReports;

  const latestVitals = history?.vitals.at(-1);

  const careTeam = new Map<string, string>();
  if (history) {
    const homeOwner = history.encounters.find(encounter => encounter.status === 'active')?.owner ?? history.encounters[0]?.owner;
    if (homeOwner) careTeam.set(homeOwner, patient.department);
    for (const request of requests) careTeam.set(request.owner, request.to_department);
  }
  const immunizations = [...(history?.immunizations ?? [])].sort((first, second) => second.administered_at.localeCompare(first.administered_at));
  const abnormalCount = allReports.flatMap(report => report.observations).filter(observation => observation.flag !== 'normal').length;
  const activeCoordinationCount = requests.filter(request => !['completed', 'cancelled'].includes(request.status)).length;

  return <>
    <section className="patient-header surface">
      <div className="patient-header-row">
        <PatientBackButton />
        <div className="patient-identity">
          <Typography.Title level={4}>{patient.name}</Typography.Title>
          <span className="patient-meta">{patient.age}{patient.sex} · <Typography.Text copyable>{patient.uhid}</Typography.Text></span>
        </div>
        <div className="patient-header-tags">
          <Tag color="blue">{patient.encounter}</Tag>
          {history && <Tag color={history.context.acuity === 'critical' ? 'red' : 'default'}>{history.context.acuity === 'critical' ? 'Critical' : 'Stable'}</Tag>}
          {discharge ? <Link to={`/app/discharges?id=${discharge.id}`}><Tag color="gold">Discharge · {discharge.status.replaceAll('_', ' ')}</Tag></Link>
            : isIPD && <Button size="small" loading={action.isPending} onClick={() => action.mutate({ type: 'discharge.create', patient_id: patientId })}>Send to discharge process</Button>}
          {isIPD && <Link to={`/app/handovers?patient=${patientId}`}><Button size="small">Shift handover</Button></Link>}
        </div>
      </div>
      <div className="patient-tags-row">
        {patient.conditions.map(condition => <Tag key={condition}>{condition}</Tag>)}
        <Tag color="default">{patient.department}</Tag>
        {patient.allergies.length
          ? patient.allergies.map(allergy => <Tag color="red" icon={<WarningOutlined />} key={allergy}>{allergy}</Tag>)
          : <Tag>No documented allergy</Tag>}
        <div className="lens-row">
          {/* Specialty lenses hidden for now; only General is offered. */}
          <span className="lens-label">View as</span>
          <Segmented size="small" value={lens} onChange={value => setLens(value as string)} options={SHOW_SPECIALTY_LENS ? lensOptions : [GENERAL_LENS]} />
          {activeEncounter && <NewOrderMenu patient={patient} />}
        </div>
      </div>
    </section>

    <AiBriefCard patient={patient} history={history} reports={allReports} onEvidence={setEvidence} />

    <ClinicalSummaryCard patient={patient} history={history} abnormalCount={abnormalCount} activeCoordinationCount={activeCoordinationCount}
      pendingOrdersCount={pendingOrders.length} dischargeReady={dischargeReady} />

    <LabTrends patientId={patientId} onOpenReport={id => { setReportFilter('Labs'); setParams(current => { const next = new URLSearchParams(current); next.set('report', id); return next; }, { replace: true }); }} />
    <div className="patient-dashboard">
      <div className="patient-dashboard-column">
      <div className="patient-dashboard-main surface">
        <div className="section-toolbar">
          <Typography.Title level={5}>Reports</Typography.Title>
          <Segmented size="small" value={reportFilter} onChange={value => setReportFilter(value as typeof reportFilter)} options={['All', 'Labs', 'Imaging']} />
        </div>
        {pendingOrders.length > 0 && <ul className="pending-orders">
          {pendingOrders.map(order => <li key={order.id}><ClockCircleOutlined /><Link to={`/app/${order.kind === 'lab' ? 'lab-orders' : 'imaging-orders'}?id=${order.id}`}>{order.title}</Link><Tag color={order.kind === 'lab' ? 'default' : 'blue'}>{order.kind}</Tag><span className="pending-order-status">{order.status}</span></li>)}
        </ul>}
        <ReportList reports={sortedReports} focusReportId={focusReportId} onFocusHandled={() => setParams(current => { const next = new URLSearchParams(current); next.delete('report'); return next; }, { replace: true })} />
      </div>
      {isIPD && <WardRoundsCard patientId={patientId} rounds={wardRounds} onAddRound={async ({ findings, plan }) => { await action.mutateAsync({ type: 'round.create', patient_id: patientId, findings, plan }); }} />}
      </div>

      <aside className="patient-dashboard-side">
        <div className="side-card">
          <h5>Medications</h5>
          {history?.medications.length ? <ul className="med-list">
            {history.medications.map(medicine => <li key={medicine.id}>
              <span>{medicine.name} <Typography.Text type="secondary">{medicine.dose} · {medicine.frequency}</Typography.Text></span>
              <Tag color={medicine.status === 'held' ? 'orange' : medicine.status === 'documented_home' ? 'blue' : 'default'}>{medicine.status.replaceAll('_', ' ')}</Tag>
            </li>)}
          </ul> : <Typography.Text type="secondary">Not documented</Typography.Text>}
        </div>

        {latestVitals && <div className="side-card">
          <h5>Latest vitals · {formatDate(latestVitals.recorded_at)}</h5>
          <div className="vitals-row">
            {VITAL_STATS.map(stat => <div key={stat.key} className={`vital-stat ${activeFocus?.relevantVitals.includes(stat.key) || (stat.key === 'systolic' && activeFocus?.relevantVitals.includes('diastolic')) ? 'highlight' : ''}`}>
              <span className="vital-label">{stat.label}</span>
              <span className="vital-value">{stat.key === 'systolic' ? `${latestVitals.systolic}/${latestVitals.diastolic}` : latestVitals[stat.key]}</span>
            </div>)}
          </div>
        </div>}

        {careTeam.size > 0 && <div className="side-card">
          <h5>Care team</h5>
          <ul className="care-team-list">
            {[...careTeam.entries()].map(([name, department]) => <li key={name}><span>{name}</span><Typography.Text type="secondary">{department}</Typography.Text></li>)}
          </ul>
        </div>}

        {immunizations.length > 0 && <div className="side-card">
          <h5>Immunizations</h5>
          <ul className="med-list">
            {immunizations.map(immunization => <li key={immunization.id}><span>{immunization.name}</span><Typography.Text type="secondary">{formatDate(immunization.administered_at)}</Typography.Text></li>)}
          </ul>
        </div>}

        <CareCoordinationCard patientId={patient.id} requests={requests} workItems={history?.work_items ?? []} reports={allReports} />
      </aside>
    </div>

    <section className="surface section-gap">
      <PatientHistoryPanel patientId={patientId} />
    </section>
    <p className="foundation-note">Synthetic clinical records · Saved workflows sync across the demo.</p>

    {history && <EvidenceDrawer evidence={evidence} history={history} reports={allReports} onClose={() => setEvidence(null)} />}
    {history && <AiAssistantDock open={chatOpen} onOpenChange={setChatOpen} patient={patient} history={history} reports={allReports} onEvidence={setEvidence} />}
  </>;
}

function isRelevant(report: Report, relevantLabs: string[]) {
  return report.observations.some(observation => relevantLabs.includes(observation.name));
}
