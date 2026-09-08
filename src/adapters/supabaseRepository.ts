import { z } from 'zod';
import { patientSchema, reportSchema, type ClinicalRepository } from '../domain/models';
import { supabase } from '../lib/supabase';
import { historySchema } from '../domain/longitudinal';

export function createSupabaseRepository(): ClinicalRepository {
  if (!supabase) throw new Error('Supabase is not configured.');
  const client = supabase;
  return {
    async listPatients(search = '') {
      const { data, error } = await client.from('demo_patients').select('*').order('name');
      if (error) throw error;
      const query = search.trim().toLowerCase();
      return z.array(patientSchema).parse(data).filter(patient => `${patient.name} ${patient.uhid}`.toLowerCase().includes(query));
    },
    async getPatient(patientId) {
      const { data, error } = await client.from('demo_patients').select('*').eq('id', patientId).maybeSingle();
      if (error) throw error;
      return data ? patientSchema.parse(data) : null;
    },
    async listReports(patientId) {
      const { data, error } = await client.from('demo_reports').select('*').eq('patient_id', patientId).order('reported_at', { ascending: false });
      if (error) throw error;
      return z.array(reportSchema).parse(data);
    },
    async getHistory(patientId) {
      const { data: context, error } = await client.from('demo_contexts').select('*').eq('patient_id', patientId).maybeSingle();
      if (error) throw error;
      if (!context) return null;
      const names = ['encounters', 'notes', 'vitals', 'medications', 'orders', 'requests', 'work_items', 'timeline', 'immunizations'] as const;
      const entries = await Promise.all(names.map(async name => {
        const { data, error: readError } = await client.from(`demo_${name}`).select('*').eq('patient_id', patientId);
        if (readError) throw readError;
        return [name, data];
      }));
      const history = historySchema.parse({ context, ...Object.fromEntries(entries) });
      history.encounters.sort((first, second) => first.started_at.localeCompare(second.started_at));
      history.timeline.sort((first, second) => second.available_at.localeCompare(first.available_at));
      return history;
    },
  };
}
