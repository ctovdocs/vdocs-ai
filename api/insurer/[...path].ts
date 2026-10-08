import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createInsurerStore, handleInsurerRequest } from '../../server/insurer.js';
import { supabaseInsurerBackend } from '../_lib/insurerSupabase.js';

// Mock insurer intake for the claims demo. Same handler as the dev server; storage is Supabase.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await handleInsurerRequest(req, res, createInsurerStore(supabaseInsurerBackend()));
}
