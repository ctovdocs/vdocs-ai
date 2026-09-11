-- save_demo_workflow originally validated every record for every patient via nested
-- PL/pgSQL loops with a per-element `not exists` subquery — thousands of interpreted
-- iterations and subquery round trips on every single save (observed: 12.5s for one
-- note edit). Same validation, same exception messages, same hospital-scoping
-- guarantees — rewritten as set-based exists/not-exists queries so Postgres can plan
-- them as a handful of joins against demo_patients instead of a loop.
create or replace function public.save_demo_workflow(target_hospital uuid, expected_revision bigint, next_state jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare
  actual_revision bigint;
begin
  if not exists (select 1 from public.hospital_memberships where user_id = auth.uid() and hospital_id = target_hospital) then
    raise exception 'Hospital membership required' using errcode = '42501';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(target_hospital::text, 0));
  select revision into actual_revision from public.demo_workflow_state where hospital_id = target_hospital for update;
  if coalesce(actual_revision, -1) <> expected_revision then
    raise exception 'Workflow changed; reload before saving' using errcode = '40001';
  end if;
  if next_state->>'hospital_id' is distinct from target_hospital::text or (next_state->>'schema_version')::integer is distinct from 1
    or (next_state->>'revision')::bigint is distinct from expected_revision + 1 then
    raise exception 'Invalid workflow scope or revision';
  end if;

  if exists (
    select 1 from unnest(array['patients', 'histories', 'reports', 'discharges', 'handovers', 'commands', 'audit']) as record_group
    where jsonb_typeof(next_state->record_group) is distinct from 'array'
  ) then raise exception 'Missing workflow array'; end if;

  if exists (
    select 1 from jsonb_array_elements(next_state->'patients') as p
    where p->>'hospital_id' is distinct from target_hospital::text
       or not exists (select 1 from public.demo_patients dp where dp.id = (p->>'id')::uuid and dp.hospital_id = target_hospital)
  ) then raise exception 'Patient outside hospital scope'; end if;

  if exists (
    select 1 from jsonb_array_elements(next_state->'histories') as h
    where h->'context'->>'hospital_id' is distinct from target_hospital::text
       or not exists (select 1 from public.demo_patients dp where dp.id = (h->'context'->>'patient_id')::uuid and dp.hospital_id = target_hospital)
  ) then raise exception 'History outside hospital scope'; end if;

  if exists (
    select 1 from jsonb_array_elements(next_state->'histories') as h
    cross join unnest(array['encounters', 'notes', 'vitals', 'medications', 'orders', 'requests', 'work_items', 'timeline', 'immunizations']) as record_group
    where jsonb_typeof(h->record_group) is distinct from 'array'
  ) then raise exception 'Missing history array'; end if;

  if exists (
    select 1 from jsonb_array_elements(next_state->'histories') as h
    cross join unnest(array['encounters', 'notes', 'vitals', 'medications', 'orders', 'requests', 'work_items', 'timeline', 'immunizations']) as record_group
    cross join lateral jsonb_array_elements(h->record_group) as nested_record
    where nested_record->>'hospital_id' is distinct from target_hospital::text
       or nested_record->>'patient_id' is distinct from h->'context'->>'patient_id'
  ) then raise exception 'History record outside scope'; end if;

  if exists (
    select 1 from unnest(array['reports', 'discharges', 'handovers']) as record_group
    cross join lateral jsonb_array_elements(next_state->record_group) as rec
    where rec->>'hospital_id' is distinct from target_hospital::text
       or not exists (select 1 from public.demo_patients dp where dp.id = (rec->>'patient_id')::uuid and dp.hospital_id = target_hospital)
  ) then raise exception 'Clinical record outside hospital scope'; end if;

  insert into public.demo_workflow_state(hospital_id, revision, state, updated_by)
    values (target_hospital, expected_revision + 1, next_state, auth.uid())
    on conflict (hospital_id) do update set revision = excluded.revision, state = excluded.state, updated_by = excluded.updated_by, updated_at = now();
end;
$$;
