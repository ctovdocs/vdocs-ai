import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

export function LauncherPage() {
  const portals = [
    ['his', 'HIS / EHR', 'Patient lookup, encounter and documented history'],
    ['lab', 'Laboratory', 'Separate patient search and laboratory reports'],
    ['radiology', 'Advanced imaging', 'CT and X-ray report retrieval'],
    ['pharmacy', 'Pharmacy', 'Foundation route for approved prescription readback'],
    ['referrals', 'Department requests', 'Foundation route for the proposed VDoc workflow'],
  ];
  return <>
    <div className="page-heading"><div><div className="eyebrow">PRESENTER WORKSPACE</div><Typography.Title level={2}>Fortis Workflow Demo</Typography.Title><Typography.Paragraph type="secondary">Explore separate hospital-system simulators and the connected VDoc workspace.</Typography.Paragraph></div></div>
    <div className="welcome-panel"><div><div className="eyebrow">VDOC</div><Typography.Title level={3}>One patient. One clinical context.</Typography.Title><p>The clinical workspace brings reports and patient history together.</p></div><Link to="/app"><Button type="primary" size="large">Open VDoc <ArrowRightOutlined /></Button></Link></div>
    <section className="surface">{portals.map(([route, title, description]) => <Link className="portal-row" key={route} to={`/demo/${route}`}><div><strong>{title}</strong><p>{description}</p></div><ArrowRightOutlined /></Link>)}</section>
    <p className="foundation-note">Internal, independent demo · Synthetic patients · Not an official Fortis product or integration.</p>
  </>;
}
