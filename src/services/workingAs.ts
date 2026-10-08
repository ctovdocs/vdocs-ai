import { useCallback, useState } from 'react';
import { nurses, type ClinicianRole } from '../domain/roles';
import { useActiveDoctor } from './activeDoctor';

export type WorkingAs = { role: ClinicianRole; name: string };
const KEY = 'vdoc.working-as.v1';

function read(): Partial<WorkingAs> {
  try { return JSON.parse(window.localStorage.getItem(KEY) ?? '{}') as Partial<WorkingAs>; } catch { return {}; }
}

/** Who is writing right now. Persisted per browser; the demo does not authenticate clinicians. */
export function useWorkingAs() {
  const doctor = useActiveDoctor().data.name;
  const [stored, setStored] = useState(read);
  const role: ClinicianRole = stored.role === 'nurse' ? 'nurse' : 'doctor';
  const name = stored.name && (role === 'nurse') === nurses.includes(stored.name) ? stored.name : role === 'nurse' ? nurses[0] : doctor;
  const set = useCallback((next: WorkingAs) => {
    setStored(next);
    try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable: selection lasts for this page view */ }
  }, []);
  return { role, name, set };
}
