import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase = env.mode === 'supabase'
  ? createClient(env.url, env.publishableKey)
  : null;
