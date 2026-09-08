import { useState, type ReactNode } from 'react';
import {
  AppstoreOutlined, CalendarOutlined, CheckSquareOutlined, ClockCircleOutlined,
  ExperimentOutlined, FileDoneOutlined, FileTextOutlined, HomeOutlined,
  MedicineBoxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RetweetOutlined,
  ScanOutlined, SolutionOutlined, TeamOutlined, UnorderedListOutlined,
} from '@ant-design/icons';
import { App, Button, ConfigProvider, Layout, Menu, Tooltip, type MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';

type NavigationItem = { label: string; icon: ReactNode; path?: string };

const clinicalSections: { label: string; items: NavigationItem[] }[] = [
  { label: 'Daily work', items: [
    { label: 'Dashboard', icon: <AppstoreOutlined />, path: '/app' },
    { label: 'Patient list', icon: <TeamOutlined />, path: '/app/patients' },
    { label: 'Schedule', icon: <CalendarOutlined />, path: '/app/schedule' },
    { label: 'OPD visits', icon: <SolutionOutlined />, path: '/app/opd' },
    { label: 'IPD rounds', icon: <MedicineBoxOutlined />, path: '/app/rounds' },
  ] },
  { label: 'Coordination', items: [
    { label: 'Referral list', icon: <RetweetOutlined />, path: '/app/referrals' },
    { label: 'Department requests', icon: <UnorderedListOutlined />, path: '/app/requests' },
  ] },
  { label: 'Investigations', items: [
    { label: 'Lab orders', icon: <ExperimentOutlined />, path: '/app/lab-orders' },
    { label: 'Imaging orders', icon: <ScanOutlined />, path: '/app/imaging-orders' },
    { label: 'Results to review', icon: <CheckSquareOutlined />, path: '/app/results' },
  ] },
  { label: 'Continuity', items: [
    { label: 'Prescriptions', icon: <FileTextOutlined /> },
    { label: 'Discharge list', icon: <FileDoneOutlined />, path: '/app/discharges' },
    { label: 'Handovers', icon: <TeamOutlined />, path: '/app/handovers' },
    { label: 'Follow-ups', icon: <ClockCircleOutlined /> },
  ] },
];

const simulatorItems: NavigationItem[] = [
  { label: 'Demo launcher', icon: <AppstoreOutlined />, path: '/demo' },
  { label: 'HIS / EHR', icon: <HomeOutlined />, path: '/demo/his' },
  { label: 'Laboratory', icon: <ExperimentOutlined />, path: '/demo/lab' },
  { label: 'Advanced imaging', icon: <ScanOutlined />, path: '/demo/radiology' },
  { label: 'Pharmacy', icon: <MedicineBoxOutlined />, path: '/demo/pharmacy' },
  { label: 'Department requests', icon: <RetweetOutlined />, path: '/demo/referrals' },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const { message } = App.useApp();
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('vdoc.sidebar.collapsed') === 'true'; }
    catch { return false; }
  });
  const demo = pathname.startsWith('/demo');
  const selected = pathname.startsWith('/app/patients') ? '/app/patients' : pathname;
  const toMenuItem = (item: NavigationItem) => ({
    key: item.path ?? item.label,
    icon: item.icon,
    label: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
    title: item.path ? item.label : `${item.label} · planned`,
    onClick: item.path ? undefined : () => { void message.info({ content: `${item.label} is not connected yet.`, key: 'planned-navigation' }); },
  });
  const items: MenuProps['items'] = demo ? simulatorItems.map(toMenuItem) : clinicalSections.flatMap<NonNullable<MenuProps['items']>[number]>((section, index) =>
    collapsed
      ? [...(index ? [{ type: 'divider' as const, key: `divider-${section.label}` }] : []), ...section.items.map(toMenuItem)]
      : [{ type: 'group' as const, key: section.label, label: section.label, children: section.items.map(toMenuItem) }],
  );
  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem('vdoc.sidebar.collapsed', String(next)); }
    catch { return; }
  };
  return <ConfigProvider componentSize="small" theme={{
    components: { Menu: {
      itemHeight: 32, itemMarginBlock: 1, itemMarginInline: 0,
      itemBorderRadius: 4, iconSize: 15, iconMarginInlineEnd: 9,
      collapsedWidth: 52, collapsedIconSize: 17, fontSize: 12,
      groupTitleFontSize: 10, itemSelectedBg: '#edf2ef', itemSelectedColor: '#155c53',
    } },
  }}>
    <Layout.Sider width={184} collapsedWidth={52} collapsed={collapsed} trigger={null}
      collapsible breakpoint="lg" onBreakpoint={broken => { if (broken) setCollapsed(true); }}
      className="sidebar compact-sidebar">
      <Link className="sidebar-brand" to={demo ? '/demo' : '/app'} aria-label={demo ? 'Workflow Demo home' : 'VDoc dashboard'}>
        <span className="sidebar-mark">{demo ? <ExperimentOutlined /> : 'v'}</span>
        {!collapsed && <span className="sidebar-wordmark">{demo ? 'Workflow Demo' : 'VDoc'}</span>}
      </Link>
      <nav className="sidebar-navigation" aria-label={demo ? 'Simulator navigation' : 'Clinical navigation'}>
        <Menu mode="inline" inlineIndent={12} selectedKeys={[selected]} items={items} />
      </nav>
      <div className="sidebar-controls">
        {!collapsed && <span className="sidebar-demo-label">Internal demo</span>}
        <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
          <Button type="text" size="small" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!collapsed}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggle} />
        </Tooltip>
      </div>
    </Layout.Sider>
  </ConfigProvider>;
}
