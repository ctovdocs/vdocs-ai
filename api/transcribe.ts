import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleTranscribeRequest, resolveTranscribeEnv } from '../server/transcribe.ts';

export const config = { api: { bodyParser: false } };

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') { res.status(405).end('Method not allowed'); return; }
  const transcribeEnv = resolveTranscribeEnv(process.env);
  if (!transcribeEnv) {
    res.status(503).json({ error: 'Voice transcription not configured. Set ASSEMBLYAI_API_KEY.' });
    return;
  }
  try {
    const audio = await readRawBody(req);
    const result = await handleTranscribeRequest(audio, transcribeEnv);
    res.status(200).json(result);
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'Transcription failed' });
  }
}
