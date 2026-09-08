import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import type { CommandInput } from '../domain/workflow';
import { dispatchWorkflow, readWorkflow } from './workflowStore';

export function useWorkflow() {
  return useQuery({ queryKey: ['workflow'], queryFn: readWorkflow });
}

export function useWorkflowAction() {
  const client = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (input: CommandInput) => dispatchWorkflow(input),
    onSuccess: async () => { await client.invalidateQueries(); },
    onError: error => { void message.error(error.message); },
  });
}
