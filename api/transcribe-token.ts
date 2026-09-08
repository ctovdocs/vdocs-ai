import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleStreamingTokenRequest, resolveTranscribeEnv } from '../server/transcribe.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') { res.status(405).end('Method not allowed'); return; }
  const transcribeEnv = resolveTranscribeEnv(process.env);
  if (!transcribeEnv) {
    res.status(503).json({ error: 'Voice transcription not configured. Set ASSEMBLYAI_API_KEY.' });
    return;
  }
  try {
    const result = await handleStreamingTokenRequest(transcribeEnv);
    res.status(200).json(result);
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'Token request failed' });
  }
}
