import { z } from 'zod';

const mode = z.enum(['mock', 'supabase']).parse(import.meta.env.VITE_DATA_MODE || 'mock');
const url = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || '';

if (mode === 'supabase' && (!z.url().safeParse(url).success || !publishableKey)) {
  throw new Error('Supabase mode requires a valid VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY. See .env.example.');
}

export const env = { mode, url, publishableKey };
