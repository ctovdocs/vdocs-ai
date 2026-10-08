import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createInsurerStore, handleInsurerRequest } from '../server/insurer.js';
import { supabaseInsurerBackend } from './_lib/insurerSupabase.js';

// Mock insurer intake for the claims demo. Same handler as the dev server; storage is Supabase.
// vercel.json rewrites /api/insurer/:path* here with the sub-path in ?path=, because nested catch-all files are not routed.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const raw = req.query.path;
  const sub = (Array.isArray(raw) ? raw.join('/') : raw ?? '').replace(/^\/+/, '');
  req.url = `/${sub}`;
  await handleInsurerRequest(req, res, createInsurerStore(supabaseInsurerBackend()));
}
