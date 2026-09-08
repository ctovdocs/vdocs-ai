import { Button, Layout, Space, Tag, Typography } from 'antd';
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { env } from '../lib/env';
import { supabase } from '../lib/supabase';
import { PatientsPage } from '../pages/PatientsPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PatientPage } from '../pages/PatientPage';
import { SchedulePage } from '../pages/SchedulePage';
import { PortalPage } from '../pages/PortalPage';
import { LauncherPage } from '../pages/LauncherPage';
import { AuthGate } from './AuthGate';
import { Sidebar } from '../components/Sidebar';
import { DischargesPage } from '../pages/DischargesPage';
import { CoordinationPage } from '../pages/CoordinationPage';
import { InvestigationsPage } from '../pages/InvestigationsPage';
import { HandoversPage } from '../pages/HandoversPage';
import { PatientDirectoryTable } from '../components/PatientDirectoryTable';
import { VoiceModeToggle } from '../components/VoiceModeToggle';
import { VoiceModeProvider } from '../lib/voiceMode';
import { WorkflowSync } from './WorkflowSync';

function Shell() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const demo = location.pathname.startsWith('/demo');
  const isAppShell = location.pathname.startsWith('/app');
  return <Layout className={demo ? 'app-shell simulator' : 'app-shell'}>
    <WorkflowSync />
    <Sidebar />
    <Layout>
      <Layout.Header className="topbar"><Typography.Text>{demo ? 'Hospital system simulators' : 'Fortis / Internal Medicine'}</Typography.Text><Space>{isAppShell && <VoiceModeToggle />}<Tag color={env.mode === 'mock' ? 'gold' : 'green'}>{env.mode === 'mock' ? 'Local preview' : 'Supabase'}</Tag><Link to={demo ? '/app' : '/demo'}>{demo ? 'VDoc workspace' : 'Demo launcher'} ↗</Link>{supabase && <Button size="small" onClick={async () => { const { error } = await supabase!.auth.signOut(); if (!error) queryClient.clear(); }}>Sign out</Button>}</Space></Layout.Header>
      <Layout.Content className={isAppShell ? 'page-content page-content--tight' : 'page-content'}><Outlet /></Layout.Content>
    </Layout>
  </Layout>;
}

export function App() {
  const location = useLocation();
  return <VoiceModeProvider><AuthGate><Routes>
    <Route element={<Shell />}>
      <Route path="/app" element={<DashboardPage />} />
      <Route path="/app/patients" element={<PatientsPage />} />
      <Route path="/app/patients/:patientId" element={<PatientPage key={location.pathname} />} />
      <Route path="/app/schedule" element={<SchedulePage />} />
      <Route path="/app/opd" element={<PatientDirectoryTable key="opd" initialEncounterType="OPD" />} />
      <Route path="/app/rounds" element={<PatientDirectoryTable key="ipd" initialEncounterType="IPD" />} />
      <Route path="/app/discharges" element={<DischargesPage />} />
      <Route path="/app/requests" element={<CoordinationPage key="requests" kind="request" />} />
      <Route path="/app/referrals" element={<CoordinationPage key="referrals" kind="referral" />} />
      <Route path="/app/lab-orders" element={<InvestigationsPage key="lab" kind="lab" />} />
      <Route path="/app/imaging-orders" element={<InvestigationsPage key="imaging" kind="imaging" />} />
      <Route path="/app/results" element={<InvestigationsPage key="results" reviewOnly />} />
      <Route path="/app/handovers" element={<HandoversPage />} />
      <Route path="/demo" element={<LauncherPage />} />
      <Route path="/demo/lab/orders" element={<InvestigationsPage key="source-lab" kind="lab" simulator />} />
      <Route path="/demo/radiology/orders" element={<InvestigationsPage key="source-imaging" kind="imaging" simulator />} />
      <Route path="/demo/referrals" element={<CoordinationPage key="source-requests" simulator />} />
      <Route path="/demo/:portal" element={<PortalPage key={location.pathname} />} />
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<div><Typography.Title level={2}>Page not found</Typography.Title><Link to="/app">Return to VDoc</Link></div>} />
    </Route>
  </Routes></AuthGate></VoiceModeProvider>;
}
