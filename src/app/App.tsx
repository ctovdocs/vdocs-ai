import { Button, Layout, Typography } from 'antd';
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { PatientsPage } from '../pages/PatientsPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PatientPage } from '../pages/PatientPage';
import { SchedulePage } from '../pages/SchedulePage';
import { AuthGate } from './AuthGate';
import { Sidebar } from '../components/Sidebar';
import { DischargesPage } from '../pages/DischargesPage';
import { CoordinationPage } from '../pages/CoordinationPage';
import { InvestigationsPage } from '../pages/InvestigationsPage';
import { ShiftHandoversPage as HandoversPage } from '../pages/ShiftHandoversPage';
import { PatientDirectoryTable } from '../components/PatientDirectoryTable';
import { VoiceModeProvider } from '../lib/voiceMode';
import { WorkflowSync } from './WorkflowSync';
import { UpdatesPage } from '../pages/UpdatesPage';
import { ClaimsPage } from '../pages/ClaimsPage';
import { InsurerPortalPage } from '../pages/InsurerPortalPage';
import { DischargeSummaryPage } from '../pages/DischargeSummaryPage';
import { useActiveDoctor } from '../services/activeDoctor';

function Shell() {
  const queryClient = useQueryClient();
  const activeDoctor = useActiveDoctor();
  return <Layout className="app-shell">
    <WorkflowSync />
    <Sidebar />
    <Layout>
      {/* Voice-mode toggle and data-source tag hidden for the demo; VoiceModeToggle still exists and voice mode keeps its stored setting. */}
      <Layout.Header className="topbar"><Typography.Text>Hospital / {activeDoctor.data.name} · {activeDoctor.data.department}</Typography.Text>{supabase && <Button size="small" onClick={async () => { const { error } = await supabase!.auth.signOut(); if (!error) queryClient.clear(); }}>Sign out</Button>}</Layout.Header>
      <Layout.Content className="page-content page-content--tight"><Outlet /></Layout.Content>
    </Layout>
  </Layout>;
}

export function App() {
  const location = useLocation();
  if (location.pathname.startsWith('/insurer')) return <Routes><Route path="/insurer/*" element={<InsurerPortalPage />} /></Routes>;
  return <VoiceModeProvider><AuthGate><Routes>
    <Route element={<Shell />}>
      <Route path="/app" element={<DashboardPage />} />
      <Route path="/app/updates" element={<UpdatesPage />} />
      <Route path="/app/patients" element={<PatientsPage />} />
      <Route path="/app/patients/:patientId" element={<PatientPage key={location.pathname} />} />
      <Route path="/app/schedule" element={<SchedulePage />} />
      <Route path="/app/opd" element={<PatientDirectoryTable key="opd" initialEncounterType="OPD" />} />
      <Route path="/app/rounds" element={<PatientDirectoryTable key="ipd" initialEncounterType="IPD" />} />
      <Route path="/app/discharges" element={<DischargesPage />} />
      <Route path="/app/discharges/:id/summary" element={<DischargeSummaryPage />} />
      <Route path="/app/claims" element={<ClaimsPage />} />
      <Route path="/app/requests" element={<CoordinationPage key="requests" kind="request" />} />
      <Route path="/app/referrals" element={<CoordinationPage key="referrals" kind="referral" />} />
      <Route path="/app/lab-orders" element={<InvestigationsPage key="lab" kind="lab" />} />
      <Route path="/app/imaging-orders" element={<InvestigationsPage key="imaging" kind="imaging" />} />
      <Route path="/app/results" element={<InvestigationsPage key="results" reviewOnly />} />
      <Route path="/app/handovers" element={<HandoversPage />} />
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<div><Typography.Title level={2}>Page not found</Typography.Title><Link to="/app">Return to VDocs</Link></div>} />
    </Route>
  </Routes></AuthGate></VoiceModeProvider>;
}
