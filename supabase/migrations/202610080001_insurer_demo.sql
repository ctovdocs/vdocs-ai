-- Storage for the fictional insurer portal used by the claims demo.
-- Written only by the /api/insurer serverless function (service role); not readable by anon or authenticated users.
create table if not exists public.demo_insurer_claims (
  ref text primary key,
  claim_id text not null,
  record jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists demo_insurer_claims_claim_id_idx on public.demo_insurer_claims (claim_id);

create table if not exists public.demo_insurer_files (
  ref text not null,
  filename text not null,
  content_base64 text not null,
  primary key (ref, filename)
);

alter table public.demo_insurer_claims enable row level security;
alter table public.demo_insurer_files enable row level security;
