alter table public.demo_patients
  add column acuity text not null default 'noncritical' check (acuity in ('critical', 'noncritical')),
  add column visit_count integer not null default 1 check (visit_count > 0);

create table public.demo_encounters (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  department text not null,
  kind text not null check (kind in ('OPD', 'IPD')),
  started_at timestamptz not null,
  ended_at timestamptz,
  status text not null check (status in ('active', 'completed')),
  location text not null,
  owner text not null,
  reason text not null,
  assessment text not null,
  source_system text not null check (source_system = 'MockHIS'),
  foreign key (hospital_id, patient_id) references public.demo_patients(hospital_id, id),
  unique (hospital_id, patient_id, id),
  check (ended_at is null or ended_at >= started_at),
  check ((status = 'active' and ended_at is null) or (status = 'completed' and ended_at is not null))
);

create unique index demo_one_active_encounter on public.demo_encounters(hospital_id, patient_id) where status = 'active';

create table public.demo_contexts (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null unique,
  dob date not null,
  occupation text not null,
  preferred_language text not null,
  social_context text not null,
  history text not null,
  presenting_complaint text not null,
  acuity text not null check (acuity in ('critical', 'noncritical')),
  acuity_reason text not null,
  acuity_assessed_at timestamptz not null,
  acuity_source_ids uuid[] not null,
  previous_records_status text not null check (previous_records_status in ('hospital_records_available', 'first_hospital_visit')),
  current_encounter_id uuid not null,
  clinician_review_status text not null check (clinician_review_status = 'not_reviewed'),
  synthetic boolean not null check (synthetic),
  scenario_version text not null,
  foreign key (hospital_id, patient_id, current_encounter_id) references public.demo_encounters(hospital_id, patient_id, id)
);

create table public.demo_orders (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  encounter_id uuid not null,
  title text not null,
  kind text not null check (kind in ('lab', 'imaging')),
  placed_at timestamptz not null,
  status text not null check (status in ('completed', 'pending')),
  result_id uuid,
  indication text not null,
  requester text not null,
  source_system text not null check (source_system in ('MockLIS', 'MockRIS')),
  foreign key (hospital_id, patient_id, encounter_id) references public.demo_encounters(hospital_id, patient_id, id),
  unique (hospital_id, patient_id, encounter_id, id),
  check ((status = 'pending' and result_id is null) or (status = 'completed' and result_id is not null))
);

alter table public.demo_reports
  add column encounter_id uuid,
  add column order_id uuid,
  add column specimen_at timestamptz,
  add column performed_at timestamptz,
  add column indication text,
  add column author text,
  add constraint demo_report_encounter_fk foreign key (hospital_id, patient_id, encounter_id) references public.demo_encounters(hospital_id, patient_id, id),
  add constraint demo_report_order_fk foreign key (hospital_id, patient_id, encounter_id, order_id) references public.demo_orders(hospital_id, patient_id, encounter_id, id) deferrable initially deferred,
  add constraint demo_report_scope_unique unique (hospital_id, patient_id, encounter_id, id),
  add constraint demo_report_specimen_time check (specimen_at is null or specimen_at <= reported_at),
  add constraint demo_report_study_time check (performed_at is null or performed_at <= reported_at);

alter table public.demo_orders add constraint demo_order_result_fk
  foreign key (hospital_id, patient_id, encounter_id, result_id) references public.demo_reports(hospital_id, patient_id, encounter_id, id) deferrable initially deferred;

create table public.demo_notes (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  encounter_id uuid not null,
  kind text not null check (kind in ('consultation', 'progress', 'procedure', 'discharge', 'handover')),
  recorded_at timestamptz not null,
  author text not null,
  title text not null,
  body text not null,
  source_ids uuid[] not null,
  source_system text not null check (source_system in ('MockHIS', 'VDoc')),
  foreign key (hospital_id, patient_id, encounter_id) references public.demo_encounters(hospital_id, patient_id, id)
);

create table public.demo_vitals (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  encounter_id uuid not null,
  recorded_at timestamptz not null,
  systolic numeric not null,
  diastolic numeric not null,
  pulse numeric not null,
  respiratory_rate numeric not null,
  spo2 numeric not null check (spo2 between 0 and 100),
  temperature_c numeric not null,
  oxygen_context text not null,
  source_system text not null check (source_system = 'MockHIS'),
  foreign key (hospital_id, patient_id, encounter_id) references public.demo_encounters(hospital_id, patient_id, id)
);

create table public.demo_medications (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  encounter_id uuid not null,
  name text not null,
  dose text not null,
  route text not null check (route in ('oral', 'subcutaneous')),
  frequency text not null,
  status text not null check (status in ('historical', 'held', 'documented_home')),
  started_at timestamptz not null,
  ended_at timestamptz,
  recorded_at timestamptz not null,
  reason text not null,
  author text not null,
  source_system text not null check (source_system = 'MockHIS'),
  foreign key (hospital_id, patient_id, encounter_id) references public.demo_encounters(hospital_id, patient_id, id),
  check (ended_at is null or ended_at >= started_at)
);

create table public.demo_requests (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  encounter_id uuid not null,
  from_department text not null,
  to_department text not null,
  reason text not null,
  status text not null check (status in ('received', 'accepted', 'in_progress', 'completed')),
  priority text not null check (priority in ('urgent', 'routine')),
  requested_at timestamptz not null,
  accepted_at timestamptz,
  completed_at timestamptz,
  response text,
  owner text not null,
  source_ids uuid[] not null,
  source_system text not null check (source_system = 'VDoc'),
  foreign key (hospital_id, patient_id, encounter_id) references public.demo_encounters(hospital_id, patient_id, id),
  check (from_department <> to_department),
  check (accepted_at is null or accepted_at >= requested_at),
  check (completed_at is null or completed_at >= coalesce(accepted_at, requested_at)),
  check ((status = 'completed' and completed_at is not null and response is not null) or (status <> 'completed' and completed_at is null and response is null))
);

create table public.demo_work_items (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  encounter_id uuid not null,
  title text not null,
  status text not null check (status = 'pending'),
  kind text not null check (kind in ('review', 'discharge', 'follow_up')),
  owner text not null,
  created_at timestamptz not null,
  due_at timestamptz not null,
  source_ids uuid[] not null,
  source_system text not null check (source_system = 'VDoc'),
  foreign key (hospital_id, patient_id, encounter_id) references public.demo_encounters(hospital_id, patient_id, id),
  check (due_at >= created_at)
);

create table public.demo_timeline (
  id uuid primary key,
  hospital_id uuid not null,
  patient_id uuid not null,
  encounter_id uuid not null,
  occurred_at timestamptz not null,
  available_at timestamptz not null,
  kind text not null check (kind in ('encounter', 'result', 'note', 'medication', 'request', 'task')),
  title text not null,
  source_id uuid not null,
  source_system text not null check (source_system in ('MockHIS', 'MockLIS', 'MockRIS', 'VDoc')),
  foreign key (hospital_id, patient_id, encounter_id) references public.demo_encounters(hospital_id, patient_id, id),
  check (available_at >= occurred_at)
);

do $$
declare table_name text;
begin
  foreach table_name in array array['demo_encounters', 'demo_contexts', 'demo_orders', 'demo_notes', 'demo_vitals', 'demo_medications', 'demo_requests', 'demo_work_items', 'demo_timeline'] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on public.%I from anon, authenticated', table_name);
    execute format('grant select on public.%I to authenticated', table_name);
    execute format('create policy hospital_member_read on public.%I for select to authenticated using (hospital_id in (select hospital_id from public.hospital_memberships where user_id = (select auth.uid())))', table_name);
    execute format('create index on public.%I (hospital_id, patient_id)', table_name);
  end loop;
end;
$$;
