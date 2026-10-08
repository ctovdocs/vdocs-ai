import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchRemoteRevision, WORKFLOW_CHANGED, WORKFLOW_STORAGE_KEY } from '../services/workflowStore';
import type { WorkflowState } from '../domain/workflow';
import { env } from '../lib/env';

export function WorkflowSync() {
  const client = useQueryClient();
  useEffect(() => {
    const refresh = () => { void client.invalidateQueries({ queryKey: ['workflow'] }); };
    const storage = (event: StorageEvent) => { if (event.key === WORKFLOW_STORAGE_KEY) refresh(); };
    // Supabase: poll only the tiny revision column and refetch the full state when it changed. Mock mode reads localStorage, which is cheap.
    const poll = async () => {
      if (document.visibilityState !== 'visible') return;
      if (env.mode !== 'supabase') return refresh();
      const known = client.getQueryData<WorkflowState>(['workflow'])?.revision;
      const remote = await fetchRemoteRevision().catch(() => null);
      if (known === undefined || (remote !== null && remote !== known)) refresh();
    };
    const timer = window.setInterval(() => { void poll(); }, 5000);
    window.addEventListener(WORKFLOW_CHANGED, refresh);
    window.addEventListener('storage', storage);
    return () => { window.clearInterval(timer); window.removeEventListener(WORKFLOW_CHANGED, refresh); window.removeEventListener('storage', storage); };
  }, [client]);
  return null;
}
