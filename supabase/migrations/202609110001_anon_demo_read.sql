grant select on public.demo_patients to anon;
grant select on public.demo_encounters to anon;
grant select on public.demo_reports to anon;

create policy anon_demo_read on public.demo_patients for select to anon
  using (hospital_id = '10000000-0000-4000-8000-000000000001');
create policy anon_demo_read on public.demo_encounters for select to anon
  using (hospital_id = '10000000-0000-4000-8000-000000000001');
create policy anon_demo_read on public.demo_reports for select to anon
  using (hospital_id = '10000000-0000-4000-8000-000000000001');
