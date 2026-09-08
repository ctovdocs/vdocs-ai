create table public.hospitals (
  id uuid primary key,
  name text not null,
  timezone text not null default 'Asia/Kolkata'
);

create table public.hospital_memberships (
  user_id uuid not null references auth.users(id) on delete cascade,
  hospital_id uuid not null references public.hospitals(id),
  display_name text not null,
  primary key (user_id, hospital_id)
);

create table public.demo_patients (
  id uuid primary key,
  hospital_id uuid not null references public.hospitals(id),
  uhid text not null,
  name text not null,
  age integer not null check (age between 0 and 130),
  sex text not null check (sex in ('M', 'F')),
  department text not null,
  encounter text not null,
  conditions text[] not null default '{}',
  allergies text[] not null default '{}',
  medications text[] not null default '{}',
  unique (hospital_id, uhid),
  unique (hospital_id, id)
);

create table public.demo_reports (
  id uuid primary key,
  hospital_id uuid not null references public.hospitals(id),
  patient_id uuid not null,
  kind text not null check (kind in ('lab', 'imaging')),
  title text not null,
  source text not null check (source in ('MockLIS', 'MockRIS')),
  reported_at timestamptz not null,
  findings text not null,
  observations jsonb not null default '[]' check (jsonb_typeof(observations) = 'array'),
  foreign key (hospital_id, patient_id) references public.demo_patients(hospital_id, id),
  check ((kind = 'lab' and source = 'MockLIS') or (kind = 'imaging' and source = 'MockRIS'))
);

create index demo_reports_patient_idx on public.demo_reports(hospital_id, patient_id);

alter table public.hospitals enable row level security;
alter table public.hospital_memberships enable row level security;
alter table public.demo_patients enable row level security;
alter table public.demo_reports enable row level security;

revoke all on public.hospitals, public.hospital_memberships, public.demo_patients, public.demo_reports from anon, authenticated;
grant select on public.hospitals, public.hospital_memberships, public.demo_patients, public.demo_reports to authenticated;

create policy membership_read_self on public.hospital_memberships for select to authenticated
using (user_id = (select auth.uid()));

create policy hospital_read_member on public.hospitals for select to authenticated
using (id in (select hospital_id from public.hospital_memberships where user_id = (select auth.uid())));

create policy patient_read_member on public.demo_patients for select to authenticated
using (hospital_id in (select hospital_id from public.hospital_memberships where user_id = (select auth.uid())));

create policy report_read_member on public.demo_reports for select to authenticated
using (hospital_id in (select hospital_id from public.hospital_memberships where user_id = (select auth.uid())));
