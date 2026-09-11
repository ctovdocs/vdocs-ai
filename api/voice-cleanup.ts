import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleVoiceCleanup } from '../server/voiceCleanup.js';

export const config = { api: { bodyParser: false } };
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await handleVoiceCleanup(req, res, process.env);
}
