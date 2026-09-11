import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { WORKFLOW_CHANGED, WORKFLOW_STORAGE_KEY } from '../services/workflowStore';

export function WorkflowSync() {
  const client = useQueryClient();
  useEffect(() => {
    const refresh = () => { void client.invalidateQueries({ queryKey: ['workflow'] }); };
    const storage = (event: StorageEvent) => { if (event.key === WORKFLOW_STORAGE_KEY) refresh(); };
    const timer = window.setInterval(() => { if (document.visibilityState === 'visible') refresh(); }, 5000);
    window.addEventListener(WORKFLOW_CHANGED, refresh);
    window.addEventListener('storage', storage);
    return () => { window.clearInterval(timer); window.removeEventListener(WORKFLOW_CHANGED, refresh); window.removeEventListener('storage', storage); };
  }, [client]);
  return null;
}
