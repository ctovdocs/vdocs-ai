import type { InsurerClaimRecord } from '../../src/domain/insurer.js';
import type { InsurerBackend } from '../../server/insurer.js';
import { serviceClient } from './workflowState.js';

/** Production storage for the mock insurer: records and PDFs live in Supabase (see the demo_insurer_* migration). */
export function supabaseInsurerBackend(): InsurerBackend {
  const db = () => serviceClient();
  const check = (error: { message: string } | null) => { if (error) throw new Error(error.message); };
  return {
    async list() {
      const { data, error } = await db().from('demo_insurer_claims').select('record').order('ref', { ascending: true });
      check(error); return (data ?? []).map(row => row.record as InsurerClaimRecord);
    },
    async read(ref) {
      const { data, error } = await db().from('demo_insurer_claims').select('record').eq('ref', ref).maybeSingle();
      check(error); return data ? data.record as InsurerClaimRecord : null;
    },
    async write(record) {
      const { error } = await db().from('demo_insurer_claims').upsert({ ref: record.ref, claim_id: record.claim_id, record });
      check(error);
    },
    async writeFile(ref, filename, bytes) {
      const { error } = await db().from('demo_insurer_files').upsert({ ref, filename, content_base64: bytes.toString('base64') });
      check(error);
    },
    async readFile(ref, filename) {
      const { data, error } = await db().from('demo_insurer_files').select('content_base64').eq('ref', ref).eq('filename', filename).maybeSingle();
      check(error); return data ? Buffer.from(data.content_base64 as string, 'base64') : null;
    },
    async reset() {
      check((await db().from('demo_insurer_files').delete().neq('ref', '')).error);
      check((await db().from('demo_insurer_claims').delete().neq('ref', '')).error);
    },
  };
}
