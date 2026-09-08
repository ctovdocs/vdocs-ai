insert into public.hospitals (id, name) values
('10000000-0000-4000-8000-000000000001', 'Fortis — synthetic demo')
on conflict (id) do nothing;

insert into public.demo_patients (id, hospital_id, uhid, name, age, sex, department, encounter, conditions, allergies, medications) values
('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'F-DEMO-0001', 'Rahul Sharma', 52, 'M', 'Internal Medicine', 'IPD · Ward A / Bed 12', array['Type 2 Diabetes', 'Hypertension', 'CKD'], array['Penicillin — rash (synthetic record)'], array['Metformin', 'Atorvastatin', 'Amlodipine', 'Losartan']),
('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', 'F-DEMO-0002', 'Priya Patel', 46, 'F', 'Internal Medicine', 'OPD · Follow-up', array['Hypertension'], '{}', array['Amlodipine']),
('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', 'F-DEMO-0003', 'Sunita Rao', 58, 'F', 'Nephrology', 'IPD · Ward B / Bed 04', array['CKD'], '{}', '{}')
on conflict (id) do nothing;

insert into public.demo_reports (id, hospital_id, patient_id, kind, title, source, reported_at, findings, observations) values
('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'lab', 'Kidney function panel', 'MockLIS', '2026-09-07T02:30:00Z', 'Synthetic report for workflow demonstration. Flags reflect fixture reference intervals and are not treatment recommendations.', '[{"name":"Creatinine","value":"2.1","unit":"mg/dL","reference":"0.7–1.3","flag":"high"},{"name":"Potassium","value":"5.4","unit":"mmol/L","reference":"3.5–5.1","flag":"high"}]'),
('30000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'imaging', 'Chest X-ray · PA view', 'MockRIS', '2026-09-06T10:00:00Z', 'Synthetic report: no focal air-space opacity. No pleural effusion described. Report text only; diagnostic images are not included in this foundation.', '[]'),
('30000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'imaging', 'CT head · non-contrast', 'MockRIS', '2026-09-07T03:00:00Z', 'Historical synthetic study: no acute intracranial abnormality described. This fixture demonstrates report retrieval, not image interpretation.', '[]')
on conflict (id) do nothing;
