import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Form, Input, Spin, Typography } from 'antd';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { clearWorkflowCache } from '../services/workflowStore';

export function AuthGate({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const previousUser = useRef<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        const nextUser = nextSession?.user.id ?? null;
        if (previousUser.current !== nextUser) { clearWorkflowCache(); queryClient.clear(); }
        previousUser.current = nextUser;
        setSession(nextSession); setLoading(false);
      }
    });
    supabase.auth.getSession().then(({ data, error: authError }) => {
      if (!active) return;
      if (authError) setError(authError.message);
      setSession(data.session); setLoading(false);
    }).catch(() => { if (active) { setError('Unable to contact authentication service.'); setLoading(false); } });
    return () => { active = false; subscription.unsubscribe(); };
  }, [queryClient]);
  if (loading) return <div className="loading"><Spin /></div>;
  if (!supabase || session) return children;
  return <main className="login-panel surface"><div className="brand">VDocs<span>CLINICAL WORKSPACE</span></div><Typography.Title level={3}>Sign in to the demo</Typography.Title><Typography.Paragraph type="secondary">Use the Supabase account provisioned for this internal demo.</Typography.Paragraph>
    {error && <Alert type="error" title={error} className="section-gap" />}
    <Form layout="vertical" onFinish={async (values: { email: string; password: string }) => {
      setSubmitting(true); setError('');
      try {
        const { error: signInError } = await supabase!.auth.signInWithPassword(values);
        if (signInError) setError(signInError.message);
      } catch { setError('Sign-in failed. Check your connection and try again.'); }
      finally { setSubmitting(false); }
    }}>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input autoComplete="username" /></Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}><Input.Password autoComplete="current-password" /></Form.Item>
      <Button type="primary" htmlType="submit" loading={submitting} block>Sign in</Button>
    </Form>
  </main>;
}
