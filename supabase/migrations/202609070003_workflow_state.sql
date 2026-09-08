alter table public.demo_contexts add column family_history text;
alter table public.demo_orders
  add column priority text not null default 'routine' check (priority in ('routine', 'urgent')),
  add column version integer not null default 0,
  add column cancellation_reason text,
  drop constraint demo_orders_status_check,
  drop constraint demo_orders_source_system_check,
  drop constraint demo_orders_check,
  add check (status in ('completed', 'pending', 'processing', 'cancelled')),
  add check (source_system in ('MockLIS', 'MockRIS', 'VDoc')),
  add check ((status = 'completed' and result_id is not null) or (status <> 'completed' and result_id is null));
alter table public.demo_requests
  add column kind text not null default 'request' check (kind in ('request', 'referral')),
  add column version integer not null default 0,
  add column reviewed_at timestamptz,
  add column response_draft text,
  add column cancellation_reason text,
  drop constraint demo_requests_status_check,
  add check (status in ('received', 'accepted', 'in_progress', 'completed', 'cancelled'));
alter table public.demo_work_items
  add column completed_at timestamptz,
  drop constraint demo_work_items_status_check,
  add check (status in ('pending', 'completed'));
create table public.demo_immunizations (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  name text not null,
  administered_at timestamptz not null,
  source_system text not null check (source_system = 'MockHIS'),
  foreign key (hospital_id, patient_id) references public.demo_patients(hospital_id, id)
);
alter table public.demo_immunizations enable row level security;
revoke all on public.demo_immunizations from anon, authenticated;
grant select on public.demo_immunizations to authenticated;
create policy immunizations_read_member on public.demo_immunizations for select to authenticated
using (hospital_id in (select hospital_id from public.hospital_memberships where user_id = (select auth.uid())));

create table public.demo_workflow_state (
  hospital_id uuid primary key references public.hospitals(id),
  revision bigint not null default 0,
  state jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  check (state->>'hospital_id' is not null and state->>'hospital_id' = hospital_id::text),
  check (state->>'revision' is not null and (state->>'revision')::bigint = revision)
);

alter table public.demo_workflow_state enable row level security;
revoke all on public.demo_workflow_state from anon, authenticated;
grant select on public.demo_workflow_state to authenticated;
create policy workflow_read_member on public.demo_workflow_state for select to authenticated
using (hospital_id in (select hospital_id from public.hospital_memberships where user_id = (select auth.uid())));

create or replace function public.save_demo_workflow(target_hospital uuid, expected_revision bigint, next_state jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare
  actual_revision bigint;
  patient_record jsonb;
  record_group text;
  nested_record jsonb;
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
  foreach record_group in array array['patients', 'histories', 'reports', 'discharges', 'handovers', 'commands', 'audit'] loop
    if jsonb_typeof(next_state->record_group) is distinct from 'array' then raise exception 'Missing workflow array'; end if;
  end loop;
  for patient_record in select value from jsonb_array_elements(next_state->'patients') loop
    if patient_record->>'hospital_id' is distinct from target_hospital::text or not exists (
      select 1 from public.demo_patients where id = (patient_record->>'id')::uuid and hospital_id = target_hospital
    ) then raise exception 'Patient outside hospital scope'; end if;
  end loop;
  for patient_record in select value from jsonb_array_elements(next_state->'histories') loop
    if patient_record->'context'->>'hospital_id' is distinct from target_hospital::text or not exists (
      select 1 from public.demo_patients where id = (patient_record->'context'->>'patient_id')::uuid and hospital_id = target_hospital
    ) then raise exception 'History outside hospital scope'; end if;
    foreach record_group in array array['encounters', 'notes', 'vitals', 'medications', 'orders', 'requests', 'work_items', 'timeline', 'immunizations'] loop
      if jsonb_typeof(patient_record->record_group) is distinct from 'array' then raise exception 'Missing history array'; end if;
      for nested_record in select value from jsonb_array_elements(patient_record->record_group) loop
        if nested_record->>'hospital_id' is distinct from target_hospital::text
          or nested_record->>'patient_id' is distinct from patient_record->'context'->>'patient_id' then raise exception 'History record outside scope'; end if;
      end loop;
    end loop;
  end loop;
  foreach record_group in array array['reports', 'discharges', 'handovers'] loop
    for patient_record in select value from jsonb_array_elements(next_state->record_group) loop
      if patient_record->>'hospital_id' is distinct from target_hospital::text or not exists (
        select 1 from public.demo_patients where id = (patient_record->>'patient_id')::uuid and hospital_id = target_hospital
      ) then raise exception 'Clinical record outside hospital scope'; end if;
    end loop;
  end loop;
  insert into public.demo_workflow_state(hospital_id, revision, state, updated_by)
    values (target_hospital, expected_revision + 1, next_state, auth.uid())
    on conflict (hospital_id) do update set revision = excluded.revision, state = excluded.state, updated_by = excluded.updated_by, updated_at = now();
end;
$$;
revoke all on function public.save_demo_workflow(uuid, bigint, jsonb) from public, anon;
grant execute on function public.save_demo_workflow(uuid, bigint, jsonb) to authenticated;
