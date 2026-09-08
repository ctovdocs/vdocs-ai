import { Alert, Spin } from 'antd';

export function QueryState({ pending, error }: { pending: boolean; error: Error | null }) {
  if (error) return <Alert type="error" showIcon title="Unable to load records" description={error.message} />;
  if (pending) return <div className="loading"><Spin description="Loading records" /></div>;
  return null;
}
