import type { WorkflowState } from '../domain/workflow';
import { workflowStateSchema } from '../domain/workflow';

export async function encodeWorkflow(state: WorkflowState) {
  const compressed = new Blob([JSON.stringify(state)]).stream().pipeThrough(new CompressionStream('gzip'));
  const bytes = new Uint8Array(await new Response(compressed).arrayBuffer());
  const chunks: string[] = [];
  for (let offset = 0; offset < bytes.length; offset += 32768) chunks.push(String.fromCharCode(...bytes.subarray(offset, offset + 32768)));
  return JSON.stringify({ encoding: 'gzip-base64', revision: state.revision, data: btoa(chunks.join('')) });
}

export async function decodeWorkflow(raw: string): Promise<WorkflowState> {
  const saved = JSON.parse(raw);
  if (saved.encoding !== 'gzip-base64') return workflowStateSchema.parse(saved);
  if (typeof saved.data !== 'string') throw new Error('Invalid compressed workflow.');
  const bytes = Uint8Array.from(atob(saved.data), character => character.charCodeAt(0));
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  const state = workflowStateSchema.parse(JSON.parse(await new Response(stream).text()));
  if (state.revision !== saved.revision) throw new Error('Workflow revision mismatch.');
  return state;
}
