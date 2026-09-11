import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { owners } from '../data/cohort';

export const DEFAULT_DOCTOR = 'Dr. Ananya Mehta';
export const DEFAULT_DEPARTMENT = 'Internal Medicine';

export type ActiveDoctor = { name: string; department: string };

async function fetchActiveDoctor(): Promise<ActiveDoctor> {
  if (!supabase) return { name: DEFAULT_DOCTOR, department: DEFAULT_DEPARTMENT };
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { name: DEFAULT_DOCTOR, department: DEFAULT_DEPARTMENT };
  const { data, error } = await supabase
    .from('hospital_memberships')
    .select('display_name')
    .eq('user_id', session.user.id)
    .maybeSingle();
  if (error || !data) return { name: DEFAULT_DOCTOR, department: DEFAULT_DEPARTMENT };
  const name = data.display_name as string;
  const department = Object.entries(owners).find(([, doctor]) => doctor === name)?.[0] ?? DEFAULT_DEPARTMENT;
  return { name, department };
}

const DEFAULT_ACTIVE_DOCTOR: ActiveDoctor = { name: DEFAULT_DOCTOR, department: DEFAULT_DEPARTMENT };

export function useActiveDoctor() {
  const query = useQuery({ queryKey: ['activeDoctor'], queryFn: fetchActiveDoctor, placeholderData: DEFAULT_ACTIVE_DOCTOR });
  return { ...query, data: query.data ?? DEFAULT_ACTIVE_DOCTOR };
}
