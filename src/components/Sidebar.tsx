import { useState, type ReactNode } from 'react';
import {
  AppstoreOutlined, CalendarOutlined, CheckSquareOutlined, ClockCircleOutlined,
  ExperimentOutlined, FileDoneOutlined, FileTextOutlined,
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

export function Sidebar() {
  const { pathname } = useLocation();
  const { message } = App.useApp();
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('vdoc.sidebar.collapsed') === 'true'; }
    catch { return false; }
  });
  const selected = pathname.startsWith('/app/patients') ? '/app/patients' : pathname;
  const toMenuItem = (item: NavigationItem) => ({
    key: item.path ?? item.label,
    icon: item.icon,
    label: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
    title: item.path ? item.label : `${item.label} · planned`,
    onClick: item.path ? undefined : () => { void message.info({ content: `${item.label} is not connected yet.`, key: 'planned-navigation' }); },
  });
  const items: MenuProps['items'] = clinicalSections.map(section =>
    ({ type: 'group', key: section.label, label: section.label, children: section.items.map(toMenuItem) }));
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
      <Link className="sidebar-brand" to="/app" aria-label="VDoc dashboard">
        <span className="sidebar-mark">v</span>
        {!collapsed && <span className="sidebar-wordmark">VDoc</span>}
      </Link>
      <nav className="sidebar-navigation" aria-label="Clinical navigation">
        {collapsed ? <div className="sidebar-rail">{clinicalSections.map(section =>
          <div className="sidebar-rail-group" key={section.label} role="group" aria-label={section.label}>
            {section.items.map(item => <Tooltip key={item.path ?? item.label} title={item.path ? item.label : `${item.label} · planned`} placement="right">
              {item.path ? <Link to={item.path} className={`sidebar-rail-item${selected === item.path ? ' is-selected' : ''}`}
                aria-label={item.label} aria-current={selected === item.path ? 'page' : undefined}>{item.icon}</Link>
                : <button type="button" className="sidebar-rail-item is-planned" aria-label={`${item.label} · planned`}
                  onClick={() => { void message.info({ content: `${item.label} is not connected yet.`, key: 'planned-navigation' }); }}>{item.icon}</button>}
            </Tooltip>)}
          </div>)}</div> : <Menu mode="inline" inlineIndent={12} selectedKeys={[selected]} items={items} />}
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
