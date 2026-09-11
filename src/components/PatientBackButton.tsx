import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

export function PatientBackButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const origin = location.state as { returnTo?: string; returnLabel?: string } | null;
  const returnTo = origin?.returnTo?.startsWith('/app') && !origin.returnTo.startsWith('//') ? origin.returnTo : null;
  const back = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(returnTo ?? '/app/patients', { replace: true });
  };
  return <Button size="small" type="text" icon={<ArrowLeftOutlined />} onClick={back}>Back{origin?.returnLabel ? ` to ${origin.returnLabel.toLowerCase()}` : ''}</Button>;
}
