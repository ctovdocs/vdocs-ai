import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handlePatientAiRequest, resolveProviderEnv } from '../server/patientAi.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') { res.status(405).end('Method not allowed'); return; }
  const providerEnv = resolveProviderEnv(process.env);
  if (!providerEnv) {
    res.status(503).json({ error: 'AI provider not configured. Set AI_PROVIDER, AI_MODEL and the matching API key.' });
    return;
  }
  try {
    const result = await handlePatientAiRequest(req.body, providerEnv);
    res.status(200).json(result);
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'AI request failed' });
  }
}
