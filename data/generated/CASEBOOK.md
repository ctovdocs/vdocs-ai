# Synthetic patient casebook

Version: india-high-acuity-100-v3. Snapshot: 2026-09-08T07:30:00.000Z (Asia/Kolkata display).

- 88/100 critical is a deliberately enriched demonstration mix, not Indian or Fortis prevalence.
- 80/100 have multiple hospital encounters. First-time patients have no invented prior encounters here.
- Authored synthetic scenarios, not real, de-identified, Synthea-imported or clinician-validated patients.
- Medication records represent limited historical/reconciliation context, not complete emergency prescribing or administration.
- Imaging is report text only. No real images, DICOM, phone numbers, addresses or ABHA identifiers are included.
- Requests and handover drafts are proposed VDoc workflow fixtures, not observed Fortis capabilities.
- Critical cases require clinician review before presentation as medically validated examples.

## Cohort

| UHID | Patient | Department | Acuity | Hospital encounters |
|---|---|---|---|---|
| F-DEMO-0001 | Rahul Sharma, 52M | Internal Medicine | noncritical | 5 |
| F-DEMO-0002 | Priya Patel, 46F | Internal Medicine | noncritical | 5 |
| F-DEMO-0003 | Sunita Rao, 58F | Nephrology | critical | 5 |
| F-DEMO-0004 | Farah Khan, 39F | Internal Medicine | critical | 5 |
| F-DEMO-0005 | Arjun Desai, 34M | Internal Medicine | critical | 5 |
| F-DEMO-0006 | Rajesh Nair, 64M | Cardiology | critical | 5 |
| F-DEMO-0007 | Kavita Iyer, 49F | Cardiology | critical | 5 |
| F-DEMO-0008 | Imran Ali, 45M | Cardiology | critical | 5 |
| F-DEMO-0009 | Rakesh Gupta, 70M | Cardiology | critical | 5 |
| F-DEMO-0010 | Deepak Mishra, 57M | Gastroenterology | critical | 5 |
| F-DEMO-0011 | Asha Menon, 62F | Gastroenterology | critical | 5 |
| F-DEMO-0012 | Sameer Kapoor, 50M | Gastroenterology | critical | 5 |
| F-DEMO-0013 | Leela Das, 69F | Gastroenterology | critical | 5 |
| F-DEMO-0014 | Amit Verma, 61M | Nephrology | critical | 5 |
| F-DEMO-0015 | Suresh Kulkarni, 73M | Nephrology | critical | 5 |
| F-DEMO-0016 | Nisha Thomas, 42F | Nephrology | critical | 5 |
| F-DEMO-0017 | Vikram Singh, 55M | Orthopaedics | critical | 5 |
| F-DEMO-0018 | Meena Joshi, 67F | Orthopaedics | critical | 5 |
| F-DEMO-0019 | Anjali Bose, 36F | Orthopaedics | noncritical | 1 |
| F-DEMO-0020 | Manoj Reddy, 60M | Orthopaedics | noncritical | 1 |
| F-DEMO-0021 | Meenal Kulkarni, 27F | Internal Medicine | critical | 5 |
| F-DEMO-0022 | Iqbal Ahmed, 41M | Internal Medicine | critical | 5 |
| F-DEMO-0023 | Farida Sheikh, 34F | Internal Medicine | critical | 5 |
| F-DEMO-0024 | Balvinder Singh, 68M | Internal Medicine | critical | 5 |
| F-DEMO-0025 | Sunanda Reddy, 29F | Internal Medicine | critical | 1 |
| F-DEMO-0026 | Ghanshyam Yadav, 52M | Internal Medicine | critical | 1 |
| F-DEMO-0027 | Harpreet Bedi, 58M | Cardiology | critical | 5 |
| F-DEMO-0028 | Lata Deshmukh, 45F | Cardiology | critical | 5 |
| F-DEMO-0029 | Devendra Choudhary, 61M | Cardiology | critical | 1 |
| F-DEMO-0030 | Christina Fernandes, 55F | Cardiology | critical | 5 |
| F-DEMO-0031 | Waseem Akhtar, 47M | Cardiology | critical | 1 |
| F-DEMO-0032 | Pramila Nair, 63F | Cardiology | critical | 5 |
| F-DEMO-0033 | Rakesh Chandran, 44M | Gastroenterology | critical | 1 |
| F-DEMO-0034 | Shabnam Qureshi, 31F | Gastroenterology | critical | 5 |
| F-DEMO-0035 | Om Prakash Tiwari, 38M | Gastroenterology | critical | 1 |
| F-DEMO-0036 | Geeta Bhatt, 56F | Gastroenterology | critical | 5 |
| F-DEMO-0037 | Anil Bhosale, 66M | Gastroenterology | critical | 5 |
| F-DEMO-0038 | Kiran Desai, 49F | Gastroenterology | noncritical | 5 |
| F-DEMO-0039 | Suraj Malhotra, 26M | Orthopaedics | critical | 1 |
| F-DEMO-0040 | Devraj Solanki, 33M | Orthopaedics | critical | 1 |
| F-DEMO-0041 | Ramesh Pawar, 54M | Orthopaedics | critical | 5 |
| F-DEMO-0042 | Kamala Bai, 79F | Orthopaedics | critical | 1 |
| F-DEMO-0043 | Vijay Kumar Meena, 42M | Orthopaedics | critical | 1 |
| F-DEMO-0044 | Sushila Devi, 58F | Orthopaedics | noncritical | 5 |
| F-DEMO-0045 | Bharat Solanki, 24M | Nephrology | critical | 1 |
| F-DEMO-0046 | Manoj Kumar Jha, 19M | Nephrology | critical | 1 |
| F-DEMO-0047 | Firdaus Ali, 30F | Nephrology | critical | 5 |
| F-DEMO-0048 | Yusuf Sheikh, 45M | Nephrology | critical | 5 |
| F-DEMO-0049 | Rupali Ghosh, 37F | Nephrology | critical | 1 |
| F-DEMO-0050 | Naresh Kohli, 64M | Nephrology | noncritical | 5 |
| F-DEMO-0051 | Harish Bansal, 63M | Cardiology | critical | 1 |
| F-DEMO-0052 | Meenal Vyas, 47F | Cardiology | critical | 5 |
| F-DEMO-0053 | Irfan Qureshi, 58M | Cardiology | critical | 5 |
| F-DEMO-0054 | Nalini Hegde, 72F | Cardiology | critical | 5 |
| F-DEMO-0055 | Pradeep Sethi, 66M | Cardiology | critical | 5 |
| F-DEMO-0056 | Saira Mirza, 54F | Cardiology | critical | 5 |
| F-DEMO-0057 | Mahesh Pillai, 61M | Cardiology | critical | 5 |
| F-DEMO-0058 | Geeta Ahuja, 69F | Cardiology | critical | 5 |
| F-DEMO-0059 | Bipin Trivedi, 57M | Cardiology | critical | 5 |
| F-DEMO-0060 | Ritu Malhotra, 45F | Cardiology | noncritical | 5 |
| F-DEMO-0061 | Omkar Deshmukh, 49M | Gastroenterology | critical | 1 |
| F-DEMO-0062 | Farida Merchant, 64F | Gastroenterology | critical | 5 |
| F-DEMO-0063 | Vivek Bedi, 42M | Gastroenterology | critical | 5 |
| F-DEMO-0064 | Shalini Dutta, 36F | Gastroenterology | critical | 5 |
| F-DEMO-0065 | Ramesh Jadhav, 71M | Gastroenterology | critical | 5 |
| F-DEMO-0066 | Aarti Wagh, 32F | Gastroenterology | critical | 5 |
| F-DEMO-0067 | Suresh Nambiar, 59M | Gastroenterology | critical | 5 |
| F-DEMO-0068 | Poonam Sood, 56F | Gastroenterology | critical | 5 |
| F-DEMO-0069 | Nitin Chawla, 44M | Gastroenterology | critical | 5 |
| F-DEMO-0070 | Zarina Contractor, 62F | Gastroenterology | noncritical | 5 |
| F-DEMO-0071 | Arjun Solanki, 29M | Orthopaedics | critical | 1 |
| F-DEMO-0072 | Kusum Bhatia, 76F | Orthopaedics | critical | 5 |
| F-DEMO-0073 | Ganesh Pawar, 52M | Orthopaedics | critical | 5 |
| F-DEMO-0074 | Shweta Kulkarni, 38F | Orthopaedics | critical | 5 |
| F-DEMO-0075 | Dinesh Parmar, 41M | Orthopaedics | critical | 5 |
| F-DEMO-0076 | Mala Krishnan, 67F | Orthopaedics | critical | 5 |
| F-DEMO-0077 | Yash Mehra, 34M | Orthopaedics | critical | 5 |
| F-DEMO-0078 | Neelam Saxena, 55F | Orthopaedics | critical | 5 |
| F-DEMO-0079 | Ashok Rane, 60M | Orthopaedics | critical | 5 |
| F-DEMO-0080 | Anita Fernandes, 64F | Orthopaedics | noncritical | 5 |
| F-DEMO-0081 | Kamal Dahiya, 48M | Nephrology | critical | 1 |
| F-DEMO-0082 | Bhavana Shah, 33F | Nephrology | critical | 5 |
| F-DEMO-0083 | Ravindra Kale, 57M | Nephrology | critical | 5 |
| F-DEMO-0084 | Leela Narayanan, 65F | Nephrology | critical | 5 |
| F-DEMO-0085 | Rohit Bhargava, 39M | Nephrology | critical | 5 |
| F-DEMO-0086 | Savita Gokhale, 51F | Nephrology | critical | 5 |
| F-DEMO-0087 | Imran Shaikh, 46M | Nephrology | critical | 5 |
| F-DEMO-0088 | Devendra Suri, 70M | Nephrology | critical | 5 |
| F-DEMO-0089 | Ayesha Kapadia, 40F | Nephrology | critical | 5 |
| F-DEMO-0090 | Mohan Subramaniam, 68M | Nephrology | noncritical | 5 |
| F-DEMO-0091 | Deepak Yadav, 27M | Internal Medicine | critical | 1 |
| F-DEMO-0092 | Chandrika Bose, 43F | Internal Medicine | critical | 5 |
| F-DEMO-0093 | Santosh Naik, 46M | Internal Medicine | critical | 5 |
| F-DEMO-0094 | Anjali Biswas, 31F | Internal Medicine | critical | 5 |
| F-DEMO-0095 | Vijay More, 58M | Internal Medicine | critical | 5 |
| F-DEMO-0096 | Tara Sanyal, 37F | Internal Medicine | critical | 5 |
| F-DEMO-0097 | Baldev Arora, 74M | Internal Medicine | critical | 5 |
| F-DEMO-0098 | Falguni Doshi, 50F | Internal Medicine | critical | 5 |
| F-DEMO-0099 | Pankaj Lohia, 62M | Internal Medicine | critical | 5 |
| F-DEMO-0100 | Lata Dhamija, 60F | Internal Medicine | noncritical | 5 |
## F-DEMO-0001 — Rahul Sharma, 52M

Department: Internal Medicine. Acuity at snapshot: noncritical.

Conditions: Type 2 Diabetes; Hypertension; CKD.

Allergies: Penicillin — rash, patient-reported.

### Presentation and history

Admitted for reduced appetite and reassessment of gradually worsening renal indices. Alert, haemodynamically stable and without documented respiratory distress.

Diabetes for 11 years and hypertension for 8 years. Renal follow-up has been documented at this hospital over 18 months. Medication reconciliation is incomplete after recent poor oral intake.

Critical-state rationale: Renal trend and medication reconciliation require review; current observations do not support a critical label.

Context: Works rotating month-end shifts; wife brings prior prescriptions. Prefers explanations in Hindi. No inference about adherence beyond the recorded missed appointment.

Occupation: Accounts supervisor. Preferred language: Hindi, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Diabetes review; HbA1c and renal baseline recorded.
  Record: 00000041-0000-4000-8000-000000001001
- 2025-12-11T02:00:00.000Z: OPD, completed. Blood-pressure follow-up; early renal trend discussed.
  Record: 00000041-0000-4000-8000-000000001002
- 2026-06-09T02:00:00.000Z: OPD, completed. Renal function follow-up after missed appointment; no acute symptoms.
  Record: 00000041-0000-4000-8000-000000001003
- 2026-08-24T02:00:00.000Z: OPD, completed. OPD review for fatigue; medication list reconciled with patient.
  Record: 00000041-0000-4000-8000-000000001004
- 2026-09-07T02:00:00.000Z: IPD, active. Admitted for reduced appetite and reassessment of gradually worsening renal indices. Alert, haemodynamically stable and without documented respiratory distress.
  Record: 00000041-0000-4000-8000-000000001005

### Investigation history

#### 2026-09-07T04:31:00.000Z — Chest X-ray · PA view

Source: MockRIS; record: 00000047-0000-4000-8000-000000001002; order: 00000048-0000-4000-8000-000000001002.

No focal air-space opacity or pleural effusion. Cardiomediastinal silhouette is not enlarged.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000001001; order: 00000048-0000-4000-8000-000000001001.

Mild bilateral renal cortical echogenicity. No hydronephrosis. No obstructing calculus visualised.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Kidney function and metabolic review

Source: MockLIS; record: 00000042-0000-4000-8000-000000001005; order: 00000043-0000-4000-8000-000000001005.

Synthetic results associated with this encounter. Creatinine 2.1 mg/dL (high); Potassium 5.4 mmol/L (high); HbA1c 8.2 % (high); Haemoglobin 11.2 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Kidney function and metabolic review

Source: MockLIS; record: 00000042-0000-4000-8000-000000001004; order: 00000043-0000-4000-8000-000000001004.

Synthetic results associated with this encounter. Creatinine 1.9 mg/dL (high); Potassium 5.1 mmol/L (normal); HbA1c 8 % (high); Haemoglobin 11.5 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Kidney function and metabolic review

Source: MockLIS; record: 00000042-0000-4000-8000-000000001003; order: 00000043-0000-4000-8000-000000001003.

Synthetic results associated with this encounter. Creatinine 1.8 mg/dL (high); Potassium 5 mmol/L (normal); HbA1c 7.8 % (high); Haemoglobin 11.9 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Kidney function and metabolic review

Source: MockLIS; record: 00000042-0000-4000-8000-000000001002; order: 00000043-0000-4000-8000-000000001002.

Synthetic results associated with this encounter. Creatinine 1.6 mg/dL (high); Potassium 4.8 mmol/L (normal); HbA1c 7.4 % (high); Haemoglobin 12.3 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Kidney function and metabolic review

Source: MockLIS; record: 00000042-0000-4000-8000-000000001001; order: 00000043-0000-4000-8000-000000001001.

Synthetic results associated with this encounter. Creatinine 1.4 mg/dL (high); Potassium 4.6 mmol/L (normal); HbA1c 7.1 % (high); Haemoglobin 12.8 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metformin, 500 mg, oral, Twice daily; held. Admission note records temporary hold pending renal and intake review.
- Losartan, 50 mg, oral, Once daily; held. Admission note records hold pending potassium and renal review.
- Amlodipine, 5 mg, oral, Once daily; documented_home. Patient medication list; inpatient continuation requires reconciliation.
- Atorvastatin, 20 mg, oral, At night; documented_home. Documented historical prescription.

### Department coordination

Internal Medicine → Nephrology: Review serial renal indices and advise on medication reconciliation before discharge planning. Status: in_progress. Response pending.
Internal Medicine → Cardiology: Assess cardiovascular risk given the combined hypertension, diabetes and CKD picture before discharge. Status: received. Response pending.
Internal Medicine → Gastroenterology: Evaluate the reported reduced appetite and poor oral intake for an organic cause. Status: completed. No structural or infective GI cause identified on history and examination. Reduced intake attributed to uraemic symptoms; recommend dietary review alongside renal management.

### Current notes and handover draft

#### Current clinical assessment

Admitted for reduced appetite and reassessment of gradually worsening renal indices. Alert, haemodynamically stable and without documented respiratory distress.
Background: Diabetes for 11 years and hypertension for 8 years. Renal follow-up has been documented at this hospital over 18 months. Medication reconciliation is incomplete after recent poor oral intake.
Recorded acuity: Renal trend and medication reconciliation require review; current observations do not support a critical label.
History source and context: Works rotating month-end shifts; wife brings prior prescriptions. Prefers explanations in Hindi. No inference about adherence beyond the recorded missed appointment.
Available results: Creatinine 2.1 mg/dL; Potassium 5.4 mmol/L; HbA1c 8.2 %; Haemoglobin 11.2 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Diagnostic renal biopsy — 2019

Confirmed diabetic nephropathy. Historical procedure record; report on file, not repeated at this admission.

#### Ward round — admission day

Findings: Alert, haemodynamically stable. Reduced appetite continuing. Renal indices reviewed with team.
Plan: Hold Metformin and Losartan pending renal review. Nephrology consult placed. Encourage oral intake.

#### Ward round — today, morning round

Findings: Improved appetite overnight. No new complaints. Awaiting Nephrology and Cardiology review.
Plan: Continue current plan. Chase Nephrology response. Reassess discharge readiness once renal trend and specialist input are available.

#### Latest progress and pending work

Stable at the recorded review. Review renal trend and specialist response; discharge is planned, not approved.
Pending: Repeat kidney function panel after clinician review; Reconcile home medication list; Discharge working list: renal review and summary pending.
Department question (Nephrology): Review serial renal indices and advise on medication reconciliation before discharge planning. Status: in_progress. No completed specialist response available.
Department question (Cardiology): Assess cardiovascular risk given the combined hypertension, diabetes and CKD picture before discharge. Status: received. No completed specialist response available.
Department question (Gastroenterology): Evaluate the reported reduced appetite and poor oral intake for an organic cause. Status: completed. No structural or infective GI cause identified on history and examination. Reduced intake attributed to uraemic symptoms; recommend dietary review alongside renal management.

#### Synthetic handover draft — not approved

Situation: Admitted for reduced appetite and reassessment of gradually worsening renal indices. Alert, haemodynamically stable and without documented respiratory distress.
Background: Diabetes for 11 years and hypertension for 8 years. Renal follow-up has been documented at this hospital over 18 months. Medication reconciliation is incomplete after recent poor oral intake.
Recent results: Kidney function and metabolic review; Ultrasound KUB; Chest X-ray · PA view
Pending: Repeat kidney function panel after clinician review; Reconcile home medication list; Discharge working list: renal review and summary pending.
Continuity: Stable at the recorded review. Review renal trend and specialist response; discharge is planned, not approved.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat kidney function panel after clinician review — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Reconcile home medication list — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Discharge working list: renal review and summary pending — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0002 — Priya Patel, 46F

Department: Internal Medicine. Acuity at snapshot: noncritical.

Conditions: Hypertension; Iron deficiency anaemia under follow-up.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Scheduled OPD follow-up. Fatigue has improved; no chest pain, syncope or breathlessness at rest.

Known to the hospital for blood-pressure monitoring and fatigue. Prior anaemia assessment is recorded; no current bleeding symptoms.

Critical-state rationale: Stable outpatient review with improving laboratory trend.

Context: Maintains a written BP diary. Prefers morning appointments before school hours.

Occupation: School administrator. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Initial hypertension evaluation.
  Record: 00000041-0000-4000-8000-000000002001
- 2025-12-11T02:00:00.000Z: OPD, completed. Fatigue and anaemia investigated.
  Record: 00000041-0000-4000-8000-000000002002
- 2026-06-09T02:00:00.000Z: OPD, completed. Response to recorded oral iron prescription reviewed.
  Record: 00000041-0000-4000-8000-000000002003
- 2026-08-24T02:00:00.000Z: OPD, completed. Home blood-pressure log discussed and repeat CBC requested.
  Record: 00000041-0000-4000-8000-000000002004
- 2026-09-07T02:00:00.000Z: OPD, active. Scheduled OPD follow-up. Fatigue has improved; no chest pain, syncope or breathlessness at rest.
  Record: 00000041-0000-4000-8000-000000002005

### Investigation history

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000002005; order: 00000043-0000-4000-8000-000000002005.

Synthetic results associated with this encounter. Haemoglobin 11.8 g/dL (low); Ferritin 31 ng/mL (normal); Creatinine 0.8 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000002004; order: 00000043-0000-4000-8000-000000002004.

Synthetic results associated with this encounter. Haemoglobin 11.1 g/dL (low); Ferritin 22 ng/mL (normal); Creatinine 0.8 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000002003; order: 00000043-0000-4000-8000-000000002003.

Synthetic results associated with this encounter. Haemoglobin 10.4 g/dL (low); Ferritin 15 ng/mL (normal); Creatinine 0.9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000002002; order: 00000043-0000-4000-8000-000000002002.

Synthetic results associated with this encounter. Haemoglobin 9.6 g/dL (low); Ferritin 9 ng/mL (low); Creatinine 0.8 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000002001; order: 00000043-0000-4000-8000-000000002001.

Synthetic results associated with this encounter. Haemoglobin 9.2 g/dL (low); Ferritin 7 ng/mL (low); Creatinine 0.8 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Prescription brought to follow-up.
- Ferrous sulphate, Equivalent to 60 mg elemental iron, oral, Once daily; historical. Previous course completed; no automatic renewal.

### Department coordination

Internal Medicine → Gastroenterology: Evaluate for a GI source of iron deficiency before starting oral replacement therapy. Status: completed. No structural or bleeding source identified on history and examination. Anaemia attributed to dietary iron intake; oral iron replacement started.

### Current notes and handover draft

#### Current clinical assessment

Scheduled OPD follow-up. Fatigue has improved; no chest pain, syncope or breathlessness at rest.
Background: Known to the hospital for blood-pressure monitoring and fatigue. Prior anaemia assessment is recorded; no current bleeding symptoms.
Recorded acuity: Stable outpatient review with improving laboratory trend.
History source and context: Maintains a written BP diary. Prefers morning appointments before school hours.
Available results: Haemoglobin 11.8 g/dL; Ferritin 31 ng/mL; Creatinine 0.8 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Latest progress and pending work

Routine OPD follow-up; no critical alert at this encounter.
Pending: Review current CBC with patient; Schedule next outpatient review.


#### Synthetic handover draft — not approved

Situation: Scheduled OPD follow-up. Fatigue has improved; no chest pain, syncope or breathlessness at rest.
Background: Known to the hospital for blood-pressure monitoring and fatigue. Prior anaemia assessment is recorded; no current bleeding symptoms.
Recent results: Internal Medicine laboratory review
Pending: Review current CBC with patient; Schedule next outpatient review.
Continuity: Routine OPD follow-up; no critical alert at this encounter.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Review current CBC with patient — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Schedule next outpatient review — Dr. Ananya Mehta; due 2026-09-14T04:00:00.000Z.

## F-DEMO-0003 — Sunita Rao, 58F

Department: Nephrology. Acuity at snapshot: critical.

Conditions: CKD stage 5 on maintenance haemodialysis; Type 2 Diabetes; Hypertension; Severe hyperkalaemia.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Weakness, reduced urine output and breathlessness with severe potassium elevation and ECG changes.

Regular dialysis visits and vascular-access reviews are held at this hospital. One scheduled dialysis visit was missed during recent vomiting; this is explicitly documented by the family.

Critical-state rationale: Potassium 6.8 mmol/L, ECG abnormalities and oxygen saturation 90% on room air at the recorded assessment.

Context: Daughter coordinates transport for dialysis. Missed attendance is recorded as an individual event, not a general population assumption.

Occupation: Retired bank clerk. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: IPD, completed. Dialysis initiation admission and access assessment.
  Record: 00000041-0000-4000-8000-000000003001
- 2025-12-11T02:00:00.000Z: OPD, completed. Dialysis adequacy and anaemia review.
  Record: 00000041-0000-4000-8000-000000003002
- 2026-06-09T02:00:00.000Z: OPD, completed. Vascular-access follow-up without documented infection.
  Record: 00000041-0000-4000-8000-000000003003
- 2026-08-24T02:00:00.000Z: OPD, completed. Dialysis review before the current missed visit.
  Record: 00000041-0000-4000-8000-000000003004
- 2026-09-07T02:00:00.000Z: IPD, active. Weakness, reduced urine output and breathlessness with severe potassium elevation and ECG changes.
  Record: 00000041-0000-4000-8000-000000003005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Chest X-ray · portable AP

Source: MockRIS; record: 00000047-0000-4000-8000-000000003001; order: 00000048-0000-4000-8000-000000003001.

Bilateral perihilar interstitial and air-space opacities with small pleural effusions; appearances support pulmonary oedema in the clinical context.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000003005; order: 00000043-0000-4000-8000-000000003005.

Synthetic results associated with this encounter. Potassium 6.8 mmol/L (high); Creatinine 8.1 mg/dL (high); Bicarbonate 14 mmol/L (low); Haemoglobin 8.9 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000003004; order: 00000043-0000-4000-8000-000000003004.

Synthetic results associated with this encounter. Potassium 5.3 mmol/L (high); Creatinine 6.3 mg/dL (high); Bicarbonate 21 mmol/L (low); Haemoglobin 9.3 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000003003; order: 00000043-0000-4000-8000-000000003003.

Synthetic results associated with this encounter. Potassium 5 mmol/L (normal); Creatinine 6.5 mg/dL (high); Bicarbonate 20 mmol/L (low); Haemoglobin 9.8 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000003002; order: 00000043-0000-4000-8000-000000003002.

Synthetic results associated with this encounter. Potassium 5.2 mmol/L (high); Creatinine 6.2 mg/dL (high); Bicarbonate 21 mmol/L (low); Haemoglobin 9.6 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000003001; order: 00000043-0000-4000-8000-000000003001.

Synthetic results associated with this encounter. Potassium 4.8 mmol/L (normal); Creatinine 5.8 mg/dL (high); Bicarbonate 22 mmol/L (normal); Haemoglobin 9.4 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Sevelamer, 800 mg, oral, With meals three times daily; documented_home. Renal clinic medication history; not an acute treatment order.

### Department coordination

Nephrology → Cardiology: Review documented ECG changes and rhythm monitoring in severe hyperkalaemia. Status: in_progress. Response pending.
Nephrology → Internal Medicine: Coordinate glycaemic management alongside acute dialysis and electrolyte correction. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Weakness, reduced urine output and breathlessness with severe potassium elevation and ECG changes.
Background: Regular dialysis visits and vascular-access reviews are held at this hospital. One scheduled dialysis visit was missed during recent vomiting; this is explicitly documented by the family.
Recorded acuity: Potassium 6.8 mmol/L, ECG abnormalities and oxygen saturation 90% on room air at the recorded assessment.
History source and context: Daughter coordinates transport for dialysis. Missed attendance is recorded as an individual event, not a general population assumption.
Available results: Potassium 6.8 mmol/L; Creatinine 8.1 mg/dL; Bicarbonate 14 mmol/L; Haemoglobin 8.9 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Procedure / physiological study record

12-lead ECG recorded: prominent peaked T waves. Dialysis completion has not yet been documented.

#### Arteriovenous fistula creation, left forearm — at dialysis initiation

Vascular access for maintenance haemodialysis; access reviews are documented as routine, not acute.

#### Ward round — admission day

Findings: Weak, breathless, ECG changes of hyperkalaemia. Missed dialysis session identified as a likely contributor.
Plan: Urgent dialysis arranged, cardiac monitoring continued, Cardiology and Internal Medicine consulted.

#### Ward round — today, morning round

Findings: Breathing easier after dialysis; ECG changes less pronounced on repeat strip.
Plan: Continue monitoring potassium trend. Reinforce dialysis attendance planning with the family before discharge.

#### Latest progress and pending work

Critical renal scenario; senior team notified in the note. Acute administration details are outside this fixture. Do not infer correction from a pending repeat result.
Pending: Repeat potassium after documented intervention; Dialysis procedure record pending completion; Cardiology response and requester review.
Department question (Cardiology): Review documented ECG changes and rhythm monitoring in severe hyperkalaemia. Status: in_progress. No completed specialist response available.
Department question (Internal Medicine): Coordinate glycaemic management alongside acute dialysis and electrolyte correction. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Weakness, reduced urine output and breathlessness with severe potassium elevation and ECG changes.
Background: Regular dialysis visits and vascular-access reviews are held at this hospital. One scheduled dialysis visit was missed during recent vomiting; this is explicitly documented by the family.
Recent results: Nephrology laboratory review; Chest X-ray · portable AP
Pending: Repeat potassium after documented intervention; Dialysis procedure record pending completion; Cardiology response and requester review.
Continuity: Critical renal scenario; senior team notified in the note. Acute administration details are outside this fixture. Do not infer correction from a pending repeat result.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat potassium after documented intervention — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Dialysis procedure record pending completion — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Cardiology response and requester review — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0004 — Farah Khan, 39F

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Type 2 Diabetes; Community-acquired pneumonia; Sepsis with organ dysfunction; Acute kidney injury.

Allergies: Cotrimoxazole — rash, recorded in prior visit.

### Presentation and history

Hypotension, tachypnoea and hypoxaemia with a focal chest infiltrate; renal indices have risen from baseline.

Previous diabetes visits and one respiratory infection admission are available. Developed fever, productive cough and reduced intake before this admission.

Critical-state rationale: BP 86/52 mmHg, oxygen saturation 88% on room air and lactate 4.3 mmol/L at assessment.

Context: Sister supplies medication packets and prior clinic documents. Interpreter preference recorded without assumptions about literacy.

Occupation: Tailor. Preferred language: Hindi, Urdu.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Diabetes baseline and vaccination history discussed.
  Record: 00000041-0000-4000-8000-000000004001
- 2025-12-11T02:00:00.000Z: IPD, completed. Prior respiratory infection admission; subsequently discharged.
  Record: 00000041-0000-4000-8000-000000004002
- 2026-06-09T02:00:00.000Z: OPD, completed. Diabetes follow-up after clinical recovery.
  Record: 00000041-0000-4000-8000-000000004003
- 2026-08-24T02:00:00.000Z: OPD, completed. Routine OPD review before the present febrile illness.
  Record: 00000041-0000-4000-8000-000000004004
- 2026-09-07T02:00:00.000Z: IPD, active. Hypotension, tachypnoea and hypoxaemia with a focal chest infiltrate; renal indices have risen from baseline.
  Record: 00000041-0000-4000-8000-000000004005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Chest X-ray · portable AP

Source: MockRIS; record: 00000047-0000-4000-8000-000000004001; order: 00000048-0000-4000-8000-000000004001.

Right lower-zone air-space consolidation with air bronchograms. No large pleural effusion.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000004005; order: 00000043-0000-4000-8000-000000004005.

Synthetic results associated with this encounter. Creatinine 2.2 mg/dL (high); WBC 21.4 10^9/L (high); Platelets 105 10^9/L (low); Lactate 4.3 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000004004; order: 00000043-0000-4000-8000-000000004004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); WBC 7.6 10^9/L (normal); Platelets 248 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000004003; order: 00000043-0000-4000-8000-000000004003.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); WBC 8.1 10^9/L (normal); Platelets 251 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000004002; order: 00000043-0000-4000-8000-000000004002.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); WBC 12.4 10^9/L (high); Platelets 240 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000004001; order: 00000043-0000-4000-8000-000000004001.

Synthetic results associated with this encounter. Creatinine 0.8 mg/dL (normal); WBC 7.8 10^9/L (normal); Platelets 260 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metformin, 500 mg, oral, Twice daily; held. Admission reconciliation records hold during acute illness and renal dysfunction.

### Department coordination

Internal Medicine → Nephrology: Evaluate new renal dysfunction and fluid-balance documentation during acute infection. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Hypotension, tachypnoea and hypoxaemia with a focal chest infiltrate; renal indices have risen from baseline.
Background: Previous diabetes visits and one respiratory infection admission are available. Developed fever, productive cough and reduced intake before this admission.
Recorded acuity: BP 86/52 mmHg, oxygen saturation 88% on room air and lactate 4.3 mmol/L at assessment.
History source and context: Sister supplies medication packets and prior clinic documents. Interpreter preference recorded without assumptions about literacy.
Available results: Creatinine 2.2 mg/dL; WBC 21.4 10^9/L; Platelets 105 10^9/L; Lactate 4.3 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Hypotensive, hypoxic, febrile. Chest X-ray confirms consolidation. Renal indices rising from baseline.
Plan: Broad-spectrum antibiotics, fluid resuscitation, vasopressor support as needed. Nephrology consulted for renal monitoring.

#### Ward round — today, morning round

Findings: Oxygen requirement reducing. Blood pressure stable off vasopressor support.
Plan: Continue antibiotics pending culture. Repeat renal panel and lactate. Reassess for de-escalation once cultures return.

#### Latest progress and pending work

Critical infection scenario with unresolved oxygenation and perfusion concerns. Culture remains pending; no organism may be assumed.
Pending: Blood culture final report; Repeat renal panel and lactate; Senior review note update.
Department question (Nephrology): Evaluate new renal dysfunction and fluid-balance documentation during acute infection. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Hypotension, tachypnoea and hypoxaemia with a focal chest infiltrate; renal indices have risen from baseline.
Background: Previous diabetes visits and one respiratory infection admission are available. Developed fever, productive cough and reduced intake before this admission.
Recent results: Internal Medicine laboratory review; Chest X-ray · portable AP
Pending: Blood culture final report; Repeat renal panel and lactate; Senior review note update.
Continuity: Critical infection scenario with unresolved oxygenation and perfusion concerns. Culture remains pending; no organism may be assumed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Blood culture final report — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Repeat renal panel and lactate — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Senior review note update — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0005 — Arjun Desai, 34M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Type 1 Diabetes; Diabetic ketoacidosis; Dehydration.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Drowsiness, abdominal discomfort and deep rapid breathing with hyperglycaemia, ketonaemia and acidosis.

Insulin-treated diabetes with four previous hospital encounters. Vomiting and inability to maintain intake preceded this admission; the home insulin history is being reconciled.

Critical-state rationale: Venous pH 7.08, bicarbonate 9 mmol/L and glucose 486 mg/dL with tachycardia.

Context: Works night shifts; cousin provides the glucose diary. Recent vomiting is documented; no unrecorded non-adherence is inferred.

Occupation: Software support engineer. Preferred language: Marathi, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Diabetes education visit and home regimen documentation.
  Record: 00000041-0000-4000-8000-000000005001
- 2025-12-11T02:00:00.000Z: IPD, completed. Admission for gastroenteritis with glucose monitoring.
  Record: 00000041-0000-4000-8000-000000005002
- 2026-06-09T02:00:00.000Z: OPD, completed. Post-discharge glucose diary review.
  Record: 00000041-0000-4000-8000-000000005003
- 2026-08-24T02:00:00.000Z: OPD, completed. OPD review; insulin storage and administration history discussed.
  Record: 00000041-0000-4000-8000-000000005004
- 2026-09-07T02:00:00.000Z: IPD, active. Drowsiness, abdominal discomfort and deep rapid breathing with hyperglycaemia, ketonaemia and acidosis.
  Record: 00000041-0000-4000-8000-000000005005

### Investigation history

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000005005; order: 00000043-0000-4000-8000-000000005005.

Synthetic results associated with this encounter. Glucose 486 mg/dL (high); Creatinine 1.8 mg/dL (high); Potassium 5.8 mmol/L (high); Venous pH 7.08  (low); Bicarbonate 9 mmol/L (low); Beta-hydroxybutyrate 6.5 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000005004; order: 00000043-0000-4000-8000-000000005004.

Synthetic results associated with this encounter. Glucose 186 mg/dL (high); Creatinine 1 mg/dL (normal); Potassium 4.3 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000005003; order: 00000043-0000-4000-8000-000000005003.

Synthetic results associated with this encounter. Glucose 172 mg/dL (high); Creatinine 0.9 mg/dL (normal); Potassium 4.1 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000005002; order: 00000043-0000-4000-8000-000000005002.

Synthetic results associated with this encounter. Glucose 204 mg/dL (high); Creatinine 1.1 mg/dL (normal); Potassium 4.5 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000005001; order: 00000043-0000-4000-8000-000000005001.

Synthetic results associated with this encounter. Glucose 168 mg/dL (high); Creatinine 0.9 mg/dL (normal); Potassium 4.2 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Insulin glargine, 18 units, subcutaneous, At night; historical. Last outpatient prescription only; acute insulin treatment is not represented by this row.

### Department coordination

Internal Medicine → Nephrology: Review renal dysfunction and electrolyte trend during the current metabolic emergency. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Drowsiness, abdominal discomfort and deep rapid breathing with hyperglycaemia, ketonaemia and acidosis.
Background: Insulin-treated diabetes with four previous hospital encounters. Vomiting and inability to maintain intake preceded this admission; the home insulin history is being reconciled.
Recorded acuity: Venous pH 7.08, bicarbonate 9 mmol/L and glucose 486 mg/dL with tachycardia.
History source and context: Works night shifts; cousin provides the glucose diary. Recent vomiting is documented; no unrecorded non-adherence is inferred.
Available results: Glucose 486 mg/dL; Creatinine 1.8 mg/dL; Potassium 5.8 mmol/L; Venous pH 7.08 ; Bicarbonate 9 mmol/L; Beta-hydroxybutyrate 6.5 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Drowsy, acidotic, ketonaemic. Venous gas confirms severe metabolic acidosis. Insulin infusion started per protocol.
Plan: Intravenous insulin infusion, potassium replacement per protocol, hourly glucose monitoring. Nephrology consulted for electrolyte trend.

#### Ward round — today, morning round

Findings: More alert, acidosis improving on repeat gas. Ketones trending down.
Plan: Continue insulin infusion until anion gap closes. Transition planning to subcutaneous insulin once tolerating oral intake.

#### Latest progress and pending work

Critical metabolic presentation. Baseline home insulin is not an acute prescribing instruction; subsequent treatment and resolution must be separately documented.
Pending: Repeat venous gas and electrolytes; Reconcile home insulin regimen; Document subsequent neurological assessment.
Department question (Nephrology): Review renal dysfunction and electrolyte trend during the current metabolic emergency. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Drowsiness, abdominal discomfort and deep rapid breathing with hyperglycaemia, ketonaemia and acidosis.
Background: Insulin-treated diabetes with four previous hospital encounters. Vomiting and inability to maintain intake preceded this admission; the home insulin history is being reconciled.
Recent results: Internal Medicine laboratory review
Pending: Repeat venous gas and electrolytes; Reconcile home insulin regimen; Document subsequent neurological assessment.
Continuity: Critical metabolic presentation. Baseline home insulin is not an acute prescribing instruction; subsequent treatment and resolution must be separately documented.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat venous gas and electrolytes — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Reconcile home insulin regimen — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Document subsequent neurological assessment — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0006 — Rajesh Nair, 64M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Coronary artery disease; Type 2 Diabetes; CKD; NSTEMI with haemodynamic instability.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Persistent chest pain, hypotension and serial troponin elevation with ST depression documented on ECG.

Previous coronary intervention and renal follow-up are documented. Current admission follows prolonged chest discomfort and diaphoresis.

Critical-state rationale: Ongoing chest pain with BP 88/56 mmHg and high-sensitivity troponin I 1280 ng/L.

Context: Spouse has an old PCI discharge summary; it has been recorded as hospital history rather than a new procedure.

Occupation: Retired railway employee. Preferred language: Malayalam, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Post-PCI follow-up; prior procedure summary filed.
  Record: 00000041-0000-4000-8000-000000006001
- 2025-12-11T02:00:00.000Z: OPD, completed. Diabetes and lipid review.
  Record: 00000041-0000-4000-8000-000000006002
- 2026-06-09T02:00:00.000Z: IPD, completed. Exertional symptoms assessed without a new admission.
  Record: 00000041-0000-4000-8000-000000006003
- 2026-08-24T02:00:00.000Z: OPD, completed. Renal baseline reviewed before current acute symptoms.
  Record: 00000041-0000-4000-8000-000000006004
- 2026-09-07T02:00:00.000Z: IPD, active. Persistent chest pain, hypotension and serial troponin elevation with ST depression documented on ECG.
  Record: 00000041-0000-4000-8000-000000006005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000006001; order: 00000048-0000-4000-8000-000000006001.

LVEF approximately 35%. Regional hypokinesia of the anterior and anterolateral walls. No large pericardial effusion.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000006005; order: 00000043-0000-4000-8000-000000006005.

Synthetic results associated with this encounter. Creatinine 2 mg/dL (high); Haemoglobin 11.7 g/dL (low); High-sensitivity troponin I 1280 ng/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000006004; order: 00000043-0000-4000-8000-000000006004.

Synthetic results associated with this encounter. Creatinine 1.5 mg/dL (high); Haemoglobin 12.4 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000006003; order: 00000043-0000-4000-8000-000000006003.

Synthetic results associated with this encounter. Creatinine 1.5 mg/dL (high); Haemoglobin 12.5 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000006002; order: 00000043-0000-4000-8000-000000006002.

Synthetic results associated with this encounter. Creatinine 1.4 mg/dL (high); Haemoglobin 12.8 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000006001; order: 00000043-0000-4000-8000-000000006001.

Synthetic results associated with this encounter. Creatinine 1.3 mg/dL (normal); Haemoglobin 13.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Atorvastatin, 40 mg, oral, At night; documented_home. Prior outpatient prescription; acute coronary treatment chart is outside this fixture.

### Department coordination

Cardiology → Nephrology: Review renal baseline and current deterioration for the multidisciplinary procedural discussion. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Persistent chest pain, hypotension and serial troponin elevation with ST depression documented on ECG.
Background: Previous coronary intervention and renal follow-up are documented. Current admission follows prolonged chest discomfort and diaphoresis.
Recorded acuity: Ongoing chest pain with BP 88/56 mmHg and high-sensitivity troponin I 1280 ng/L.
History source and context: Spouse has an old PCI discharge summary; it has been recorded as hospital history rather than a new procedure.
Available results: Creatinine 2 mg/dL; Haemoglobin 11.7 g/dL; High-sensitivity troponin I 1280 ng/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Procedure / physiological study record

12-lead ECG: lateral ST depression recorded. Previous PCI is historical; no new angiography completion is asserted.

#### Percutaneous coronary intervention — prior admission

Discharge summary on file per spouse; not independently re-verified at this admission.

#### Ward round — admission day

Findings: Ongoing chest pain, hypotensive, troponin markedly elevated. Renal baseline reviewed for procedural planning.
Plan: Dual antiplatelet therapy, haemodynamic support, urgent procedural decision pending Nephrology input on renal risk.

#### Ward round — today, morning round

Findings: Pain less severe. Blood pressure improved with current support.
Plan: Continue current therapy. Await renal consultation response before finalising procedure timing.

#### Latest progress and pending work

Critical coronary presentation; no procedure is marked completed merely because it is discussed.
Pending: Repeat ECG and troponin report; Renal consultation response; Procedure decision documentation.
Department question (Nephrology): Review renal baseline and current deterioration for the multidisciplinary procedural discussion. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Persistent chest pain, hypotension and serial troponin elevation with ST depression documented on ECG.
Background: Previous coronary intervention and renal follow-up are documented. Current admission follows prolonged chest discomfort and diaphoresis.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Repeat ECG and troponin report; Renal consultation response; Procedure decision documentation.
Continuity: Critical coronary presentation; no procedure is marked completed merely because it is discussed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat ECG and troponin report — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Renal consultation response — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Procedure decision documentation — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0007 — Kavita Iyer, 49F

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Dilated cardiomyopathy; Hypertension; Acute decompensated heart failure.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Acute respiratory distress with bilateral crepitations and pulmonary oedema on the report.

Known reduced LV function with prior admissions and interval clinic visits. Three days of orthopnoea and increasing leg swelling preceded this admission.

Critical-state rationale: Oxygen saturation 84% on room air and respiratory rate 34/min with severe LV dysfunction.

Context: Husband keeps a home weight diary; the last week is incomplete and explicitly marked as missing.

Occupation: Lecturer. Preferred language: Tamil, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Cardiomyopathy diagnosis and initial echocardiography.
  Record: 00000041-0000-4000-8000-000000007001
- 2025-12-11T02:00:00.000Z: IPD, completed. Heart-failure admission; discharge summary retained.
  Record: 00000041-0000-4000-8000-000000007002
- 2026-06-09T02:00:00.000Z: OPD, completed. Post-discharge weight and renal review.
  Record: 00000041-0000-4000-8000-000000007003
- 2026-08-24T02:00:00.000Z: OPD, completed. Clinic review documenting exertional limitation.
  Record: 00000041-0000-4000-8000-000000007004
- 2026-09-07T02:00:00.000Z: IPD, active. Acute respiratory distress with bilateral crepitations and pulmonary oedema on the report.
  Record: 00000041-0000-4000-8000-000000007005

### Investigation history

#### 2026-09-07T04:31:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000007002; order: 00000048-0000-4000-8000-000000007002.

Dilated LV with global hypokinesia; LVEF approximately 25%. Moderate functional mitral regurgitation.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T04:30:00.000Z — Chest X-ray · portable AP

Source: MockRIS; record: 00000047-0000-4000-8000-000000007001; order: 00000048-0000-4000-8000-000000007001.

Cardiomegaly and bilateral perihilar opacities with small bilateral effusions.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000007005; order: 00000043-0000-4000-8000-000000007005.

Synthetic results associated with this encounter. Creatinine 1.9 mg/dL (high); Sodium 128 mmol/L (low); Potassium 5.2 mmol/L (high); NT-proBNP 6800 pg/mL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000007004; order: 00000043-0000-4000-8000-000000007004.

Synthetic results associated with this encounter. Creatinine 1.1 mg/dL (normal); Sodium 135 mmol/L (normal); Potassium 4.6 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000007003; order: 00000043-0000-4000-8000-000000007003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Sodium 137 mmol/L (normal); Potassium 4.2 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000007002; order: 00000043-0000-4000-8000-000000007002.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (high); Sodium 134 mmol/L (low); Potassium 4.5 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000007001; order: 00000043-0000-4000-8000-000000007001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Sodium 138 mmol/L (normal); Potassium 4.3 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Carvedilol, 6.25 mg, oral, Twice daily; documented_home. Home prescription only; current haemodynamic review required.

### Department coordination

Cardiology → Nephrology: Assess renal deterioration and assist with documented fluid-balance review. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Acute respiratory distress with bilateral crepitations and pulmonary oedema on the report.
Background: Known reduced LV function with prior admissions and interval clinic visits. Three days of orthopnoea and increasing leg swelling preceded this admission.
Recorded acuity: Oxygen saturation 84% on room air and respiratory rate 34/min with severe LV dysfunction.
History source and context: Husband keeps a home weight diary; the last week is incomplete and explicitly marked as missing.
Available results: Creatinine 1.9 mg/dL; Sodium 128 mmol/L; Potassium 5.2 mmol/L; NT-proBNP 6800 pg/mL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Severe respiratory distress, bilateral crepitations, hypoxic. NT-proBNP markedly elevated.
Plan: Intravenous diuresis, oxygen support, strict fluid balance charting. Nephrology consulted for renal deterioration.

#### Ward round — today, morning round

Findings: Breathing more comfortable, oxygen requirement reducing. Weight trending down with diuresis.
Plan: Continue diuresis with renal monitoring. Reassess fluid balance twice daily. Plan heart-failure therapy optimisation once euvolaemic.

#### Latest progress and pending work

Critical respiratory presentation. Room-air saturation is a baseline observation, not the saturation after support.
Pending: Repeat renal panel; Fluid-balance chart reconciliation; Specialist response.
Department question (Nephrology): Assess renal deterioration and assist with documented fluid-balance review. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Acute respiratory distress with bilateral crepitations and pulmonary oedema on the report.
Background: Known reduced LV function with prior admissions and interval clinic visits. Three days of orthopnoea and increasing leg swelling preceded this admission.
Recent results: Cardiology laboratory review; Chest X-ray · portable AP; Echocardiogram
Pending: Repeat renal panel; Fluid-balance chart reconciliation; Specialist response.
Continuity: Critical respiratory presentation. Room-air saturation is a baseline observation, not the saturation after support.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat renal panel — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Fluid-balance chart reconciliation — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Specialist response — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0008 — Imran Ali, 45M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Rheumatic mitral valve disease; Atrial fibrillation; Rapid ventricular response with hypotension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Irregular rapid pulse and hypotension with dizziness; no completed cardioversion record in this dataset.

Valve disease and anticoagulation follow-up documented across earlier visits. Presents with palpitations and near-syncope.

Critical-state rationale: Heart rate 158/min and BP 82/50 mmHg with near-syncope.

Context: Brings an anticoagulation booklet. No claim of missed doses is made without documentation.

Occupation: Retail manager. Preferred language: Hindi, Urdu.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Valve clinic baseline echo.
  Record: 00000041-0000-4000-8000-000000008001
- 2025-12-11T02:00:00.000Z: IPD, completed. Atrial fibrillation admission and discharge record.
  Record: 00000041-0000-4000-8000-000000008002
- 2026-06-09T02:00:00.000Z: OPD, completed. Anticoagulation monitoring visit.
  Record: 00000041-0000-4000-8000-000000008003
- 2026-08-24T02:00:00.000Z: OPD, completed. Valve clinic follow-up with INR review.
  Record: 00000041-0000-4000-8000-000000008004
- 2026-09-07T02:00:00.000Z: IPD, active. Irregular rapid pulse and hypotension with dizziness; no completed cardioversion record in this dataset.
  Record: 00000041-0000-4000-8000-000000008005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000008001; order: 00000048-0000-4000-8000-000000008001.

Thickened mitral leaflets with restricted excursion and left atrial enlargement. Mitral stenosis documented; LVEF approximately 50%.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000008005; order: 00000043-0000-4000-8000-000000008005.

Synthetic results associated with this encounter. INR 2.6 ratio (high); Haemoglobin 12.4 g/dL (low); Potassium 3.4 mmol/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000008004; order: 00000043-0000-4000-8000-000000008004.

Synthetic results associated with this encounter. INR 2.4 ratio (high); Haemoglobin 12.9 g/dL (low); Potassium 4.2 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000008003; order: 00000043-0000-4000-8000-000000008003.

Synthetic results associated with this encounter. INR 2.3 ratio (high); Haemoglobin 13 g/dL (normal); Potassium 4.1 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000008002; order: 00000043-0000-4000-8000-000000008002.

Synthetic results associated with this encounter. INR 2.5 ratio (high); Haemoglobin 12.8 g/dL (low); Potassium 4 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000008001; order: 00000043-0000-4000-8000-000000008001.

Synthetic results associated with this encounter. INR 2.1 ratio (high); Haemoglobin 13.2 g/dL (normal); Potassium 4.2 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Warfarin, 3 mg, oral, Once daily per previous prescription; documented_home. Historical dose only. INR reference flag uses a non-anticoagulated interval, not an individual therapeutic target.

### Department coordination

Cardiology → Internal Medicine: Review possible systemic precipitants and reconcile medication history. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Irregular rapid pulse and hypotension with dizziness; no completed cardioversion record in this dataset.
Background: Valve disease and anticoagulation follow-up documented across earlier visits. Presents with palpitations and near-syncope.
Recorded acuity: Heart rate 158/min and BP 82/50 mmHg with near-syncope.
History source and context: Brings an anticoagulation booklet. No claim of missed doses is made without documentation.
Available results: INR 2.6 ratio; Haemoglobin 12.4 g/dL; Potassium 3.4 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Procedure / physiological study record

12-lead ECG documents atrial fibrillation with rapid ventricular response.

#### Ward round — admission day

Findings: Irregular rapid pulse, hypotensive, near-syncope. Echo confirms known mitral stenosis with restricted excursion.
Plan: Rate control, haemodynamic monitoring, anticoagulation review given the INR trend. Internal Medicine consulted.

#### Ward round — today, morning round

Findings: Heart rate better controlled. No further near-syncope episodes overnight.
Plan: Continue current rate-control strategy. Repeat ECG. Review anticoagulation dosing per the medication reconciliation.

#### Latest progress and pending work

Critical unstable rhythm scenario. INR flagged against laboratory reference is not automatically a bleeding emergency.
Pending: Repeat ECG after clinician-led intervention; Medication reconciliation; Senior procedure note.
Department question (Internal Medicine): Review possible systemic precipitants and reconcile medication history. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Irregular rapid pulse and hypotension with dizziness; no completed cardioversion record in this dataset.
Background: Valve disease and anticoagulation follow-up documented across earlier visits. Presents with palpitations and near-syncope.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Repeat ECG after clinician-led intervention; Medication reconciliation; Senior procedure note.
Continuity: Critical unstable rhythm scenario. INR flagged against laboratory reference is not automatically a bleeding emergency.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat ECG after clinician-led intervention — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Medication reconciliation — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Senior procedure note — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0009 — Rakesh Gupta, 70M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Coronary artery disease; Hypertension; Complete heart block.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Marked bradycardia with hypotension and recurrent presyncope.

Previous coronary follow-up and episodes of dizziness are documented. This admission followed witnessed syncope.

Critical-state rationale: Heart rate 32/min and BP 84/48 mmHg with ECG-documented complete heart block.

Context: Son provides a medication strip photograph; uncertainty about the last dose is documented.

Occupation: Retired shopkeeper. Preferred language: Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Coronary risk-factor review.
  Record: 00000041-0000-4000-8000-000000009001
- 2025-12-11T02:00:00.000Z: OPD, completed. Hypertension follow-up.
  Record: 00000041-0000-4000-8000-000000009002
- 2026-06-09T02:00:00.000Z: OPD, completed. Dizziness assessment; no syncope at that visit.
  Record: 00000041-0000-4000-8000-000000009003
- 2026-08-24T02:00:00.000Z: OPD, completed. Medication review with family present.
  Record: 00000041-0000-4000-8000-000000009004
- 2026-09-07T02:00:00.000Z: IPD, active. Marked bradycardia with hypotension and recurrent presyncope.
  Record: 00000041-0000-4000-8000-000000009005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000009001; order: 00000048-0000-4000-8000-000000009001.

LVEF approximately 45%. Mild concentric LV hypertrophy. No large pericardial effusion.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000009005; order: 00000043-0000-4000-8000-000000009005.

Synthetic results associated with this encounter. Creatinine 1.8 mg/dL (high); Potassium 4.8 mmol/L (normal); Haemoglobin 12.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000009004; order: 00000043-0000-4000-8000-000000009004.

Synthetic results associated with this encounter. Creatinine 1.3 mg/dL (normal); Potassium 4.6 mmol/L (normal); Haemoglobin 12.5 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000009003; order: 00000043-0000-4000-8000-000000009003.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal); Potassium 4.4 mmol/L (normal); Haemoglobin 12.4 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000009002; order: 00000043-0000-4000-8000-000000009002.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal); Potassium 4.5 mmol/L (normal); Haemoglobin 12.6 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000009001; order: 00000043-0000-4000-8000-000000009001.

Synthetic results associated with this encounter. Creatinine 1.1 mg/dL (normal); Potassium 4.4 mmol/L (normal); Haemoglobin 12.9 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metoprolol succinate, 25 mg, oral, Once daily; held. Admission note records hold during bradycardia review.

### Department coordination

Cardiology → Internal Medicine: Review reversible systemic factors and the documented medication list. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Marked bradycardia with hypotension and recurrent presyncope.
Background: Previous coronary follow-up and episodes of dizziness are documented. This admission followed witnessed syncope.
Recorded acuity: Heart rate 32/min and BP 84/48 mmHg with ECG-documented complete heart block.
History source and context: Son provides a medication strip photograph; uncertainty about the last dose is documented.
Available results: Creatinine 1.8 mg/dL; Potassium 4.8 mmol/L; Haemoglobin 12.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Procedure / physiological study record

12-lead ECG documents AV dissociation with a slow escape rhythm.

#### Ward round — admission day

Findings: Marked bradycardia, hypotensive, recurrent presyncope. ECG confirms complete heart block.
Plan: Temporary pacing support as needed, continuous rhythm monitoring, urgent pacing decision discussion with the family.

#### Ward round — today, morning round

Findings: Heart rate stable on current support. No further presyncope overnight.
Plan: Continue monitoring. Finalise permanent pacing decision with the family. Hold rate-limiting medications.

#### Latest progress and pending work

Critical bradyarrhythmia. A planned pacing discussion is not a completed implantation.
Pending: Pacing decision and procedure documentation; Repeat haemodynamic observations; Family discussion note.
Department question (Internal Medicine): Review reversible systemic factors and the documented medication list. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Marked bradycardia with hypotension and recurrent presyncope.
Background: Previous coronary follow-up and episodes of dizziness are documented. This admission followed witnessed syncope.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Pacing decision and procedure documentation; Repeat haemodynamic observations; Family discussion note.
Continuity: Critical bradyarrhythmia. A planned pacing discussion is not a completed implantation.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Pacing decision and procedure documentation — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Repeat haemodynamic observations — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Family discussion note — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0010 — Deepak Mishra, 57M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Cirrhosis with portal hypertension; Type 2 Diabetes; Acute upper GI bleeding.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Hypotension, tachycardia and symptomatic anaemia after overt bleeding.

Cirrhosis surveillance and prior variceal assessment are in the hospital record. Current admission follows haematemesis and melaena.

Critical-state rationale: BP 86/54 mmHg, pulse 122/min and haemoglobin 6.4 g/dL with ongoing GI bleeding history.

Context: Wife reports symptom timing. Alcohol history is recorded as unavailable rather than inferred from cirrhosis.

Occupation: Transport supervisor. Preferred language: Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Cirrhosis evaluation and ultrasound filed.
  Record: 00000041-0000-4000-8000-000000010001
- 2025-12-11T02:00:00.000Z: OPD, completed. Surveillance endoscopy encounter.
  Record: 00000041-0000-4000-8000-000000010002
- 2026-06-09T02:00:00.000Z: OPD, completed. Ascites review and renal monitoring.
  Record: 00000041-0000-4000-8000-000000010003
- 2026-08-24T02:00:00.000Z: OPD, completed. Clinic visit documenting no overt bleeding at that time.
  Record: 00000041-0000-4000-8000-000000010004
- 2026-09-07T02:00:00.000Z: IPD, active. Hypotension, tachycardia and symptomatic anaemia after overt bleeding.
  Record: 00000041-0000-4000-8000-000000010005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000010001; order: 00000048-0000-4000-8000-000000010001.

Coarse nodular liver, splenomegaly and moderate ascites. Report does not establish the bleeding source.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000010005; order: 00000043-0000-4000-8000-000000010005.

Synthetic results associated with this encounter. Haemoglobin 6.4 g/dL (low); Platelets 64 10^9/L (low); INR 1.9 ratio (high); Creatinine 1.9 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000010004; order: 00000043-0000-4000-8000-000000010004.

Synthetic results associated with this encounter. Haemoglobin 10.1 g/dL (low); Platelets 88 10^9/L (low); INR 1.5 ratio (high); Creatinine 1.2 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000010003; order: 00000043-0000-4000-8000-000000010003.

Synthetic results associated with this encounter. Haemoglobin 10.5 g/dL (low); Platelets 92 10^9/L (low); INR 1.5 ratio (high); Creatinine 1.1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000010002; order: 00000043-0000-4000-8000-000000010002.

Synthetic results associated with this encounter. Haemoglobin 10.8 g/dL (low); Platelets 98 10^9/L (low); INR 1.4 ratio (high); Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000010001; order: 00000043-0000-4000-8000-000000010001.

Synthetic results associated with this encounter. Haemoglobin 11.2 g/dL (low); Platelets 110 10^9/L (low); INR 1.3 ratio (high); Creatinine 0.9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Carvedilol, 6.25 mg, oral, Once daily; held. Recorded hold during hypotension; historical portal-hypertension prescription.

### Department coordination

Gastroenterology → Nephrology: Review renal deterioration during current haemodynamic instability. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Hypotension, tachycardia and symptomatic anaemia after overt bleeding.
Background: Cirrhosis surveillance and prior variceal assessment are in the hospital record. Current admission follows haematemesis and melaena.
Recorded acuity: BP 86/54 mmHg, pulse 122/min and haemoglobin 6.4 g/dL with ongoing GI bleeding history.
History source and context: Wife reports symptom timing. Alcohol history is recorded as unavailable rather than inferred from cirrhosis.
Available results: Haemoglobin 6.4 g/dL; Platelets 64 10^9/L; INR 1.9 ratio; Creatinine 1.9 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Surveillance upper endoscopy — prior visit

Documented as part of cirrhosis surveillance; findings from that study are recorded separately in the visit history.

#### Ward round — admission day

Findings: Hypotensive, tachycardic, haemoglobin critically low. Resuscitation started, endoscopy planned urgently.
Plan: Blood transfusion per protocol, proton pump inhibitor infusion, urgent endoscopy for source identification. Nephrology consulted.

#### Ward round — today, morning round

Findings: Haemodynamics stabilising post-transfusion. No further overt bleeding documented overnight.
Plan: Continue supportive care pending endoscopy findings. Repeat CBC. Reassess transfusion requirement.

#### Latest progress and pending work

Critical bleeding scenario. Do not label the bleed variceal until the source is documented.
Pending: Endoscopy findings and source documentation; Repeat CBC; Blood-bank compatibility report.
Department question (Nephrology): Review renal deterioration during current haemodynamic instability. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Hypotension, tachycardia and symptomatic anaemia after overt bleeding.
Background: Cirrhosis surveillance and prior variceal assessment are in the hospital record. Current admission follows haematemesis and melaena.
Recent results: Gastroenterology laboratory review; Ultrasound abdomen
Pending: Endoscopy findings and source documentation; Repeat CBC; Blood-bank compatibility report.
Continuity: Critical bleeding scenario. Do not label the bleed variceal until the source is documented.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Endoscopy findings and source documentation — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Repeat CBC — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Blood-bank compatibility report — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0011 — Asha Menon, 62F

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Cholelithiasis; Type 2 Diabetes; Acute cholangitis with organ dysfunction.

Allergies: Amoxicillin — urticaria, documented.

### Presentation and history

Hypotension with jaundice, altered attention and biochemical cholestasis.

Previous biliary colic and elective surgical discussion are recorded. Presents with fever, jaundice and right upper abdominal pain.

Critical-state rationale: BP 88/54 mmHg, temperature 39.2°C and lactate 4.1 mmol/L with biliary obstruction on imaging.

Context: Daughter translates Malayalam when requested; consent discussions require the patient’s preferred language.

Occupation: Retired teacher. Preferred language: Malayalam, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Biliary colic evaluation.
  Record: 00000041-0000-4000-8000-000000011001
- 2025-12-11T02:00:00.000Z: OPD, completed. Ultrasound-confirmed gallstones reviewed.
  Record: 00000041-0000-4000-8000-000000011002
- 2026-06-09T02:00:00.000Z: OPD, completed. Diabetes review before proposed elective procedure.
  Record: 00000041-0000-4000-8000-000000011003
- 2026-08-24T02:00:00.000Z: OPD, completed. Recurrent pain review with repeat liver tests.
  Record: 00000041-0000-4000-8000-000000011004
- 2026-09-07T02:00:00.000Z: IPD, active. Hypotension with jaundice, altered attention and biochemical cholestasis.
  Record: 00000041-0000-4000-8000-000000011005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound hepatobiliary system

Source: MockRIS; record: 00000047-0000-4000-8000-000000011001; order: 00000048-0000-4000-8000-000000011001.

Gallstones with common bile duct dilatation. Echogenic distal duct focus suggests choledocholithiasis; correlate with procedural assessment.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000011005; order: 00000043-0000-4000-8000-000000011005.

Synthetic results associated with this encounter. Total bilirubin 7.2 mg/dL (high); ALP 486 U/L (high); WBC 22.6 10^9/L (high); Creatinine 2.1 mg/dL (high); Lactate 4.1 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000011004; order: 00000043-0000-4000-8000-000000011004.

Synthetic results associated with this encounter. Total bilirubin 1.4 mg/dL (high); ALP 158 U/L (high); WBC 10.2 10^9/L (normal); Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000011003; order: 00000043-0000-4000-8000-000000011003.

Synthetic results associated with this encounter. Total bilirubin 0.9 mg/dL (normal); ALP 105 U/L (normal); WBC 7.8 10^9/L (normal); Creatinine 0.9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000011002; order: 00000043-0000-4000-8000-000000011002.

Synthetic results associated with this encounter. Total bilirubin 1 mg/dL (normal); ALP 112 U/L (normal); WBC 8.1 10^9/L (normal); Creatinine 0.9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000011001; order: 00000043-0000-4000-8000-000000011001.

Synthetic results associated with this encounter. Total bilirubin 0.8 mg/dL (normal); ALP 96 U/L (normal); WBC 7.4 10^9/L (normal); Creatinine 0.8 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metformin, 500 mg, oral, Twice daily; held. Current acute illness and renal review recorded.

### Department coordination

Gastroenterology → Internal Medicine: Review systemic organ dysfunction and peri-procedural medical context. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Hypotension with jaundice, altered attention and biochemical cholestasis.
Background: Previous biliary colic and elective surgical discussion are recorded. Presents with fever, jaundice and right upper abdominal pain.
Recorded acuity: BP 88/54 mmHg, temperature 39.2°C and lactate 4.1 mmol/L with biliary obstruction on imaging.
History source and context: Daughter translates Malayalam when requested; consent discussions require the patient’s preferred language.
Available results: Total bilirubin 7.2 mg/dL; ALP 486 U/L; WBC 22.6 10^9/L; Creatinine 2.1 mg/dL; Lactate 4.1 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Hypotensive, jaundiced, altered attention. Imaging confirms biliary obstruction. Biliary drainage planned urgently.
Plan: Broad-spectrum antibiotics, fluid resuscitation, urgent biliary drainage procedure. Internal Medicine consulted for organ dysfunction.

#### Ward round — today, morning round

Findings: Mental status clearer. Fever trending down on current antibiotics.
Plan: Continue antibiotics pending culture. Repeat renal and liver panels. Await drainage procedure completion note.

#### Latest progress and pending work

Critical biliary infection scenario; procedure remains planned until a signed completion note exists.
Pending: Biliary drainage procedure note; Blood culture final report; Repeat renal and liver panels.
Department question (Internal Medicine): Review systemic organ dysfunction and peri-procedural medical context. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Hypotension with jaundice, altered attention and biochemical cholestasis.
Background: Previous biliary colic and elective surgical discussion are recorded. Presents with fever, jaundice and right upper abdominal pain.
Recent results: Gastroenterology laboratory review; Ultrasound hepatobiliary system
Pending: Biliary drainage procedure note; Blood culture final report; Repeat renal and liver panels.
Continuity: Critical biliary infection scenario; procedure remains planned until a signed completion note exists.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Biliary drainage procedure note — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Blood culture final report — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Repeat renal and liver panels — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0012 — Sameer Kapoor, 50M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Hypertriglyceridaemia; Type 2 Diabetes; Acute pancreatitis with organ dysfunction.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Persistent pain with hypoxaemia and acute renal deterioration during the current episode.

Metabolic follow-up and a previous pancreatitis admission are documented. New severe epigastric pain and vomiting prompted admission.

Critical-state rationale: Oxygen saturation 89% on room air, respiratory rate 30/min and creatinine 2.4 mg/dL with acute pancreatitis.

Context: Family provides previous admission papers. Alcohol consumption is not documented and is not assumed.

Occupation: Restaurant owner. Preferred language: Hindi, Punjabi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Metabolic risk assessment.
  Record: 00000041-0000-4000-8000-000000012001
- 2025-12-11T02:00:00.000Z: IPD, completed. Previous pancreatitis admission with recovery documented.
  Record: 00000041-0000-4000-8000-000000012002
- 2026-06-09T02:00:00.000Z: IPD, completed. Post-admission diabetes follow-up.
  Record: 00000041-0000-4000-8000-000000012003
- 2026-08-24T02:00:00.000Z: OPD, completed. Lipid and renal monitoring visit.
  Record: 00000041-0000-4000-8000-000000012004
- 2026-09-07T02:00:00.000Z: IPD, active. Persistent pain with hypoxaemia and acute renal deterioration during the current episode.
  Record: 00000041-0000-4000-8000-000000012005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000012001; order: 00000048-0000-4000-8000-000000012001.

Bulky visualised pancreas with adjacent fluid. Bowel gas limits assessment. No definite gallstone identified; necrosis cannot be assessed on this study.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000012005; order: 00000043-0000-4000-8000-000000012005.

Synthetic results associated with this encounter. Triglycerides 1180 mg/dL (high); Creatinine 2.4 mg/dL (high); Calcium 7.2 mg/dL (low); Lipase 1860 U/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000012004; order: 00000043-0000-4000-8000-000000012004.

Synthetic results associated with this encounter. Triglycerides 520 mg/dL (high); Creatinine 1.1 mg/dL (normal); Calcium 9.1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000012003; order: 00000043-0000-4000-8000-000000012003.

Synthetic results associated with this encounter. Triglycerides 390 mg/dL (high); Creatinine 1 mg/dL (normal); Calcium 9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000012002; order: 00000043-0000-4000-8000-000000012002.

Synthetic results associated with this encounter. Triglycerides 680 mg/dL (high); Creatinine 1.4 mg/dL (high); Calcium 8.4 mg/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000012001; order: 00000043-0000-4000-8000-000000012001.

Synthetic results associated with this encounter. Triglycerides 420 mg/dL (high); Creatinine 0.9 mg/dL (normal); Calcium 9.2 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Fenofibrate, 145 mg, oral, Once daily; held. Historical medication under reconciliation during acute renal dysfunction.

### Department coordination

Gastroenterology → Nephrology: Assess renal dysfunction and serial fluid-balance context. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Persistent pain with hypoxaemia and acute renal deterioration during the current episode.
Background: Metabolic follow-up and a previous pancreatitis admission are documented. New severe epigastric pain and vomiting prompted admission.
Recorded acuity: Oxygen saturation 89% on room air, respiratory rate 30/min and creatinine 2.4 mg/dL with acute pancreatitis.
History source and context: Family provides previous admission papers. Alcohol consumption is not documented and is not assumed.
Available results: Triglycerides 1180 mg/dL; Creatinine 2.4 mg/dL; Calcium 7.2 mg/dL; Lipase 1860 U/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Severe abdominal pain, hypoxic, renal function declining. Triglycerides markedly elevated, consistent with the working cause.
Plan: Aggressive fluid resuscitation, insulin infusion for triglyceride lowering, analgesia, nil by mouth. Nephrology consulted.

#### Ward round — today, morning round

Findings: Pain better controlled. Oxygen requirement stable on current support.
Plan: Continue supportive care. Repeat renal panel and calcium. Reassess for cross-sectional imaging if no improvement.

#### Latest progress and pending work

Critical organ dysfunction; imaging does not establish pancreatic necrosis.
Pending: Repeat renal panel and calcium; Respiratory assessment update; Cross-sectional imaging decision note.
Department question (Nephrology): Assess renal dysfunction and serial fluid-balance context. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Persistent pain with hypoxaemia and acute renal deterioration during the current episode.
Background: Metabolic follow-up and a previous pancreatitis admission are documented. New severe epigastric pain and vomiting prompted admission.
Recent results: Gastroenterology laboratory review; Ultrasound abdomen
Pending: Repeat renal panel and calcium; Respiratory assessment update; Cross-sectional imaging decision note.
Continuity: Critical organ dysfunction; imaging does not establish pancreatic necrosis.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat renal panel and calcium — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Respiratory assessment update — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Cross-sectional imaging decision note — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0013 — Leela Das, 69F

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Metabolic dysfunction-associated cirrhosis; Hypertension; Hepatic encephalopathy; Acute renal dysfunction.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Disorientation and somnolence with worsening renal function; precipitating cause remains under evaluation.

Cirrhosis and ascites follow-up are documented. Family reports new confusion and reduced bowel frequency before admission.

Critical-state rationale: Documented GCS 10/15 and new altered sensorium requiring monitored care; creatinine 2.3 mg/dL.

Context: Son supplies the history while the patient is drowsy; source of history is explicitly recorded.

Occupation: Retired librarian. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Cirrhosis staging and ascites assessment.
  Record: 00000041-0000-4000-8000-000000013001
- 2025-12-11T02:00:00.000Z: IPD, completed. Admission for fluid retention; discharged after review.
  Record: 00000041-0000-4000-8000-000000013002
- 2026-06-09T02:00:00.000Z: OPD, completed. Liver clinic follow-up.
  Record: 00000041-0000-4000-8000-000000013003
- 2026-08-24T02:00:00.000Z: OPD, completed. Medication reconciliation and renal baseline visit.
  Record: 00000041-0000-4000-8000-000000013004
- 2026-09-07T02:00:00.000Z: IPD, active. Disorientation and somnolence with worsening renal function; precipitating cause remains under evaluation.
  Record: 00000041-0000-4000-8000-000000013005

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT head · non-contrast

Source: MockRIS; record: 00000047-0000-4000-8000-000000013001; order: 00000048-0000-4000-8000-000000013001.

No acute intracranial haemorrhage or large territorial infarct. This report does not independently diagnose hepatic encephalopathy.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000013005; order: 00000043-0000-4000-8000-000000013005.

Synthetic results associated with this encounter. Sodium 126 mmol/L (low); Creatinine 2.3 mg/dL (high); Total bilirubin 4.6 mg/dL (high); INR 2 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000013004; order: 00000043-0000-4000-8000-000000013004.

Synthetic results associated with this encounter. Sodium 132 mmol/L (low); Creatinine 1.2 mg/dL (high); Total bilirubin 2.8 mg/dL (high); INR 1.6 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000013003; order: 00000043-0000-4000-8000-000000013003.

Synthetic results associated with this encounter. Sodium 134 mmol/L (low); Creatinine 1 mg/dL (normal); Total bilirubin 2.4 mg/dL (high); INR 1.5 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000013002; order: 00000043-0000-4000-8000-000000013002.

Synthetic results associated with this encounter. Sodium 133 mmol/L (low); Creatinine 1.1 mg/dL (normal); Total bilirubin 2.1 mg/dL (high); INR 1.5 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000013001; order: 00000043-0000-4000-8000-000000013001.

Synthetic results associated with this encounter. Sodium 137 mmol/L (normal); Creatinine 0.9 mg/dL (normal); Total bilirubin 1.6 mg/dL (high); INR 1.3 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Spironolactone, 50 mg, oral, Once daily; held. Admission review records hold while renal and electrolyte status are assessed.

### Department coordination

Gastroenterology → Nephrology: Review renal deterioration in decompensated liver disease; aetiology is not yet established. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Disorientation and somnolence with worsening renal function; precipitating cause remains under evaluation.
Background: Cirrhosis and ascites follow-up are documented. Family reports new confusion and reduced bowel frequency before admission.
Recorded acuity: Documented GCS 10/15 and new altered sensorium requiring monitored care; creatinine 2.3 mg/dL.
History source and context: Son supplies the history while the patient is drowsy; source of history is explicitly recorded.
Available results: Sodium 126 mmol/L; Creatinine 2.3 mg/dL; Total bilirubin 4.6 mg/dL; INR 2 ratio.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Disoriented, somnolent, GCS 10/15. Renal function worsening. Precipitant for encephalopathy under evaluation.
Plan: Lactulose titration, ascitic fluid analysis sent, renal monitoring. Nephrology consulted for the aetiology of deterioration.

#### Ward round — today, morning round

Findings: Sensorium slightly improved on repeat assessment. No fever documented overnight.
Plan: Continue lactulose. Await ascitic fluid culture. Repeat sensorium assessment each round.

#### Latest progress and pending work

Critical altered-sensorium case. Infection and other precipitants are being evaluated; pending cultures are not negative cultures.
Pending: Ascitic fluid analysis and culture; Repeat sensorium assessment; Renal consultation.
Department question (Nephrology): Review renal deterioration in decompensated liver disease; aetiology is not yet established. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Disorientation and somnolence with worsening renal function; precipitating cause remains under evaluation.
Background: Cirrhosis and ascites follow-up are documented. Family reports new confusion and reduced bowel frequency before admission.
Recent results: Gastroenterology laboratory review; CT head · non-contrast
Pending: Ascitic fluid analysis and culture; Repeat sensorium assessment; Renal consultation.
Continuity: Critical altered-sensorium case. Infection and other precipitants are being evaluated; pending cultures are not negative cultures.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Ascitic fluid analysis and culture — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Repeat sensorium assessment — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Renal consultation — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0014 — Amit Verma, 61M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Diabetic kidney disease; Hypertension; Acute kidney injury on CKD; Severe hyperkalaemia.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Weakness and oliguria with severe potassium elevation and metabolic acidosis.

Gradual renal decline is recorded over multiple visits. Recent diarrhoea and reduced urine output preceded acute deterioration.

Critical-state rationale: Potassium 6.7 mmol/L, bicarbonate 13 mmol/L and ECG changes documented in the encounter.

Context: Lives with spouse; diarrhoea history is patient-reported. No unrecorded nephrotoxic exposure is inferred.

Occupation: Retired electrician. Preferred language: Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Diabetic kidney disease review.
  Record: 00000041-0000-4000-8000-000000014001
- 2025-12-11T02:00:00.000Z: OPD, completed. Albuminuria follow-up and renal monitoring.
  Record: 00000041-0000-4000-8000-000000014002
- 2026-06-09T02:00:00.000Z: OPD, completed. CKD review with medication list.
  Record: 00000041-0000-4000-8000-000000014003
- 2026-08-24T02:00:00.000Z: OPD, completed. OPD assessment before the diarrhoeal illness.
  Record: 00000041-0000-4000-8000-000000014004
- 2026-09-07T02:00:00.000Z: IPD, active. Weakness and oliguria with severe potassium elevation and metabolic acidosis.
  Record: 00000041-0000-4000-8000-000000014005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000014001; order: 00000048-0000-4000-8000-000000014001.

Bilateral increased cortical echogenicity. No hydronephrosis. Bladder is minimally distended.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000014005; order: 00000043-0000-4000-8000-000000014005.

Synthetic results associated with this encounter. Creatinine 5.2 mg/dL (high); Potassium 6.7 mmol/L (high); Bicarbonate 13 mmol/L (low); Urea 146 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000014004; order: 00000043-0000-4000-8000-000000014004.

Synthetic results associated with this encounter. Creatinine 2.6 mg/dL (high); Potassium 5.2 mmol/L (high); Bicarbonate 21 mmol/L (low); Urea 71 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000014003; order: 00000043-0000-4000-8000-000000014003.

Synthetic results associated with this encounter. Creatinine 2.4 mg/dL (high); Potassium 5 mmol/L (normal); Bicarbonate 22 mmol/L (normal); Urea 65 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000014002; order: 00000043-0000-4000-8000-000000014002.

Synthetic results associated with this encounter. Creatinine 2.1 mg/dL (high); Potassium 4.9 mmol/L (normal); Bicarbonate 23 mmol/L (normal); Urea 56 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000014001; order: 00000043-0000-4000-8000-000000014001.

Synthetic results associated with this encounter. Creatinine 1.8 mg/dL (high); Potassium 4.7 mmol/L (normal); Bicarbonate 24 mmol/L (normal); Urea 48 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Telmisartan, 40 mg, oral, Once daily; held. Recorded hold during acute kidney injury and potassium review.

### Department coordination

Nephrology → Cardiology: Review ECG abnormalities in the setting of severe potassium elevation. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Weakness and oliguria with severe potassium elevation and metabolic acidosis.
Background: Gradual renal decline is recorded over multiple visits. Recent diarrhoea and reduced urine output preceded acute deterioration.
Recorded acuity: Potassium 6.7 mmol/L, bicarbonate 13 mmol/L and ECG changes documented in the encounter.
History source and context: Lives with spouse; diarrhoea history is patient-reported. No unrecorded nephrotoxic exposure is inferred.
Available results: Creatinine 5.2 mg/dL; Potassium 6.7 mmol/L; Bicarbonate 13 mmol/L; Urea 146 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Procedure / physiological study record

12-lead ECG records peaked T waves; no completed dialysis event is assumed.

#### Ward round — admission day

Findings: Weak, oliguric, ECG changes of hyperkalaemia. Diarrhoeal illness identified as the likely precipitant for acute-on-chronic decline.
Plan: Urgent potassium-lowering measures, fluid and electrolyte correction, renal replacement assessment. Cardiology consulted for ECG changes.

#### Ward round — today, morning round

Findings: Potassium trending down on repeat. Urine output marginally improved.
Plan: Continue current management. Repeat potassium and gas. Reassess renal replacement need based on trend.

#### Latest progress and pending work

Critical renal and electrolyte scenario; repeat results are required before declaring improvement.
Pending: Repeat potassium and gas; Urine-output chart review; Renal replacement assessment note.
Department question (Cardiology): Review ECG abnormalities in the setting of severe potassium elevation. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Weakness and oliguria with severe potassium elevation and metabolic acidosis.
Background: Gradual renal decline is recorded over multiple visits. Recent diarrhoea and reduced urine output preceded acute deterioration.
Recent results: Nephrology laboratory review; Ultrasound KUB
Pending: Repeat potassium and gas; Urine-output chart review; Renal replacement assessment note.
Continuity: Critical renal and electrolyte scenario; repeat results are required before declaring improvement.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat potassium and gas — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Urine-output chart review — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Renal replacement assessment note — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0015 — Suresh Kulkarni, 73M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: CKD; Hypertension; Acute pulmonary oedema; Oliguric renal deterioration.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Severe hypertension, hypoxaemia and bilateral pulmonary opacities.

Renal clinic records show progressive dysfunction. Presents with rapidly increasing breathlessness and reduced urine output.

Critical-state rationale: BP 210/116 mmHg and oxygen saturation 82% on room air with acute pulmonary oedema.

Context: Family brings BP readings but no measurements from the last two days.

Occupation: Retired civil engineer. Preferred language: Marathi, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. CKD baseline documentation.
  Record: 00000041-0000-4000-8000-000000015001
- 2025-12-11T02:00:00.000Z: OPD, completed. Renal and blood-pressure review.
  Record: 00000041-0000-4000-8000-000000015002
- 2026-06-09T02:00:00.000Z: IPD, completed. Admission for oedema; historical discharge note retained.
  Record: 00000041-0000-4000-8000-000000015003
- 2026-08-24T02:00:00.000Z: OPD, completed. Post-discharge renal follow-up.
  Record: 00000041-0000-4000-8000-000000015004
- 2026-09-07T02:00:00.000Z: IPD, active. Severe hypertension, hypoxaemia and bilateral pulmonary opacities.
  Record: 00000041-0000-4000-8000-000000015005

### Investigation history

#### 2026-09-07T04:31:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000015002; order: 00000048-0000-4000-8000-000000015002.

Small echogenic kidneys bilaterally without hydronephrosis.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T04:30:00.000Z — Chest X-ray · portable AP

Source: MockRIS; record: 00000047-0000-4000-8000-000000015001; order: 00000048-0000-4000-8000-000000015001.

Diffuse bilateral perihilar opacities with small effusions, consistent with pulmonary oedema in the recorded clinical setting.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000015005; order: 00000043-0000-4000-8000-000000015005.

Synthetic results associated with this encounter. Creatinine 6.1 mg/dL (high); Potassium 5.9 mmol/L (high); Bicarbonate 15 mmol/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000015004; order: 00000043-0000-4000-8000-000000015004.

Synthetic results associated with this encounter. Creatinine 3.8 mg/dL (high); Potassium 5.2 mmol/L (high); Bicarbonate 20 mmol/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000015003; order: 00000043-0000-4000-8000-000000015003.

Synthetic results associated with this encounter. Creatinine 3.5 mg/dL (high); Potassium 5.1 mmol/L (normal); Bicarbonate 20 mmol/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000015002; order: 00000043-0000-4000-8000-000000015002.

Synthetic results associated with this encounter. Creatinine 2.8 mg/dL (high); Potassium 5 mmol/L (normal); Bicarbonate 22 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000015001; order: 00000043-0000-4000-8000-000000015001.

Synthetic results associated with this encounter. Creatinine 2.2 mg/dL (high); Potassium 4.8 mmol/L (normal); Bicarbonate 23 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 10 mg, oral, Once daily; documented_home. Home medication history only; emergency BP management is not specified here.

### Department coordination

Nephrology → Cardiology: Assess the cardiac contribution to pulmonary oedema alongside the renal team. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe hypertension, hypoxaemia and bilateral pulmonary opacities.
Background: Renal clinic records show progressive dysfunction. Presents with rapidly increasing breathlessness and reduced urine output.
Recorded acuity: BP 210/116 mmHg and oxygen saturation 82% on room air with acute pulmonary oedema.
History source and context: Family brings BP readings but no measurements from the last two days.
Available results: Creatinine 6.1 mg/dL; Potassium 5.9 mmol/L; Bicarbonate 15 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Severely hypertensive, hypoxic, bilateral crepitations. Renal function acutely worse than the documented baseline.
Plan: Controlled blood-pressure reduction, oxygen support, diuresis as tolerated by renal function. Cardiology consulted for cardiac contribution.

#### Ward round — today, morning round

Findings: Breathing more comfortable. Blood pressure trending toward target range.
Plan: Continue blood-pressure control. Echocardiogram pending. Repeat renal panel and reassess fluid balance.

#### Latest progress and pending work

Critical pulmonary oedema with renal dysfunction. Pending echo must not appear as an available imaging result.
Pending: Echocardiogram order; Repeat renal panel; Document respiratory support and fluid balance.
Department question (Cardiology): Assess the cardiac contribution to pulmonary oedema alongside the renal team. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe hypertension, hypoxaemia and bilateral pulmonary opacities.
Background: Renal clinic records show progressive dysfunction. Presents with rapidly increasing breathlessness and reduced urine output.
Recent results: Nephrology laboratory review; Chest X-ray · portable AP; Ultrasound KUB
Pending: Echocardiogram order; Repeat renal panel; Document respiratory support and fluid balance.
Continuity: Critical pulmonary oedema with renal dysfunction. Pending echo must not appear as an available imaging result.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Echocardiogram order — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Repeat renal panel — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Document respiratory support and fluid balance — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0016 — Nisha Thomas, 42F

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Hypertension; Severe symptomatic hyponatraemia; Recent vomiting.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

A witnessed seizure followed by confusion with profound hyponatraemia; cause remains under evaluation.

Prior hypertension follow-up and a recently recorded thiazide prescription are available. Family describes worsening nausea and confusion.

Critical-state rationale: Sodium 112 mmol/L with documented seizure and GCS 11/15 after the event.

Context: Husband is the source for the seizure history. Prior prescriptions are available for reconciliation.

Occupation: Laboratory administrator. Preferred language: Malayalam, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Hypertension diagnosis and baseline electrolytes.
  Record: 00000041-0000-4000-8000-000000016001
- 2025-12-11T02:00:00.000Z: OPD, completed. Blood-pressure follow-up.
  Record: 00000041-0000-4000-8000-000000016002
- 2026-06-09T02:00:00.000Z: OPD, completed. Routine renal function monitoring.
  Record: 00000041-0000-4000-8000-000000016003
- 2026-08-24T02:00:00.000Z: OPD, completed. Antihypertensive prescription change recorded.
  Record: 00000041-0000-4000-8000-000000016004
- 2026-09-07T02:00:00.000Z: IPD, active. A witnessed seizure followed by confusion with profound hyponatraemia; cause remains under evaluation.
  Record: 00000041-0000-4000-8000-000000016005

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT head · non-contrast

Source: MockRIS; record: 00000047-0000-4000-8000-000000016001; order: 00000048-0000-4000-8000-000000016001.

No acute intracranial haemorrhage or mass effect. Metabolic causes require clinical and laboratory assessment.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000016005; order: 00000043-0000-4000-8000-000000016005.

Synthetic results associated with this encounter. Sodium 112 mmol/L (low); Potassium 3.1 mmol/L (low); Creatinine 1 mg/dL (normal); Serum osmolality 238 mOsm/kg (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000016004; order: 00000043-0000-4000-8000-000000016004.

Synthetic results associated with this encounter. Sodium 132 mmol/L (low); Potassium 3.5 mmol/L (normal); Creatinine 0.9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000016003; order: 00000043-0000-4000-8000-000000016003.

Synthetic results associated with this encounter. Sodium 136 mmol/L (normal); Potassium 3.8 mmol/L (normal); Creatinine 0.8 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000016002; order: 00000043-0000-4000-8000-000000016002.

Synthetic results associated with this encounter. Sodium 138 mmol/L (normal); Potassium 4 mmol/L (normal); Creatinine 0.8 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000016001; order: 00000043-0000-4000-8000-000000016001.

Synthetic results associated with this encounter. Sodium 139 mmol/L (normal); Potassium 4.1 mmol/L (normal); Creatinine 0.7 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Hydrochlorothiazide, 12.5 mg, oral, Once daily; held. Admission record notes hold while hyponatraemia is evaluated; causality is not established by this fixture.

### Department coordination

Nephrology → Internal Medicine: Review seizure history and possible systemic contributors to hyponatraemia. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

A witnessed seizure followed by confusion with profound hyponatraemia; cause remains under evaluation.
Background: Prior hypertension follow-up and a recently recorded thiazide prescription are available. Family describes worsening nausea and confusion.
Recorded acuity: Sodium 112 mmol/L with documented seizure and GCS 11/15 after the event.
History source and context: Husband is the source for the seizure history. Prior prescriptions are available for reconciliation.
Available results: Sodium 112 mmol/L; Potassium 3.1 mmol/L; Creatinine 1 mg/dL; Serum osmolality 238 mOsm/kg.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Post-seizure, confused, sodium critically low. Thiazide held as a likely contributor pending further evaluation.
Plan: Careful controlled sodium correction per protocol, neurological monitoring, serial sodium levels. Internal Medicine consulted.

#### Ward round — today, morning round

Findings: More alert than admission. No further seizure activity documented overnight.
Plan: Continue controlled correction, avoiding overly rapid rise. Repeat sodium and urine studies. Ongoing neurological reassessment.

#### Latest progress and pending work

Critical symptomatic electrolyte disturbance. No sodium correction rate or treatment dose is generated in this demo.
Pending: Serial sodium results; Urine osmolality and sodium; Document neurological reassessment.
Department question (Internal Medicine): Review seizure history and possible systemic contributors to hyponatraemia. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: A witnessed seizure followed by confusion with profound hyponatraemia; cause remains under evaluation.
Background: Prior hypertension follow-up and a recently recorded thiazide prescription are available. Family describes worsening nausea and confusion.
Recent results: Nephrology laboratory review; CT head · non-contrast
Pending: Serial sodium results; Urine osmolality and sodium; Document neurological reassessment.
Continuity: Critical symptomatic electrolyte disturbance. No sodium correction rate or treatment dose is generated in this demo.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Serial sodium results — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Urine osmolality and sodium — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Document neurological reassessment — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0017 — Vikram Singh, 55M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Type 2 Diabetes; Hypertension; Pelvic fracture after road traffic injury; Haemodynamic instability.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Pelvic pain after a road traffic injury with hypotension and falling haemoglobin.

Earlier diabetes and musculoskeletal visits exist at this hospital. Current trauma is a new event, not a continuation of old knee pain.

Critical-state rationale: BP 82/48 mmHg, pulse 132/min and haemoglobin 7.1 g/dL with pelvic fracture.

Context: Colleague provides mechanism and injury time; wife supplies chronic prescriptions. No real accident details are used.

Occupation: Warehouse supervisor. Preferred language: Hindi, Punjabi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Knee pain OPD assessment.
  Record: 00000041-0000-4000-8000-000000017001
- 2025-12-11T02:00:00.000Z: OPD, completed. Diabetes review before physiotherapy.
  Record: 00000041-0000-4000-8000-000000017002
- 2026-06-09T02:00:00.000Z: OPD, completed. Follow-up for improved knee symptoms.
  Record: 00000041-0000-4000-8000-000000017003
- 2026-08-24T02:00:00.000Z: OPD, completed. Routine hypertension review before the unrelated trauma.
  Record: 00000041-0000-4000-8000-000000017004
- 2026-09-07T02:00:00.000Z: IPD, active. Pelvic pain after a road traffic injury with hypotension and falling haemoglobin.
  Record: 00000041-0000-4000-8000-000000017005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Pelvis X-ray · AP

Source: MockRIS; record: 00000047-0000-4000-8000-000000017001; order: 00000048-0000-4000-8000-000000017001.

Disruption of the pelvic ring with pubic rami fractures. Plain radiograph cannot quantify active haemorrhage.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000017005; order: 00000043-0000-4000-8000-000000017005.

Synthetic results associated with this encounter. Haemoglobin 7.1 g/dL (low); Creatinine 1.7 mg/dL (high); Lactate 5.2 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000017004; order: 00000043-0000-4000-8000-000000017004.

Synthetic results associated with this encounter. Haemoglobin 13.2 g/dL (normal); Creatinine 1.1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000017003; order: 00000043-0000-4000-8000-000000017003.

Synthetic results associated with this encounter. Haemoglobin 13.4 g/dL (normal); Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000017002; order: 00000043-0000-4000-8000-000000017002.

Synthetic results associated with this encounter. Haemoglobin 13.5 g/dL (normal); Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000017001; order: 00000043-0000-4000-8000-000000017001.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metformin, 500 mg, oral, Twice daily; held. Home medication held in the recorded acute trauma assessment.

### Department coordination

Orthopaedics → Internal Medicine: Review metabolic comorbidity and organ function alongside trauma-team management. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Pelvic pain after a road traffic injury with hypotension and falling haemoglobin.
Background: Earlier diabetes and musculoskeletal visits exist at this hospital. Current trauma is a new event, not a continuation of old knee pain.
Recorded acuity: BP 82/48 mmHg, pulse 132/min and haemoglobin 7.1 g/dL with pelvic fracture.
History source and context: Colleague provides mechanism and injury time; wife supplies chronic prescriptions. No real accident details are used.
Available results: Haemoglobin 7.1 g/dL; Creatinine 1.7 mg/dL; Lactate 5.2 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Hypotensive, pelvic fracture confirmed, haemoglobin falling. Trauma team managing haemorrhage control.
Plan: Blood transfusion per protocol, pelvic binder, urgent trauma procedure planning. Internal Medicine consulted for comorbidity management.

#### Ward round — today, morning round

Findings: Haemodynamics more stable post-transfusion. Haemoglobin trending up on repeat.
Plan: Continue supportive care. Repeat CBC and perfusion assessment. Await trauma procedure documentation.

#### Latest progress and pending work

Critical trauma scenario. Trauma surgery, anaesthesia and blood-bank participation are acknowledged in notes but are outside the five demo queue departments.
Pending: Trauma procedure documentation; Repeat CBC and perfusion assessment; Blood-bank compatibility report.
Department question (Internal Medicine): Review metabolic comorbidity and organ function alongside trauma-team management. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Pelvic pain after a road traffic injury with hypotension and falling haemoglobin.
Background: Earlier diabetes and musculoskeletal visits exist at this hospital. Current trauma is a new event, not a continuation of old knee pain.
Recent results: Orthopaedics laboratory review; Pelvis X-ray · AP
Pending: Trauma procedure documentation; Repeat CBC and perfusion assessment; Blood-bank compatibility report.
Continuity: Critical trauma scenario. Trauma surgery, anaesthesia and blood-bank participation are acknowledged in notes but are outside the five demo queue departments.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Trauma procedure documentation — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Repeat CBC and perfusion assessment — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Blood-bank compatibility report — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0018 — Meena Joshi, 67F

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Type 2 Diabetes; Knee osteoarthritis; Suspected septic arthritis; Sepsis with organ dysfunction.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Hot swollen right knee, inability to bear weight, fever and hypotension. Joint aspirate is inflammatory; culture is pending.

Known knee osteoarthritis with previous nonoperative follow-up. Now presents with an acutely swollen painful knee and fever, distinct from prior mechanical pain.

Critical-state rationale: BP 88/52 mmHg, temperature 39°C and lactate 3.8 mmol/L with suspected joint infection.

Context: Uses a walking stick at baseline; daughter describes the new loss of mobility.

Occupation: Retired postal employee. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Osteoarthritis assessment and weight-bearing radiograph.
  Record: 00000041-0000-4000-8000-000000018001
- 2025-12-11T02:00:00.000Z: OPD, completed. Physiotherapy follow-up.
  Record: 00000041-0000-4000-8000-000000018002
- 2026-06-09T02:00:00.000Z: OPD, completed. Diabetes review before considering elective surgery.
  Record: 00000041-0000-4000-8000-000000018003
- 2026-08-24T02:00:00.000Z: OPD, completed. OPD review without fever or joint warmth at that visit.
  Record: 00000041-0000-4000-8000-000000018004
- 2026-09-07T02:00:00.000Z: IPD, active. Hot swollen right knee, inability to bear weight, fever and hypotension. Joint aspirate is inflammatory; culture is pending.
  Record: 00000041-0000-4000-8000-000000018005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Right knee ultrasound

Source: MockRIS; record: 00000047-0000-4000-8000-000000018001; order: 00000048-0000-4000-8000-000000018001.

Large complex joint effusion with synovial thickening. Imaging alone cannot confirm the organism or distinguish every cause of inflammation.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000018005; order: 00000043-0000-4000-8000-000000018005.

Synthetic results associated with this encounter. WBC 19.6 10^9/L (high); Creatinine 1.8 mg/dL (high); CRP 186 mg/L (high); Lactate 3.8 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000018004; order: 00000043-0000-4000-8000-000000018004.

Synthetic results associated with this encounter. WBC 7.8 10^9/L (normal); Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000018003; order: 00000043-0000-4000-8000-000000018003.

Synthetic results associated with this encounter. WBC 8 10^9/L (normal); Creatinine 0.9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000018002; order: 00000043-0000-4000-8000-000000018002.

Synthetic results associated with this encounter. WBC 7.4 10^9/L (normal); Creatinine 0.9 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000018001; order: 00000043-0000-4000-8000-000000018001.

Synthetic results associated with this encounter. WBC 7.1 10^9/L (normal); Creatinine 0.8 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Paracetamol, 500 mg, oral, As needed in previous prescription; historical. Prior osteoarthritis prescription, not a current sepsis treatment chart.

### Department coordination

Orthopaedics → Internal Medicine: Evaluate systemic infection and glucose/renal context alongside orthopaedic assessment. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Hot swollen right knee, inability to bear weight, fever and hypotension. Joint aspirate is inflammatory; culture is pending.
Background: Known knee osteoarthritis with previous nonoperative follow-up. Now presents with an acutely swollen painful knee and fever, distinct from prior mechanical pain.
Recorded acuity: BP 88/52 mmHg, temperature 39°C and lactate 3.8 mmol/L with suspected joint infection.
History source and context: Uses a walking stick at baseline; daughter describes the new loss of mobility.
Available results: WBC 19.6 10^9/L; Creatinine 1.8 mg/dL; CRP 186 mg/L; Lactate 3.8 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Procedure / physiological study record

Diagnostic knee aspiration recorded; turbid aspirate sent to the laboratory. No organism or washout completion is assumed.

#### Knee joint aspiration — earlier osteoarthritis follow-up

Prior aspiration for symptomatic relief on file; distinct from the current diagnostic aspiration for suspected infection.

#### Ward round — admission day

Findings: Hot swollen knee, febrile, hypotensive. Joint aspirate inflammatory, culture pending. Working diagnosis of septic arthritis.
Plan: Empirical antibiotics, urgent joint washout planning, fluid resuscitation. Internal Medicine consulted for glucose and renal context.

#### Ward round — today, morning round

Findings: Fever trending down. Blood pressure stable on current support.
Plan: Continue antibiotics pending culture. Repeat renal panel and lactate. Await joint procedure completion note.

#### Latest progress and pending work

Critical systemic infection scenario. Joint culture is pending and septic arthritis remains a documented working diagnosis.
Pending: Synovial fluid culture; Joint procedure completion note; Repeat renal panel and lactate.
Department question (Internal Medicine): Evaluate systemic infection and glucose/renal context alongside orthopaedic assessment. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Hot swollen right knee, inability to bear weight, fever and hypotension. Joint aspirate is inflammatory; culture is pending.
Background: Known knee osteoarthritis with previous nonoperative follow-up. Now presents with an acutely swollen painful knee and fever, distinct from prior mechanical pain.
Recent results: Orthopaedics laboratory review; Right knee ultrasound
Pending: Synovial fluid culture; Joint procedure completion note; Repeat renal panel and lactate.
Continuity: Critical systemic infection scenario. Joint culture is pending and septic arthritis remains a documented working diagnosis.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Synovial fluid culture — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Joint procedure completion note — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Repeat renal panel and lactate — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0019 — Anjali Bose, 36F

Department: Orthopaedics. Acuity at snapshot: noncritical.

Conditions: Closed distal radius fracture.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Wrist pain and swelling. Fingers warm, capillary refill under two seconds and no documented sensory deficit.

First encounter at this hospital after a fall onto an outstretched hand. No earlier hospital chart is available; patient-reported history is kept separate.

Critical-state rationale: Stable observations and intact recorded distal neurovascular examination.

Context: Works at a computer and asks about return-to-work planning. Patient-reported absence of known chronic disease is not equivalent to verified lifelong history.

Occupation: Graphic designer. Preferred language: Bengali, English.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: OPD, active. Wrist pain and swelling. Fingers warm, capillary refill under two seconds and no documented sensory deficit.
  Record: 00000041-0000-4000-8000-000000019001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Left wrist X-ray · AP and lateral

Source: MockRIS; record: 00000047-0000-4000-8000-000000019001; order: 00000048-0000-4000-8000-000000019001.

Extra-articular distal radius fracture with dorsal angulation. No associated dislocation described.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Internal Medicine: Review patient-reported medical history if procedural assessment is required. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Wrist pain and swelling. Fingers warm, capillary refill under two seconds and no documented sensory deficit.
Background: First encounter at this hospital after a fall onto an outstretched hand. No earlier hospital chart is available; patient-reported history is kept separate.
Recorded acuity: Stable observations and intact recorded distal neurovascular examination.
History source and context: Works at a computer and asks about return-to-work planning. Patient-reported absence of known chronic disease is not equivalent to verified lifelong history.
Available results: No laboratory results recorded.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Latest progress and pending work

Stable first-visit fracture case. No invented historical admissions or routine laboratory panels.
Pending: Fracture management review note; Follow-up radiograph appointment.
Department question (Internal Medicine): Review patient-reported medical history if procedural assessment is required. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Wrist pain and swelling. Fingers warm, capillary refill under two seconds and no documented sensory deficit.
Background: First encounter at this hospital after a fall onto an outstretched hand. No earlier hospital chart is available; patient-reported history is kept separate.
Recent results: Left wrist X-ray · AP and lateral
Pending: Fracture management review note; Follow-up radiograph appointment.
Continuity: Stable first-visit fracture case. No invented historical admissions or routine laboratory panels.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Fracture management review note — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Follow-up radiograph appointment — Dr. Nikhil Joshi; due 2026-09-14T04:00:00.000Z.

## F-DEMO-0020 — Manoj Reddy, 60M

Department: Orthopaedics. Acuity at snapshot: noncritical.

Conditions: Bilateral knee osteoarthritis; Patient-reported hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Pain with stairs and walking; no fever, acutely hot joint or recent trauma recorded.

First hospital visit for chronic mechanical knee pain. External prescriptions are not yet available and have not been invented.

Critical-state rationale: Stable outpatient presentation without documented acute red flags.

Context: Prefers Telugu for detailed discussion and English for written appointment instructions.

Occupation: Retired sales representative. Preferred language: Telugu, English.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: OPD, active. Pain with stairs and walking; no fever, acutely hot joint or recent trauma recorded.
  Record: 00000041-0000-4000-8000-000000020001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Bilateral knee X-ray · weight-bearing

Source: MockRIS; record: 00000047-0000-4000-8000-000000020001; order: 00000048-0000-4000-8000-000000020001.

Medial compartment joint-space narrowing with marginal osteophytes bilaterally. No acute fracture.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000020001; order: 00000043-0000-4000-8000-000000020001.

Synthetic results associated with this encounter. Creatinine 1.1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Internal Medicine: Reconcile reported hypertension and external medication history before future procedural planning. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Pain with stairs and walking; no fever, acutely hot joint or recent trauma recorded.
Background: First hospital visit for chronic mechanical knee pain. External prescriptions are not yet available and have not been invented.
Recorded acuity: Stable outpatient presentation without documented acute red flags.
History source and context: Prefers Telugu for detailed discussion and English for written appointment instructions.
Available results: Creatinine 1.1 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Latest progress and pending work

Stable first visit. Existing hypertension is patient-reported; previous hospital records are unavailable.
Pending: Obtain external prescription history; Physiotherapy and follow-up documentation.
Department question (Internal Medicine): Reconcile reported hypertension and external medication history before future procedural planning. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Pain with stairs and walking; no fever, acutely hot joint or recent trauma recorded.
Background: First hospital visit for chronic mechanical knee pain. External prescriptions are not yet available and have not been invented.
Recent results: Orthopaedics laboratory review; Bilateral knee X-ray · weight-bearing
Pending: Obtain external prescription history; Physiotherapy and follow-up documentation.
Continuity: Stable first visit. Existing hypertension is patient-reported; previous hospital records are unavailable.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Obtain external prescription history — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Physiotherapy and follow-up documentation — Dr. Nikhil Joshi; due 2026-09-14T04:00:00.000Z.

## F-DEMO-0021 — Meenal Kulkarni, 27F

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Dengue haemorrhagic fever; Thrombocytopenia; Plasma leakage with warning signs.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Postural dizziness, persistent vomiting and abdominal tenderness with a falling platelet count and rising haematocrit on the recorded trend.

Four days of high fever followed by defervescence with worsening abdominal pain and lethargy — the recorded pattern is consistent with the critical phase of dengue, not a new unrelated illness.

Critical-state rationale: Platelets 18,000/µL, narrowing pulse pressure and documented warning signs for plasma leakage.

Context: Lives with roommates in a shared flat; recent cluster of fever cases reported in the building, not independently verified.

Occupation: Textile designer. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Fever onset assessed; dengue NS1 sent.
  Record: 00000041-0000-4000-8000-000000021001
- 2025-12-11T02:00:00.000Z: OPD, completed. Fever persisting; platelet trend requested.
  Record: 00000041-0000-4000-8000-000000021002
- 2026-06-09T02:00:00.000Z: OPD, completed. Defervescence with new abdominal pain.
  Record: 00000041-0000-4000-8000-000000021003
- 2026-08-24T02:00:00.000Z: IPD, completed. Warning signs identified; admission advised.
  Record: 00000041-0000-4000-8000-000000021004
- 2026-09-07T02:00:00.000Z: IPD, active. Postural dizziness, persistent vomiting and abdominal tenderness with a falling platelet count and rising haematocrit on the recorded trend.
  Record: 00000041-0000-4000-8000-000000021005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000021001; order: 00000048-0000-4000-8000-000000021001.

Small right pleural effusion and mild gallbladder wall oedema. No free intraperitoneal fluid described.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000021005; order: 00000043-0000-4000-8000-000000021005.

Synthetic results associated with this encounter. Platelets 18 10^9/L (low); Haematocrit 51 % (high); WBC 2.6 10^9/L (low); ALT 180 U/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000021004; order: 00000043-0000-4000-8000-000000021004.

Synthetic results associated with this encounter. Platelets 38 10^9/L (low); Haematocrit 47 % (high); WBC 2.8 10^9/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000021003; order: 00000043-0000-4000-8000-000000021003.

Synthetic results associated with this encounter. Platelets 62 10^9/L (low); Haematocrit 43 % (normal); WBC 3.2 10^9/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000021002; order: 00000043-0000-4000-8000-000000021002.

Synthetic results associated with this encounter. Platelets 95 10^9/L (low); Haematocrit 40 % (normal); WBC 4.1 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000021001; order: 00000043-0000-4000-8000-000000021001.

Synthetic results associated with this encounter. Platelets 140 10^9/L (low); Haematocrit 38 % (normal); WBC 5.2 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Paracetamol, 500 mg, oral, As needed, avoiding NSAIDs; documented_home. Home antipyretic use prior to admission; bleeding-risk medications specifically avoided in the documented history.

### Department coordination

Internal Medicine → Nephrology: Advise on fluid management strategy given plasma leakage and falling urine output risk. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Postural dizziness, persistent vomiting and abdominal tenderness with a falling platelet count and rising haematocrit on the recorded trend.
Background: Four days of high fever followed by defervescence with worsening abdominal pain and lethargy — the recorded pattern is consistent with the critical phase of dengue, not a new unrelated illness.
Recorded acuity: Platelets 18,000/µL, narrowing pulse pressure and documented warning signs for plasma leakage.
History source and context: Lives with roommates in a shared flat; recent cluster of fever cases reported in the building, not independently verified.
Available results: Platelets 18 10^9/L; Haematocrit 51 %; WBC 2.6 10^9/L; ALT 180 U/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Alert, postural dizziness on standing. Platelets falling, haematocrit rising — critical phase confirmed.
Plan: Careful isotonic fluid titration per haematocrit trend. Strict input-output charting. Avoid unnecessary invasive procedures.

#### Ward round — today, morning round

Findings: Haemodynamically stable overnight. No new bleeding manifestations documented.
Plan: Continue fluid titration. Repeat platelet count. Reassess for defervescence and recovery phase.

#### Latest progress and pending work

Critical phase of dengue with warning signs; platelet transfusion is not indicated by count alone and is not assumed here.
Pending: Repeat platelet count and haematocrit; Monitor for bleeding manifestations; Fluid balance chart reconciliation.
Department question (Nephrology): Advise on fluid management strategy given plasma leakage and falling urine output risk. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Postural dizziness, persistent vomiting and abdominal tenderness with a falling platelet count and rising haematocrit on the recorded trend.
Background: Four days of high fever followed by defervescence with worsening abdominal pain and lethargy — the recorded pattern is consistent with the critical phase of dengue, not a new unrelated illness.
Recent results: Internal Medicine laboratory review; Ultrasound abdomen
Pending: Repeat platelet count and haematocrit; Monitor for bleeding manifestations; Fluid balance chart reconciliation.
Continuity: Critical phase of dengue with warning signs; platelet transfusion is not indicated by count alone and is not assumed here.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat platelet count and haematocrit — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Monitor for bleeding manifestations — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Fluid balance chart reconciliation — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0022 — Iqbal Ahmed, 41M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Severe Plasmodium falciparum malaria; Acute kidney injury; Jaundice.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

High-grade fever with rigors, dark urine and new jaundice, with reduced urine output over the preceding day.

Returned from a work route through a malaria-endemic district ten days before presenting with cyclical fever; this travel history is patient-reported and recorded as such.

Critical-state rationale: Parasitaemia documented at 8%, creatinine 3.1 mg/dL and bilirubin 6.4 mg/dL meeting severe-malaria criteria as recorded.

Context: Work requires frequent travel; wife provides history since patient is intermittently drowsy. No prior malaria episodes documented at this hospital.

Occupation: Long-haul truck driver. Preferred language: Hindi, Urdu.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Fever with rigors assessed; peripheral smear requested.
  Record: 00000041-0000-4000-8000-000000022001
- 2025-12-11T02:00:00.000Z: OPD, completed. Smear positive for P. falciparum; treatment started.
  Record: 00000041-0000-4000-8000-000000022002
- 2026-06-09T02:00:00.000Z: OPD, completed. Persistent fever with new dark urine.
  Record: 00000041-0000-4000-8000-000000022003
- 2026-08-24T02:00:00.000Z: IPD, completed. Reduced urine output prompted admission.
  Record: 00000041-0000-4000-8000-000000022004
- 2026-09-07T02:00:00.000Z: IPD, active. High-grade fever with rigors, dark urine and new jaundice, with reduced urine output over the preceding day.
  Record: 00000041-0000-4000-8000-000000022005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000022001; order: 00000048-0000-4000-8000-000000022001.

Mild splenomegaly and hepatomegaly. No biliary obstruction. Kidneys are normal in size with preserved cortico-medullary differentiation.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000022005; order: 00000043-0000-4000-8000-000000022005.

Synthetic results associated with this encounter. Haemoglobin 8.8 g/dL (low); Creatinine 3.1 mg/dL (high); Total bilirubin 6.4 mg/dL (high); Platelets 40 10^9/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000022004; order: 00000043-0000-4000-8000-000000022004.

Synthetic results associated with this encounter. Haemoglobin 9.6 g/dL (low); Creatinine 2.5 mg/dL (high); Total bilirubin 4.8 mg/dL (high); Platelets 51 10^9/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000022003; order: 00000043-0000-4000-8000-000000022003.

Synthetic results associated with this encounter. Haemoglobin 10.9 g/dL (low); Creatinine 1.9 mg/dL (high); Total bilirubin 3.2 mg/dL (high); Platelets 64 10^9/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000022002; order: 00000043-0000-4000-8000-000000022002.

Synthetic results associated with this encounter. Haemoglobin 12.4 g/dL (low); Creatinine 1.4 mg/dL (high); Total bilirubin 1.8 mg/dL (high); Platelets 88 10^9/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000022001; order: 00000043-0000-4000-8000-000000022001.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Total bilirubin 0.9 mg/dL (normal); Platelets 130 10^9/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Artesunate, Per weight-based protocol, oral, Intravenous, per treating team; held. Administration record is outside this fixture; documented as initiated but not itemised here.

### Department coordination

Internal Medicine → Nephrology: Assess acute kidney injury and advise on renal replacement threshold in severe malaria. Status: in_progress. Response pending.
Internal Medicine → Gastroenterology: Review malarial hepatopathy and rising bilirubin for alternative causes of jaundice. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

High-grade fever with rigors, dark urine and new jaundice, with reduced urine output over the preceding day.
Background: Returned from a work route through a malaria-endemic district ten days before presenting with cyclical fever; this travel history is patient-reported and recorded as such.
Recorded acuity: Parasitaemia documented at 8%, creatinine 3.1 mg/dL and bilirubin 6.4 mg/dL meeting severe-malaria criteria as recorded.
History source and context: Work requires frequent travel; wife provides history since patient is intermittently drowsy. No prior malaria episodes documented at this hospital.
Available results: Haemoglobin 8.8 g/dL; Creatinine 3.1 mg/dL; Total bilirubin 6.4 mg/dL; Platelets 40 10^9/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Febrile, jaundiced, oliguric. Parasitaemia 8% on smear. Renal function worsening.
Plan: Continue antimalarial therapy per protocol. Nephrology and Gastroenterology consults placed. Monitor for need for renal replacement.

#### Ward round — today, morning round

Findings: Fever pattern less cyclical. Urine output marginally improved overnight.
Plan: Repeat parasitaemia and renal panel. Continue close monitoring; dialysis remains a contingency, not yet indicated.

#### Latest progress and pending work

Severe malaria with multi-organ involvement; parasitaemia clearance is not yet documented and must not be assumed.
Pending: Repeat parasitaemia count; Repeat renal panel and bilirubin; Dialysis-readiness assessment.
Department question (Nephrology): Assess acute kidney injury and advise on renal replacement threshold in severe malaria. Status: in_progress. No completed specialist response available.
Department question (Gastroenterology): Review malarial hepatopathy and rising bilirubin for alternative causes of jaundice. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: High-grade fever with rigors, dark urine and new jaundice, with reduced urine output over the preceding day.
Background: Returned from a work route through a malaria-endemic district ten days before presenting with cyclical fever; this travel history is patient-reported and recorded as such.
Recent results: Internal Medicine laboratory review; Ultrasound abdomen
Pending: Repeat parasitaemia count; Repeat renal panel and bilirubin; Dialysis-readiness assessment.
Continuity: Severe malaria with multi-organ involvement; parasitaemia clearance is not yet documented and must not be assumed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat parasitaemia count — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Repeat renal panel and bilirubin — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Dialysis-readiness assessment — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0023 — Farida Sheikh, 34F

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Graves disease; Thyroid storm; Atrial fibrillation with rapid rate.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Agitation, profuse sweating, palpitations and fever with a irregular rapid pulse on recorded assessment.

Known Graves disease with documented poor medication adherence over the past two months; presented following an upper respiratory infection, a recognised precipitant that is recorded, not inferred beyond the note.

Critical-state rationale: Heart rate 168/min with atrial fibrillation, temperature 39.8°C and documented altered mental status meeting the recorded thyroid storm criteria.

Context: Lives alone during the school term; sister is the emergency contact and confirms the adherence gap.

Occupation: Primary school teacher. Preferred language: Hindi, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Graves disease diagnosed; antithyroid therapy started.
  Record: 00000041-0000-4000-8000-000000023001
- 2025-12-11T02:00:00.000Z: OPD, completed. Dose titration visit; symptoms partially controlled.
  Record: 00000041-0000-4000-8000-000000023002
- 2026-06-09T02:00:00.000Z: OPD, completed. Missed follow-up; medication possession gap noted.
  Record: 00000041-0000-4000-8000-000000023003
- 2026-08-24T02:00:00.000Z: OPD, completed. Recent respiratory infection treated as outpatient.
  Record: 00000041-0000-4000-8000-000000023004
- 2026-09-07T02:00:00.000Z: IPD, active. Agitation, profuse sweating, palpitations and fever with a irregular rapid pulse on recorded assessment.
  Record: 00000041-0000-4000-8000-000000023005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Chest X-ray · PA view

Source: MockRIS; record: 00000047-0000-4000-8000-000000023001; order: 00000048-0000-4000-8000-000000023001.

No focal consolidation. Cardiomediastinal silhouette within normal limits for the recorded projection.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000023005; order: 00000043-0000-4000-8000-000000023005.

Synthetic results associated with this encounter. TSH 0.02 mIU/L (low); Free T4 5.4 ng/dL (high); Potassium 3.2 mmol/L (low); WBC 14.2 10^9/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000023004; order: 00000043-0000-4000-8000-000000023004.

Synthetic results associated with this encounter. Potassium 3.6 mmol/L (normal); WBC 11.8 10^9/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000023003; order: 00000043-0000-4000-8000-000000023003.

Synthetic results associated with this encounter. Potassium 3.8 mmol/L (normal); WBC 9.4 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000023002; order: 00000043-0000-4000-8000-000000023002.

Synthetic results associated with this encounter. Potassium 3.9 mmol/L (normal); WBC 8.1 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000023001; order: 00000043-0000-4000-8000-000000023001.

Synthetic results associated with this encounter. Potassium 4.1 mmol/L (normal); WBC 7.8 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Carbimazole, 15 mg, oral, Twice daily per prior prescription; historical. Documented adherence gap; not equivalent to a current administration record.

### Department coordination

Internal Medicine → Cardiology: Assess rate control strategy for atrial fibrillation in the context of thyroid storm. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Agitation, profuse sweating, palpitations and fever with a irregular rapid pulse on recorded assessment.
Background: Known Graves disease with documented poor medication adherence over the past two months; presented following an upper respiratory infection, a recognised precipitant that is recorded, not inferred beyond the note.
Recorded acuity: Heart rate 168/min with atrial fibrillation, temperature 39.8°C and documented altered mental status meeting the recorded thyroid storm criteria.
History source and context: Lives alone during the school term; sister is the emergency contact and confirms the adherence gap.
Available results: TSH 0.02 mIU/L; Free T4 5.4 ng/dL; Potassium 3.2 mmol/L; WBC 14.2 10^9/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Agitated, tachycardic, febrile. Atrial fibrillation with rapid ventricular response on monitor.
Plan: Beta-blockade and antithyroid therapy per storm protocol. Cardiology consulted for rate control. Cooling measures for fever.

#### Ward round — today, morning round

Findings: Heart rate improved overnight with treatment. Mental status clearer.
Plan: Continue current regimen. Repeat thyroid panel. Plan bridge to definitive Graves disease management once stable.

#### Latest progress and pending work

Critical thyroid storm with cardiovascular involvement; adherence gap is documented, not assumed to be the sole precipitant.
Pending: Repeat thyroid function panel; Cardiac rhythm monitoring strip review; Precipitating infection source review.
Department question (Cardiology): Assess rate control strategy for atrial fibrillation in the context of thyroid storm. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Agitation, profuse sweating, palpitations and fever with a irregular rapid pulse on recorded assessment.
Background: Known Graves disease with documented poor medication adherence over the past two months; presented following an upper respiratory infection, a recognised precipitant that is recorded, not inferred beyond the note.
Recent results: Internal Medicine laboratory review; Chest X-ray · PA view
Pending: Repeat thyroid function panel; Cardiac rhythm monitoring strip review; Precipitating infection source review.
Continuity: Critical thyroid storm with cardiovascular involvement; adherence gap is documented, not assumed to be the sole precipitant.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat thyroid function panel — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Cardiac rhythm monitoring strip review — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Precipitating infection source review — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0024 — Balvinder Singh, 68M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: COPD; Community-acquired pneumonia; Type 2 respiratory failure.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Increased breathlessness at rest, purulent sputum and accessory muscle use with a recorded reduced level of alertness.

Documented COPD with two prior hospital admissions for exacerbation; this presentation follows five days of worsening cough and breathlessness with new fever, recorded as a fresh infective trigger.

Critical-state rationale: Arterial blood gas documents pH 7.28, pCO2 68 mmHg and oxygen saturation 84% on supplemental oxygen at assessment.

Context: Former beedi smoker, reportedly quit two years ago; son manages inhaler refills.

Occupation: Retired farmer. Preferred language: Punjabi, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. COPD diagnosis and spirometry on file.
  Record: 00000041-0000-4000-8000-000000024001
- 2025-12-11T02:00:00.000Z: IPD, completed. Exacerbation admission; discharged on inhaled therapy.
  Record: 00000041-0000-4000-8000-000000024002
- 2026-06-09T02:00:00.000Z: IPD, completed. Second exacerbation admission; smoking cessation discussed.
  Record: 00000041-0000-4000-8000-000000024003
- 2026-08-24T02:00:00.000Z: OPD, completed. Stable outpatient review before the current infection.
  Record: 00000041-0000-4000-8000-000000024004
- 2026-09-07T02:00:00.000Z: IPD, active. Increased breathlessness at rest, purulent sputum and accessory muscle use with a recorded reduced level of alertness.
  Record: 00000041-0000-4000-8000-000000024005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Chest X-ray · PA view

Source: MockRIS; record: 00000047-0000-4000-8000-000000024001; order: 00000048-0000-4000-8000-000000024001.

Hyperinflated lung fields with a right lower-zone consolidation. No pneumothorax identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000024005; order: 00000043-0000-4000-8000-000000024005.

Synthetic results associated with this encounter. WBC 16.8 10^9/L (high); CRP 142 mg/L (high); Bicarbonate 28 mmol/L (normal); Creatinine 1.4 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000024004; order: 00000043-0000-4000-8000-000000024004.

Synthetic results associated with this encounter. WBC 12.6 10^9/L (high); Bicarbonate 29 mmol/L (normal); Creatinine 1.2 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000024003; order: 00000043-0000-4000-8000-000000024003.

Synthetic results associated with this encounter. WBC 8.4 10^9/L (normal); Bicarbonate 30 mmol/L (high); Creatinine 1.1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000024002; order: 00000043-0000-4000-8000-000000024002.

Synthetic results associated with this encounter. WBC 7.6 10^9/L (normal); Bicarbonate 31 mmol/L (high); Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000024001; order: 00000043-0000-4000-8000-000000024001.

Synthetic results associated with this encounter. WBC 8.1 10^9/L (normal); Bicarbonate 30 mmol/L (high); Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Tiotropium, 18 mcg, oral, Once daily inhaled; documented_home. Maintenance inhaler continued; acute nebulised therapy is not itemised in this fixture.

### Department coordination

Internal Medicine → Cardiology: Assess for cor pulmonale and right heart strain given chronic hypoxaemia and acute decompensation. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Increased breathlessness at rest, purulent sputum and accessory muscle use with a recorded reduced level of alertness.
Background: Documented COPD with two prior hospital admissions for exacerbation; this presentation follows five days of worsening cough and breathlessness with new fever, recorded as a fresh infective trigger.
Recorded acuity: Arterial blood gas documents pH 7.28, pCO2 68 mmHg and oxygen saturation 84% on supplemental oxygen at assessment.
History source and context: Former beedi smoker, reportedly quit two years ago; son manages inhaler refills.
Available results: WBC 16.8 10^9/L; CRP 142 mg/L; Bicarbonate 28 mmol/L; Creatinine 1.4 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Drowsy, tachypnoeic, using accessory muscles. ABG confirms hypercapnic respiratory failure.
Plan: Non-invasive ventilation started. Antibiotics for pneumonia. Nebulised bronchodilators. Cardiology consult for cor pulmonale.

#### Ward round — today, morning round

Findings: More alert. Tolerating non-invasive ventilation with improved gas exchange on repeat sampling.
Plan: Continue current therapy. Wean non-invasive ventilation as tolerated. Reassess sputum culture when available.

#### Latest progress and pending work

Critical hypercapnic respiratory failure on a background of COPD; non-invasive ventilation response is pending and not assumed successful.
Pending: Repeat arterial blood gas; Sputum culture report; Non-invasive ventilation response review.
Department question (Cardiology): Assess for cor pulmonale and right heart strain given chronic hypoxaemia and acute decompensation. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Increased breathlessness at rest, purulent sputum and accessory muscle use with a recorded reduced level of alertness.
Background: Documented COPD with two prior hospital admissions for exacerbation; this presentation follows five days of worsening cough and breathlessness with new fever, recorded as a fresh infective trigger.
Recent results: Internal Medicine laboratory review; Chest X-ray · PA view
Pending: Repeat arterial blood gas; Sputum culture report; Non-invasive ventilation response review.
Continuity: Critical hypercapnic respiratory failure on a background of COPD; non-invasive ventilation response is pending and not assumed successful.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat arterial blood gas — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Sputum culture report — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Non-invasive ventilation response review — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0025 — Sunanda Reddy, 29F

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Drug-induced anaphylaxis; Documented penicillin-class allergy.

Allergies: Amoxicillin-clavulanate — anaphylaxis, hospital-witnessed.

### Presentation and history

Facial and lip swelling, widespread urticaria, wheeze and recorded hypotension shortly after the witnessed exposure.

Received a first dose of amoxicillin-clavulanate for a dental infection at an outside clinic; the recorded reaction began within twenty minutes, witnessed by family who brought her directly to this hospital.

Critical-state rationale: BP 76/44 mmHg, audible stridor and oxygen saturation 89% on room air at the witnessed onset.

Context: Colleague from the pharmacy accompanied her and confirmed the exposure timeline in detail.

Occupation: Pharmacist. Preferred language: Telugu, English.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Facial and lip swelling, widespread urticaria, wheeze and recorded hypotension shortly after the witnessed exposure.
  Record: 00000041-0000-4000-8000-000000025001

### Investigation history

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000025001; order: 00000043-0000-4000-8000-000000025001.

Synthetic results associated with this encounter. Tryptase 42 ng/mL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amoxicillin-clavulanate, 625 mg, oral, Single outside-clinic dose; historical. The precipitating exposure; not a continuing prescription at this hospital.

### Department coordination


### Current notes and handover draft

#### Current clinical assessment

Facial and lip swelling, widespread urticaria, wheeze and recorded hypotension shortly after the witnessed exposure.
Background: Received a first dose of amoxicillin-clavulanate for a dental infection at an outside clinic; the recorded reaction began within twenty minutes, witnessed by family who brought her directly to this hospital.
Recorded acuity: BP 76/44 mmHg, audible stridor and oxygen saturation 89% on room air at the witnessed onset.
History source and context: Colleague from the pharmacy accompanied her and confirmed the exposure timeline in detail.
Available results: Tryptase 42 ng/mL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Latest progress and pending work

Witnessed anaphylaxis with airway involvement; observation period is ongoing and discharge is not yet approved.
Pending: Serial tryptase level; Allergy alert bracelet and chart flagging; Discharge anaphylaxis action-plan counselling.
Department question (Internal Medicine): Formal allergy documentation and post-reaction observation planning. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Facial and lip swelling, widespread urticaria, wheeze and recorded hypotension shortly after the witnessed exposure.
Background: Received a first dose of amoxicillin-clavulanate for a dental infection at an outside clinic; the recorded reaction began within twenty minutes, witnessed by family who brought her directly to this hospital.
Recent results: Internal Medicine laboratory review
Pending: Serial tryptase level; Allergy alert bracelet and chart flagging; Discharge anaphylaxis action-plan counselling.
Continuity: Witnessed anaphylaxis with airway involvement; observation period is ongoing and discharge is not yet approved.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Serial tryptase level — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Allergy alert bracelet and chart flagging — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Discharge anaphylaxis action-plan counselling — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Formal allergy documentation and post-reaction observation planning. — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0026 — Ghanshyam Yadav, 52M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Heat stroke; Acute kidney injury; Rhabdomyolysis.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Altered mental status, hot dry skin and dark urine, brought in by co-workers with a recorded core temperature well above normal.

Collapsed at an outdoor construction site during peak afternoon heat after several hours of physical labour; co-workers report he had stopped sweating shortly before collapse.

Critical-state rationale: Core temperature 41.2°C, GCS 11/15 and creatine kinase markedly elevated on the recorded panel.

Context: Co-workers report no prior heat-related illness; no independent verification of usual hydration habits.

Occupation: Construction site supervisor. Preferred language: Hindi, Bhojpuri.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Altered mental status, hot dry skin and dark urine, brought in by co-workers with a recorded core temperature well above normal.
  Record: 00000041-0000-4000-8000-000000026001

### Investigation history

#### 2026-09-07T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000026001; order: 00000043-0000-4000-8000-000000026001.

Synthetic results associated with this encounter. Creatine kinase 18400 U/L (high); Creatinine 2.6 mg/dL (high); Potassium 5.8 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Internal Medicine → Nephrology: Assess rhabdomyolysis-associated acute kidney injury and advise on fluid and renal replacement strategy. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Altered mental status, hot dry skin and dark urine, brought in by co-workers with a recorded core temperature well above normal.
Background: Collapsed at an outdoor construction site during peak afternoon heat after several hours of physical labour; co-workers report he had stopped sweating shortly before collapse.
Recorded acuity: Core temperature 41.2°C, GCS 11/15 and creatine kinase markedly elevated on the recorded panel.
History source and context: Co-workers report no prior heat-related illness; no independent verification of usual hydration habits.
Available results: Creatine kinase 18400 U/L; Creatinine 2.6 mg/dL; Potassium 5.8 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Altered mental status on arrival, hyperthermic. Aggressive cooling initiated. CK markedly elevated.
Plan: Continue active cooling to target normothermia. Aggressive intravenous fluids for rhabdomyolysis. Nephrology consult placed.

#### Ward round — today, morning round

Findings: Temperature normalised. More alert. Urine output being monitored closely.
Plan: Continue fluids and renal monitoring. Repeat CK and creatinine. Watch for compartment syndrome in affected limbs.

#### Latest progress and pending work

Critical heat stroke with rhabdomyolysis; cooling response and renal trajectory are both still pending documentation.
Pending: Repeat creatine kinase and renal panel; Core temperature trend monitoring; Urine output charting.
Department question (Nephrology): Assess rhabdomyolysis-associated acute kidney injury and advise on fluid and renal replacement strategy. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Altered mental status, hot dry skin and dark urine, brought in by co-workers with a recorded core temperature well above normal.
Background: Collapsed at an outdoor construction site during peak afternoon heat after several hours of physical labour; co-workers report he had stopped sweating shortly before collapse.
Recent results: Internal Medicine laboratory review
Pending: Repeat creatine kinase and renal panel; Core temperature trend monitoring; Urine output charting.
Continuity: Critical heat stroke with rhabdomyolysis; cooling response and renal trajectory are both still pending documentation.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat creatine kinase and renal panel — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Core temperature trend monitoring — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.
- Urine output charting — Dr. Ananya Mehta; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0027 — Harpreet Bedi, 58M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Coronary artery disease; Hypertension; Anterior STEMI.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Ongoing severe chest pain, diaphoresis and documented ST elevation on the presenting ECG.

No prior cardiac history on file. Sudden onset crushing central chest pain radiating to the left arm while at his desk, with colleagues calling emergency services within minutes.

Critical-state rationale: ST elevation across anterior leads, high-sensitivity troponin I 2400 ng/L and door-to-needle window actively being tracked.

Context: Wife is en route; colleagues provided the onset time, which is recorded as witnessed.

Occupation: Bank manager. Preferred language: Punjabi, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Routine health check; borderline blood pressure noted.
  Record: 00000041-0000-4000-8000-000000027001
- 2025-12-11T02:00:00.000Z: OPD, completed. Lipid panel review; lifestyle advice given.
  Record: 00000041-0000-4000-8000-000000027002
- 2026-06-09T02:00:00.000Z: OPD, completed. Hypertension follow-up; medication started.
  Record: 00000041-0000-4000-8000-000000027003
- 2026-08-24T02:00:00.000Z: OPD, completed. Blood pressure recheck before the current event.
  Record: 00000041-0000-4000-8000-000000027004
- 2026-09-07T02:00:00.000Z: IPD, active. Ongoing severe chest pain, diaphoresis and documented ST elevation on the presenting ECG.
  Record: 00000041-0000-4000-8000-000000027005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000027001; order: 00000048-0000-4000-8000-000000027001.

Anterior and apical akinesis. LVEF approximately 32%. No mechanical complication identified on this study.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000027005; order: 00000043-0000-4000-8000-000000027005.

Synthetic results associated with this encounter. High-sensitivity troponin I 2400 ng/L (high); Creatinine 1.1 mg/dL (normal); LDL cholesterol 148 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000027004; order: 00000043-0000-4000-8000-000000027004.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); LDL cholesterol 134 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000027003; order: 00000043-0000-4000-8000-000000027003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); LDL cholesterol 128 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000027002; order: 00000043-0000-4000-8000-000000027002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); LDL cholesterol 112 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000027001; order: 00000043-0000-4000-8000-000000027001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); LDL cholesterol 98 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Recent antihypertensive prescription; acute reperfusion therapy record is outside this fixture.

### Department coordination

Cardiology → Nephrology: Assess renal function before and after contrast exposure for the planned procedure. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Ongoing severe chest pain, diaphoresis and documented ST elevation on the presenting ECG.
Background: No prior cardiac history on file. Sudden onset crushing central chest pain radiating to the left arm while at his desk, with colleagues calling emergency services within minutes.
Recorded acuity: ST elevation across anterior leads, high-sensitivity troponin I 2400 ng/L and door-to-needle window actively being tracked.
History source and context: Wife is en route; colleagues provided the onset time, which is recorded as witnessed.
Available results: High-sensitivity troponin I 2400 ng/L; Creatinine 1.1 mg/dL; LDL cholesterol 148 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Exercise stress test — 2024

Reported as inconclusive at an outside facility; no prior angiogram or intervention on file at this hospital.

#### Ward round — admission day

Findings: Ongoing chest pain on arrival, ST elevation confirmed. Taken for emergency reperfusion assessment.
Plan: Dual antiplatelet therapy and anticoagulation per acute coronary syndrome protocol. Reperfusion procedure planned urgently.

#### Ward round — today, morning round

Findings: Pain-free post-procedure. Haemodynamically stable.
Plan: Continue dual antiplatelet therapy. Repeat troponin trend and echocardiogram. Cardiac rehabilitation referral once stable.

#### Latest progress and pending work

Critical anterior STEMI; reperfusion procedure completion is not yet documented and must not be assumed.
Pending: Primary reperfusion procedure documentation; Repeat troponin trend; Post-procedure echocardiogram.
Department question (Nephrology): Assess renal function before and after contrast exposure for the planned procedure. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Ongoing severe chest pain, diaphoresis and documented ST elevation on the presenting ECG.
Background: No prior cardiac history on file. Sudden onset crushing central chest pain radiating to the left arm while at his desk, with colleagues calling emergency services within minutes.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Primary reperfusion procedure documentation; Repeat troponin trend; Post-procedure echocardiogram.
Continuity: Critical anterior STEMI; reperfusion procedure completion is not yet documented and must not be assumed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Primary reperfusion procedure documentation — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Repeat troponin trend — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Post-procedure echocardiogram — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0028 — Lata Deshmukh, 45F

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Rheumatic mitral valve disease; Infective endocarditis; Fever of documented cardiac origin.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Persistent fever, new murmur change and recorded splinter haemorrhages on examination.

Known rheumatic valve disease under periodic review. Three weeks of intermittent fever and malaise preceded this admission, with a recent dental extraction recorded as a possible portal of entry.

Critical-state rationale: Positive blood cultures on two separate draws, a new regurgitant murmur and echocardiographic vegetation meeting the recorded diagnostic criteria.

Context: Daughter manages appointment scheduling; patient prefers detailed explanations in Marathi.

Occupation: Homemaker. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Valve clinic review; stable murmur documented.
  Record: 00000041-0000-4000-8000-000000028001
- 2025-12-11T02:00:00.000Z: OPD, completed. Annual echocardiogram; mild regurgitation noted.
  Record: 00000041-0000-4000-8000-000000028002
- 2026-06-09T02:00:00.000Z: OPD, completed. Dental extraction performed at an outside clinic.
  Record: 00000041-0000-4000-8000-000000028003
- 2026-08-24T02:00:00.000Z: OPD, completed. Fever onset assessed at an outside facility before referral.
  Record: 00000041-0000-4000-8000-000000028004
- 2026-09-07T02:00:00.000Z: IPD, active. Persistent fever, new murmur change and recorded splinter haemorrhages on examination.
  Record: 00000041-0000-4000-8000-000000028005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000028001; order: 00000048-0000-4000-8000-000000028001.

Mobile vegetation on the mitral valve with worsening regurgitation. No abscess identified on this study.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000028005; order: 00000043-0000-4000-8000-000000028005.

Synthetic results associated with this encounter. CRP 118 mg/L (high); Haemoglobin 9.6 g/dL (low); WBC 15.4 10^9/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000028004; order: 00000043-0000-4000-8000-000000028004.

Synthetic results associated with this encounter. Haemoglobin 10.2 g/dL (low); WBC 13.8 10^9/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000028003; order: 00000043-0000-4000-8000-000000028003.

Synthetic results associated with this encounter. Haemoglobin 10.8 g/dL (low); WBC 11.2 10^9/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000028002; order: 00000043-0000-4000-8000-000000028002.

Synthetic results associated with this encounter. Haemoglobin 11.4 g/dL (low); WBC 9.6 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000028001; order: 00000043-0000-4000-8000-000000028001.

Synthetic results associated with this encounter. Haemoglobin 12.1 g/dL (normal); WBC 8.4 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amoxicillin, 500 mg, oral, Prophylactic dose before dental procedure; historical. Documented as prescribed for the dental extraction; completion is not verified.

### Department coordination

Cardiology → Internal Medicine: Coordinate prolonged antibiotic therapy planning and monitor for embolic complications. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Persistent fever, new murmur change and recorded splinter haemorrhages on examination.
Background: Known rheumatic valve disease under periodic review. Three weeks of intermittent fever and malaise preceded this admission, with a recent dental extraction recorded as a possible portal of entry.
Recorded acuity: Positive blood cultures on two separate draws, a new regurgitant murmur and echocardiographic vegetation meeting the recorded diagnostic criteria.
History source and context: Daughter manages appointment scheduling; patient prefers detailed explanations in Marathi.
Available results: CRP 118 mg/L; Haemoglobin 9.6 g/dL; WBC 15.4 10^9/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Febrile, new regurgitant murmur. Blood cultures sent, echocardiogram confirms vegetation.
Plan: Empirical then culture-directed intravenous antibiotics. Internal Medicine consulted. Monitor for embolic phenomena.

#### Ward round — today, morning round

Findings: Fever trend improving. No new embolic signs on examination.
Plan: Continue antibiotic course. Repeat cultures for clearance. Reassess valve for surgical referral if deterioration.

#### Latest progress and pending work

Critical infective endocarditis on a rheumatic valve; surgical referral threshold has not yet been met per the recorded findings.
Pending: Repeat blood cultures for clearance; Serial echocardiogram for vegetation size; Dental source review.
Department question (Internal Medicine): Coordinate prolonged antibiotic therapy planning and monitor for embolic complications. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Persistent fever, new murmur change and recorded splinter haemorrhages on examination.
Background: Known rheumatic valve disease under periodic review. Three weeks of intermittent fever and malaise preceded this admission, with a recent dental extraction recorded as a possible portal of entry.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Repeat blood cultures for clearance; Serial echocardiogram for vegetation size; Dental source review.
Continuity: Critical infective endocarditis on a rheumatic valve; surgical referral threshold has not yet been met per the recorded findings.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat blood cultures for clearance — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Serial echocardiogram for vegetation size — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Dental source review — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0029 — Devendra Choudhary, 61M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Acute pulmonary embolism; Right heart strain; Recent lower-limb immobility.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Sudden breathlessness, pleuritic chest pain and documented tachycardia with a swollen tender right calf.

Documented three-day inter-state bus journey with prolonged sitting preceded acute breathlessness; a recent right calf swelling was noted by the patient but not previously assessed.

Critical-state rationale: Oxygen saturation 88% on room air, right heart strain on echocardiogram and a high-probability CT pulmonary angiogram finding as recorded.

Context: Union colleague accompanied him; occupation involves recurrent long-duration travel, documented as a risk factor without further inference.

Occupation: Long-distance bus driver. Preferred language: Hindi, Rajasthani.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Sudden breathlessness, pleuritic chest pain and documented tachycardia with a swollen tender right calf.
  Record: 00000041-0000-4000-8000-000000029001

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT pulmonary angiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000029001; order: 00000048-0000-4000-8000-000000029001.

Filling defects in the right and left main pulmonary arteries consistent with acute embolism. Right ventricular dilatation noted.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000029001; order: 00000043-0000-4000-8000-000000029001.

Synthetic results associated with this encounter. D-dimer 4200 ng/mL (high); Troponin I 58 ng/L (high); Creatinine 1.1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Cardiology → Internal Medicine: Assess for an underlying provoking or hypercoagulable cause given the immobility history. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Sudden breathlessness, pleuritic chest pain and documented tachycardia with a swollen tender right calf.
Background: Documented three-day inter-state bus journey with prolonged sitting preceded acute breathlessness; a recent right calf swelling was noted by the patient but not previously assessed.
Recorded acuity: Oxygen saturation 88% on room air, right heart strain on echocardiogram and a high-probability CT pulmonary angiogram finding as recorded.
History source and context: Union colleague accompanied him; occupation involves recurrent long-duration travel, documented as a risk factor without further inference.
Available results: D-dimer 4200 ng/mL; Troponin I 58 ng/L; Creatinine 1.1 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Tachypnoeic, hypoxic, right heart strain on echo. High-probability CT pulmonary angiogram.
Plan: Therapeutic anticoagulation started. Monitor for haemodynamic deterioration; thrombolysis threshold under review.

#### Ward round — today, morning round

Findings: Oxygen requirement reducing. Heart rate trending down.
Plan: Continue anticoagulation. Doppler ultrasound of the right leg. Plan bridge to oral anticoagulation once stable.

#### Latest progress and pending work

Critical pulmonary embolism with right heart strain; thrombolysis has not been given and is not assumed.
Pending: Anticoagulation response monitoring; Lower-limb Doppler ultrasound; Risk-stratification review for thrombolysis threshold.
Department question (Internal Medicine): Assess for an underlying provoking or hypercoagulable cause given the immobility history. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Sudden breathlessness, pleuritic chest pain and documented tachycardia with a swollen tender right calf.
Background: Documented three-day inter-state bus journey with prolonged sitting preceded acute breathlessness; a recent right calf swelling was noted by the patient but not previously assessed.
Recent results: Cardiology laboratory review; CT pulmonary angiogram
Pending: Anticoagulation response monitoring; Lower-limb Doppler ultrasound; Risk-stratification review for thrombolysis threshold.
Continuity: Critical pulmonary embolism with right heart strain; thrombolysis has not been given and is not assumed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Anticoagulation response monitoring — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Lower-limb Doppler ultrasound — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Risk-stratification review for thrombolysis threshold — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0030 — Christina Fernandes, 55F

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Hypertension; Acute type A aortic dissection.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Severe tearing interscapular pain with a documented blood pressure differential between the two arms on assessment.

Longstanding poorly controlled hypertension on file. Sudden tearing chest and back pain began at rest with no preceding exertion recorded.

Critical-state rationale: Systolic blood pressure differential of 42 mmHg between limbs and CT angiogram findings meeting the recorded criteria for type A dissection.

Context: Husband is present and providing history; patient is alert and answering independently.

Occupation: Hospital administrator. Preferred language: English, Konkani.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Hypertension diagnosed; medication started.
  Record: 00000041-0000-4000-8000-000000030001
- 2025-12-11T02:00:00.000Z: OPD, completed. Poor control noted; dose increased.
  Record: 00000041-0000-4000-8000-000000030002
- 2026-06-09T02:00:00.000Z: OPD, completed. Missed follow-up recorded.
  Record: 00000041-0000-4000-8000-000000030003
- 2026-08-24T02:00:00.000Z: OPD, completed. OPD review before the current acute event.
  Record: 00000041-0000-4000-8000-000000030004
- 2026-09-07T02:00:00.000Z: IPD, active. Severe tearing interscapular pain with a documented blood pressure differential between the two arms on assessment.
  Record: 00000041-0000-4000-8000-000000030005

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT angiogram · aorta

Source: MockRIS; record: 00000047-0000-4000-8000-000000030001; order: 00000048-0000-4000-8000-000000030001.

Intimal flap extending from the ascending aorta into the aortic arch, consistent with type A dissection. True and false lumina identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000030005; order: 00000043-0000-4000-8000-000000030005.

Synthetic results associated with this encounter. Creatinine 1.3 mg/dL (high); Haemoglobin 11.2 g/dL (low); Lactate 3.6 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000030004; order: 00000043-0000-4000-8000-000000030004.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000030003; order: 00000043-0000-4000-8000-000000030003.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.6 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000030002; order: 00000043-0000-4000-8000-000000030002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000030001; order: 00000043-0000-4000-8000-000000030001.

Synthetic results associated with this encounter. Creatinine 0.8 mg/dL (normal); Haemoglobin 13.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 10 mg, oral, Once daily; documented_home. Recorded outpatient prescription; inpatient blood-pressure control chart is outside this fixture.

### Department coordination

Cardiology → Nephrology: Assess renal perfusion status given the dissection extent and rising creatinine. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe tearing interscapular pain with a documented blood pressure differential between the two arms on assessment.
Background: Longstanding poorly controlled hypertension on file. Sudden tearing chest and back pain began at rest with no preceding exertion recorded.
Recorded acuity: Systolic blood pressure differential of 42 mmHg between limbs and CT angiogram findings meeting the recorded criteria for type A dissection.
History source and context: Husband is present and providing history; patient is alert and answering independently.
Available results: Creatinine 1.3 mg/dL; Haemoglobin 11.2 g/dL; Lactate 3.6 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Severe pain, limb blood-pressure differential confirmed, CT angiogram diagnostic. Surgical team notified urgently.
Plan: Aggressive blood-pressure and heart-rate control. Urgent surgical evaluation. Serial limb-perfusion checks.

#### Ward round — today, morning round

Findings: Pain better controlled. Blood pressure trending toward target range.
Plan: Continue tight blood-pressure control pending surgical decision. Repeat renal panel and imaging as directed.

#### Latest progress and pending work

Critical type A aortic dissection; surgical evaluation outcome is pending and not assumed completed.
Pending: Urgent surgical evaluation documentation; Serial blood-pressure and limb-perfusion checks; Repeat renal panel.
Department question (Nephrology): Assess renal perfusion status given the dissection extent and rising creatinine. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe tearing interscapular pain with a documented blood pressure differential between the two arms on assessment.
Background: Longstanding poorly controlled hypertension on file. Sudden tearing chest and back pain began at rest with no preceding exertion recorded.
Recent results: Cardiology laboratory review; CT angiogram · aorta
Pending: Urgent surgical evaluation documentation; Serial blood-pressure and limb-perfusion checks; Repeat renal panel.
Continuity: Critical type A aortic dissection; surgical evaluation outcome is pending and not assumed completed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Urgent surgical evaluation documentation — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Serial blood-pressure and limb-perfusion checks — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Repeat renal panel — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0031 — Waseem Akhtar, 47M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Coronary artery disease; Ventricular tachycardia; Post cardiac arrest state.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Post-resuscitation drowsiness with a recorded return of spontaneous circulation and ongoing rhythm monitoring.

Witnessed collapse at home with bystander CPR started within two minutes; paramedics documented ventricular tachycardia on the first rhythm check and delivered a shock before transport.

Critical-state rationale: Witnessed cardiac arrest, shockable rhythm and GCS 9/15 on arrival following return of spontaneous circulation.

Context: Wife witnessed the collapse and performed initial CPR; this is documented as bystander-witnessed, not assumed effective.

Occupation: Electrician. Preferred language: Urdu, Hindi.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Post-resuscitation drowsiness with a recorded return of spontaneous circulation and ongoing rhythm monitoring.
  Record: 00000041-0000-4000-8000-000000031001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000031001; order: 00000048-0000-4000-8000-000000031001.

Inferior wall hypokinesia. LVEF approximately 38%. No pericardial effusion identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000031001; order: 00000043-0000-4000-8000-000000031001.

Synthetic results associated with this encounter. Lactate 6.8 mmol/L (high); High-sensitivity troponin I 890 ng/L (high); Potassium 4.4 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Cardiology → Nephrology: Monitor for post-arrest acute kidney injury and advise on targeted temperature management fluid balance. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Post-resuscitation drowsiness with a recorded return of spontaneous circulation and ongoing rhythm monitoring.
Background: Witnessed collapse at home with bystander CPR started within two minutes; paramedics documented ventricular tachycardia on the first rhythm check and delivered a shock before transport.
Recorded acuity: Witnessed cardiac arrest, shockable rhythm and GCS 9/15 on arrival following return of spontaneous circulation.
History source and context: Wife witnessed the collapse and performed initial CPR; this is documented as bystander-witnessed, not assumed effective.
Available results: Lactate 6.8 mmol/L; High-sensitivity troponin I 890 ng/L; Potassium 4.4 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Post-arrest, drowsy, haemodynamically stable on monitoring. Inferior hypokinesia on echo.
Plan: Targeted temperature management per protocol. Coronary evaluation planned. Nephrology monitoring for post-arrest kidney injury.

#### Ward round — today, morning round

Findings: Improving alertness. No further arrhythmia on monitor overnight.
Plan: Continue rewarming protocol as directed. Plan coronary evaluation once stable. Serial neurological assessment.

#### Latest progress and pending work

Critical post-arrest state; neurological outcome cannot be predicted at this stage and is not stated here.
Pending: Neurological prognostication timeline; Coronary evaluation for the arrest cause; Repeat lactate clearance.
Department question (Nephrology): Monitor for post-arrest acute kidney injury and advise on targeted temperature management fluid balance. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Post-resuscitation drowsiness with a recorded return of spontaneous circulation and ongoing rhythm monitoring.
Background: Witnessed collapse at home with bystander CPR started within two minutes; paramedics documented ventricular tachycardia on the first rhythm check and delivered a shock before transport.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Neurological prognostication timeline; Coronary evaluation for the arrest cause; Repeat lactate clearance.
Continuity: Critical post-arrest state; neurological outcome cannot be predicted at this stage and is not stated here.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Neurological prognostication timeline — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Coronary evaluation for the arrest cause — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Repeat lactate clearance — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0032 — Pramila Nair, 63F

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Hypertensive emergency; Hypertensive encephalopathy; Chronic kidney disease.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Severe headache, blurred vision and new confusion with a markedly elevated blood pressure on recorded assessment.

Longstanding hypertension with recorded poor adherence following a recent change in home medication supply; presented with severe headache and confusion.

Critical-state rationale: Blood pressure 232/128 mmHg with new confusion and papilloedema documented on fundoscopy, meeting the recorded hypertensive emergency criteria.

Context: Son recently took over medication procurement after a pharmacy change; supply gap is documented as reported, not verified.

Occupation: Retired bank clerk. Preferred language: Malayalam, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Hypertension and CKD follow-up.
  Record: 00000041-0000-4000-8000-000000032001
- 2025-12-11T02:00:00.000Z: OPD, completed. Medication supply interruption reported.
  Record: 00000041-0000-4000-8000-000000032002
- 2026-06-09T02:00:00.000Z: OPD, completed. Blood pressure recheck; still uncontrolled.
  Record: 00000041-0000-4000-8000-000000032003
- 2026-08-24T02:00:00.000Z: OPD, completed. OPD review before the current acute presentation.
  Record: 00000041-0000-4000-8000-000000032004
- 2026-09-07T02:00:00.000Z: IPD, active. Severe headache, blurred vision and new confusion with a markedly elevated blood pressure on recorded assessment.
  Record: 00000041-0000-4000-8000-000000032005

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT head · non-contrast

Source: MockRIS; record: 00000047-0000-4000-8000-000000032001; order: 00000048-0000-4000-8000-000000032001.

No acute intracranial haemorrhage. Findings do not independently confirm hypertensive encephalopathy; clinical correlation is required.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000032005; order: 00000043-0000-4000-8000-000000032005.

Synthetic results associated with this encounter. Creatinine 2.1 mg/dL (high); Potassium 5.3 mmol/L (high); Haemoglobin 10.5 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000032004; order: 00000043-0000-4000-8000-000000032004.

Synthetic results associated with this encounter. Creatinine 1.7 mg/dL (high); Potassium 5 mmol/L (normal); Haemoglobin 10.8 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000032003; order: 00000043-0000-4000-8000-000000032003.

Synthetic results associated with this encounter. Creatinine 1.6 mg/dL (high); Potassium 4.8 mmol/L (normal); Haemoglobin 11 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000032002; order: 00000043-0000-4000-8000-000000032002.

Synthetic results associated with this encounter. Creatinine 1.5 mg/dL (high); Potassium 4.7 mmol/L (normal); Haemoglobin 11.2 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000032001; order: 00000043-0000-4000-8000-000000032001.

Synthetic results associated with this encounter. Creatinine 1.4 mg/dL (high); Potassium 4.6 mmol/L (normal); Haemoglobin 11.4 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Telmisartan, 40 mg, oral, Once daily; documented_home. Recorded home prescription; recent supply interruption is patient-reported.

### Department coordination

Cardiology → Nephrology: Assess chronic kidney disease trajectory alongside acute hypertensive emergency management. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe headache, blurred vision and new confusion with a markedly elevated blood pressure on recorded assessment.
Background: Longstanding hypertension with recorded poor adherence following a recent change in home medication supply; presented with severe headache and confusion.
Recorded acuity: Blood pressure 232/128 mmHg with new confusion and papilloedema documented on fundoscopy, meeting the recorded hypertensive emergency criteria.
History source and context: Son recently took over medication procurement after a pharmacy change; supply gap is documented as reported, not verified.
Available results: Creatinine 2.1 mg/dL; Potassium 5.3 mmol/L; Haemoglobin 10.5 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Confused, severely hypertensive, papilloedema present. CT head shows no haemorrhage.
Plan: Controlled intravenous antihypertensive titration, avoiding rapid drops. Nephrology consulted for CKD context.

#### Ward round — today, morning round

Findings: Blood pressure trending down in a controlled manner. Confusion improving.
Plan: Continue gradual blood-pressure control. Repeat renal panel. Transition to oral agents once stable.

#### Latest progress and pending work

Critical hypertensive emergency with encephalopathy; rate of blood-pressure reduction is being controlled and rapid normalisation is not assumed safe.
Pending: Controlled blood-pressure reduction monitoring; Repeat renal panel; Fundoscopy follow-up review.
Department question (Nephrology): Assess chronic kidney disease trajectory alongside acute hypertensive emergency management. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe headache, blurred vision and new confusion with a markedly elevated blood pressure on recorded assessment.
Background: Longstanding hypertension with recorded poor adherence following a recent change in home medication supply; presented with severe headache and confusion.
Recent results: Cardiology laboratory review; CT head · non-contrast
Pending: Controlled blood-pressure reduction monitoring; Repeat renal panel; Fundoscopy follow-up review.
Continuity: Critical hypertensive emergency with encephalopathy; rate of blood-pressure reduction is being controlled and rapid normalisation is not assumed safe.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Controlled blood-pressure reduction monitoring — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Repeat renal panel — Dr. Rohan Shah; due 2026-09-07T08:00:00.000Z.
- Fundoscopy follow-up review — Dr. Rohan Shah; due 2026-09-14T04:00:00.000Z.

## F-DEMO-0033 — Rakesh Chandran, 44M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Peptic ulcer disease; Perforated duodenal ulcer; Generalised peritonitis.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Sudden-onset severe epigastric pain now generalised, with a rigid abdomen and documented guarding on examination.

Documented history of dyspepsia managed intermittently with over-the-counter antacids. Sudden severe abdominal pain began abruptly this afternoon and has progressively worsened.

Critical-state rationale: Free air under the diaphragm on imaging, board-like abdominal rigidity and lactate 4.4 mmol/L at assessment.

Context: Restaurant colleague brought him in; no family contact reached yet at the time of this note.

Occupation: Restaurant chef. Preferred language: Malayalam, English.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Sudden-onset severe epigastric pain now generalised, with a rigid abdomen and documented guarding on examination.
  Record: 00000041-0000-4000-8000-000000033001

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT abdomen · erect and supine views

Source: MockRIS; record: 00000047-0000-4000-8000-000000033001; order: 00000048-0000-4000-8000-000000033001.

Free intraperitoneal air and fluid consistent with a perforated hollow viscus. A duodenal source is favoured; surgical correlation is required.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000033001; order: 00000043-0000-4000-8000-000000033001.

Synthetic results associated with this encounter. WBC 19.8 10^9/L (high); Lactate 4.4 mmol/L (high); Creatinine 1.6 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Antacid suspension, As needed, oral, Over-the-counter use; historical. Self-medicated dyspepsia; not a documented prescription.

### Department coordination

Gastroenterology → Internal Medicine: Peri-operative medical optimisation review given the systemic inflammatory response. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Sudden-onset severe epigastric pain now generalised, with a rigid abdomen and documented guarding on examination.
Background: Documented history of dyspepsia managed intermittently with over-the-counter antacids. Sudden severe abdominal pain began abruptly this afternoon and has progressively worsened.
Recorded acuity: Free air under the diaphragm on imaging, board-like abdominal rigidity and lactate 4.4 mmol/L at assessment.
History source and context: Restaurant colleague brought him in; no family contact reached yet at the time of this note.
Available results: WBC 19.8 10^9/L; Lactate 4.4 mmol/L; Creatinine 1.6 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Rigid abdomen, free air on imaging. Surgical team notified for urgent exploration.
Plan: Broad-spectrum antibiotics, fluid resuscitation, nil by mouth. Urgent surgical evaluation for source control.

#### Ward round — today, morning round

Findings: Post-operative status pending documentation; vitals stable on current monitoring.
Plan: Continue antibiotics and supportive care. Reassess with the surgical team once operative findings are available.

#### Latest progress and pending work

Critical perforated viscus with peritonitis; surgical exploration outcome is not yet documented and must not be assumed.
Pending: Emergency surgical exploration documentation; Repeat lactate and renal panel; Blood culture results.
Department question (Internal Medicine): Peri-operative medical optimisation review given the systemic inflammatory response. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Sudden-onset severe epigastric pain now generalised, with a rigid abdomen and documented guarding on examination.
Background: Documented history of dyspepsia managed intermittently with over-the-counter antacids. Sudden severe abdominal pain began abruptly this afternoon and has progressively worsened.
Recent results: Gastroenterology laboratory review; CT abdomen · erect and supine views
Pending: Emergency surgical exploration documentation; Repeat lactate and renal panel; Blood culture results.
Continuity: Critical perforated viscus with peritonitis; surgical exploration outcome is not yet documented and must not be assumed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Emergency surgical exploration documentation — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Repeat lactate and renal panel — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Blood culture results — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0034 — Shabnam Qureshi, 31F

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Ulcerative colitis; Acute severe flare; Anaemia.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

More than eight bloody stools daily, abdominal cramping and fever with recorded tachycardia meeting severity criteria.

Known ulcerative colitis on maintenance therapy with documented flares roughly annually; this episode has progressed over five days despite usual home measures.

Critical-state rationale: Truelove and Witts severe criteria documented: stool frequency, tachycardia, fever and CRP all meeting the recorded threshold.

Context: Partner is present and assisting with care; patient has been managing the condition independently since diagnosis.

Occupation: Software tester. Preferred language: Urdu, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Ulcerative colitis diagnosed on colonoscopy.
  Record: 00000041-0000-4000-8000-000000034001
- 2025-12-11T02:00:00.000Z: OPD, completed. Maintenance therapy review; remission documented.
  Record: 00000041-0000-4000-8000-000000034002
- 2026-06-09T02:00:00.000Z: OPD, completed. Mild flare managed as outpatient.
  Record: 00000041-0000-4000-8000-000000034003
- 2026-08-24T02:00:00.000Z: OPD, completed. Routine surveillance visit before the current flare.
  Record: 00000041-0000-4000-8000-000000034004
- 2026-09-07T02:00:00.000Z: IPD, active. More than eight bloody stools daily, abdominal cramping and fever with recorded tachycardia meeting severity criteria.
  Record: 00000041-0000-4000-8000-000000034005

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000034001; order: 00000048-0000-4000-8000-000000034001.

Diffuse colonic wall thickening consistent with active colitis. Colonic diameter is not enlarged; no evidence of toxic megacolon on this study.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000034005; order: 00000043-0000-4000-8000-000000034005.

Synthetic results associated with this encounter. Haemoglobin 8.6 g/dL (low); CRP 64 mg/L (high); Albumin 2.6 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000034004; order: 00000043-0000-4000-8000-000000034004.

Synthetic results associated with this encounter. Haemoglobin 9.4 g/dL (low); Albumin 3 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000034003; order: 00000043-0000-4000-8000-000000034003.

Synthetic results associated with this encounter. Haemoglobin 10.6 g/dL (low); Albumin 3.4 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000034002; order: 00000043-0000-4000-8000-000000034002.

Synthetic results associated with this encounter. Haemoglobin 11.8 g/dL (low); Albumin 3.7 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000034001; order: 00000043-0000-4000-8000-000000034001.

Synthetic results associated with this encounter. Haemoglobin 12.4 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Mesalazine, 1.2 g, oral, Twice daily; documented_home. Maintenance therapy continued from home prescription; inpatient escalation is not itemised here.

### Department coordination

Gastroenterology → Internal Medicine: Assess for venous thromboembolism prophylaxis and nutritional support planning during the acute flare. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

More than eight bloody stools daily, abdominal cramping and fever with recorded tachycardia meeting severity criteria.
Background: Known ulcerative colitis on maintenance therapy with documented flares roughly annually; this episode has progressed over five days despite usual home measures.
Recorded acuity: Truelove and Witts severe criteria documented: stool frequency, tachycardia, fever and CRP all meeting the recorded threshold.
History source and context: Partner is present and assisting with care; patient has been managing the condition independently since diagnosis.
Available results: Haemoglobin 8.6 g/dL; CRP 64 mg/L; Albumin 2.6 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Frequent bloody stools, febrile, tachycardic. Severe flare criteria met. Imaging excludes toxic megacolon.
Plan: Intravenous corticosteroids, thromboprophylaxis, stool cultures sent. Close monitoring for rescue therapy need.

#### Ward round — today, morning round

Findings: Stool frequency reducing. Fever settling on current therapy.
Plan: Continue intravenous steroids. Reassess response at day three per protocol for rescue therapy decision.

#### Latest progress and pending work

Critical acute severe ulcerative colitis flare; colectomy threshold has not been met per the recorded criteria.
Pending: Stool culture to exclude infective colitis; Repeat haemoglobin and CRP; Rescue therapy response review.
Department question (Internal Medicine): Assess for venous thromboembolism prophylaxis and nutritional support planning during the acute flare. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: More than eight bloody stools daily, abdominal cramping and fever with recorded tachycardia meeting severity criteria.
Background: Known ulcerative colitis on maintenance therapy with documented flares roughly annually; this episode has progressed over five days despite usual home measures.
Recent results: Gastroenterology laboratory review; CT abdomen
Pending: Stool culture to exclude infective colitis; Repeat haemoglobin and CRP; Rescue therapy response review.
Continuity: Critical acute severe ulcerative colitis flare; colectomy threshold has not been met per the recorded criteria.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Stool culture to exclude infective colitis — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Repeat haemoglobin and CRP — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Rescue therapy response review — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0035 — Om Prakash Tiwari, 38M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Acute viral hepatitis A; Fulminant hepatic failure; Coagulopathy.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Deepening jaundice, asterixis and new confusion with a markedly prolonged coagulation profile on the recorded panel.

Two weeks of jaundice and malaise following a documented local food-borne illness outbreak in his area; progressive drowsiness over the last day prompted this admission.

Critical-state rationale: INR 3.8, grade II hepatic encephalopathy on recorded assessment and bilirubin 18.2 mg/dL meeting fulminant hepatic failure criteria.

Context: Wife reports the local outbreak affected several neighbours; not independently verified beyond the patient-reported cluster.

Occupation: Street food vendor. Preferred language: Hindi, Bhojpuri.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Deepening jaundice, asterixis and new confusion with a markedly prolonged coagulation profile on the recorded panel.
  Record: 00000041-0000-4000-8000-000000035001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000035001; order: 00000048-0000-4000-8000-000000035001.

Reduced liver span with coarse echotexture. No biliary obstruction. Mild ascites noted.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000035001; order: 00000043-0000-4000-8000-000000035001.

Synthetic results associated with this encounter. Total bilirubin 18.2 mg/dL (high); ALT 3840 U/L (high); INR 3.8 ratio (high); Ammonia 126 µmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Gastroenterology → Nephrology: Monitor for hepatorenal physiology and advise on fluid and electrolyte management in fulminant liver failure. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Deepening jaundice, asterixis and new confusion with a markedly prolonged coagulation profile on the recorded panel.
Background: Two weeks of jaundice and malaise following a documented local food-borne illness outbreak in his area; progressive drowsiness over the last day prompted this admission.
Recorded acuity: INR 3.8, grade II hepatic encephalopathy on recorded assessment and bilirubin 18.2 mg/dL meeting fulminant hepatic failure criteria.
History source and context: Wife reports the local outbreak affected several neighbours; not independently verified beyond the patient-reported cluster.
Available results: Total bilirubin 18.2 mg/dL; ALT 3840 U/L; INR 3.8 ratio; Ammonia 126 µmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Jaundiced, asterixis present, INR markedly prolonged. Grade II encephalopathy.
Plan: Lactulose titration, N-acetylcysteine per protocol, liver transplant unit informed. Nephrology consulted for renal monitoring.

#### Ward round — today, morning round

Findings: Encephalopathy grade unchanged overnight. INR trend pending repeat.
Plan: Continue supportive management. Repeat coagulation profile and ammonia. Await transplant unit response.

#### Latest progress and pending work

Critical fulminant hepatic failure; transplant candidacy discussion is documented as pending, not decided.
Pending: Serial INR and ammonia levels; Liver transplant unit referral discussion; Grading of encephalopathy at each round.
Department question (Nephrology): Monitor for hepatorenal physiology and advise on fluid and electrolyte management in fulminant liver failure. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Deepening jaundice, asterixis and new confusion with a markedly prolonged coagulation profile on the recorded panel.
Background: Two weeks of jaundice and malaise following a documented local food-borne illness outbreak in his area; progressive drowsiness over the last day prompted this admission.
Recent results: Gastroenterology laboratory review; Ultrasound abdomen
Pending: Serial INR and ammonia levels; Liver transplant unit referral discussion; Grading of encephalopathy at each round.
Continuity: Critical fulminant hepatic failure; transplant candidacy discussion is documented as pending, not decided.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Serial INR and ammonia levels — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Liver transplant unit referral discussion — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Grading of encephalopathy at each round — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0036 — Geeta Bhatt, 56F

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Alcohol-related cirrhosis; Ascites; Spontaneous bacterial peritonitis.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Abdominal pain with distension, fever and new confusion, with cloudy ascitic fluid obtained on the recorded paracentesis.

Documented cirrhosis with recurrent ascites on diuretic therapy. Presented with new fever and worsening abdominal distension over two days.

Critical-state rationale: Ascitic fluid neutrophil count 620 cells/mm³, fever 38.9°C and new-onset confusion meeting the recorded criteria for spontaneous bacterial peritonitis with encephalopathy.

Context: Son manages her medications; alcohol history is documented as historical and not currently active per family report.

Occupation: Retired clerk. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Cirrhosis diagnosis and surveillance endoscopy.
  Record: 00000041-0000-4000-8000-000000036001
- 2025-12-11T02:00:00.000Z: OPD, completed. Ascites first documented; diuretics started.
  Record: 00000041-0000-4000-8000-000000036002
- 2026-06-09T02:00:00.000Z: OPD, completed. Diuretic dose adjustment for recurrent ascites.
  Record: 00000041-0000-4000-8000-000000036003
- 2026-08-24T02:00:00.000Z: OPD, completed. Routine surveillance visit before the current infection.
  Record: 00000041-0000-4000-8000-000000036004
- 2026-09-07T02:00:00.000Z: IPD, active. Abdominal pain with distension, fever and new confusion, with cloudy ascitic fluid obtained on the recorded paracentesis.
  Record: 00000041-0000-4000-8000-000000036005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000036001; order: 00000048-0000-4000-8000-000000036001.

Nodular liver contour with moderate ascites. No focal hepatic lesion identified. Portal vein is patent on this study.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000036005; order: 00000043-0000-4000-8000-000000036005.

Synthetic results associated with this encounter. Albumin 2.3 g/dL (low); Creatinine 1.8 mg/dL (high); Total bilirubin 3.4 mg/dL (high); INR 1.8 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000036004; order: 00000043-0000-4000-8000-000000036004.

Synthetic results associated with this encounter. Albumin 2.6 g/dL (low); Creatinine 1.3 mg/dL (high); Total bilirubin 2.8 mg/dL (high); INR 1.6 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000036003; order: 00000043-0000-4000-8000-000000036003.

Synthetic results associated with this encounter. Albumin 2.8 g/dL (low); Creatinine 1 mg/dL (normal); Total bilirubin 2.4 mg/dL (high); INR 1.5 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000036002; order: 00000043-0000-4000-8000-000000036002.

Synthetic results associated with this encounter. Albumin 3 g/dL (low); Creatinine 0.9 mg/dL (normal); Total bilirubin 2.1 mg/dL (high); INR 1.5 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000036001; order: 00000043-0000-4000-8000-000000036001.

Synthetic results associated with this encounter. Albumin 3.2 g/dL (low); Creatinine 0.8 mg/dL (normal); Total bilirubin 1.8 mg/dL (high); INR 1.4 ratio (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Spironolactone, 100 mg, oral, Once daily; held. Recorded hold during acute renal function decline in the context of infection.

### Department coordination

Gastroenterology → Nephrology: Assess for hepatorenal syndrome versus intrinsic renal injury given the rising creatinine. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Abdominal pain with distension, fever and new confusion, with cloudy ascitic fluid obtained on the recorded paracentesis.
Background: Documented cirrhosis with recurrent ascites on diuretic therapy. Presented with new fever and worsening abdominal distension over two days.
Recorded acuity: Ascitic fluid neutrophil count 620 cells/mm³, fever 38.9°C and new-onset confusion meeting the recorded criteria for spontaneous bacterial peritonitis with encephalopathy.
History source and context: Son manages her medications; alcohol history is documented as historical and not currently active per family report.
Available results: Albumin 2.3 g/dL; Creatinine 1.8 mg/dL; Total bilirubin 3.4 mg/dL; INR 1.8 ratio.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Distended, febrile, confused. Paracentesis confirms spontaneous bacterial peritonitis.
Plan: Empirical antibiotics per protocol, albumin infusion, diuretics held. Nephrology consulted for renal monitoring.

#### Ward round — today, morning round

Findings: Fever improving. Mental status clearer than admission.
Plan: Continue antibiotics and albumin. Repeat ascitic fluid analysis to confirm response per protocol.

#### Latest progress and pending work

Critical spontaneous bacterial peritonitis in decompensated cirrhosis; hepatorenal syndrome has not been confirmed and is not assumed.
Pending: Repeat ascitic fluid analysis after therapy; Blood culture results; Albumin infusion response review.
Department question (Nephrology): Assess for hepatorenal syndrome versus intrinsic renal injury given the rising creatinine. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Abdominal pain with distension, fever and new confusion, with cloudy ascitic fluid obtained on the recorded paracentesis.
Background: Documented cirrhosis with recurrent ascites on diuretic therapy. Presented with new fever and worsening abdominal distension over two days.
Recent results: Gastroenterology laboratory review; Ultrasound abdomen
Pending: Repeat ascitic fluid analysis after therapy; Blood culture results; Albumin infusion response review.
Continuity: Critical spontaneous bacterial peritonitis in decompensated cirrhosis; hepatorenal syndrome has not been confirmed and is not assumed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat ascitic fluid analysis after therapy — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Blood culture results — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Albumin infusion response review — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0037 — Anil Bhosale, 66M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Atrial fibrillation; Acute mesenteric ischaemia.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Severe diffuse abdominal pain with a soft non-tender abdomen on early examination, then rapid deterioration with rising lactate.

Known atrial fibrillation with documented irregular anticoagulation adherence. Sudden severe abdominal pain began this morning, described as out of proportion to the examination findings.

Critical-state rationale: Lactate 6.2 mmol/L, pain out of proportion to examination and CT angiogram findings meeting the recorded criteria for mesenteric ischaemia.

Context: Daughter reports intermittent missed doses of anticoagulation; this is recorded as reported, not independently confirmed.

Occupation: Retired postal supervisor. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Atrial fibrillation diagnosed; anticoagulation started.
  Record: 00000041-0000-4000-8000-000000037001
- 2025-12-11T02:00:00.000Z: OPD, completed. Anticoagulation adherence gap noted.
  Record: 00000041-0000-4000-8000-000000037002
- 2026-06-09T02:00:00.000Z: OPD, completed. Cardiology follow-up; rate control reviewed.
  Record: 00000041-0000-4000-8000-000000037003
- 2026-08-24T02:00:00.000Z: OPD, completed. OPD review before the current acute abdomen.
  Record: 00000041-0000-4000-8000-000000037004
- 2026-09-07T02:00:00.000Z: IPD, active. Severe diffuse abdominal pain with a soft non-tender abdomen on early examination, then rapid deterioration with rising lactate.
  Record: 00000041-0000-4000-8000-000000037005

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT angiogram · abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000037001; order: 00000048-0000-4000-8000-000000037001.

Occlusive thrombus in the superior mesenteric artery with reduced bowel wall enhancement in the affected segment.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000037005; order: 00000043-0000-4000-8000-000000037005.

Synthetic results associated with this encounter. Lactate 6.2 mmol/L (high); WBC 21.4 10^9/L (high); Creatinine 1.9 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000037004; order: 00000043-0000-4000-8000-000000037004.

Synthetic results associated with this encounter. Creatinine 1.4 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000037003; order: 00000043-0000-4000-8000-000000037003.

Synthetic results associated with this encounter. Creatinine 1.3 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000037002; order: 00000043-0000-4000-8000-000000037002.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000037001; order: 00000043-0000-4000-8000-000000037001.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Apixaban, 5 mg, oral, Twice daily per prescription; historical. Documented adherence gap; not equivalent to a verified recent dosing record.

### Department coordination

Gastroenterology → Cardiology: Review atrial fibrillation anticoagulation strategy as the likely embolic source. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe diffuse abdominal pain with a soft non-tender abdomen on early examination, then rapid deterioration with rising lactate.
Background: Known atrial fibrillation with documented irregular anticoagulation adherence. Sudden severe abdominal pain began this morning, described as out of proportion to the examination findings.
Recorded acuity: Lactate 6.2 mmol/L, pain out of proportion to examination and CT angiogram findings meeting the recorded criteria for mesenteric ischaemia.
History source and context: Daughter reports intermittent missed doses of anticoagulation; this is recorded as reported, not independently confirmed.
Available results: Lactate 6.2 mmol/L; WBC 21.4 10^9/L; Creatinine 1.9 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Severe pain out of proportion to exam, lactate rising. CT angiogram confirms SMA occlusion. Surgery notified urgently.
Plan: Urgent surgical/endovascular evaluation, broad-spectrum antibiotics, fluid resuscitation, therapeutic anticoagulation.

#### Ward round — today, morning round

Findings: Post-intervention status pending documentation; lactate trend awaited.
Plan: Continue supportive care. Repeat lactate. Cardiology review for long-term anticoagulation strategy.

#### Latest progress and pending work

Critical acute mesenteric ischaemia; bowel viability and intervention outcome are not yet documented.
Pending: Emergency surgical or endovascular intervention documentation; Repeat lactate trend; Bowel viability reassessment.
Department question (Cardiology): Review atrial fibrillation anticoagulation strategy as the likely embolic source. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe diffuse abdominal pain with a soft non-tender abdomen on early examination, then rapid deterioration with rising lactate.
Background: Known atrial fibrillation with documented irregular anticoagulation adherence. Sudden severe abdominal pain began this morning, described as out of proportion to the examination findings.
Recent results: Gastroenterology laboratory review; CT angiogram · abdomen
Pending: Emergency surgical or endovascular intervention documentation; Repeat lactate trend; Bowel viability reassessment.
Continuity: Critical acute mesenteric ischaemia; bowel viability and intervention outcome are not yet documented.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Emergency surgical or endovascular intervention documentation — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Repeat lactate trend — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Bowel viability reassessment — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0038 — Kiran Desai, 49F

Department: Gastroenterology. Acuity at snapshot: noncritical.

Conditions: Small bowel obstruction; Post-conservative management.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Reports normal bowel habit since discharge with no recurrent pain, distension or vomiting at this visit.

Admitted last month with a small bowel obstruction that resolved with conservative nasogastric decompression; this is a scheduled follow-up to confirm resolution and plan further evaluation.

Critical-state rationale: Stable outpatient review with no documented acute findings at this encounter.

Context: Runs her own business and prefers early-morning appointments before opening the shop.

Occupation: Boutique owner. Preferred language: Gujarati, English.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: IPD, completed. Admission for small bowel obstruction; nasogastric decompression started.
  Record: 00000041-0000-4000-8000-000000038001
- 2025-12-11T02:00:00.000Z: OPD, completed. Inpatient review; obstruction resolving on conservative management.
  Record: 00000041-0000-4000-8000-000000038002
- 2026-06-09T02:00:00.000Z: OPD, completed. Discharge review; diet advanced successfully.
  Record: 00000041-0000-4000-8000-000000038003
- 2026-08-24T02:00:00.000Z: OPD, completed. First outpatient follow-up; symptoms remain resolved.
  Record: 00000041-0000-4000-8000-000000038004
- 2026-09-07T02:00:00.000Z: OPD, active. Reports normal bowel habit since discharge with no recurrent pain, distension or vomiting at this visit.
  Record: 00000041-0000-4000-8000-000000038005

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000038001; order: 00000048-0000-4000-8000-000000038001.

No residual dilated bowel loops. No transition point identified. Appearances are unremarkable for this follow-up study.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000038005; order: 00000043-0000-4000-8000-000000038005.

Synthetic results associated with this encounter. Haemoglobin 12.5 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000038004; order: 00000043-0000-4000-8000-000000038004.

Synthetic results associated with this encounter. Haemoglobin 12.4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000038003; order: 00000043-0000-4000-8000-000000038003.

Synthetic results associated with this encounter. Haemoglobin 12.2 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000038002; order: 00000043-0000-4000-8000-000000038002.

Synthetic results associated with this encounter. Haemoglobin 12 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000038001; order: 00000043-0000-4000-8000-000000038001.

Synthetic results associated with this encounter. Haemoglobin 11.8 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Gastroenterology → Internal Medicine: Reconcile medical comorbidities and confirm fitness before considering elective further evaluation. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Reports normal bowel habit since discharge with no recurrent pain, distension or vomiting at this visit.
Background: Admitted last month with a small bowel obstruction that resolved with conservative nasogastric decompression; this is a scheduled follow-up to confirm resolution and plan further evaluation.
Recorded acuity: Stable outpatient review with no documented acute findings at this encounter.
History source and context: Runs her own business and prefers early-morning appointments before opening the shop.
Available results: Haemoglobin 12.5 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Latest progress and pending work

Stable outpatient follow-up after resolved small bowel obstruction; no acute findings at this visit.
Pending: Discuss elective evaluation for obstruction cause if symptoms recur; Dietary counselling follow-up.
Department question (Internal Medicine): Reconcile medical comorbidities and confirm fitness before considering elective further evaluation. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Reports normal bowel habit since discharge with no recurrent pain, distension or vomiting at this visit.
Background: Admitted last month with a small bowel obstruction that resolved with conservative nasogastric decompression; this is a scheduled follow-up to confirm resolution and plan further evaluation.
Recent results: Gastroenterology laboratory review; CT abdomen
Pending: Discuss elective evaluation for obstruction cause if symptoms recur; Dietary counselling follow-up.
Continuity: Stable outpatient follow-up after resolved small bowel obstruction; no acute findings at this visit.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Discuss elective evaluation for obstruction cause if symptoms recur — Dr. Kavya Menon; due 2026-09-07T08:00:00.000Z.
- Dietary counselling follow-up — Dr. Kavya Menon; due 2026-09-14T04:00:00.000Z.

## F-DEMO-0039 — Suraj Malhotra, 26M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Closed femur shaft fracture; Fat embolism risk; Road traffic injury.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Petechial rash on the chest and axillae with new breathlessness and confusion following the femur fracture, raising concern for fat embolism syndrome.

High-speed motorcycle collision reported by paramedics; a closed femur fracture was splinted at the scene. New respiratory distress and confusion developed several hours after admission.

Critical-state rationale: Oxygen saturation 89% on room air, new petechiae and altered mental status meeting the recorded criteria suggestive of fat embolism syndrome.

Context: Colleague from the courier company alerted the family; next of kin en route.

Occupation: Motorcycle courier. Preferred language: Hindi, Punjabi.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Petechial rash on the chest and axillae with new breathlessness and confusion following the femur fracture, raising concern for fat embolism syndrome.
  Record: 00000041-0000-4000-8000-000000039001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Femur X-ray · AP and lateral

Source: MockRIS; record: 00000047-0000-4000-8000-000000039001; order: 00000048-0000-4000-8000-000000039001.

Closed comminuted mid-shaft femur fracture. No open wound described on this radiograph.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000039001; order: 00000043-0000-4000-8000-000000039001.

Synthetic results associated with this encounter. Haemoglobin 11.2 g/dL (low); Platelets 128 10^9/L (low); Creatinine 1.1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Internal Medicine: Assess new respiratory distress and petechial rash for fat embolism syndrome versus alternative causes. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Petechial rash on the chest and axillae with new breathlessness and confusion following the femur fracture, raising concern for fat embolism syndrome.
Background: High-speed motorcycle collision reported by paramedics; a closed femur fracture was splinted at the scene. New respiratory distress and confusion developed several hours after admission.
Recorded acuity: Oxygen saturation 89% on room air, new petechiae and altered mental status meeting the recorded criteria suggestive of fat embolism syndrome.
History source and context: Colleague from the courier company alerted the family; next of kin en route.
Available results: Haemoglobin 11.2 g/dL; Platelets 128 10^9/L; Creatinine 1.1 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Femur fracture splinted, new petechiae and hypoxia developed. Fat embolism syndrome suspected.
Plan: Supplemental oxygen, supportive respiratory care, urgent orthopaedic and medical review for fixation timing.

#### Ward round — today, morning round

Findings: Oxygenation stable on current support. Mental status improving.
Plan: Continue supportive care. Plan definitive fixation once respiratory status permits. Monitor petechiae resolution.

#### Latest progress and pending work

Critical trauma with suspected fat embolism syndrome; definitive fixation timing is a documented working plan, not yet completed.
Pending: Definitive fracture fixation documentation; Repeat oxygen saturation and mental status monitoring; Chest imaging follow-up.
Department question (Internal Medicine): Assess new respiratory distress and petechial rash for fat embolism syndrome versus alternative causes. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Petechial rash on the chest and axillae with new breathlessness and confusion following the femur fracture, raising concern for fat embolism syndrome.
Background: High-speed motorcycle collision reported by paramedics; a closed femur fracture was splinted at the scene. New respiratory distress and confusion developed several hours after admission.
Recent results: Orthopaedics laboratory review; Femur X-ray · AP and lateral
Pending: Definitive fracture fixation documentation; Repeat oxygen saturation and mental status monitoring; Chest imaging follow-up.
Continuity: Critical trauma with suspected fat embolism syndrome; definitive fixation timing is a documented working plan, not yet completed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Definitive fracture fixation documentation — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Repeat oxygen saturation and mental status monitoring — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Chest imaging follow-up — Dr. Nikhil Joshi; due 2026-09-14T04:00:00.000Z.

## F-DEMO-0040 — Devraj Solanki, 33M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Tibial shaft fracture; Acute compartment syndrome.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Severe leg pain out of proportion to the injury, tense swelling and pain on passive stretch of the toes, raising concern for compartment syndrome.

A heavy pallet fell onto his lower leg at work; the tibial fracture was splinted, but pain has escalated disproportionately over the following hours despite analgesia.

Critical-state rationale: Documented compartment pressure of 42 mmHg and pain on passive stretch meeting the recorded criteria for acute compartment syndrome.

Context: Supervisor called the ambulance; family has been informed and is travelling to the hospital.

Occupation: Warehouse loader. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Severe leg pain out of proportion to the injury, tense swelling and pain on passive stretch of the toes, raising concern for compartment syndrome.
  Record: 00000041-0000-4000-8000-000000040001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Tibia-fibula X-ray · AP and lateral

Source: MockRIS; record: 00000047-0000-4000-8000-000000040001; order: 00000048-0000-4000-8000-000000040001.

Displaced mid-shaft tibia and fibula fractures. Soft tissue swelling is marked on this radiograph.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000040001; order: 00000043-0000-4000-8000-000000040001.

Synthetic results associated with this encounter. Creatine kinase 2400 U/L (high); Creatinine 1.2 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Internal Medicine: Assess for rhabdomyolysis given the crush mechanism and elevated creatine kinase. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe leg pain out of proportion to the injury, tense swelling and pain on passive stretch of the toes, raising concern for compartment syndrome.
Background: A heavy pallet fell onto his lower leg at work; the tibial fracture was splinted, but pain has escalated disproportionately over the following hours despite analgesia.
Recorded acuity: Documented compartment pressure of 42 mmHg and pain on passive stretch meeting the recorded criteria for acute compartment syndrome.
History source and context: Supervisor called the ambulance; family has been informed and is travelling to the hospital.
Available results: Creatine kinase 2400 U/L; Creatinine 1.2 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Tense swollen leg, pain out of proportion, compartment pressure elevated. Urgent fasciotomy planned.
Plan: Elevate limb to heart level, avoid further constriction, urgent fasciotomy. Monitor creatine kinase for rhabdomyolysis.

#### Ward round — today, morning round

Findings: Post-fasciotomy status pending documentation; distal pulses monitored hourly per chart.
Plan: Continue hourly neurovascular checks. Repeat creatine kinase. Plan delayed wound closure once swelling settles.

#### Latest progress and pending work

Critical compartment syndrome; fasciotomy is a documented urgent plan and completion is not yet confirmed.
Pending: Emergency fasciotomy documentation; Repeat compartment pressure and creatine kinase; Neurovascular status monitoring hourly.
Department question (Internal Medicine): Assess for rhabdomyolysis given the crush mechanism and elevated creatine kinase. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe leg pain out of proportion to the injury, tense swelling and pain on passive stretch of the toes, raising concern for compartment syndrome.
Background: A heavy pallet fell onto his lower leg at work; the tibial fracture was splinted, but pain has escalated disproportionately over the following hours despite analgesia.
Recent results: Orthopaedics laboratory review; Tibia-fibula X-ray · AP and lateral
Pending: Emergency fasciotomy documentation; Repeat compartment pressure and creatine kinase; Neurovascular status monitoring hourly.
Continuity: Critical compartment syndrome; fasciotomy is a documented urgent plan and completion is not yet confirmed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Emergency fasciotomy documentation — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Repeat compartment pressure and creatine kinase — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Neurovascular status monitoring hourly — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0041 — Ramesh Pawar, 54M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Type 2 Diabetes; Necrotising fasciitis; Sepsis with organ dysfunction.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Rapidly spreading erythema with skin discolouration, severe pain out of proportion to appearance, and documented crepitus on examination.

Documented poorly controlled diabetes. A minor scratch on the lower leg while working in the fields five days ago has progressed to rapidly spreading skin discolouration and severe pain.

Critical-state rationale: BP 84/50 mmHg, lactate 5.6 mmol/L and crepitus with skin necrosis meeting the recorded criteria for suspected necrotising fasciitis.

Context: Wife reports the wound was initially dismissed as minor; no unrecorded delay is assumed beyond what is documented.

Occupation: Agricultural labourer. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Type 2 Diabetes diagnosed; lifestyle and medication counselling given.
  Record: 00000041-0000-4000-8000-000000041001
- 2025-12-11T02:00:00.000Z: OPD, completed. Glycaemic control review; poor adherence noted.
  Record: 00000041-0000-4000-8000-000000041002
- 2026-06-09T02:00:00.000Z: OPD, completed. Diabetic foot-care education visit.
  Record: 00000041-0000-4000-8000-000000041003
- 2026-08-24T02:00:00.000Z: OPD, completed. Routine follow-up before the current limb infection.
  Record: 00000041-0000-4000-8000-000000041004
- 2026-09-07T02:00:00.000Z: IPD, active. Rapidly spreading erythema with skin discolouration, severe pain out of proportion to appearance, and documented crepitus on examination.
  Record: 00000041-0000-4000-8000-000000041005

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT lower limb

Source: MockRIS; record: 00000047-0000-4000-8000-000000041001; order: 00000048-0000-4000-8000-000000041001.

Gas within the soft tissue planes of the lower leg with fascial thickening, findings concerning for necrotising soft tissue infection.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000041005; order: 00000043-0000-4000-8000-000000041005.

Synthetic results associated with this encounter. WBC 24.6 10^9/L (high); CRP 286 mg/L (high); Creatinine 2.3 mg/dL (high); Lactate 5.6 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metformin, 500 mg, oral, Twice daily; held. Held during acute sepsis and renal function decline.

### Department coordination

Orthopaedics → Internal Medicine: Manage septic shock and glycaemic control alongside urgent surgical debridement. Status: in_progress. Response pending.
Orthopaedics → Nephrology: Assess acute kidney injury in the context of sepsis and evolving organ dysfunction. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Rapidly spreading erythema with skin discolouration, severe pain out of proportion to appearance, and documented crepitus on examination.
Background: Documented poorly controlled diabetes. A minor scratch on the lower leg while working in the fields five days ago has progressed to rapidly spreading skin discolouration and severe pain.
Recorded acuity: BP 84/50 mmHg, lactate 5.6 mmol/L and crepitus with skin necrosis meeting the recorded criteria for suspected necrotising fasciitis.
History source and context: Wife reports the wound was initially dismissed as minor; no unrecorded delay is assumed beyond what is documented.
Available results: WBC 24.6 10^9/L; CRP 286 mg/L; Creatinine 2.3 mg/dL; Lactate 5.6 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Hypotensive, spreading necrosis, crepitus present. Surgical team activated for emergency debridement.
Plan: Fluid resuscitation, broad-spectrum antibiotics, vasopressor support as needed, urgent surgical debridement.

#### Ward round — today, morning round

Findings: Post-debridement status pending documentation; blood pressure responding to current support.
Plan: Continue antibiotics and organ support. Repeat lactate. Plan further debridement review with the surgical team.

#### Latest progress and pending work

Critical necrotising fasciitis with septic shock; debridement outcome and extent are not yet documented.
Pending: Emergency surgical debridement documentation; Repeat lactate and renal panel; Blood culture results.
Department question (Internal Medicine): Manage septic shock and glycaemic control alongside urgent surgical debridement. Status: in_progress. No completed specialist response available.
Department question (Nephrology): Assess acute kidney injury in the context of sepsis and evolving organ dysfunction. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Rapidly spreading erythema with skin discolouration, severe pain out of proportion to appearance, and documented crepitus on examination.
Background: Documented poorly controlled diabetes. A minor scratch on the lower leg while working in the fields five days ago has progressed to rapidly spreading skin discolouration and severe pain.
Recent results: Orthopaedics laboratory review; CT lower limb
Pending: Emergency surgical debridement documentation; Repeat lactate and renal panel; Blood culture results.
Continuity: Critical necrotising fasciitis with septic shock; debridement outcome and extent are not yet documented.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Emergency surgical debridement documentation — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Repeat lactate and renal panel — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Blood culture results — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0042 — Kamala Bai, 79F

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Osteoporosis; Neck of femur fracture; Community-acquired pneumonia.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Left hip pain with a shortened externally rotated limb, and a new productive cough noted on the day after admission.

A fall at home while walking to the bathroom resulted in an inability to bear weight; a background of documented osteoporosis and reduced mobility is on file.

Critical-state rationale: Confirmed fracture on imaging, age-related frailty and a new oxygen requirement from a developing pneumonia meeting the recorded acuity threshold.

Context: Daughter lives nearby and visits daily; documented reduced mobility baseline is noted without further inference.

Occupation: Retired homemaker. Preferred language: Hindi, Marathi.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Left hip pain with a shortened externally rotated limb, and a new productive cough noted on the day after admission.
  Record: 00000041-0000-4000-8000-000000042001

### Investigation history

#### 2026-09-07T04:31:00.000Z — Chest X-ray · portable AP

Source: MockRIS; record: 00000047-0000-4000-8000-000000042002; order: 00000048-0000-4000-8000-000000042002.

Right lower-zone consolidation consistent with pneumonia. No pleural effusion described.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T04:30:00.000Z — Pelvis X-ray · AP view

Source: MockRIS; record: 00000047-0000-4000-8000-000000042001; order: 00000048-0000-4000-8000-000000042001.

Displaced left neck of femur fracture. No other pelvic fracture identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000042001; order: 00000043-0000-4000-8000-000000042001.

Synthetic results associated with this encounter. Haemoglobin 10.8 g/dL (low); WBC 13.2 10^9/L (high); Creatinine 1.3 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Calcium with vitamin D, 500 mg / 250 IU, oral, Once daily; documented_home. Recorded home supplement for osteoporosis; not an acute treatment order.

### Department coordination

Orthopaedics → Internal Medicine: Peri-operative medical optimisation and pneumonia treatment before proceeding to fracture fixation. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Left hip pain with a shortened externally rotated limb, and a new productive cough noted on the day after admission.
Background: A fall at home while walking to the bathroom resulted in an inability to bear weight; a background of documented osteoporosis and reduced mobility is on file.
Recorded acuity: Confirmed fracture on imaging, age-related frailty and a new oxygen requirement from a developing pneumonia meeting the recorded acuity threshold.
History source and context: Daughter lives nearby and visits daily; documented reduced mobility baseline is noted without further inference.
Available results: Haemoglobin 10.8 g/dL; WBC 13.2 10^9/L; Creatinine 1.3 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Cataract surgery, right eye — 2022

Uncomplicated per patient report; no ongoing ophthalmological issue documented at this hospital.

#### Ward round — admission day

Findings: Hip fracture confirmed, pain controlled with analgesia. New cough developing overnight.
Plan: Analgesia, thromboprophylaxis, chest X-ray for new cough. Internal Medicine consulted for peri-operative optimisation.

#### Ward round — today, morning round

Findings: Pneumonia confirmed on imaging, antibiotics started. Oxygen requirement stable.
Plan: Continue antibiotics. Reassess surgical fitness daily. Aim for fixation once medically optimised.

#### Latest progress and pending work

Critical hip fracture complicated by intercurrent pneumonia; surgical fitness is under active review, not yet cleared.
Pending: Fracture fixation timing decision; Repeat chest examination and oxygen requirement review; Falls-risk assessment documentation.
Department question (Internal Medicine): Peri-operative medical optimisation and pneumonia treatment before proceeding to fracture fixation. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Left hip pain with a shortened externally rotated limb, and a new productive cough noted on the day after admission.
Background: A fall at home while walking to the bathroom resulted in an inability to bear weight; a background of documented osteoporosis and reduced mobility is on file.
Recent results: Orthopaedics laboratory review; Pelvis X-ray · AP view; Chest X-ray · portable AP
Pending: Fracture fixation timing decision; Repeat chest examination and oxygen requirement review; Falls-risk assessment documentation.
Continuity: Critical hip fracture complicated by intercurrent pneumonia; surgical fitness is under active review, not yet cleared.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Fracture fixation timing decision — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Repeat chest examination and oxygen requirement review — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Falls-risk assessment documentation — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0043 — Vijay Kumar Meena, 42M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Cervical spine fracture; Incomplete spinal cord injury.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Neck pain with documented reduced power and altered sensation in both upper and lower limbs on the recorded neurological examination.

Head-on vehicle collision reported by paramedics with immediate neck pain and reduced sensation in the limbs at the scene; cervical immobilisation was applied before transport.

Critical-state rationale: Cervical fracture with cord signal change on imaging and a documented incomplete neurological deficit at assessment.

Context: Brother travelling from another city; patient is alert and oriented despite the injury.

Occupation: Delivery van driver. Preferred language: Hindi, Rajasthani.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Neck pain with documented reduced power and altered sensation in both upper and lower limbs on the recorded neurological examination.
  Record: 00000041-0000-4000-8000-000000043001

### Investigation history

#### 2026-09-07T04:30:00.000Z — CT and MRI cervical spine

Source: MockRIS; record: 00000047-0000-4000-8000-000000043001; order: 00000048-0000-4000-8000-000000043001.

C5-C6 fracture-subluxation with cord signal change on the recorded MRI sequence. Spinal alignment is disrupted at this level.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000043001; order: 00000043-0000-4000-8000-000000043001.

Synthetic results associated with this encounter. Haemoglobin 13.6 g/dL (normal); Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Internal Medicine: Manage neurogenic haemodynamic instability and monitor for autonomic dysreflexia risk. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Neck pain with documented reduced power and altered sensation in both upper and lower limbs on the recorded neurological examination.
Background: Head-on vehicle collision reported by paramedics with immediate neck pain and reduced sensation in the limbs at the scene; cervical immobilisation was applied before transport.
Recorded acuity: Cervical fracture with cord signal change on imaging and a documented incomplete neurological deficit at assessment.
History source and context: Brother travelling from another city; patient is alert and oriented despite the injury.
Available results: Haemoglobin 13.6 g/dL; Creatinine 1 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Cervical fracture with incomplete cord injury confirmed on imaging. Immobilised, haemodynamically borderline.
Plan: Maintain spinal precautions, blood-pressure support to maintain cord perfusion, urgent spinal surgical review.

#### Ward round — today, morning round

Findings: Neurological examination unchanged from admission baseline. Haemodynamics stable on current support.
Plan: Continue spinal precautions and haemodynamic support. Await surgical stabilisation decision. Serial neuro checks.

#### Latest progress and pending work

Critical cervical spinal cord injury; surgical stabilisation timing and neurological trajectory are both undetermined at this stage.
Pending: Neurosurgical/spinal stabilisation decision documentation; Serial neurological examination charting; Bladder and bowel care planning.
Department question (Internal Medicine): Manage neurogenic haemodynamic instability and monitor for autonomic dysreflexia risk. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Neck pain with documented reduced power and altered sensation in both upper and lower limbs on the recorded neurological examination.
Background: Head-on vehicle collision reported by paramedics with immediate neck pain and reduced sensation in the limbs at the scene; cervical immobilisation was applied before transport.
Recent results: Orthopaedics laboratory review; CT and MRI cervical spine
Pending: Neurosurgical/spinal stabilisation decision documentation; Serial neurological examination charting; Bladder and bowel care planning.
Continuity: Critical cervical spinal cord injury; surgical stabilisation timing and neurological trajectory are both undetermined at this stage.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Neurosurgical/spinal stabilisation decision documentation — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Serial neurological examination charting — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Bladder and bowel care planning — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0044 — Sushila Devi, 58F

Department: Orthopaedics. Acuity at snapshot: noncritical.

Conditions: Post-operative surgical site infection; Post total knee replacement.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Localised erythema and serous discharge at the surgical site with no systemic symptoms recorded at this review.

Underwent an elective total knee replacement six weeks ago; returns now with localised wound redness and discharge noted since yesterday, without fever.

Critical-state rationale: Afebrile with a localised, non-spreading wound finding; stable outpatient presentation without systemic sepsis criteria.

Context: Daughter accompanies her to appointments; returned to light tailoring work two weeks after surgery per patient report.

Occupation: Tailor. Preferred language: Hindi, Marathi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Elective total knee replacement performed.
  Record: 00000041-0000-4000-8000-000000044001
- 2025-12-11T02:00:00.000Z: OPD, completed. Two-week post-operative wound check; healing well.
  Record: 00000041-0000-4000-8000-000000044002
- 2026-06-09T02:00:00.000Z: OPD, completed. Four-week physiotherapy review.
  Record: 00000041-0000-4000-8000-000000044003
- 2026-08-24T02:00:00.000Z: OPD, completed. Wound concern reported by phone before this visit.
  Record: 00000041-0000-4000-8000-000000044004
- 2026-09-07T02:00:00.000Z: OPD, active. Localised erythema and serous discharge at the surgical site with no systemic symptoms recorded at this review.
  Record: 00000041-0000-4000-8000-000000044005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Left knee X-ray · AP and lateral

Source: MockRIS; record: 00000047-0000-4000-8000-000000044001; order: 00000048-0000-4000-8000-000000044001.

Prosthesis components are well aligned with no loosening identified on this radiograph. Findings do not exclude superficial infection.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000044005; order: 00000043-0000-4000-8000-000000044005.

Synthetic results associated with this encounter. CRP 18 mg/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000044004; order: 00000043-0000-4000-8000-000000044004.

Synthetic results associated with this encounter. CRP 4 mg/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000044003; order: 00000043-0000-4000-8000-000000044003.

Synthetic results associated with this encounter. CRP 5 mg/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000044002; order: 00000043-0000-4000-8000-000000044002.

Synthetic results associated with this encounter. CRP 6 mg/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000044001; order: 00000043-0000-4000-8000-000000044001.

Synthetic results associated with this encounter. CRP 8 mg/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Paracetamol, 500 mg, oral, As needed; documented_home. Post-operative analgesia continued from discharge prescription.

### Department coordination

Orthopaedics → Internal Medicine: Review glycaemic and general medical status as risk factors for delayed wound healing. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Localised erythema and serous discharge at the surgical site with no systemic symptoms recorded at this review.
Background: Underwent an elective total knee replacement six weeks ago; returns now with localised wound redness and discharge noted since yesterday, without fever.
Recorded acuity: Afebrile with a localised, non-spreading wound finding; stable outpatient presentation without systemic sepsis criteria.
History source and context: Daughter accompanies her to appointments; returned to light tailoring work two weeks after surgery per patient report.
Available results: CRP 18 mg/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Total knee replacement, left knee — six weeks ago

Elective procedure at this hospital; operative report on file. Current presentation is a post-operative review, not a new unrelated complaint.

#### Latest progress and pending work

Stable outpatient review for a suspected superficial surgical site infection; deep prosthetic joint infection has not been confirmed and is not assumed.
Pending: Wound swab culture result; Repeat CRP in one week; Physiotherapy progress review.
Department question (Internal Medicine): Review glycaemic and general medical status as risk factors for delayed wound healing. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Localised erythema and serous discharge at the surgical site with no systemic symptoms recorded at this review.
Background: Underwent an elective total knee replacement six weeks ago; returns now with localised wound redness and discharge noted since yesterday, without fever.
Recent results: Orthopaedics laboratory review; Left knee X-ray · AP and lateral
Pending: Wound swab culture result; Repeat CRP in one week; Physiotherapy progress review.
Continuity: Stable outpatient review for a suspected superficial surgical site infection; deep prosthetic joint infection has not been confirmed and is not assumed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Wound swab culture result — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Repeat CRP in one week — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.
- Physiotherapy progress review — Dr. Nikhil Joshi; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0045 — Bharat Solanki, 24M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Rhabdomyolysis; Acute kidney injury.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Severe generalised muscle pain, dark tea-coloured urine and reduced urine output over the preceding twelve hours.

Completed an unusually intense weight-training session two days ago followed by severe muscle soreness and progressively dark urine, prompting this presentation.

Critical-state rationale: Creatine kinase markedly elevated, creatinine rising on serial testing and documented oliguria meeting the recorded acute kidney injury criteria.

Context: Training partner brought him in; no prior similar episodes documented at this hospital.

Occupation: Gym trainer. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Severe generalised muscle pain, dark tea-coloured urine and reduced urine output over the preceding twelve hours.
  Record: 00000041-0000-4000-8000-000000045001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000045001; order: 00000048-0000-4000-8000-000000045001.

Normal-sized kidneys with mildly increased cortical echogenicity. No hydronephrosis or obstructing calculus identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000045001; order: 00000043-0000-4000-8000-000000045001.

Synthetic results associated with this encounter. Creatine kinase 42000 U/L (high); Creatinine 3.4 mg/dL (high); Potassium 6.1 mmol/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Nephrology → Cardiology: Review ECG for hyperkalaemia-related changes given the potassium level. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe generalised muscle pain, dark tea-coloured urine and reduced urine output over the preceding twelve hours.
Background: Completed an unusually intense weight-training session two days ago followed by severe muscle soreness and progressively dark urine, prompting this presentation.
Recorded acuity: Creatine kinase markedly elevated, creatinine rising on serial testing and documented oliguria meeting the recorded acute kidney injury criteria.
History source and context: Training partner brought him in; no prior similar episodes documented at this hospital.
Available results: Creatine kinase 42000 U/L; Creatinine 3.4 mg/dL; Potassium 6.1 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Dark urine, oliguric, creatine kinase markedly elevated. Potassium borderline high.
Plan: Aggressive intravenous fluids, urine alkalinisation per protocol, cardiac monitoring for hyperkalaemia. Cardiology consulted.

#### Ward round — today, morning round

Findings: Urine output improving with fluids. Potassium trending down on repeat.
Plan: Continue fluid therapy. Repeat creatine kinase and renal panel. Reassess need for renal replacement if trend reverses.

#### Latest progress and pending work

Critical rhabdomyolysis-induced acute kidney injury; dialysis has not been initiated and remains a contingency plan.
Pending: Repeat creatine kinase and renal panel; Urine output charting; Dialysis-readiness assessment if oliguria persists.
Department question (Cardiology): Review ECG for hyperkalaemia-related changes given the potassium level. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe generalised muscle pain, dark tea-coloured urine and reduced urine output over the preceding twelve hours.
Background: Completed an unusually intense weight-training session two days ago followed by severe muscle soreness and progressively dark urine, prompting this presentation.
Recent results: Nephrology laboratory review; Ultrasound KUB
Pending: Repeat creatine kinase and renal panel; Urine output charting; Dialysis-readiness assessment if oliguria persists.
Continuity: Critical rhabdomyolysis-induced acute kidney injury; dialysis has not been initiated and remains a contingency plan.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat creatine kinase and renal panel — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Urine output charting — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Dialysis-readiness assessment if oliguria persists — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0046 — Manoj Kumar Jha, 19M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Post-infectious glomerulonephritis; Acute kidney injury; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Periorbital swelling, cola-coloured urine and new hypertension with documented reduced urine output over two days.

A documented sore throat two weeks ago was managed at home without antibiotics; now presents with puffy eyes, reduced urine output and dark urine.

Critical-state rationale: Blood pressure 162/104 mmHg, gross haematuria and creatinine rising on serial testing meeting the recorded acute nephritic syndrome criteria.

Context: Parents are present; documented recent sore throat is the recorded preceding illness, not a confirmed streptococcal culture.

Occupation: College student. Preferred language: Hindi, Maithili.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Periorbital swelling, cola-coloured urine and new hypertension with documented reduced urine output over two days.
  Record: 00000041-0000-4000-8000-000000046001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000046001; order: 00000048-0000-4000-8000-000000046001.

Both kidneys are mildly enlarged with increased cortical echogenicity. No hydronephrosis identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000046001; order: 00000043-0000-4000-8000-000000046001.

Synthetic results associated with this encounter. Creatinine 2.2 mg/dL (high); C3 complement 42 mg/dL (low); ASO titre 620 IU/mL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Nephrology → Internal Medicine: Assist with blood-pressure control and monitor for hypertensive complications. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Periorbital swelling, cola-coloured urine and new hypertension with documented reduced urine output over two days.
Background: A documented sore throat two weeks ago was managed at home without antibiotics; now presents with puffy eyes, reduced urine output and dark urine.
Recorded acuity: Blood pressure 162/104 mmHg, gross haematuria and creatinine rising on serial testing meeting the recorded acute nephritic syndrome criteria.
History source and context: Parents are present; documented recent sore throat is the recorded preceding illness, not a confirmed streptococcal culture.
Available results: Creatinine 2.2 mg/dL; C3 complement 42 mg/dL; ASO titre 620 IU/mL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Periorbital oedema, gross haematuria, hypertensive. Complement low, ASO titre elevated, supporting the working diagnosis.
Plan: Blood-pressure control, fluid and salt restriction, monitor urine output closely. Internal Medicine consulted.

#### Ward round — today, morning round

Findings: Blood pressure improving on current therapy. Urine output adequate overnight.
Plan: Continue supportive management. Repeat renal panel and complement. Reassess biopsy need based on trajectory.

#### Latest progress and pending work

Critical post-infectious glomerulonephritis; renal biopsy has been discussed but not yet performed or scheduled.
Pending: Repeat renal panel and complement levels; Urine protein quantification; Renal biopsy discussion if no improvement.
Department question (Internal Medicine): Assist with blood-pressure control and monitor for hypertensive complications. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Periorbital swelling, cola-coloured urine and new hypertension with documented reduced urine output over two days.
Background: A documented sore throat two weeks ago was managed at home without antibiotics; now presents with puffy eyes, reduced urine output and dark urine.
Recent results: Nephrology laboratory review; Ultrasound KUB
Pending: Repeat renal panel and complement levels; Urine protein quantification; Renal biopsy discussion if no improvement.
Continuity: Critical post-infectious glomerulonephritis; renal biopsy has been discussed but not yet performed or scheduled.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat renal panel and complement levels — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Urine protein quantification — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Renal biopsy discussion if no improvement — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0047 — Firdaus Ali, 30F

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Systemic lupus erythematosus; Lupus nephritis flare; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

New facial rash, joint pain and progressive leg swelling with frothy urine reported over the past week.

Known systemic lupus erythematosus on maintenance immunosuppression with documented stable renal function until this presentation; recent joint pain and facial rash preceded worsening leg swelling.

Critical-state rationale: Proteinuria in the nephrotic range, rising creatinine and active urinary sediment meeting the recorded criteria for an active lupus nephritis flare.

Context: Husband manages appointment logistics; patient continues part-time teaching duties where possible.

Occupation: College lecturer. Preferred language: Urdu, Hindi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Lupus diagnosis and baseline renal assessment.
  Record: 00000041-0000-4000-8000-000000047001
- 2025-12-11T02:00:00.000Z: OPD, completed. Renal function stable on maintenance immunosuppression.
  Record: 00000041-0000-4000-8000-000000047002
- 2026-06-09T02:00:00.000Z: OPD, completed. Joint flare managed with dose adjustment.
  Record: 00000041-0000-4000-8000-000000047003
- 2026-08-24T02:00:00.000Z: OPD, completed. Routine follow-up before the current flare.
  Record: 00000041-0000-4000-8000-000000047004
- 2026-09-07T02:00:00.000Z: IPD, active. New facial rash, joint pain and progressive leg swelling with frothy urine reported over the past week.
  Record: 00000041-0000-4000-8000-000000047005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000047001; order: 00000048-0000-4000-8000-000000047001.

Kidneys are normal in size with preserved cortico-medullary differentiation. No hydronephrosis identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000047005; order: 00000043-0000-4000-8000-000000047005.

Synthetic results associated with this encounter. Creatinine 2.1 mg/dL (high); C3 complement 44 mg/dL (low); Anti-dsDNA 180 IU/mL (high); Haemoglobin 9.4 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000047004; order: 00000043-0000-4000-8000-000000047004.

Synthetic results associated with this encounter. Creatinine 1.4 mg/dL (high); C3 complement 62 mg/dL (low); Haemoglobin 10.2 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000047003; order: 00000043-0000-4000-8000-000000047003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); C3 complement 86 mg/dL (low); Haemoglobin 10.8 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000047002; order: 00000043-0000-4000-8000-000000047002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); C3 complement 98 mg/dL (normal); Haemoglobin 11.2 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000047001; order: 00000043-0000-4000-8000-000000047001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); C3 complement 110 mg/dL (normal); Haemoglobin 11.6 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Hydroxychloroquine, 200 mg, oral, Once daily; documented_home. Maintenance lupus therapy continued from home prescription.

### Department coordination

Nephrology → Internal Medicine: Coordinate immunosuppression escalation and monitor for infection risk during induction therapy. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

New facial rash, joint pain and progressive leg swelling with frothy urine reported over the past week.
Background: Known systemic lupus erythematosus on maintenance immunosuppression with documented stable renal function until this presentation; recent joint pain and facial rash preceded worsening leg swelling.
Recorded acuity: Proteinuria in the nephrotic range, rising creatinine and active urinary sediment meeting the recorded criteria for an active lupus nephritis flare.
History source and context: Husband manages appointment logistics; patient continues part-time teaching duties where possible.
Available results: Creatinine 2.1 mg/dL; C3 complement 44 mg/dL; Anti-dsDNA 180 IU/mL; Haemoglobin 9.4 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Facial rash, joint pain, leg oedema. Nephrotic-range proteinuria and low complement support an active flare.
Plan: Pulse corticosteroids per protocol, plan renal biopsy for classification. Internal Medicine consulted for infection monitoring.

#### Ward round — today, morning round

Findings: Oedema stable, no new rash progression overnight.
Plan: Continue current immunosuppression. Await biopsy scheduling. Repeat complement and anti-dsDNA to track response.

#### Latest progress and pending work

Critical active lupus nephritis flare; biopsy classification is pending and induction therapy has not yet been finalised.
Pending: Renal biopsy for lupus nephritis classification; Repeat complement and anti-dsDNA titres; Proteinuria quantification.
Department question (Internal Medicine): Coordinate immunosuppression escalation and monitor for infection risk during induction therapy. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: New facial rash, joint pain and progressive leg swelling with frothy urine reported over the past week.
Background: Known systemic lupus erythematosus on maintenance immunosuppression with documented stable renal function until this presentation; recent joint pain and facial rash preceded worsening leg swelling.
Recent results: Nephrology laboratory review; Ultrasound KUB
Pending: Renal biopsy for lupus nephritis classification; Repeat complement and anti-dsDNA titres; Proteinuria quantification.
Continuity: Critical active lupus nephritis flare; biopsy classification is pending and induction therapy has not yet been finalised.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Renal biopsy for lupus nephritis classification — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Repeat complement and anti-dsDNA titres — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Proteinuria quantification — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0048 — Yusuf Sheikh, 45M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Post renal transplant; Acute transplant rejection; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Graft-site tenderness, reduced urine output and fever with a rise in creatinine from the previously documented stable baseline.

Received a living-donor renal transplant fourteen months ago with documented stable graft function until this presentation; reports missing several recent immunosuppression doses during a family emergency.

Critical-state rationale: Creatinine risen from a stable baseline of 1.3 to 3.6 mg/dL with graft tenderness and fever, meeting the recorded criteria for suspected acute rejection.

Context: Wife is the living donor and is present; documented adherence gap coincided with a family emergency out of town.

Occupation: Shopkeeper. Preferred language: Hindi, Urdu.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Transplant clinic review; graft function stable.
  Record: 00000041-0000-4000-8000-000000048001
- 2025-12-11T02:00:00.000Z: OPD, completed. Immunosuppression level check; therapeutic range confirmed.
  Record: 00000041-0000-4000-8000-000000048002
- 2026-06-09T02:00:00.000Z: OPD, completed. Routine follow-up; no rejection signs at that visit.
  Record: 00000041-0000-4000-8000-000000048003
- 2026-08-24T02:00:00.000Z: OPD, completed. Missed follow-up during a documented family emergency.
  Record: 00000041-0000-4000-8000-000000048004
- 2026-09-07T02:00:00.000Z: IPD, active. Graft-site tenderness, reduced urine output and fever with a rise in creatinine from the previously documented stable baseline.
  Record: 00000041-0000-4000-8000-000000048005

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound transplant kidney with Doppler

Source: MockRIS; record: 00000047-0000-4000-8000-000000048001; order: 00000048-0000-4000-8000-000000048001.

Graft kidney shows increased resistive indices on Doppler assessment. No hydronephrosis or perigraft collection identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000048005; order: 00000043-0000-4000-8000-000000048005.

Synthetic results associated with this encounter. Creatinine 3.6 mg/dL (high); Tacrolimus level 1.4 ng/mL (low); WBC 10.6 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000048004; order: 00000043-0000-4000-8000-000000048004.

Synthetic results associated with this encounter. Creatinine 1.4 mg/dL (high); Tacrolimus level 2.1 ng/mL (low); WBC 8.4 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000048003; order: 00000043-0000-4000-8000-000000048003.

Synthetic results associated with this encounter. Creatinine 1.3 mg/dL (normal); Tacrolimus level 7 ng/mL (normal); WBC 8 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000048002; order: 00000043-0000-4000-8000-000000048002.

Synthetic results associated with this encounter. Creatinine 1.3 mg/dL (normal); Tacrolimus level 6.8 ng/mL (normal); WBC 7.6 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000048001; order: 00000043-0000-4000-8000-000000048001.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal); Tacrolimus level 7.2 ng/mL (normal); WBC 7.8 10^9/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Tacrolimus, 2 mg, oral, Twice daily per transplant protocol; held. Documented adherence gap during a family emergency; dose held pending level recheck and rejection workup.

### Department coordination

Nephrology → Internal Medicine: Assess infection risk before augmenting immunosuppression for suspected rejection. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Graft-site tenderness, reduced urine output and fever with a rise in creatinine from the previously documented stable baseline.
Background: Received a living-donor renal transplant fourteen months ago with documented stable graft function until this presentation; reports missing several recent immunosuppression doses during a family emergency.
Recorded acuity: Creatinine risen from a stable baseline of 1.3 to 3.6 mg/dL with graft tenderness and fever, meeting the recorded criteria for suspected acute rejection.
History source and context: Wife is the living donor and is present; documented adherence gap coincided with a family emergency out of town.
Available results: Creatinine 3.6 mg/dL; Tacrolimus level 1.4 ng/mL; WBC 10.6 10^9/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Living-donor renal transplant — fourteen months ago

Donor was his wife; operative and induction immunosuppression records are on file at this hospital. Current presentation is a suspected rejection episode, not a new unrelated diagnosis.

#### Ward round — admission day

Findings: Graft tenderness, fever, creatinine markedly risen from baseline. Tacrolimus level subtherapeutic, consistent with the documented adherence gap.
Plan: Restart tacrolimus, urgent transplant biopsy for rejection confirmation. Internal Medicine consulted for infection screening.

#### Ward round — today, morning round

Findings: Fever settling. Urine output improving with rehydration.
Plan: Continue supportive care pending biopsy. Repeat tacrolimus level and renal panel. Await histology to guide rejection therapy.

#### Latest progress and pending work

Critical suspected acute transplant rejection; biopsy confirmation is pending and augmented immunosuppression has not yet been started.
Pending: Transplant biopsy for rejection confirmation; Repeat tacrolimus trough level; Repeat renal panel.
Department question (Internal Medicine): Assess infection risk before augmenting immunosuppression for suspected rejection. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Graft-site tenderness, reduced urine output and fever with a rise in creatinine from the previously documented stable baseline.
Background: Received a living-donor renal transplant fourteen months ago with documented stable graft function until this presentation; reports missing several recent immunosuppression doses during a family emergency.
Recent results: Nephrology laboratory review; Ultrasound transplant kidney with Doppler
Pending: Transplant biopsy for rejection confirmation; Repeat tacrolimus trough level; Repeat renal panel.
Continuity: Critical suspected acute transplant rejection; biopsy confirmation is pending and augmented immunosuppression has not yet been started.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Transplant biopsy for rejection confirmation — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Repeat tacrolimus trough level — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Repeat renal panel — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0049 — Rupali Ghosh, 37F

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Thrombotic microangiopathy; Haemolytic uraemic syndrome; Acute kidney injury.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Pallor, petechial bruising and dark urine with documented reduced urine output following a diarrhoeal illness.

Five days of bloody diarrhoea following a documented meal at a roadside stall preceded new-onset pallor, bruising and reduced urine output.

Critical-state rationale: Microangiopathic haemolytic anaemia on blood film, thrombocytopenia and rising creatinine meeting the recorded criteria for suspected haemolytic uraemic syndrome.

Context: Husband reports the roadside meal as the only shared exposure among family members; no one else has fallen ill so far.

Occupation: Bank cashier. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2026-09-07T02:00:00.000Z: IPD, active. Pallor, petechial bruising and dark urine with documented reduced urine output following a diarrhoeal illness.
  Record: 00000041-0000-4000-8000-000000049001

### Investigation history

#### 2026-09-07T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000049001; order: 00000048-0000-4000-8000-000000049001.

Kidneys are mildly enlarged with increased cortical echogenicity bilaterally. No hydronephrosis identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000049001; order: 00000043-0000-4000-8000-000000049001.

Synthetic results associated with this encounter. Haemoglobin 7.4 g/dL (low); Platelets 32 10^9/L (low); Creatinine 3.8 mg/dL (high); LDH 1120 U/L (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Nephrology → Internal Medicine: Coordinate blood film review and haematology-guided management of suspected thrombotic microangiopathy. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Pallor, petechial bruising and dark urine with documented reduced urine output following a diarrhoeal illness.
Background: Five days of bloody diarrhoea following a documented meal at a roadside stall preceded new-onset pallor, bruising and reduced urine output.
Recorded acuity: Microangiopathic haemolytic anaemia on blood film, thrombocytopenia and rising creatinine meeting the recorded criteria for suspected haemolytic uraemic syndrome.
History source and context: Husband reports the roadside meal as the only shared exposure among family members; no one else has fallen ill so far.
Available results: Haemoglobin 7.4 g/dL; Platelets 32 10^9/L; Creatinine 3.8 mg/dL; LDH 1120 U/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — admission day

Findings: Pallor, bruising, oliguric. Blood film confirms microangiopathic haemolysis with thrombocytopenia.
Plan: Supportive transfusion as needed, urgent haematology and nephrology coordination, ADAMTS13 level sent. Plasma exchange planning underway.

#### Ward round — today, morning round

Findings: Haemoglobin and platelets stable on repeat. Urine output remains reduced.
Plan: Continue supportive care. Await ADAMTS13 result to guide plasma exchange versus alternative therapy.

#### Latest progress and pending work

Critical suspected haemolytic uraemic syndrome; plasma exchange has been discussed but not yet initiated.
Pending: ADAMTS13 activity level; Plasma exchange planning documentation; Repeat haemoglobin, platelets and renal panel.
Department question (Internal Medicine): Coordinate blood film review and haematology-guided management of suspected thrombotic microangiopathy. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Pallor, petechial bruising and dark urine with documented reduced urine output following a diarrhoeal illness.
Background: Five days of bloody diarrhoea following a documented meal at a roadside stall preceded new-onset pallor, bruising and reduced urine output.
Recent results: Nephrology laboratory review; Ultrasound KUB
Pending: ADAMTS13 activity level; Plasma exchange planning documentation; Repeat haemoglobin, platelets and renal panel.
Continuity: Critical suspected haemolytic uraemic syndrome; plasma exchange has been discussed but not yet initiated.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- ADAMTS13 activity level — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Plasma exchange planning documentation — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Repeat haemoglobin, platelets and renal panel — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.

## F-DEMO-0050 — Naresh Kohli, 64M

Department: Nephrology. Acuity at snapshot: noncritical.

Conditions: Coronary artery disease; Contrast-induced nephropathy; Chronic kidney disease stage 2.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Feels well with no oliguria, oedema or breathlessness; attends for the planned post-procedure renal function recheck.

Underwent a coronary angiogram eight days ago for investigation of exertional chest pain; a mild, self-limiting rise in creatinine was documented afterward and this is the scheduled recheck.

Critical-state rationale: Stable outpatient review with creatinine trending back toward baseline; no acute findings at this encounter.

Context: Drives himself to appointments; wife tracks his follow-up schedule on a shared calendar.

Occupation: Retired insurance agent. Preferred language: Hindi, Punjabi.

### Hospital encounters

- 2025-03-16T02:00:00.000Z: OPD, completed. Cardiology assessment for exertional chest pain; angiogram planned.
  Record: 00000041-0000-4000-8000-000000050001
- 2025-12-11T02:00:00.000Z: OPD, completed. Coronary angiogram performed; mild post-procedure creatinine rise noted.
  Record: 00000041-0000-4000-8000-000000050002
- 2026-06-09T02:00:00.000Z: OPD, completed. First recheck; creatinine trending down.
  Record: 00000041-0000-4000-8000-000000050003
- 2026-08-24T02:00:00.000Z: OPD, completed. Second recheck before this visit; continued improvement.
  Record: 00000041-0000-4000-8000-000000050004
- 2026-09-07T02:00:00.000Z: OPD, active. Feels well with no oliguria, oedema or breathlessness; attends for the planned post-procedure renal function recheck.
  Record: 00000041-0000-4000-8000-000000050005

### Investigation history

#### 2026-09-07T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000050005; order: 00000043-0000-4000-8000-000000050005.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-24T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000050004; order: 00000043-0000-4000-8000-000000050004.

Synthetic results associated with this encounter. Creatinine 1.3 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-06-09T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000050003; order: 00000043-0000-4000-8000-000000050003.

Synthetic results associated with this encounter. Creatinine 1.6 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-12-11T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000050002; order: 00000043-0000-4000-8000-000000050002.

Synthetic results associated with this encounter. Creatinine 1.9 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-03-16T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000050001; order: 00000043-0000-4000-8000-000000050001.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Atorvastatin, 20 mg, oral, At night; documented_home. Continued from the cardiology discharge prescription.

### Department coordination

Nephrology → Cardiology: Confirm no further contrast exposure is planned in the near term given the recent nephropathy. Status: completed. No further contrast-requiring procedures planned in the immediate term. Routine cardiology follow-up to continue as scheduled.

### Current notes and handover draft

#### Current clinical assessment

Feels well with no oliguria, oedema or breathlessness; attends for the planned post-procedure renal function recheck.
Background: Underwent a coronary angiogram eight days ago for investigation of exertional chest pain; a mild, self-limiting rise in creatinine was documented afterward and this is the scheduled recheck.
Recorded acuity: Stable outpatient review with creatinine trending back toward baseline; no acute findings at this encounter.
History source and context: Drives himself to appointments; wife tracks his follow-up schedule on a shared calendar.
Available results: Creatinine 1.2 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Latest progress and pending work

Stable outpatient recovery from contrast-induced nephropathy; renal function is trending to baseline and no acute concern is documented.
Pending: Final renal function recheck in two weeks; Cardiology follow-up appointment.
Department question (Cardiology): Confirm no further contrast exposure is planned in the near term given the recent nephropathy. Status: completed. No further contrast-requiring procedures planned in the immediate term. Routine cardiology follow-up to continue as scheduled.

#### Synthetic handover draft — not approved

Situation: Feels well with no oliguria, oedema or breathlessness; attends for the planned post-procedure renal function recheck.
Background: Underwent a coronary angiogram eight days ago for investigation of exertional chest pain; a mild, self-limiting rise in creatinine was documented afterward and this is the scheduled recheck.
Recent results: Nephrology laboratory review
Pending: Final renal function recheck in two weeks; Cardiology follow-up appointment.
Continuity: Stable outpatient recovery from contrast-induced nephropathy; renal function is trending to baseline and no acute concern is documented.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Final renal function recheck in two weeks — Dr. Devika Rao; due 2026-09-07T08:00:00.000Z.
- Cardiology follow-up appointment — Dr. Devika Rao; due 2026-09-14T04:00:00.000Z.

## F-DEMO-0051 — Harish Bansal, 63M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Inferior STEMI with right ventricular involvement; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Chest pressure, diaphoresis and presyncope; admission ECG records inferior and right-sided ST elevation.

Hypertension; prior treatment details unavailable at first attendance. First hospital encounter; outside history is reported, not a retained hospital record.

Critical-state rationale: Critical at this synthetic assessment: Chest pressure, diaphoresis and presyncope; admission ECG records inferior and right-sided ST elevation. BP 82/54 mmHg, pulse 48/min, SpO₂ 93% on room air. Supporting results: Troponin I 7.8 ng/mL; Creatinine 1.7 mg/dL; Potassium 4.5 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: School administrator. Preferred language: Hindi, English.

### Hospital encounters

- 2026-09-08T02:00:00.000Z: IPD, active. Chest pressure, diaphoresis and presyncope; admission ECG records inferior and right-sided ST elevation.
  Record: 00000041-0000-4000-8000-000000051001

### Investigation history

#### 2026-09-08T04:30:00.000Z — Bedside echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000051001; order: 00000048-0000-4000-8000-000000051001.

Inferior wall hypokinesia and impaired right ventricular systolic function; no pericardial effusion.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000051001; order: 00000043-0000-4000-8000-000000051001.

Synthetic results associated with this encounter. Troponin I 7.8 ng/mL (high); Creatinine 1.7 mg/dL (high); Potassium 4.5 mmol/L (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Cardiology → Nephrology: Assess acute renal impairment and fluid balance alongside cardiology management. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Chest pressure, diaphoresis and presyncope; admission ECG records inferior and right-sided ST elevation.
Background: Hypertension; prior treatment details unavailable at first attendance. First hospital encounter; outside history is reported, not a retained hospital record.
Recorded acuity: Critical at this synthetic assessment: Chest pressure, diaphoresis and presyncope; admission ECG records inferior and right-sided ST elevation. BP 82/54 mmHg, pulse 48/min, SpO₂ 93% on room air. Supporting results: Troponin I 7.8 ng/mL; Creatinine 1.7 mg/dL; Potassium 4.5 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: Troponin I 7.8 ng/mL; Creatinine 1.7 mg/dL; Potassium 4.5 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Chest pressure, diaphoresis and presyncope; admission ECG records inferior and right-sided ST elevation. Critical at this synthetic assessment: Chest pressure, diaphoresis and presyncope; admission ECG records inferior and right-sided ST elevation. BP 82/54 mmHg, pulse 48/min, SpO₂ 93% on room air. Supporting results: Troponin I 7.8 ng/mL; Creatinine 1.7 mg/dL; Potassium 4.5 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess acute renal impairment and fluid balance alongside cardiology management. Pending: Repeat Troponin I result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Inferior STEMI with right ventricular involvement. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess acute renal impairment and fluid balance alongside cardiology management.
Pending: Repeat Troponin I result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Assess acute renal impairment and fluid balance alongside cardiology management. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Chest pressure, diaphoresis and presyncope; admission ECG records inferior and right-sided ST elevation.
Background: Hypertension; prior treatment details unavailable at first attendance. First hospital encounter; outside history is reported, not a retained hospital record.
Recent results: Cardiology laboratory review; Bedside echocardiogram
Pending: Repeat Troponin I result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Inferior STEMI with right ventricular involvement. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess acute renal impairment and fluid balance alongside cardiology management.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Troponin I result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0052 — Meenal Vyas, 47F

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Fulminant myocarditis with cardiogenic shock; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Rapidly progressive breathlessness, cool extremities and oliguria after fever.

Hypertension; a recent febrile illness preceded cardiac symptoms. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Rapidly progressive breathlessness, cool extremities and oliguria after fever. BP 78/50 mmHg, pulse 132/min, SpO₂ 88% on room air. Supporting results: Troponin I 4.1 ng/mL; Lactate 5.2 mmol/L; Creatinine 2.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Shopkeeper. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Hypertension; a recent febrile illness preceded cardiac symptoms.
  Record: 00000041-0000-4000-8000-000000052001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000052002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000052003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000052004
- 2026-09-08T02:00:00.000Z: IPD, active. Rapidly progressive breathlessness, cool extremities and oliguria after fever.
  Record: 00000041-0000-4000-8000-000000052005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Bedside echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000052001; order: 00000048-0000-4000-8000-000000052001.

Severe global ventricular hypokinesia, estimated LVEF 20%; no focal valve lesion.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000052005; order: 00000043-0000-4000-8000-000000052005.

Synthetic results associated with this encounter. Troponin I 4.1 ng/mL (high); Lactate 5.2 mmol/L (high); Creatinine 2.3 mg/dL (high); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000052004; order: 00000043-0000-4000-8000-000000052004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000052003; order: 00000043-0000-4000-8000-000000052003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000052002; order: 00000043-0000-4000-8000-000000052002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000052001; order: 00000043-0000-4000-8000-000000052001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Cardiology → Nephrology: Review evolving acute kidney injury and acid-base status in low-output physiology. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Rapidly progressive breathlessness, cool extremities and oliguria after fever.
Background: Hypertension; a recent febrile illness preceded cardiac symptoms. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Rapidly progressive breathlessness, cool extremities and oliguria after fever. BP 78/50 mmHg, pulse 132/min, SpO₂ 88% on room air. Supporting results: Troponin I 4.1 ng/mL; Lactate 5.2 mmol/L; Creatinine 2.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Troponin I 4.1 ng/mL; Lactate 5.2 mmol/L; Creatinine 2.3 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Rapidly progressive breathlessness, cool extremities and oliguria after fever. Critical at this synthetic assessment: Rapidly progressive breathlessness, cool extremities and oliguria after fever. BP 78/50 mmHg, pulse 132/min, SpO₂ 88% on room air. Supporting results: Troponin I 4.1 ng/mL; Lactate 5.2 mmol/L; Creatinine 2.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review evolving acute kidney injury and acid-base status in low-output physiology. Pending: Repeat Troponin I result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Fulminant myocarditis with cardiogenic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review evolving acute kidney injury and acid-base status in low-output physiology.
Pending: Repeat Troponin I result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Review evolving acute kidney injury and acid-base status in low-output physiology. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Rapidly progressive breathlessness, cool extremities and oliguria after fever.
Background: Hypertension; a recent febrile illness preceded cardiac symptoms. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Bedside echocardiogram
Pending: Repeat Troponin I result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Fulminant myocarditis with cardiogenic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review evolving acute kidney injury and acid-base status in low-output physiology.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Troponin I result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0053 — Irfan Qureshi, 58M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Acute severe mitral regurgitation with pulmonary oedema; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Abrupt dyspnoea and a new systolic murmur after a recent coronary event.

Coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Abrupt dyspnoea and a new systolic murmur after a recent coronary event. BP 86/58 mmHg, pulse 124/min, SpO₂ 84% on room air. Supporting results: Troponin I 2.4 ng/mL; Lactate 4.3 mmol/L; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired postal employee. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Coronary artery disease and hypertension.
  Record: 00000041-0000-4000-8000-000000053001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000053002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000053003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000053004
- 2026-09-08T02:00:00.000Z: IPD, active. Abrupt dyspnoea and a new systolic murmur after a recent coronary event.
  Record: 00000041-0000-4000-8000-000000053005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000053001; order: 00000048-0000-4000-8000-000000053001.

Flail posterior mitral leaflet with severe eccentric regurgitation and pulmonary venous systolic flow reversal.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000053005; order: 00000043-0000-4000-8000-000000053005.

Synthetic results associated with this encounter. Troponin I 2.4 ng/mL (high); Lactate 4.3 mmol/L (high); Creatinine 1.9 mg/dL (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000053004; order: 00000043-0000-4000-8000-000000053004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000053003; order: 00000043-0000-4000-8000-000000053003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000053002; order: 00000043-0000-4000-8000-000000053002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000053001; order: 00000043-0000-4000-8000-000000053001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Atorvastatin, 20 mg, oral, At night; documented_home. Prior clinic medication context; not a complete cardiovascular regimen.

### Department coordination

Cardiology → Internal Medicine: Coordinate multisystem assessment and document discussion with the cardiac surgical service. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Abrupt dyspnoea and a new systolic murmur after a recent coronary event.
Background: Coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Abrupt dyspnoea and a new systolic murmur after a recent coronary event. BP 86/58 mmHg, pulse 124/min, SpO₂ 84% on room air. Supporting results: Troponin I 2.4 ng/mL; Lactate 4.3 mmol/L; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: Troponin I 2.4 ng/mL; Lactate 4.3 mmol/L; Creatinine 1.9 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Abrupt dyspnoea and a new systolic murmur after a recent coronary event. Critical at this synthetic assessment: Abrupt dyspnoea and a new systolic murmur after a recent coronary event. BP 86/58 mmHg, pulse 124/min, SpO₂ 84% on room air. Supporting results: Troponin I 2.4 ng/mL; Lactate 4.3 mmol/L; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate multisystem assessment and document discussion with the cardiac surgical service. Pending: Repeat Troponin I result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Acute severe mitral regurgitation with pulmonary oedema. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate multisystem assessment and document discussion with the cardiac surgical service.
Pending: Repeat Troponin I result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Coordinate multisystem assessment and document discussion with the cardiac surgical service. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Abrupt dyspnoea and a new systolic murmur after a recent coronary event.
Background: Coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Repeat Troponin I result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Acute severe mitral regurgitation with pulmonary oedema. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate multisystem assessment and document discussion with the cardiac surgical service.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Troponin I result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0054 — Nalini Hegde, 72F

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Complete heart block with recurrent syncope; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Three collapse episodes; ECG shows atrioventricular dissociation and ventricular escape at 30/min.

Hypertension and previously recorded bifascicular conduction disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Three collapse episodes; ECG shows atrioventricular dissociation and ventricular escape at 30/min. BP 80/46 mmHg, pulse 30/min, SpO₂ 94% on room air. Supporting results: Potassium 4.2 mmol/L; Creatinine 1.4 mg/dL; Haemoglobin 11.2 g/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Textile worker. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Hypertension and previously recorded bifascicular conduction disease.
  Record: 00000041-0000-4000-8000-000000054001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000054002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000054003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000054004
- 2026-09-08T02:00:00.000Z: IPD, active. Three collapse episodes; ECG shows atrioventricular dissociation and ventricular escape at 30/min.
  Record: 00000041-0000-4000-8000-000000054005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000054001; order: 00000048-0000-4000-8000-000000054001.

Preserved global left ventricular systolic function; no large effusion.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000054005; order: 00000043-0000-4000-8000-000000054005.

Synthetic results associated with this encounter. Potassium 4.2 mmol/L (normal); Creatinine 1.4 mg/dL (high); Haemoglobin 11.2 g/dL (low); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000054004; order: 00000043-0000-4000-8000-000000054004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000054003; order: 00000043-0000-4000-8000-000000054003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000054002; order: 00000043-0000-4000-8000-000000054002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000054001; order: 00000043-0000-4000-8000-000000054001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Cardiology → Internal Medicine: Review metabolic contributors and medication reconciliation during pacing evaluation. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Three collapse episodes; ECG shows atrioventricular dissociation and ventricular escape at 30/min.
Background: Hypertension and previously recorded bifascicular conduction disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Three collapse episodes; ECG shows atrioventricular dissociation and ventricular escape at 30/min. BP 80/46 mmHg, pulse 30/min, SpO₂ 94% on room air. Supporting results: Potassium 4.2 mmol/L; Creatinine 1.4 mg/dL; Haemoglobin 11.2 g/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: Potassium 4.2 mmol/L; Creatinine 1.4 mg/dL; Haemoglobin 11.2 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Three collapse episodes; ECG shows atrioventricular dissociation and ventricular escape at 30/min. Critical at this synthetic assessment: Three collapse episodes; ECG shows atrioventricular dissociation and ventricular escape at 30/min. BP 80/46 mmHg, pulse 30/min, SpO₂ 94% on room air. Supporting results: Potassium 4.2 mmol/L; Creatinine 1.4 mg/dL; Haemoglobin 11.2 g/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review metabolic contributors and medication reconciliation during pacing evaluation. Pending: Repeat Potassium result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Complete heart block with recurrent syncope. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review metabolic contributors and medication reconciliation during pacing evaluation.
Pending: Repeat Potassium result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Review metabolic contributors and medication reconciliation during pacing evaluation. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Three collapse episodes; ECG shows atrioventricular dissociation and ventricular escape at 30/min.
Background: Hypertension and previously recorded bifascicular conduction disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Repeat Potassium result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Complete heart block with recurrent syncope. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review metabolic contributors and medication reconciliation during pacing evaluation.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Potassium result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0055 — Pradeep Sethi, 66M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Infective endocarditis with acute heart failure; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Persistent fever, increasing breathlessness and a new diastolic murmur.

Rheumatic aortic valve disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Persistent fever, increasing breathlessness and a new diastolic murmur. BP 88/52 mmHg, pulse 118/min, SpO₂ 89% on room air. Supporting results: WBC 19.6 10^3/µL; CRP 168 mg/L; Creatinine 2.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Accounts assistant. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Rheumatic aortic valve disease and hypertension.
  Record: 00000041-0000-4000-8000-000000055001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000055002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000055003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000055004
- 2026-09-08T02:00:00.000Z: IPD, active. Persistent fever, increasing breathlessness and a new diastolic murmur.
  Record: 00000041-0000-4000-8000-000000055005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000055001; order: 00000048-0000-4000-8000-000000055001.

Mobile aortic valve vegetation with severe regurgitation; blood cultures remain pending.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000055005; order: 00000043-0000-4000-8000-000000055005.

Synthetic results associated with this encounter. WBC 19.6 10^3/µL (high); CRP 168 mg/L (high); Creatinine 2.1 mg/dL (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000055004; order: 00000043-0000-4000-8000-000000055004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000055003; order: 00000043-0000-4000-8000-000000055003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000055002; order: 00000043-0000-4000-8000-000000055002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000055001; order: 00000043-0000-4000-8000-000000055001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Cardiology → Nephrology: Assess renal dysfunction and infection-related organ injury. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Persistent fever, increasing breathlessness and a new diastolic murmur.
Background: Rheumatic aortic valve disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Persistent fever, increasing breathlessness and a new diastolic murmur. BP 88/52 mmHg, pulse 118/min, SpO₂ 89% on room air. Supporting results: WBC 19.6 10^3/µL; CRP 168 mg/L; Creatinine 2.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: WBC 19.6 10^3/µL; CRP 168 mg/L; Creatinine 2.1 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Persistent fever, increasing breathlessness and a new diastolic murmur. Critical at this synthetic assessment: Persistent fever, increasing breathlessness and a new diastolic murmur. BP 88/52 mmHg, pulse 118/min, SpO₂ 89% on room air. Supporting results: WBC 19.6 10^3/µL; CRP 168 mg/L; Creatinine 2.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess renal dysfunction and infection-related organ injury. Pending: Repeat WBC result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Infective endocarditis with acute heart failure. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal dysfunction and infection-related organ injury.
Pending: Repeat WBC result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Assess renal dysfunction and infection-related organ injury. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Persistent fever, increasing breathlessness and a new diastolic murmur.
Background: Rheumatic aortic valve disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Repeat WBC result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Infective endocarditis with acute heart failure. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal dysfunction and infection-related organ injury.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat WBC result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0056 — Saira Mirza, 54F

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Obstructive prosthetic mitral valve thrombosis; Hypertension.

Allergies: Penicillin — rash reported; verification pending.

### Presentation and history

Sudden dyspnoea, reduced prosthetic sounds and documented subtherapeutic INR.

Mechanical mitral prosthesis, rheumatic heart disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Sudden dyspnoea, reduced prosthetic sounds and documented subtherapeutic INR. BP 90/60 mmHg, pulse 126/min, SpO₂ 86% on room air. Supporting results: INR 1.4 ratio; Lactate 3.8 mmol/L; Creatinine 1.5 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: Homemaker. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Mechanical mitral prosthesis, rheumatic heart disease and hypertension.
  Record: 00000041-0000-4000-8000-000000056001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000056002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000056003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000056004
- 2026-09-08T02:00:00.000Z: IPD, active. Sudden dyspnoea, reduced prosthetic sounds and documented subtherapeutic INR.
  Record: 00000041-0000-4000-8000-000000056005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Prosthetic valve echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000056001; order: 00000048-0000-4000-8000-000000056001.

Restricted leaflet motion with markedly increased transmitral gradient; thrombus is suspected.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000056005; order: 00000043-0000-4000-8000-000000056005.

Synthetic results associated with this encounter. INR 1.4 ratio (high); Lactate 3.8 mmol/L (high); Creatinine 1.5 mg/dL (high); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000056004; order: 00000043-0000-4000-8000-000000056004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000056003; order: 00000043-0000-4000-8000-000000056003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000056002; order: 00000043-0000-4000-8000-000000056002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000056001; order: 00000043-0000-4000-8000-000000056001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Cardiology → Internal Medicine: Review systemic findings and document discrepancies in the anticoagulation history. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Sudden dyspnoea, reduced prosthetic sounds and documented subtherapeutic INR.
Background: Mechanical mitral prosthesis, rheumatic heart disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Sudden dyspnoea, reduced prosthetic sounds and documented subtherapeutic INR. BP 90/60 mmHg, pulse 126/min, SpO₂ 86% on room air. Supporting results: INR 1.4 ratio; Lactate 3.8 mmol/L; Creatinine 1.5 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: INR 1.4 ratio; Lactate 3.8 mmol/L; Creatinine 1.5 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Sudden dyspnoea, reduced prosthetic sounds and documented subtherapeutic INR. Critical at this synthetic assessment: Sudden dyspnoea, reduced prosthetic sounds and documented subtherapeutic INR. BP 90/60 mmHg, pulse 126/min, SpO₂ 86% on room air. Supporting results: INR 1.4 ratio; Lactate 3.8 mmol/L; Creatinine 1.5 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review systemic findings and document discrepancies in the anticoagulation history. Pending: Repeat INR result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Obstructive prosthetic mitral valve thrombosis. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review systemic findings and document discrepancies in the anticoagulation history.
Pending: Repeat INR result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Review systemic findings and document discrepancies in the anticoagulation history. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Sudden dyspnoea, reduced prosthetic sounds and documented subtherapeutic INR.
Background: Mechanical mitral prosthesis, rheumatic heart disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Prosthetic valve echocardiogram
Pending: Repeat INR result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Obstructive prosthetic mitral valve thrombosis. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review systemic findings and document discrepancies in the anticoagulation history.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat INR result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0057 — Mahesh Pillai, 61M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Ventricular tachycardia storm in ischaemic cardiomyopathy; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Repeated sustained broad-complex tachycardia with presyncope; rhythm recovers between episodes.

Coronary artery disease, hypertension and previously documented LVEF 30%. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Repeated sustained broad-complex tachycardia with presyncope; rhythm recovers between episodes. BP 84/56 mmHg, pulse 112/min, SpO₂ 92% on room air. Supporting results: Potassium 3.1 mmol/L; Magnesium 1.4 mg/dL; Creatinine 1.8 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Bus conductor. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Coronary artery disease, hypertension and previously documented LVEF 30%.
  Record: 00000041-0000-4000-8000-000000057001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000057002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000057003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000057004
- 2026-09-08T02:00:00.000Z: IPD, active. Repeated sustained broad-complex tachycardia with presyncope; rhythm recovers between episodes.
  Record: 00000041-0000-4000-8000-000000057005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000057001; order: 00000048-0000-4000-8000-000000057001.

Dilated left ventricle with scar-related regional dysfunction, LVEF approximately 28%.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000057005; order: 00000043-0000-4000-8000-000000057005.

Synthetic results associated with this encounter. Potassium 3.1 mmol/L (low); Magnesium 1.4 mg/dL (low); Creatinine 1.8 mg/dL (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000057004; order: 00000043-0000-4000-8000-000000057004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000057003; order: 00000043-0000-4000-8000-000000057003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000057002; order: 00000043-0000-4000-8000-000000057002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000057001; order: 00000043-0000-4000-8000-000000057001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Atorvastatin, 20 mg, oral, At night; documented_home. Prior clinic medication context; not a complete cardiovascular regimen.

### Department coordination

Cardiology → Nephrology: Review electrolyte losses and renal function contributing to rhythm instability. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Repeated sustained broad-complex tachycardia with presyncope; rhythm recovers between episodes.
Background: Coronary artery disease, hypertension and previously documented LVEF 30%. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Repeated sustained broad-complex tachycardia with presyncope; rhythm recovers between episodes. BP 84/56 mmHg, pulse 112/min, SpO₂ 92% on room air. Supporting results: Potassium 3.1 mmol/L; Magnesium 1.4 mg/dL; Creatinine 1.8 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Potassium 3.1 mmol/L; Magnesium 1.4 mg/dL; Creatinine 1.8 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Repeated sustained broad-complex tachycardia with presyncope; rhythm recovers between episodes. Critical at this synthetic assessment: Repeated sustained broad-complex tachycardia with presyncope; rhythm recovers between episodes. BP 84/56 mmHg, pulse 112/min, SpO₂ 92% on room air. Supporting results: Potassium 3.1 mmol/L; Magnesium 1.4 mg/dL; Creatinine 1.8 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review electrolyte losses and renal function contributing to rhythm instability. Pending: Repeat Potassium result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Ventricular tachycardia storm in ischaemic cardiomyopathy. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review electrolyte losses and renal function contributing to rhythm instability.
Pending: Repeat Potassium result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Nephrology): Review electrolyte losses and renal function contributing to rhythm instability. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Repeated sustained broad-complex tachycardia with presyncope; rhythm recovers between episodes.
Background: Coronary artery disease, hypertension and previously documented LVEF 30%. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Echocardiogram
Pending: Repeat Potassium result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Ventricular tachycardia storm in ischaemic cardiomyopathy. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review electrolyte losses and renal function contributing to rhythm instability.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Working summary has not yet been written.

### Pending work

- Repeat Potassium result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: planned. Target: 2026-09-15. Owner: Dr. Rohan Shah.

Clinical clearance: Not approved. Documents checked: false.

Summary not yet written.

## F-DEMO-0058 — Geeta Ahuja, 69F

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Decompensated severe aortic stenosis with low-output state; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Rest dyspnoea and near-syncope after declining exercise tolerance.

Calcific aortic stenosis and hypertension with earlier echocardiographic surveillance. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Rest dyspnoea and near-syncope after declining exercise tolerance. BP 88/58 mmHg, pulse 104/min, SpO₂ 89% on room air. Supporting results: Creatinine 2.2 mg/dL; Lactate 3.6 mmol/L; Haemoglobin 10.4 g/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired teacher. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Calcific aortic stenosis and hypertension with earlier echocardiographic surveillance.
  Record: 00000041-0000-4000-8000-000000058001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000058002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000058003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000058004
- 2026-09-08T02:00:00.000Z: IPD, active. Rest dyspnoea and near-syncope after declining exercise tolerance.
  Record: 00000041-0000-4000-8000-000000058005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Doppler echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000058001; order: 00000048-0000-4000-8000-000000058001.

Heavily calcified severely stenotic aortic valve with reduced left ventricular systolic function.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000058005; order: 00000043-0000-4000-8000-000000058005.

Synthetic results associated with this encounter. Creatinine 2.2 mg/dL (high); Lactate 3.6 mmol/L (high); Haemoglobin 10.4 g/dL (low); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000058004; order: 00000043-0000-4000-8000-000000058004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000058003; order: 00000043-0000-4000-8000-000000058003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000058002; order: 00000043-0000-4000-8000-000000058002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000058001; order: 00000043-0000-4000-8000-000000058001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Cardiology → Nephrology: Assess cardiorenal dysfunction before definitive valve-team planning. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Rest dyspnoea and near-syncope after declining exercise tolerance.
Background: Calcific aortic stenosis and hypertension with earlier echocardiographic surveillance. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Rest dyspnoea and near-syncope after declining exercise tolerance. BP 88/58 mmHg, pulse 104/min, SpO₂ 89% on room air. Supporting results: Creatinine 2.2 mg/dL; Lactate 3.6 mmol/L; Haemoglobin 10.4 g/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: Creatinine 2.2 mg/dL; Lactate 3.6 mmol/L; Haemoglobin 10.4 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Rest dyspnoea and near-syncope after declining exercise tolerance. Critical at this synthetic assessment: Rest dyspnoea and near-syncope after declining exercise tolerance. BP 88/58 mmHg, pulse 104/min, SpO₂ 89% on room air. Supporting results: Creatinine 2.2 mg/dL; Lactate 3.6 mmol/L; Haemoglobin 10.4 g/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess cardiorenal dysfunction before definitive valve-team planning. Pending: Repeat Creatinine result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Decompensated severe aortic stenosis with low-output state. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess cardiorenal dysfunction before definitive valve-team planning.
Pending: Repeat Creatinine result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Nephrology): Assess cardiorenal dysfunction before definitive valve-team planning. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Rest dyspnoea and near-syncope after declining exercise tolerance.
Background: Calcific aortic stenosis and hypertension with earlier echocardiographic surveillance. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Doppler echocardiogram
Pending: Repeat Creatinine result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Decompensated severe aortic stenosis with low-output state. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess cardiorenal dysfunction before definitive valve-team planning.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Decompensated severe aortic stenosis with low-output state. Rest dyspnoea and near-syncope after declining exercise tolerance.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Cardiology; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat Creatinine result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Rohan Shah.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Decompensated severe aortic stenosis with low-output state. Rest dyspnoea and near-syncope after declining exercise tolerance.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Cardiology; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0059 — Bipin Trivedi, 57M

Department: Cardiology. Acuity at snapshot: critical.

Conditions: Cardiac tamponade from a large pericardial effusion; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Increasing breathlessness, raised jugular venous pressure and light-headedness.

Hypertension and an earlier small pericardial effusion under investigation. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Increasing breathlessness, raised jugular venous pressure and light-headedness. BP 76/48 mmHg, pulse 128/min, SpO₂ 92% on room air. Supporting results: Creatinine 2.4 mg/dL; Lactate 4.8 mmol/L; CRP 72 mg/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Small business owner. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Hypertension and an earlier small pericardial effusion under investigation.
  Record: 00000041-0000-4000-8000-000000059001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000059002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000059003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000059004
- 2026-09-08T02:00:00.000Z: IPD, active. Increasing breathlessness, raised jugular venous pressure and light-headedness.
  Record: 00000041-0000-4000-8000-000000059005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Emergency echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000059001; order: 00000048-0000-4000-8000-000000059001.

Large circumferential effusion with right atrial and right ventricular diastolic collapse.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000059005; order: 00000043-0000-4000-8000-000000059005.

Synthetic results associated with this encounter. Creatinine 2.4 mg/dL (high); Lactate 4.8 mmol/L (high); CRP 72 mg/L (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000059004; order: 00000043-0000-4000-8000-000000059004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000059003; order: 00000043-0000-4000-8000-000000059003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000059002; order: 00000043-0000-4000-8000-000000059002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000059001; order: 00000043-0000-4000-8000-000000059001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Cardiology → Internal Medicine: Coordinate investigation of the effusion cause after acute cardiology assessment. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Increasing breathlessness, raised jugular venous pressure and light-headedness.
Background: Hypertension and an earlier small pericardial effusion under investigation. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Increasing breathlessness, raised jugular venous pressure and light-headedness. BP 76/48 mmHg, pulse 128/min, SpO₂ 92% on room air. Supporting results: Creatinine 2.4 mg/dL; Lactate 4.8 mmol/L; CRP 72 mg/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: Creatinine 2.4 mg/dL; Lactate 4.8 mmol/L; CRP 72 mg/L; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Increasing breathlessness, raised jugular venous pressure and light-headedness. Critical at this synthetic assessment: Increasing breathlessness, raised jugular venous pressure and light-headedness. BP 76/48 mmHg, pulse 128/min, SpO₂ 92% on room air. Supporting results: Creatinine 2.4 mg/dL; Lactate 4.8 mmol/L; CRP 72 mg/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate investigation of the effusion cause after acute cardiology assessment. Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Cardiac tamponade from a large pericardial effusion. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate investigation of the effusion cause after acute cardiology assessment.
Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Internal Medicine): Coordinate investigation of the effusion cause after acute cardiology assessment. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Increasing breathlessness, raised jugular venous pressure and light-headedness.
Background: Hypertension and an earlier small pericardial effusion under investigation. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Emergency echocardiogram
Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Cardiac tamponade from a large pericardial effusion. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate investigation of the effusion cause after acute cardiology assessment.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Cardiac tamponade from a large pericardial effusion. Increasing breathlessness, raised jugular venous pressure and light-headedness.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Cardiology; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat Creatinine result and source review — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Rohan Shah.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Cardiac tamponade from a large pericardial effusion. Increasing breathlessness, raised jugular venous pressure and light-headedness.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Cardiology; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0060 — Ritu Malhotra, 45F

Department: Cardiology. Acuity at snapshot: noncritical.

Conditions: Recovered supraventricular tachycardia after electrophysiology admission.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Comfortable in sinus rhythm after the procedure and mobilising without dizziness.

Recurrent documented supraventricular tachycardia without known structural heart disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Noncritical recovery at this assessment: Comfortable in sinus rhythm after the procedure and mobilising without dizziness. Stable recorded physiology; final discharge status is documented separately.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Office assistant. Preferred language: Hindi, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Cardiology assessment. Background: Recurrent documented supraventricular tachycardia without known structural heart disease.
  Record: 00000041-0000-4000-8000-000000060001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000060002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Cardiology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000060003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000060004
- 2026-09-05T02:00:00.000Z: IPD, active. Comfortable in sinus rhythm after the procedure and mobilising without dizziness.
  Record: 00000041-0000-4000-8000-000000060005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Echocardiogram

Source: MockRIS; record: 00000047-0000-4000-8000-000000060001; order: 00000048-0000-4000-8000-000000060001.

Normal chamber dimensions and preserved biventricular systolic function.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000060005; order: 00000043-0000-4000-8000-000000060005.

Synthetic results associated with this encounter. Potassium 4.1 mmol/L (normal); Magnesium 2 mg/dL (normal); Creatinine 0.8 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.7 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-09-05T03:30:00.000Z — Admission laboratory assessment

Source: MockLIS; record: 00000064-0000-4000-8000-000000060001; order: 00000065-0000-4000-8000-000000060001.

Synthetic admission results, before the separate recovery report: Potassium 3.4 mmol/L; Magnesium 1.6 mg/dL; Creatinine 0.9 mg/dL.

#### 2026-08-25T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000060004; order: 00000043-0000-4000-8000-000000060004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000060003; order: 00000043-0000-4000-8000-000000060003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000060002; order: 00000043-0000-4000-8000-000000060002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Cardiology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000060001; order: 00000043-0000-4000-8000-000000060001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Cardiology → Internal Medicine: Confirm general medical review and outpatient rhythm follow-up. Status: completed. Synthetic Internal Medicine review completed. Comfortable in sinus rhythm after the procedure and mobilising without dizziness. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

### Current notes and handover draft

#### Current clinical assessment

Comfortable in sinus rhythm after the procedure and mobilising without dizziness.
Background: Recurrent documented supraventricular tachycardia without known structural heart disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Noncritical recovery at this assessment: Comfortable in sinus rhythm after the procedure and mobilising without dizziness. Stable recorded physiology; final discharge status is documented separately.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: Potassium 4.1 mmol/L; Magnesium 2 mg/dL; Creatinine 0.8 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.7 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Admission assessment and hospital course

Admission with recurrent symptomatic narrow-complex tachycardia. Electrophysiology assessment requested; no procedural outcome is available in this admission note.

#### Ward round — current admission review

Findings: Comfortable in sinus rhythm after the procedure and mobilising without dizziness. Noncritical recovery at this assessment: Comfortable in sinus rhythm after the procedure and mobilising without dizziness. Stable recorded physiology; final discharge status is documented separately.
Plan: Confirm general medical review and outpatient rhythm follow-up. Pending: Discharge summary requires completion; Outpatient rhythm follow-up appointment. Decisions remain with the treating team.

#### Latest progress and pending work

Recovered supraventricular tachycardia after electrophysiology admission. Stable recovery; check the working-list stage before completing discharge. Confirm general medical review and outpatient rhythm follow-up.
Pending: Discharge summary requires completion; Outpatient rhythm follow-up appointment.
Department question (Internal Medicine): Confirm general medical review and outpatient rhythm follow-up. Status: completed. Synthetic Internal Medicine review completed. Comfortable in sinus rhythm after the procedure and mobilising without dizziness. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

#### Synthetic handover draft — not approved

Situation: Comfortable in sinus rhythm after the procedure and mobilising without dizziness.
Background: Recurrent documented supraventricular tachycardia without known structural heart disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Cardiology laboratory review; Admission laboratory assessment; Echocardiogram
Pending: Discharge summary requires completion; Outpatient rhythm follow-up appointment.
Continuity: Recovered supraventricular tachycardia after electrophysiology admission. Stable recovery; check the working-list stage before completing discharge. Confirm general medical review and outpatient rhythm follow-up.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Summary and discharge document completion required.
Working summary has not yet been written.

### Pending work

- Discharge summary requires completion — Dr. Rohan Shah; due 2026-09-08T08:00:00.000Z.
- Outpatient rhythm follow-up appointment — Dr. Rohan Shah; due 2026-09-15T04:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-08. Owner: Dr. Rohan Shah.

Clinical clearance: Synthetic clinician fixture only. Documents checked: false.

Summary not yet written.

## F-DEMO-0061 — Omkar Deshmukh, 49M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Acute variceal haemorrhage with circulatory shock.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Large-volume haematemesis and melaena with confusion and cold extremities.

Family reports chronic liver disease; no previous records at this hospital. First hospital encounter; outside history is reported, not a retained hospital record.

Critical-state rationale: Critical at this synthetic assessment: Large-volume haematemesis and melaena with confusion and cold extremities. BP 78/44 mmHg, pulse 136/min, SpO₂ 92% on room air. Supporting results: Haemoglobin 6.1 g/dL; INR 2.2 ratio; Platelets 62 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: School administrator. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2026-09-08T02:00:00.000Z: IPD, active. Large-volume haematemesis and melaena with confusion and cold extremities.
  Record: 00000041-0000-4000-8000-000000061001

### Investigation history

#### 2026-09-08T04:30:00.000Z — Ultrasound abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000061001; order: 00000048-0000-4000-8000-000000061001.

Nodular liver, splenomegaly and ascites; ultrasound does not establish the bleeding source.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000061001; order: 00000043-0000-4000-8000-000000061001.

Synthetic results associated with this encounter. Haemoglobin 6.1 g/dL (low); INR 2.2 ratio (high); Platelets 62 10^3/µL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Gastroenterology → Nephrology: Assess renal perfusion and urine-output trends during gastrointestinal bleeding. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Large-volume haematemesis and melaena with confusion and cold extremities.
Background: Family reports chronic liver disease; no previous records at this hospital. First hospital encounter; outside history is reported, not a retained hospital record.
Recorded acuity: Critical at this synthetic assessment: Large-volume haematemesis and melaena with confusion and cold extremities. BP 78/44 mmHg, pulse 136/min, SpO₂ 92% on room air. Supporting results: Haemoglobin 6.1 g/dL; INR 2.2 ratio; Platelets 62 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: Haemoglobin 6.1 g/dL; INR 2.2 ratio; Platelets 62 10^3/µL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Large-volume haematemesis and melaena with confusion and cold extremities. Critical at this synthetic assessment: Large-volume haematemesis and melaena with confusion and cold extremities. BP 78/44 mmHg, pulse 136/min, SpO₂ 92% on room air. Supporting results: Haemoglobin 6.1 g/dL; INR 2.2 ratio; Platelets 62 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess renal perfusion and urine-output trends during gastrointestinal bleeding. Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Acute variceal haemorrhage with circulatory shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal perfusion and urine-output trends during gastrointestinal bleeding.
Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Assess renal perfusion and urine-output trends during gastrointestinal bleeding. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Large-volume haematemesis and melaena with confusion and cold extremities.
Background: Family reports chronic liver disease; no previous records at this hospital. First hospital encounter; outside history is reported, not a retained hospital record.
Recent results: Gastroenterology laboratory review; Ultrasound abdomen
Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Acute variceal haemorrhage with circulatory shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal perfusion and urine-output trends during gastrointestinal bleeding.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Haemoglobin result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0062 — Farida Merchant, 64F

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Ascending cholangitis with septic shock; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fever, right upper quadrant pain, jaundice and new drowsiness.

Known common bile duct stones and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fever, right upper quadrant pain, jaundice and new drowsiness. BP 82/48 mmHg, pulse 122/min, SpO₂ 93% on room air. Supporting results: Bilirubin 8.6 mg/dL; WBC 23.4 10^3/µL; Lactate 5.1 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Shopkeeper. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Gastroenterology assessment. Background: Known common bile duct stones and hypertension.
  Record: 00000041-0000-4000-8000-000000062001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000062002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000062003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000062004
- 2026-09-08T02:00:00.000Z: IPD, active. Fever, right upper quadrant pain, jaundice and new drowsiness.
  Record: 00000041-0000-4000-8000-000000062005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Hepatobiliary ultrasound

Source: MockRIS; record: 00000047-0000-4000-8000-000000062001; order: 00000048-0000-4000-8000-000000062001.

Dilated intrahepatic ducts and common bile duct containing an obstructing calculus.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000062005; order: 00000043-0000-4000-8000-000000062005.

Synthetic results associated with this encounter. Bilirubin 8.6 mg/dL (high); WBC 23.4 10^3/µL (high); Lactate 5.1 mmol/L (high); Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000062004; order: 00000043-0000-4000-8000-000000062004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000062003; order: 00000043-0000-4000-8000-000000062003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000062002; order: 00000043-0000-4000-8000-000000062002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000062001; order: 00000043-0000-4000-8000-000000062001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Gastroenterology → Nephrology: Assess organ dysfunction alongside biliary-team coordination. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fever, right upper quadrant pain, jaundice and new drowsiness.
Background: Known common bile duct stones and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fever, right upper quadrant pain, jaundice and new drowsiness. BP 82/48 mmHg, pulse 122/min, SpO₂ 93% on room air. Supporting results: Bilirubin 8.6 mg/dL; WBC 23.4 10^3/µL; Lactate 5.1 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Bilirubin 8.6 mg/dL; WBC 23.4 10^3/µL; Lactate 5.1 mmol/L; Creatinine 0.9 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fever, right upper quadrant pain, jaundice and new drowsiness. Critical at this synthetic assessment: Fever, right upper quadrant pain, jaundice and new drowsiness. BP 82/48 mmHg, pulse 122/min, SpO₂ 93% on room air. Supporting results: Bilirubin 8.6 mg/dL; WBC 23.4 10^3/µL; Lactate 5.1 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess organ dysfunction alongside biliary-team coordination. Pending: Repeat Bilirubin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Ascending cholangitis with septic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess organ dysfunction alongside biliary-team coordination.
Pending: Repeat Bilirubin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Assess organ dysfunction alongside biliary-team coordination. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fever, right upper quadrant pain, jaundice and new drowsiness.
Background: Known common bile duct stones and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; Hepatobiliary ultrasound
Pending: Repeat Bilirubin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Ascending cholangitis with septic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess organ dysfunction alongside biliary-team coordination.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Bilirubin result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0063 — Vivek Bedi, 42M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Severe acute pancreatitis with respiratory failure.

Allergies: Penicillin — rash reported; verification pending.

### Presentation and history

Severe epigastric pain radiating to the back with progressive oxygen desaturation.

Hypertriglyceridaemia with previous metabolic follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Severe epigastric pain radiating to the back with progressive oxygen desaturation. BP 86/56 mmHg, pulse 128/min, SpO₂ 86% on room air. Supporting results: Lipase 1420 U/L; Creatinine 2.1 mg/dL; Lactate 3.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired postal employee. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Gastroenterology assessment. Background: Hypertriglyceridaemia with previous metabolic follow-up.
  Record: 00000041-0000-4000-8000-000000063001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000063002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000063003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000063004
- 2026-09-08T02:00:00.000Z: IPD, active. Severe epigastric pain radiating to the back with progressive oxygen desaturation.
  Record: 00000041-0000-4000-8000-000000063005

### Investigation history

#### 2026-09-08T04:30:00.000Z — CT abdomen report

Source: MockRIS; record: 00000047-0000-4000-8000-000000063001; order: 00000048-0000-4000-8000-000000063001.

Pancreatic enlargement and extensive peripancreatic fluid; no organised drainable collection described.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000063005; order: 00000043-0000-4000-8000-000000063005.

Synthetic results associated with this encounter. Lipase 1420 U/L (high); Creatinine 2.1 mg/dL (high); Lactate 3.9 mmol/L (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000063004; order: 00000043-0000-4000-8000-000000063004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000063003; order: 00000043-0000-4000-8000-000000063003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000063002; order: 00000043-0000-4000-8000-000000063002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000063001; order: 00000043-0000-4000-8000-000000063001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Gastroenterology → Nephrology: Review acute renal dysfunction and fluid-balance documentation. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe epigastric pain radiating to the back with progressive oxygen desaturation.
Background: Hypertriglyceridaemia with previous metabolic follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Severe epigastric pain radiating to the back with progressive oxygen desaturation. BP 86/56 mmHg, pulse 128/min, SpO₂ 86% on room air. Supporting results: Lipase 1420 U/L; Creatinine 2.1 mg/dL; Lactate 3.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: Lipase 1420 U/L; Creatinine 2.1 mg/dL; Lactate 3.9 mmol/L; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Severe epigastric pain radiating to the back with progressive oxygen desaturation. Critical at this synthetic assessment: Severe epigastric pain radiating to the back with progressive oxygen desaturation. BP 86/56 mmHg, pulse 128/min, SpO₂ 86% on room air. Supporting results: Lipase 1420 U/L; Creatinine 2.1 mg/dL; Lactate 3.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review acute renal dysfunction and fluid-balance documentation. Pending: Repeat Lipase result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Severe acute pancreatitis with respiratory failure. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review acute renal dysfunction and fluid-balance documentation.
Pending: Repeat Lipase result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Review acute renal dysfunction and fluid-balance documentation. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe epigastric pain radiating to the back with progressive oxygen desaturation.
Background: Hypertriglyceridaemia with previous metabolic follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; CT abdomen report
Pending: Repeat Lipase result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Severe acute pancreatitis with respiratory failure. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review acute renal dysfunction and fluid-balance documentation.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Lipase result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0064 — Shalini Dutta, 36F

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Acute liver failure with encephalopathy.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Rapid jaundice followed by altered sensorium and asterixis.

Earlier unexplained liver enzyme elevation; no established cirrhosis. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Rapid jaundice followed by altered sensorium and asterixis. BP 92/58 mmHg, pulse 116/min, SpO₂ 95% on room air. Supporting results: ALT 1860 U/L; INR 3.4 ratio; Bilirubin 14.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Textile worker. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Gastroenterology assessment. Background: Earlier unexplained liver enzyme elevation; no established cirrhosis.
  Record: 00000041-0000-4000-8000-000000064001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000064002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000064003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000064004
- 2026-09-08T02:00:00.000Z: IPD, active. Rapid jaundice followed by altered sensorium and asterixis.
  Record: 00000041-0000-4000-8000-000000064005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Liver ultrasound with Doppler

Source: MockRIS; record: 00000047-0000-4000-8000-000000064001; order: 00000048-0000-4000-8000-000000064001.

Heterogeneous liver with patent major hepatic vessels and no biliary dilatation.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000064005; order: 00000043-0000-4000-8000-000000064005.

Synthetic results associated with this encounter. ALT 1860 U/L (high); INR 3.4 ratio (high); Bilirubin 14.2 mg/dL (high); Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 2.6 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000064004; order: 00000043-0000-4000-8000-000000064004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000064003; order: 00000043-0000-4000-8000-000000064003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.2 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000064002; order: 00000043-0000-4000-8000-000000064002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.3 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000064001; order: 00000043-0000-4000-8000-000000064001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.4 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Gastroenterology → Internal Medicine: Coordinate systemic assessment and record the specialist transfer discussion. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Rapid jaundice followed by altered sensorium and asterixis.
Background: Earlier unexplained liver enzyme elevation; no established cirrhosis. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Rapid jaundice followed by altered sensorium and asterixis. BP 92/58 mmHg, pulse 116/min, SpO₂ 95% on room air. Supporting results: ALT 1860 U/L; INR 3.4 ratio; Bilirubin 14.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: ALT 1860 U/L; INR 3.4 ratio; Bilirubin 14.2 mg/dL; Creatinine 0.9 mg/dL; Haemoglobin 12.8 g/dL; Albumin 2.6 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Rapid jaundice followed by altered sensorium and asterixis. Critical at this synthetic assessment: Rapid jaundice followed by altered sensorium and asterixis. BP 92/58 mmHg, pulse 116/min, SpO₂ 95% on room air. Supporting results: ALT 1860 U/L; INR 3.4 ratio; Bilirubin 14.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate systemic assessment and record the specialist transfer discussion. Pending: Repeat ALT result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Acute liver failure with encephalopathy. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate systemic assessment and record the specialist transfer discussion.
Pending: Repeat ALT result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Coordinate systemic assessment and record the specialist transfer discussion. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Rapid jaundice followed by altered sensorium and asterixis.
Background: Earlier unexplained liver enzyme elevation; no established cirrhosis. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; Liver ultrasound with Doppler
Pending: Repeat ALT result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Acute liver failure with encephalopathy. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate systemic assessment and record the specialist transfer discussion.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat ALT result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0065 — Ramesh Jadhav, 71M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Ischaemic colitis with severe lower gastrointestinal bleeding; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Cramping abdominal pain followed by maroon stools and dizziness.

Peripheral vascular disease, coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Cramping abdominal pain followed by maroon stools and dizziness. BP 84/50 mmHg, pulse 118/min, SpO₂ 94% on room air. Supporting results: Haemoglobin 7.2 g/dL; Lactate 4.2 mmol/L; Creatinine 2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Accounts assistant. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Gastroenterology assessment. Background: Peripheral vascular disease, coronary artery disease and hypertension.
  Record: 00000041-0000-4000-8000-000000065001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000065002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000065003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000065004
- 2026-09-08T02:00:00.000Z: IPD, active. Cramping abdominal pain followed by maroon stools and dizziness.
  Record: 00000041-0000-4000-8000-000000065005

### Investigation history

#### 2026-09-08T04:30:00.000Z — CT abdomen report

Source: MockRIS; record: 00000047-0000-4000-8000-000000065001; order: 00000048-0000-4000-8000-000000065001.

Segmental left colonic thickening and inflammatory change; ischaemia is a clinical concern.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000065005; order: 00000043-0000-4000-8000-000000065005.

Synthetic results associated with this encounter. Haemoglobin 7.2 g/dL (low); Lactate 4.2 mmol/L (high); Creatinine 2 mg/dL (high); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000065004; order: 00000043-0000-4000-8000-000000065004.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000065003; order: 00000043-0000-4000-8000-000000065003.

Synthetic results associated with this encounter. Haemoglobin 13.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000065002; order: 00000043-0000-4000-8000-000000065002.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000065001; order: 00000043-0000-4000-8000-000000065001.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Atorvastatin, 20 mg, oral, At night; documented_home. Prior clinic medication context; not a complete cardiovascular regimen.

### Department coordination

Gastroenterology → Cardiology: Review cardiac comorbidity and haemodynamic risk during gastrointestinal assessment. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Cramping abdominal pain followed by maroon stools and dizziness.
Background: Peripheral vascular disease, coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Cramping abdominal pain followed by maroon stools and dizziness. BP 84/50 mmHg, pulse 118/min, SpO₂ 94% on room air. Supporting results: Haemoglobin 7.2 g/dL; Lactate 4.2 mmol/L; Creatinine 2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: Haemoglobin 7.2 g/dL; Lactate 4.2 mmol/L; Creatinine 2 mg/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Cramping abdominal pain followed by maroon stools and dizziness. Critical at this synthetic assessment: Cramping abdominal pain followed by maroon stools and dizziness. BP 84/50 mmHg, pulse 118/min, SpO₂ 94% on room air. Supporting results: Haemoglobin 7.2 g/dL; Lactate 4.2 mmol/L; Creatinine 2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review cardiac comorbidity and haemodynamic risk during gastrointestinal assessment. Pending: Repeat Haemoglobin result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Ischaemic colitis with severe lower gastrointestinal bleeding. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review cardiac comorbidity and haemodynamic risk during gastrointestinal assessment.
Pending: Repeat Haemoglobin result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Cardiology): Review cardiac comorbidity and haemodynamic risk during gastrointestinal assessment. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Cramping abdominal pain followed by maroon stools and dizziness.
Background: Peripheral vascular disease, coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; CT abdomen report
Pending: Repeat Haemoglobin result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Ischaemic colitis with severe lower gastrointestinal bleeding. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review cardiac comorbidity and haemodynamic risk during gastrointestinal assessment.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Haemoglobin result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Cardiology assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0066 — Aarti Wagh, 32F

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Acute severe ulcerative colitis with toxic dilatation.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Frequent bloody stools, fever and new abdominal distension.

Ulcerative colitis with previous colonoscopy records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Frequent bloody stools, fever and new abdominal distension. BP 88/56 mmHg, pulse 130/min, SpO₂ 95% on room air. Supporting results: Haemoglobin 8.1 g/dL; CRP 186 mg/L; Potassium 2.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: Homemaker. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Gastroenterology assessment. Background: Ulcerative colitis with previous colonoscopy records.
  Record: 00000041-0000-4000-8000-000000066001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000066002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000066003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000066004
- 2026-09-08T02:00:00.000Z: IPD, active. Frequent bloody stools, fever and new abdominal distension.
  Record: 00000041-0000-4000-8000-000000066005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Abdominal radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000066001; order: 00000048-0000-4000-8000-000000066001.

Marked transverse colonic dilatation; no free subdiaphragmatic air on the available view.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000066005; order: 00000043-0000-4000-8000-000000066005.

Synthetic results associated with this encounter. Haemoglobin 8.1 g/dL (low); CRP 186 mg/L (high); Potassium 2.9 mmol/L (low); Creatinine 0.9 mg/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000066004; order: 00000043-0000-4000-8000-000000066004.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000066003; order: 00000043-0000-4000-8000-000000066003.

Synthetic results associated with this encounter. Haemoglobin 12.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000066002; order: 00000043-0000-4000-8000-000000066002.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000066001; order: 00000043-0000-4000-8000-000000066001.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Gastroenterology → Internal Medicine: Review electrolyte disturbance and systemic complications alongside gastroenterology. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Frequent bloody stools, fever and new abdominal distension.
Background: Ulcerative colitis with previous colonoscopy records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Frequent bloody stools, fever and new abdominal distension. BP 88/56 mmHg, pulse 130/min, SpO₂ 95% on room air. Supporting results: Haemoglobin 8.1 g/dL; CRP 186 mg/L; Potassium 2.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: Haemoglobin 8.1 g/dL; CRP 186 mg/L; Potassium 2.9 mmol/L; Creatinine 0.9 mg/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Frequent bloody stools, fever and new abdominal distension. Critical at this synthetic assessment: Frequent bloody stools, fever and new abdominal distension. BP 88/56 mmHg, pulse 130/min, SpO₂ 95% on room air. Supporting results: Haemoglobin 8.1 g/dL; CRP 186 mg/L; Potassium 2.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review electrolyte disturbance and systemic complications alongside gastroenterology. Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Acute severe ulcerative colitis with toxic dilatation. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review electrolyte disturbance and systemic complications alongside gastroenterology.
Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Review electrolyte disturbance and systemic complications alongside gastroenterology. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Frequent bloody stools, fever and new abdominal distension.
Background: Ulcerative colitis with previous colonoscopy records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; Abdominal radiograph
Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Acute severe ulcerative colitis with toxic dilatation. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review electrolyte disturbance and systemic complications alongside gastroenterology.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Haemoglobin result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0067 — Suresh Nambiar, 59M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Spontaneous bacterial peritonitis with acute decompensation; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fever, diffuse abdominal tenderness and reduced urine output.

Cirrhosis with recurrent ascites and previous medical hypertension history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fever, diffuse abdominal tenderness and reduced urine output. BP 86/52 mmHg, pulse 114/min, SpO₂ 93% on room air. Supporting results: Ascitic neutrophils 860 cells/µL; Creatinine 2.8 mg/dL; Bilirubin 5.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Bus conductor. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Gastroenterology assessment. Background: Cirrhosis with recurrent ascites and previous medical hypertension history.
  Record: 00000041-0000-4000-8000-000000067001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000067002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000067003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000067004
- 2026-09-08T02:00:00.000Z: IPD, active. Fever, diffuse abdominal tenderness and reduced urine output.
  Record: 00000041-0000-4000-8000-000000067005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Ultrasound abdomen

Source: MockRIS; record: 00000047-0000-4000-8000-000000067001; order: 00000048-0000-4000-8000-000000067001.

Cirrhotic morphology with moderate ascites and no biliary obstruction.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000067005; order: 00000043-0000-4000-8000-000000067005.

Synthetic results associated with this encounter. Ascitic neutrophils 860 cells/µL (high); Creatinine 2.8 mg/dL (high); Bilirubin 5.6 mg/dL (high); Haemoglobin 13.8 g/dL (normal); Albumin 2.6 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000067004; order: 00000043-0000-4000-8000-000000067004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000067003; order: 00000043-0000-4000-8000-000000067003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.2 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000067002; order: 00000043-0000-4000-8000-000000067002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.3 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000067001; order: 00000043-0000-4000-8000-000000067001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.4 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Gastroenterology → Nephrology: Assess renal deterioration and documented contributors to acute kidney injury. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fever, diffuse abdominal tenderness and reduced urine output.
Background: Cirrhosis with recurrent ascites and previous medical hypertension history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fever, diffuse abdominal tenderness and reduced urine output. BP 86/52 mmHg, pulse 114/min, SpO₂ 93% on room air. Supporting results: Ascitic neutrophils 860 cells/µL; Creatinine 2.8 mg/dL; Bilirubin 5.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Ascitic neutrophils 860 cells/µL; Creatinine 2.8 mg/dL; Bilirubin 5.6 mg/dL; Haemoglobin 13.8 g/dL; Albumin 2.6 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fever, diffuse abdominal tenderness and reduced urine output. Critical at this synthetic assessment: Fever, diffuse abdominal tenderness and reduced urine output. BP 86/52 mmHg, pulse 114/min, SpO₂ 93% on room air. Supporting results: Ascitic neutrophils 860 cells/µL; Creatinine 2.8 mg/dL; Bilirubin 5.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess renal deterioration and documented contributors to acute kidney injury. Pending: Repeat Ascitic neutrophils result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Spontaneous bacterial peritonitis with acute decompensation. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal deterioration and documented contributors to acute kidney injury.
Pending: Repeat Ascitic neutrophils result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Nephrology): Assess renal deterioration and documented contributors to acute kidney injury. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fever, diffuse abdominal tenderness and reduced urine output.
Background: Cirrhosis with recurrent ascites and previous medical hypertension history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; Ultrasound abdomen
Pending: Repeat Ascitic neutrophils result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Spontaneous bacterial peritonitis with acute decompensation. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal deterioration and documented contributors to acute kidney injury.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Working summary has not yet been written.

### Pending work

- Repeat Ascitic neutrophils result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: planned. Target: 2026-09-15. Owner: Dr. Kavya Menon.

Clinical clearance: Not approved. Documents checked: false.

Summary not yet written.

## F-DEMO-0068 — Poonam Sood, 56F

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Bleeding duodenal ulcer with haemorrhagic shock.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Melaena followed by haematemesis and syncope.

Chronic dyspepsia and osteoarthritis; intermittent non-prescription analgesic exposure reported. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Melaena followed by haematemesis and syncope. BP 80/46 mmHg, pulse 132/min, SpO₂ 94% on room air. Supporting results: Haemoglobin 5.9 g/dL; Urea 94 mg/dL; Creatinine 1.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired teacher. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Gastroenterology assessment. Background: Chronic dyspepsia and osteoarthritis; intermittent non-prescription analgesic exposure reported.
  Record: 00000041-0000-4000-8000-000000068001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000068002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000068003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000068004
- 2026-09-08T02:00:00.000Z: IPD, active. Melaena followed by haematemesis and syncope.
  Record: 00000041-0000-4000-8000-000000068005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Abdominal radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000068001; order: 00000048-0000-4000-8000-000000068001.

No free subdiaphragmatic air; the bleeding source requires endoscopic assessment.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000068005; order: 00000043-0000-4000-8000-000000068005.

Synthetic results associated with this encounter. Haemoglobin 5.9 g/dL (low); Urea 94 mg/dL (high); Creatinine 1.6 mg/dL (high); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000068004; order: 00000043-0000-4000-8000-000000068004.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000068003; order: 00000043-0000-4000-8000-000000068003.

Synthetic results associated with this encounter. Haemoglobin 12.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000068002; order: 00000043-0000-4000-8000-000000068002.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000068001; order: 00000043-0000-4000-8000-000000068001.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Gastroenterology → Nephrology: Review renal perfusion and medication history during acute bleeding care. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Melaena followed by haematemesis and syncope.
Background: Chronic dyspepsia and osteoarthritis; intermittent non-prescription analgesic exposure reported. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Melaena followed by haematemesis and syncope. BP 80/46 mmHg, pulse 132/min, SpO₂ 94% on room air. Supporting results: Haemoglobin 5.9 g/dL; Urea 94 mg/dL; Creatinine 1.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: Haemoglobin 5.9 g/dL; Urea 94 mg/dL; Creatinine 1.6 mg/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Melaena followed by haematemesis and syncope. Critical at this synthetic assessment: Melaena followed by haematemesis and syncope. BP 80/46 mmHg, pulse 132/min, SpO₂ 94% on room air. Supporting results: Haemoglobin 5.9 g/dL; Urea 94 mg/dL; Creatinine 1.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review renal perfusion and medication history during acute bleeding care. Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Bleeding duodenal ulcer with haemorrhagic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal perfusion and medication history during acute bleeding care.
Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Nephrology): Review renal perfusion and medication history during acute bleeding care. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Melaena followed by haematemesis and syncope.
Background: Chronic dyspepsia and osteoarthritis; intermittent non-prescription analgesic exposure reported. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; Abdominal radiograph
Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Bleeding duodenal ulcer with haemorrhagic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal perfusion and medication history during acute bleeding care.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Bleeding duodenal ulcer with haemorrhagic shock. Melaena followed by haematemesis and syncope.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Gastroenterology; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat Haemoglobin result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Kavya Menon.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Bleeding duodenal ulcer with haemorrhagic shock. Melaena followed by haematemesis and syncope.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Gastroenterology; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0069 — Nitin Chawla, 44M

Department: Gastroenterology. Acuity at snapshot: critical.

Conditions: Infected pancreatic necrosis with sepsis.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Recurrent fever, abdominal pain and confusion after initial improvement.

Recent pancreatitis admission with retained imaging and discharge records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Recurrent fever, abdominal pain and confusion after initial improvement. BP 84/54 mmHg, pulse 124/min, SpO₂ 91% on room air. Supporting results: WBC 25.1 10^3/µL; CRP 224 mg/L; Lactate 4.6 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Small business owner. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: IPD, completed. Initial Gastroenterology assessment. Background: Recent pancreatitis admission with retained imaging and discharge records.
  Record: 00000041-0000-4000-8000-000000069001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000069002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000069003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000069004
- 2026-09-08T02:00:00.000Z: IPD, active. Recurrent fever, abdominal pain and confusion after initial improvement.
  Record: 00000041-0000-4000-8000-000000069005

### Investigation history

#### 2026-09-08T04:30:00.000Z — CT abdomen report

Source: MockRIS; record: 00000047-0000-4000-8000-000000069001; order: 00000048-0000-4000-8000-000000069001.

Peripancreatic necrotic collection containing gas; multidisciplinary review is documented.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000069005; order: 00000043-0000-4000-8000-000000069005.

Synthetic results associated with this encounter. WBC 25.1 10^3/µL (high); CRP 224 mg/L (high); Lactate 4.6 mmol/L (high); Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000069004; order: 00000043-0000-4000-8000-000000069004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000069003; order: 00000043-0000-4000-8000-000000069003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000069002; order: 00000043-0000-4000-8000-000000069002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000069001; order: 00000043-0000-4000-8000-000000069001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Gastroenterology → Internal Medicine: Assess multisystem consequences and coordinate source-control discussion. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Recurrent fever, abdominal pain and confusion after initial improvement.
Background: Recent pancreatitis admission with retained imaging and discharge records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Recurrent fever, abdominal pain and confusion after initial improvement. BP 84/54 mmHg, pulse 124/min, SpO₂ 91% on room air. Supporting results: WBC 25.1 10^3/µL; CRP 224 mg/L; Lactate 4.6 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: WBC 25.1 10^3/µL; CRP 224 mg/L; Lactate 4.6 mmol/L; Creatinine 0.9 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Recurrent fever, abdominal pain and confusion after initial improvement. Critical at this synthetic assessment: Recurrent fever, abdominal pain and confusion after initial improvement. BP 84/54 mmHg, pulse 124/min, SpO₂ 91% on room air. Supporting results: WBC 25.1 10^3/µL; CRP 224 mg/L; Lactate 4.6 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess multisystem consequences and coordinate source-control discussion. Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Infected pancreatic necrosis with sepsis. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess multisystem consequences and coordinate source-control discussion.
Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Internal Medicine): Assess multisystem consequences and coordinate source-control discussion. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Recurrent fever, abdominal pain and confusion after initial improvement.
Background: Recent pancreatitis admission with retained imaging and discharge records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; CT abdomen report
Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Infected pancreatic necrosis with sepsis. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess multisystem consequences and coordinate source-control discussion.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Infected pancreatic necrosis with sepsis. Recurrent fever, abdominal pain and confusion after initial improvement.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Gastroenterology; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat WBC result and source review — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Kavya Menon.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Infected pancreatic necrosis with sepsis. Recurrent fever, abdominal pain and confusion after initial improvement.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Gastroenterology; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0070 — Zarina Contractor, 62F

Department: Gastroenterology. Acuity at snapshot: noncritical.

Conditions: Resolved biliary obstruction after endoscopic stone extraction; Hypertension.

Allergies: Penicillin — rash reported; verification pending.

### Presentation and history

Afebrile, tolerating oral intake and comfortable after documented biliary intervention.

Recurrent choledocholithiasis and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Noncritical recovery at this assessment: Afebrile, tolerating oral intake and comfortable after documented biliary intervention. Stable recorded physiology; final discharge status is documented separately.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Office assistant. Preferred language: Marathi, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Gastroenterology assessment. Background: Recurrent choledocholithiasis and hypertension.
  Record: 00000041-0000-4000-8000-000000070001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000070002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Gastroenterology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000070003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000070004
- 2026-09-05T02:00:00.000Z: IPD, active. Afebrile, tolerating oral intake and comfortable after documented biliary intervention.
  Record: 00000041-0000-4000-8000-000000070005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Follow-up hepatobiliary ultrasound

Source: MockRIS; record: 00000047-0000-4000-8000-000000070001; order: 00000048-0000-4000-8000-000000070001.

Improved biliary dilatation with no new collection identified.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000070005; order: 00000043-0000-4000-8000-000000070005.

Synthetic results associated with this encounter. Bilirubin 1.7 mg/dL (high); WBC 7.8 10^3/µL (normal); Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.7 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-09-05T03:30:00.000Z — Admission laboratory assessment

Source: MockLIS; record: 00000064-0000-4000-8000-000000070001; order: 00000065-0000-4000-8000-000000070001.

Synthetic admission results, before the separate recovery report: Bilirubin 5.2 mg/dL; WBC 13.4 10^3/µL; Creatinine 1.1 mg/dL.

#### 2026-08-25T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000070004; order: 00000043-0000-4000-8000-000000070004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000070003; order: 00000043-0000-4000-8000-000000070003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000070002; order: 00000043-0000-4000-8000-000000070002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Gastroenterology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000070001; order: 00000043-0000-4000-8000-000000070001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Gastroenterology → Internal Medicine: Confirm medication reconciliation and follow-up communication. Status: completed. Synthetic Internal Medicine review completed. Afebrile, tolerating oral intake and comfortable after documented biliary intervention. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

### Current notes and handover draft

#### Current clinical assessment

Afebrile, tolerating oral intake and comfortable after documented biliary intervention.
Background: Recurrent choledocholithiasis and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Noncritical recovery at this assessment: Afebrile, tolerating oral intake and comfortable after documented biliary intervention. Stable recorded physiology; final discharge status is documented separately.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: Bilirubin 1.7 mg/dL; WBC 7.8 10^3/µL; Creatinine 0.9 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.7 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Admission assessment and hospital course

Admission with jaundice and biliary pain. Gastroenterology review of suspected duct obstruction requested; no post-intervention findings are available yet.

#### Ward round — current admission review

Findings: Afebrile, tolerating oral intake and comfortable after documented biliary intervention. Noncritical recovery at this assessment: Afebrile, tolerating oral intake and comfortable after documented biliary intervention. Stable recorded physiology; final discharge status is documented separately.
Plan: Confirm medication reconciliation and follow-up communication. Pending: Discharge documents and instructions pending; Gastroenterology follow-up appointment. Decisions remain with the treating team.

#### Latest progress and pending work

Resolved biliary obstruction after endoscopic stone extraction. Stable recovery; check the working-list stage before completing discharge. Confirm medication reconciliation and follow-up communication.
Pending: Discharge documents and instructions pending; Gastroenterology follow-up appointment.
Department question (Internal Medicine): Confirm medication reconciliation and follow-up communication. Status: completed. Synthetic Internal Medicine review completed. Afebrile, tolerating oral intake and comfortable after documented biliary intervention. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

#### Synthetic handover draft — not approved

Situation: Afebrile, tolerating oral intake and comfortable after documented biliary intervention.
Background: Recurrent choledocholithiasis and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Gastroenterology laboratory review; Admission laboratory assessment; Follow-up hepatobiliary ultrasound
Pending: Discharge documents and instructions pending; Gastroenterology follow-up appointment.
Continuity: Resolved biliary obstruction after endoscopic stone extraction. Stable recovery; check the working-list stage before completing discharge. Confirm medication reconciliation and follow-up communication.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Discharge documents and patient instructions require completion.
Synthetic discharge working draft: Resolved biliary obstruction after endoscopic stone extraction. Afebrile, tolerating oral intake and comfortable after documented biliary intervention.
Current recovery assessment reviewed; the checklist below determines whether final approval is complete.
Follow-up: Gastroenterology; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Discharge documents and instructions pending — Dr. Kavya Menon; due 2026-09-08T08:00:00.000Z.
- Gastroenterology follow-up appointment — Dr. Kavya Menon; due 2026-09-15T04:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-08. Owner: Dr. Kavya Menon.

Clinical clearance: Synthetic clinician fixture only. Documents checked: false.

Synthetic discharge working draft: Resolved biliary obstruction after endoscopic stone extraction. Afebrile, tolerating oral intake and comfortable after documented biliary intervention.
Current recovery assessment reviewed; the checklist below determines whether final approval is complete.
Follow-up: Gastroenterology; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0071 — Arjun Solanki, 29M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Open tibial fracture with traumatic circulatory shock.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Road-traffic injury with open lower-leg wound and substantial reported blood loss.

No verified chronic history at first attendance; relatives are bringing outside records. First hospital encounter; outside history is reported, not a retained hospital record.

Critical-state rationale: Critical at this synthetic assessment: Road-traffic injury with open lower-leg wound and substantial reported blood loss. BP 82/48 mmHg, pulse 138/min, SpO₂ 93% on room air. Supporting results: Haemoglobin 8.2 g/dL; Lactate 5.8 mmol/L; Creatinine 1.4 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: School administrator. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2026-09-08T02:00:00.000Z: IPD, active. Road-traffic injury with open lower-leg wound and substantial reported blood loss.
  Record: 00000041-0000-4000-8000-000000071001

### Investigation history

#### 2026-09-08T04:30:00.000Z — Tibia and fibula radiographs

Source: MockRIS; record: 00000047-0000-4000-8000-000000071001; order: 00000048-0000-4000-8000-000000071001.

Displaced comminuted tibial and fibular shaft fractures with soft-tissue gas at the open wound.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000071001; order: 00000043-0000-4000-8000-000000071001.

Synthetic results associated with this encounter. Haemoglobin 8.2 g/dL (low); Lactate 5.8 mmol/L (high); Creatinine 1.4 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Internal Medicine: Assess systemic perfusion and medical comorbidity during trauma coordination. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Road-traffic injury with open lower-leg wound and substantial reported blood loss.
Background: No verified chronic history at first attendance; relatives are bringing outside records. First hospital encounter; outside history is reported, not a retained hospital record.
Recorded acuity: Critical at this synthetic assessment: Road-traffic injury with open lower-leg wound and substantial reported blood loss. BP 82/48 mmHg, pulse 138/min, SpO₂ 93% on room air. Supporting results: Haemoglobin 8.2 g/dL; Lactate 5.8 mmol/L; Creatinine 1.4 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: Haemoglobin 8.2 g/dL; Lactate 5.8 mmol/L; Creatinine 1.4 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Road-traffic injury with open lower-leg wound and substantial reported blood loss. Critical at this synthetic assessment: Road-traffic injury with open lower-leg wound and substantial reported blood loss. BP 82/48 mmHg, pulse 138/min, SpO₂ 93% on room air. Supporting results: Haemoglobin 8.2 g/dL; Lactate 5.8 mmol/L; Creatinine 1.4 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess systemic perfusion and medical comorbidity during trauma coordination. Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Open tibial fracture with traumatic circulatory shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess systemic perfusion and medical comorbidity during trauma coordination.
Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Assess systemic perfusion and medical comorbidity during trauma coordination. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Road-traffic injury with open lower-leg wound and substantial reported blood loss.
Background: No verified chronic history at first attendance; relatives are bringing outside records. First hospital encounter; outside history is reported, not a retained hospital record.
Recent results: Orthopaedics laboratory review; Tibia and fibula radiographs
Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Open tibial fracture with traumatic circulatory shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess systemic perfusion and medical comorbidity during trauma coordination.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Haemoglobin result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0072 — Kusum Bhatia, 76F

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Hip fracture complicated by acute myocardial injury; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fall with inability to bear weight, followed by chest discomfort and dyspnoea.

Osteoporosis, coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fall with inability to bear weight, followed by chest discomfort and dyspnoea. BP 88/54 mmHg, pulse 116/min, SpO₂ 88% on room air. Supporting results: Troponin I 1.6 ng/mL; Haemoglobin 9.1 g/dL; Creatinine 1.5 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Shopkeeper. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Osteoporosis, coronary artery disease and hypertension.
  Record: 00000041-0000-4000-8000-000000072001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000072002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000072003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000072004
- 2026-09-08T02:00:00.000Z: IPD, active. Fall with inability to bear weight, followed by chest discomfort and dyspnoea.
  Record: 00000041-0000-4000-8000-000000072005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Pelvis and hip radiographs

Source: MockRIS; record: 00000047-0000-4000-8000-000000072001; order: 00000048-0000-4000-8000-000000072001.

Displaced intracapsular fracture of the left femoral neck.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000072005; order: 00000043-0000-4000-8000-000000072005.

Synthetic results associated with this encounter. Troponin I 1.6 ng/mL (high); Haemoglobin 9.1 g/dL (low); Creatinine 1.5 mg/dL (high); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000072004; order: 00000043-0000-4000-8000-000000072004.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000072003; order: 00000043-0000-4000-8000-000000072003.

Synthetic results associated with this encounter. Haemoglobin 12.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000072002; order: 00000043-0000-4000-8000-000000072002.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000072001; order: 00000043-0000-4000-8000-000000072001.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Atorvastatin, 20 mg, oral, At night; documented_home. Prior clinic medication context; not a complete cardiovascular regimen.

### Department coordination

Orthopaedics → Cardiology: Assess myocardial injury and perioperative cardiac risk before operative planning. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fall with inability to bear weight, followed by chest discomfort and dyspnoea.
Background: Osteoporosis, coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fall with inability to bear weight, followed by chest discomfort and dyspnoea. BP 88/54 mmHg, pulse 116/min, SpO₂ 88% on room air. Supporting results: Troponin I 1.6 ng/mL; Haemoglobin 9.1 g/dL; Creatinine 1.5 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Troponin I 1.6 ng/mL; Haemoglobin 9.1 g/dL; Creatinine 1.5 mg/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fall with inability to bear weight, followed by chest discomfort and dyspnoea. Critical at this synthetic assessment: Fall with inability to bear weight, followed by chest discomfort and dyspnoea. BP 88/54 mmHg, pulse 116/min, SpO₂ 88% on room air. Supporting results: Troponin I 1.6 ng/mL; Haemoglobin 9.1 g/dL; Creatinine 1.5 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess myocardial injury and perioperative cardiac risk before operative planning. Pending: Repeat Troponin I result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Hip fracture complicated by acute myocardial injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess myocardial injury and perioperative cardiac risk before operative planning.
Pending: Repeat Troponin I result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Cardiology): Assess myocardial injury and perioperative cardiac risk before operative planning. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fall with inability to bear weight, followed by chest discomfort and dyspnoea.
Background: Osteoporosis, coronary artery disease and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; Pelvis and hip radiographs
Pending: Repeat Troponin I result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Hip fracture complicated by acute myocardial injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess myocardial injury and perioperative cardiac risk before operative planning.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Troponin I result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Cardiology assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0073 — Ganesh Pawar, 52M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Septic knee arthritis with systemic shock; Type 2 Diabetes.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Hot swollen knee, fever and inability to bear weight with worsening drowsiness.

Type 2 Diabetes and knee osteoarthritis. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Hot swollen knee, fever and inability to bear weight with worsening drowsiness. BP 84/50 mmHg, pulse 126/min, SpO₂ 93% on room air. Supporting results: WBC 22.8 10^3/µL; CRP 210 mg/L; Lactate 4.7 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired postal employee. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Type 2 Diabetes and knee osteoarthritis.
  Record: 00000041-0000-4000-8000-000000073001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000073002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000073003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000073004
- 2026-09-08T02:00:00.000Z: IPD, active. Hot swollen knee, fever and inability to bear weight with worsening drowsiness.
  Record: 00000041-0000-4000-8000-000000073005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Knee ultrasound

Source: MockRIS; record: 00000047-0000-4000-8000-000000073001; order: 00000048-0000-4000-8000-000000073001.

Large complex effusion with synovial thickening; aspiration microbiology remains pending.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000073005; order: 00000043-0000-4000-8000-000000073005.

Synthetic results associated with this encounter. WBC 22.8 10^3/µL (high); CRP 210 mg/L (high); Lactate 4.7 mmol/L (high); Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000073004; order: 00000043-0000-4000-8000-000000073004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000073003; order: 00000043-0000-4000-8000-000000073003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000073002; order: 00000043-0000-4000-8000-000000073002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000073001; order: 00000043-0000-4000-8000-000000073001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metformin, 500 mg, oral, Twice daily; held. Home history; acute illness and renal suitability require review. This is not a prescribing instruction.

### Department coordination

Orthopaedics → Internal Medicine: Coordinate diabetes review and systemic infection investigations. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Hot swollen knee, fever and inability to bear weight with worsening drowsiness.
Background: Type 2 Diabetes and knee osteoarthritis. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Hot swollen knee, fever and inability to bear weight with worsening drowsiness. BP 84/50 mmHg, pulse 126/min, SpO₂ 93% on room air. Supporting results: WBC 22.8 10^3/µL; CRP 210 mg/L; Lactate 4.7 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: WBC 22.8 10^3/µL; CRP 210 mg/L; Lactate 4.7 mmol/L; Creatinine 0.9 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Hot swollen knee, fever and inability to bear weight with worsening drowsiness. Critical at this synthetic assessment: Hot swollen knee, fever and inability to bear weight with worsening drowsiness. BP 84/50 mmHg, pulse 126/min, SpO₂ 93% on room air. Supporting results: WBC 22.8 10^3/µL; CRP 210 mg/L; Lactate 4.7 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate diabetes review and systemic infection investigations. Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Septic knee arthritis with systemic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate diabetes review and systemic infection investigations.
Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Coordinate diabetes review and systemic infection investigations. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Hot swollen knee, fever and inability to bear weight with worsening drowsiness.
Background: Type 2 Diabetes and knee osteoarthritis. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; Knee ultrasound
Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Septic knee arthritis with systemic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate diabetes review and systemic infection investigations.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat WBC result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0074 — Shweta Kulkarni, 38F

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Acute compartment syndrome after forearm crush injury.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Escalating forearm pain, tense swelling and pain on passive finger extension after crush injury.

Previous uncomplicated wrist injury; no chronic renal disease documented. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Escalating forearm pain, tense swelling and pain on passive finger extension after crush injury. BP 116/72 mmHg, pulse 124/min, SpO₂ 98% on room air. Supporting results: Creatine kinase 9600 U/L; Potassium 5.8 mmol/L; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Textile worker. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Previous uncomplicated wrist injury; no chronic renal disease documented.
  Record: 00000041-0000-4000-8000-000000074001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000074002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000074003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000074004
- 2026-09-08T02:00:00.000Z: IPD, active. Escalating forearm pain, tense swelling and pain on passive finger extension after crush injury.
  Record: 00000041-0000-4000-8000-000000074005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Forearm radiographs

Source: MockRIS; record: 00000047-0000-4000-8000-000000074001; order: 00000048-0000-4000-8000-000000074001.

Both-bone forearm fracture with extensive swelling; compartment syndrome remains a clinical diagnosis.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000074005; order: 00000043-0000-4000-8000-000000074005.

Synthetic results associated with this encounter. Creatine kinase 9600 U/L (high); Potassium 5.8 mmol/L (high); Creatinine 1.9 mg/dL (high); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000074004; order: 00000043-0000-4000-8000-000000074004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000074003; order: 00000043-0000-4000-8000-000000074003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000074002; order: 00000043-0000-4000-8000-000000074002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000074001; order: 00000043-0000-4000-8000-000000074001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Nephrology: Review rhabdomyolysis-related electrolyte disturbance and renal surveillance. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Escalating forearm pain, tense swelling and pain on passive finger extension after crush injury.
Background: Previous uncomplicated wrist injury; no chronic renal disease documented. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Escalating forearm pain, tense swelling and pain on passive finger extension after crush injury. BP 116/72 mmHg, pulse 124/min, SpO₂ 98% on room air. Supporting results: Creatine kinase 9600 U/L; Potassium 5.8 mmol/L; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: Creatine kinase 9600 U/L; Potassium 5.8 mmol/L; Creatinine 1.9 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Escalating forearm pain, tense swelling and pain on passive finger extension after crush injury. Critical at this synthetic assessment: Escalating forearm pain, tense swelling and pain on passive finger extension after crush injury. BP 116/72 mmHg, pulse 124/min, SpO₂ 98% on room air. Supporting results: Creatine kinase 9600 U/L; Potassium 5.8 mmol/L; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review rhabdomyolysis-related electrolyte disturbance and renal surveillance. Pending: Repeat Creatine kinase result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Acute compartment syndrome after forearm crush injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review rhabdomyolysis-related electrolyte disturbance and renal surveillance.
Pending: Repeat Creatine kinase result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Review rhabdomyolysis-related electrolyte disturbance and renal surveillance. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Escalating forearm pain, tense swelling and pain on passive finger extension after crush injury.
Background: Previous uncomplicated wrist injury; no chronic renal disease documented. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; Forearm radiographs
Pending: Repeat Creatine kinase result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Acute compartment syndrome after forearm crush injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review rhabdomyolysis-related electrolyte disturbance and renal surveillance.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Creatine kinase result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0075 — Dinesh Parmar, 41M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Fat embolism syndrome after femoral fracture.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

New confusion, petechial rash and hypoxaemia after a long-bone injury.

Previous sports-injury records without chronic cardiopulmonary disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: New confusion, petechial rash and hypoxaemia after a long-bone injury. BP 98/62 mmHg, pulse 128/min, SpO₂ 82% on room air. Supporting results: Platelets 88 10^3/µL; Haemoglobin 9.4 g/dL; PaO2 48 mmHg. Senior assessment is required; a working-list entry does not mean readiness.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Accounts assistant. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Previous sports-injury records without chronic cardiopulmonary disease.
  Record: 00000041-0000-4000-8000-000000075001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000075002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000075003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000075004
- 2026-09-08T02:00:00.000Z: IPD, active. New confusion, petechial rash and hypoxaemia after a long-bone injury.
  Record: 00000041-0000-4000-8000-000000075005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000075001; order: 00000048-0000-4000-8000-000000075001.

Diffuse bilateral air-space opacities in the context of a recent femoral fracture.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000075005; order: 00000043-0000-4000-8000-000000075005.

Synthetic results associated with this encounter. Platelets 88 10^3/µL (low); Haemoglobin 9.4 g/dL (low); PaO2 48 mmHg (low); Creatinine 0.9 mg/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000075004; order: 00000043-0000-4000-8000-000000075004.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000075003; order: 00000043-0000-4000-8000-000000075003.

Synthetic results associated with this encounter. Haemoglobin 13.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000075002; order: 00000043-0000-4000-8000-000000075002.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000075001; order: 00000043-0000-4000-8000-000000075001.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Internal Medicine: Coordinate respiratory assessment and document the differential for acute hypoxaemia. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

New confusion, petechial rash and hypoxaemia after a long-bone injury.
Background: Previous sports-injury records without chronic cardiopulmonary disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: New confusion, petechial rash and hypoxaemia after a long-bone injury. BP 98/62 mmHg, pulse 128/min, SpO₂ 82% on room air. Supporting results: Platelets 88 10^3/µL; Haemoglobin 9.4 g/dL; PaO2 48 mmHg. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: Platelets 88 10^3/µL; Haemoglobin 9.4 g/dL; PaO2 48 mmHg; Creatinine 0.9 mg/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: New confusion, petechial rash and hypoxaemia after a long-bone injury. Critical at this synthetic assessment: New confusion, petechial rash and hypoxaemia after a long-bone injury. BP 98/62 mmHg, pulse 128/min, SpO₂ 82% on room air. Supporting results: Platelets 88 10^3/µL; Haemoglobin 9.4 g/dL; PaO2 48 mmHg. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate respiratory assessment and document the differential for acute hypoxaemia. Pending: Repeat Platelets result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Fat embolism syndrome after femoral fracture. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate respiratory assessment and document the differential for acute hypoxaemia.
Pending: Repeat Platelets result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Coordinate respiratory assessment and document the differential for acute hypoxaemia. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: New confusion, petechial rash and hypoxaemia after a long-bone injury.
Background: Previous sports-injury records without chronic cardiopulmonary disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; Chest radiograph
Pending: Repeat Platelets result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Fat embolism syndrome after femoral fracture. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate respiratory assessment and document the differential for acute hypoxaemia.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Platelets result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0076 — Mala Krishnan, 67F

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Prosthetic hip joint infection with sepsis; Hypertension; Type 2 Diabetes.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Hip pain, wound drainage and fever months after arthroplasty.

Previous hip replacement, Type 2 Diabetes and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Hip pain, wound drainage and fever months after arthroplasty. BP 86/54 mmHg, pulse 118/min, SpO₂ 94% on room air. Supporting results: CRP 196 mg/L; WBC 20.4 10^3/µL; Creatinine 2.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: Homemaker. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Previous hip replacement, Type 2 Diabetes and hypertension.
  Record: 00000041-0000-4000-8000-000000076001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000076002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000076003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000076004
- 2026-09-08T02:00:00.000Z: IPD, active. Hip pain, wound drainage and fever months after arthroplasty.
  Record: 00000041-0000-4000-8000-000000076005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Hip radiographs

Source: MockRIS; record: 00000047-0000-4000-8000-000000076001; order: 00000048-0000-4000-8000-000000076001.

Periprosthetic lucency and adjacent swelling; microbiological confirmation is pending.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000076005; order: 00000043-0000-4000-8000-000000076005.

Synthetic results associated with this encounter. CRP 196 mg/L (high); WBC 20.4 10^3/µL (high); Creatinine 2.2 mg/dL (high); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000076004; order: 00000043-0000-4000-8000-000000076004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000076003; order: 00000043-0000-4000-8000-000000076003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000076002; order: 00000043-0000-4000-8000-000000076002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000076001; order: 00000043-0000-4000-8000-000000076001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Metformin, 500 mg, oral, Twice daily; held. Home history; acute illness and renal suitability require review. This is not a prescribing instruction.

### Department coordination

Orthopaedics → Nephrology: Review renal dysfunction and medication reconciliation during infection care. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Hip pain, wound drainage and fever months after arthroplasty.
Background: Previous hip replacement, Type 2 Diabetes and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Hip pain, wound drainage and fever months after arthroplasty. BP 86/54 mmHg, pulse 118/min, SpO₂ 94% on room air. Supporting results: CRP 196 mg/L; WBC 20.4 10^3/µL; Creatinine 2.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: CRP 196 mg/L; WBC 20.4 10^3/µL; Creatinine 2.2 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Hip pain, wound drainage and fever months after arthroplasty. Critical at this synthetic assessment: Hip pain, wound drainage and fever months after arthroplasty. BP 86/54 mmHg, pulse 118/min, SpO₂ 94% on room air. Supporting results: CRP 196 mg/L; WBC 20.4 10^3/µL; Creatinine 2.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review renal dysfunction and medication reconciliation during infection care. Pending: Repeat CRP result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Prosthetic hip joint infection with sepsis. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal dysfunction and medication reconciliation during infection care.
Pending: Repeat CRP result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Review renal dysfunction and medication reconciliation during infection care. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Hip pain, wound drainage and fever months after arthroplasty.
Background: Previous hip replacement, Type 2 Diabetes and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; Hip radiographs
Pending: Repeat CRP result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Prosthetic hip joint infection with sepsis. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal dysfunction and medication reconciliation during infection care.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat CRP result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0077 — Yash Mehra, 34M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Unstable pelvic ring injury with haemorrhagic shock.

Allergies: Penicillin — rash reported; verification pending.

### Presentation and history

High-energy collision with pelvic pain and haemodynamic instability.

Earlier back-pain review without documented chronic organ disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: High-energy collision with pelvic pain and haemodynamic instability. BP 74/42 mmHg, pulse 144/min, SpO₂ 91% on room air. Supporting results: Haemoglobin 7.1 g/dL; Lactate 6.3 mmol/L; INR 1.7 ratio. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Bus conductor. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Earlier back-pain review without documented chronic organ disease.
  Record: 00000041-0000-4000-8000-000000077001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000077002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000077003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000077004
- 2026-09-08T02:00:00.000Z: IPD, active. High-energy collision with pelvic pain and haemodynamic instability.
  Record: 00000041-0000-4000-8000-000000077005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Pelvic radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000077001; order: 00000048-0000-4000-8000-000000077001.

Pubic symphyseal diastasis and sacroiliac disruption indicating unstable pelvic ring injury.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000077005; order: 00000043-0000-4000-8000-000000077005.

Synthetic results associated with this encounter. Haemoglobin 7.1 g/dL (low); Lactate 6.3 mmol/L (high); INR 1.7 ratio (high); Creatinine 0.9 mg/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000077004; order: 00000043-0000-4000-8000-000000077004.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000077003; order: 00000043-0000-4000-8000-000000077003.

Synthetic results associated with this encounter. Haemoglobin 13.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000077002; order: 00000043-0000-4000-8000-000000077002.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000077001; order: 00000043-0000-4000-8000-000000077001.

Synthetic results associated with this encounter. Haemoglobin 13.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Orthopaedics → Internal Medicine: Assist systemic assessment and document trauma-team coordination. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

High-energy collision with pelvic pain and haemodynamic instability.
Background: Earlier back-pain review without documented chronic organ disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: High-energy collision with pelvic pain and haemodynamic instability. BP 74/42 mmHg, pulse 144/min, SpO₂ 91% on room air. Supporting results: Haemoglobin 7.1 g/dL; Lactate 6.3 mmol/L; INR 1.7 ratio. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Haemoglobin 7.1 g/dL; Lactate 6.3 mmol/L; INR 1.7 ratio; Creatinine 0.9 mg/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: High-energy collision with pelvic pain and haemodynamic instability. Critical at this synthetic assessment: High-energy collision with pelvic pain and haemodynamic instability. BP 74/42 mmHg, pulse 144/min, SpO₂ 91% on room air. Supporting results: Haemoglobin 7.1 g/dL; Lactate 6.3 mmol/L; INR 1.7 ratio. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assist systemic assessment and document trauma-team coordination. Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Unstable pelvic ring injury with haemorrhagic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assist systemic assessment and document trauma-team coordination.
Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Internal Medicine): Assist systemic assessment and document trauma-team coordination. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: High-energy collision with pelvic pain and haemodynamic instability.
Background: Earlier back-pain review without documented chronic organ disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; Pelvic radiograph
Pending: Repeat Haemoglobin result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Unstable pelvic ring injury with haemorrhagic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assist systemic assessment and document trauma-team coordination.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Working summary has not yet been written.

### Pending work

- Repeat Haemoglobin result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: planned. Target: 2026-09-15. Owner: Dr. Nikhil Joshi.

Clinical clearance: Not approved. Documents checked: false.

Summary not yet written.

## F-DEMO-0078 — Neelam Saxena, 55F

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Spinal epidural abscess with evolving neurological deficit; Type 2 Diabetes.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fever, severe back pain, new leg weakness and urinary retention.

Type 2 Diabetes and recurrent back-pain visits. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fever, severe back pain, new leg weakness and urinary retention. BP 100/64 mmHg, pulse 118/min, SpO₂ 96% on room air. Supporting results: WBC 18.9 10^3/µL; CRP 184 mg/L; Glucose 286 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired teacher. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Type 2 Diabetes and recurrent back-pain visits.
  Record: 00000041-0000-4000-8000-000000078001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000078002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000078003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000078004
- 2026-09-08T02:00:00.000Z: IPD, active. Fever, severe back pain, new leg weakness and urinary retention.
  Record: 00000041-0000-4000-8000-000000078005

### Investigation history

#### 2026-09-08T04:30:00.000Z — MRI thoracolumbar spine report

Source: MockRIS; record: 00000047-0000-4000-8000-000000078001; order: 00000048-0000-4000-8000-000000078001.

Posterior epidural collection causing significant canal narrowing with adjacent disc and endplate inflammation.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000078005; order: 00000043-0000-4000-8000-000000078005.

Synthetic results associated with this encounter. WBC 18.9 10^3/µL (high); CRP 184 mg/L (high); Glucose 286 mg/dL (high); Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000078004; order: 00000043-0000-4000-8000-000000078004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000078003; order: 00000043-0000-4000-8000-000000078003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000078002; order: 00000043-0000-4000-8000-000000078002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000078001; order: 00000043-0000-4000-8000-000000078001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metformin, 500 mg, oral, Twice daily; held. Home history; acute illness and renal suitability require review. This is not a prescribing instruction.

### Department coordination

Orthopaedics → Internal Medicine: Coordinate glycaemic and infection review while the spinal team assesses neurological deterioration. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fever, severe back pain, new leg weakness and urinary retention.
Background: Type 2 Diabetes and recurrent back-pain visits. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fever, severe back pain, new leg weakness and urinary retention. BP 100/64 mmHg, pulse 118/min, SpO₂ 96% on room air. Supporting results: WBC 18.9 10^3/µL; CRP 184 mg/L; Glucose 286 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: WBC 18.9 10^3/µL; CRP 184 mg/L; Glucose 286 mg/dL; Creatinine 0.9 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fever, severe back pain, new leg weakness and urinary retention. Critical at this synthetic assessment: Fever, severe back pain, new leg weakness and urinary retention. BP 100/64 mmHg, pulse 118/min, SpO₂ 96% on room air. Supporting results: WBC 18.9 10^3/µL; CRP 184 mg/L; Glucose 286 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate glycaemic and infection review while the spinal team assesses neurological deterioration. Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Spinal epidural abscess with evolving neurological deficit. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate glycaemic and infection review while the spinal team assesses neurological deterioration.
Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Internal Medicine): Coordinate glycaemic and infection review while the spinal team assesses neurological deterioration. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fever, severe back pain, new leg weakness and urinary retention.
Background: Type 2 Diabetes and recurrent back-pain visits. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; MRI thoracolumbar spine report
Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Spinal epidural abscess with evolving neurological deficit. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate glycaemic and infection review while the spinal team assesses neurological deterioration.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Spinal epidural abscess with evolving neurological deficit. Fever, severe back pain, new leg weakness and urinary retention.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Orthopaedics; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat WBC result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Nikhil Joshi.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Spinal epidural abscess with evolving neurological deficit. Fever, severe back pain, new leg weakness and urinary retention.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Orthopaedics; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0079 — Ashok Rane, 60M

Department: Orthopaedics. Acuity at snapshot: critical.

Conditions: Postoperative pulmonary embolism after knee arthroplasty; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Sudden dyspnoea and syncope during postoperative mobilisation.

Recent knee replacement and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Sudden dyspnoea and syncope during postoperative mobilisation. BP 80/48 mmHg, pulse 132/min, SpO₂ 84% on room air. Supporting results: Troponin I 0.6 ng/mL; Lactate 4.8 mmol/L; Creatinine 1.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Small business owner. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Recent knee replacement and hypertension.
  Record: 00000041-0000-4000-8000-000000079001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000079002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000079003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000079004
- 2026-09-08T02:00:00.000Z: IPD, active. Sudden dyspnoea and syncope during postoperative mobilisation.
  Record: 00000041-0000-4000-8000-000000079005

### Investigation history

#### 2026-09-08T04:30:00.000Z — CT pulmonary angiography report

Source: MockRIS; record: 00000047-0000-4000-8000-000000079001; order: 00000048-0000-4000-8000-000000079001.

Bilateral central pulmonary arterial filling defects with right ventricular enlargement.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000079005; order: 00000043-0000-4000-8000-000000079005.

Synthetic results associated with this encounter. Troponin I 0.6 ng/mL (high); Lactate 4.8 mmol/L (high); Creatinine 1.3 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000079004; order: 00000043-0000-4000-8000-000000079004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000079003; order: 00000043-0000-4000-8000-000000079003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000079002; order: 00000043-0000-4000-8000-000000079002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000079001; order: 00000043-0000-4000-8000-000000079001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Orthopaedics → Cardiology: Assess right-heart strain and haemodynamic status with the treating team. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Sudden dyspnoea and syncope during postoperative mobilisation.
Background: Recent knee replacement and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Sudden dyspnoea and syncope during postoperative mobilisation. BP 80/48 mmHg, pulse 132/min, SpO₂ 84% on room air. Supporting results: Troponin I 0.6 ng/mL; Lactate 4.8 mmol/L; Creatinine 1.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: Troponin I 0.6 ng/mL; Lactate 4.8 mmol/L; Creatinine 1.3 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Sudden dyspnoea and syncope during postoperative mobilisation. Critical at this synthetic assessment: Sudden dyspnoea and syncope during postoperative mobilisation. BP 80/48 mmHg, pulse 132/min, SpO₂ 84% on room air. Supporting results: Troponin I 0.6 ng/mL; Lactate 4.8 mmol/L; Creatinine 1.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess right-heart strain and haemodynamic status with the treating team. Pending: Repeat Troponin I result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Postoperative pulmonary embolism after knee arthroplasty. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess right-heart strain and haemodynamic status with the treating team.
Pending: Repeat Troponin I result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Cardiology): Assess right-heart strain and haemodynamic status with the treating team. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Sudden dyspnoea and syncope during postoperative mobilisation.
Background: Recent knee replacement and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; CT pulmonary angiography report
Pending: Repeat Troponin I result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Postoperative pulmonary embolism after knee arthroplasty. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess right-heart strain and haemodynamic status with the treating team.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Postoperative pulmonary embolism after knee arthroplasty. Sudden dyspnoea and syncope during postoperative mobilisation.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Orthopaedics; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat Troponin I result and source review — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Cardiology assessment and documented response — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Nikhil Joshi.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Postoperative pulmonary embolism after knee arthroplasty. Sudden dyspnoea and syncope during postoperative mobilisation.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Orthopaedics; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0080 — Anita Fernandes, 64F

Department: Orthopaedics. Acuity at snapshot: noncritical.

Conditions: Recovering distal radius fixation admission; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation.

Osteoporosis and hypertension with earlier falls assessment. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Noncritical recovery at this assessment: Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation. Stable recorded physiology; final discharge status is documented separately.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Office assistant. Preferred language: Gujarati, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Orthopaedics assessment. Background: Osteoporosis and hypertension with earlier falls assessment.
  Record: 00000041-0000-4000-8000-000000080001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000080002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Orthopaedics review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000080003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000080004
- 2026-09-05T02:00:00.000Z: IPD, active. Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation.
  Record: 00000041-0000-4000-8000-000000080005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Postoperative wrist radiographs

Source: MockRIS; record: 00000047-0000-4000-8000-000000080001; order: 00000048-0000-4000-8000-000000080001.

Plate and screw fixation maintains satisfactory distal radius alignment.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000080005; order: 00000043-0000-4000-8000-000000080005.

Synthetic results associated with this encounter. Haemoglobin 11.8 g/dL (low); WBC 7.1 10^3/µL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.7 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-09-05T03:30:00.000Z — Admission laboratory assessment

Source: MockLIS; record: 00000064-0000-4000-8000-000000080001; order: 00000065-0000-4000-8000-000000080001.

Synthetic admission results, before the separate recovery report: Haemoglobin 12.1 g/dL; WBC 10.2 10^3/µL; Creatinine 1 mg/dL.

#### 2026-08-25T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000080004; order: 00000043-0000-4000-8000-000000080004.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000080003; order: 00000043-0000-4000-8000-000000080003.

Synthetic results associated with this encounter. Haemoglobin 12.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000080002; order: 00000043-0000-4000-8000-000000080002.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Orthopaedics laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000080001; order: 00000043-0000-4000-8000-000000080001.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Orthopaedics → Internal Medicine: Confirm medical review and falls-risk follow-up before final approval. Status: completed. Synthetic Internal Medicine review completed. Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

### Current notes and handover draft

#### Current clinical assessment

Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation.
Background: Osteoporosis and hypertension with earlier falls assessment. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Noncritical recovery at this assessment: Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation. Stable recorded physiology; final discharge status is documented separately.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: Haemoglobin 11.8 g/dL; WBC 7.1 10^3/µL; Creatinine 0.9 mg/dL; Albumin 3.7 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Admission assessment and hospital course

Admission for displaced distal radius fracture assessment. Operative planning and medical review are pending; postoperative alignment cannot yet be assessed.

#### Ward round — current admission review

Findings: Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation. Noncritical recovery at this assessment: Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation. Stable recorded physiology; final discharge status is documented separately.
Plan: Confirm medical review and falls-risk follow-up before final approval. Pending: Discharge consultant approval pending; Fracture clinic follow-up appointment. Decisions remain with the treating team.

#### Latest progress and pending work

Recovering distal radius fixation admission. Stable recovery; check the working-list stage before completing discharge. Confirm medical review and falls-risk follow-up before final approval.
Pending: Discharge consultant approval pending; Fracture clinic follow-up appointment.
Department question (Internal Medicine): Confirm medical review and falls-risk follow-up before final approval. Status: completed. Synthetic Internal Medicine review completed. Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

#### Synthetic handover draft — not approved

Situation: Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation.
Background: Osteoporosis and hypertension with earlier falls assessment. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Orthopaedics laboratory review; Admission laboratory assessment; Postoperative wrist radiographs
Pending: Discharge consultant approval pending; Fracture clinic follow-up appointment.
Continuity: Recovering distal radius fixation admission. Stable recovery; check the working-list stage before completing discharge. Confirm medical review and falls-risk follow-up before final approval.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Consultant approval pending; clinical clearance has not been signed.
Synthetic discharge working draft: Recovering distal radius fixation admission. Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation.
Current recovery assessment reviewed; the checklist below determines whether final approval is complete.
Follow-up: Orthopaedics; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Discharge consultant approval pending — Dr. Nikhil Joshi; due 2026-09-08T08:00:00.000Z.
- Fracture clinic follow-up appointment — Dr. Nikhil Joshi; due 2026-09-15T04:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-08. Owner: Dr. Nikhil Joshi.

Clinical clearance: Not approved. Documents checked: true.

Synthetic discharge working draft: Recovering distal radius fixation admission. Pain controlled, fingers warm and mobile, mobilising with family assistance after fixation.
Current recovery assessment reviewed; the checklist below determines whether final approval is complete.
Follow-up: Orthopaedics; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0081 — Kamal Dahiya, 48M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Obstructive acute kidney injury with severe hyperkalaemia.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Anuria, flank discomfort and weakness with documented ECG changes.

Outside urinary stone history; first hospital visit here. First hospital encounter; outside history is reported, not a retained hospital record.

Critical-state rationale: Critical at this synthetic assessment: Anuria, flank discomfort and weakness with documented ECG changes. BP 154/92 mmHg, pulse 52/min, SpO₂ 94% on room air. Supporting results: Creatinine 7.2 mg/dL; Potassium 6.7 mmol/L; Bicarbonate 13 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: School administrator. Preferred language: Tamil, English.

### Hospital encounters

- 2026-09-08T02:00:00.000Z: IPD, active. Anuria, flank discomfort and weakness with documented ECG changes.
  Record: 00000041-0000-4000-8000-000000081001

### Investigation history

#### 2026-09-08T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000081001; order: 00000048-0000-4000-8000-000000081001.

Bilateral hydronephrosis with suspected distal ureteric obstruction; urology review noted.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000081001; order: 00000043-0000-4000-8000-000000081001.

Synthetic results associated with this encounter. Creatinine 7.2 mg/dL (high); Potassium 6.7 mmol/L (high); Bicarbonate 13 mmol/L (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Nephrology → Cardiology: Review rhythm monitoring findings alongside renal and urological coordination. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Anuria, flank discomfort and weakness with documented ECG changes.
Background: Outside urinary stone history; first hospital visit here. First hospital encounter; outside history is reported, not a retained hospital record.
Recorded acuity: Critical at this synthetic assessment: Anuria, flank discomfort and weakness with documented ECG changes. BP 154/92 mmHg, pulse 52/min, SpO₂ 94% on room air. Supporting results: Creatinine 7.2 mg/dL; Potassium 6.7 mmol/L; Bicarbonate 13 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: Creatinine 7.2 mg/dL; Potassium 6.7 mmol/L; Bicarbonate 13 mmol/L.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Anuria, flank discomfort and weakness with documented ECG changes. Critical at this synthetic assessment: Anuria, flank discomfort and weakness with documented ECG changes. BP 154/92 mmHg, pulse 52/min, SpO₂ 94% on room air. Supporting results: Creatinine 7.2 mg/dL; Potassium 6.7 mmol/L; Bicarbonate 13 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review rhythm monitoring findings alongside renal and urological coordination. Pending: Repeat Creatinine result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Obstructive acute kidney injury with severe hyperkalaemia. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review rhythm monitoring findings alongside renal and urological coordination.
Pending: Repeat Creatinine result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Cardiology): Review rhythm monitoring findings alongside renal and urological coordination. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Anuria, flank discomfort and weakness with documented ECG changes.
Background: Outside urinary stone history; first hospital visit here. First hospital encounter; outside history is reported, not a retained hospital record.
Recent results: Nephrology laboratory review; Ultrasound KUB
Pending: Repeat Creatinine result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Obstructive acute kidney injury with severe hyperkalaemia. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review rhythm monitoring findings alongside renal and urological coordination.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Creatinine result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Cardiology assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0082 — Bhavana Shah, 33F

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Rapidly progressive glomerulonephritis with pulmonary haemorrhage.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Haemoptysis, worsening breathlessness and oliguria.

Recent haematuria and proteinuria investigation. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Haemoptysis, worsening breathlessness and oliguria. BP 148/88 mmHg, pulse 126/min, SpO₂ 84% on room air. Supporting results: Creatinine 5.6 mg/dL; Haemoglobin 7.4 g/dL; Potassium 5.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Shopkeeper. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Nephrology assessment. Background: Recent haematuria and proteinuria investigation.
  Record: 00000041-0000-4000-8000-000000082001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000082002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000082003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000082004
- 2026-09-08T02:00:00.000Z: IPD, active. Haemoptysis, worsening breathlessness and oliguria.
  Record: 00000041-0000-4000-8000-000000082005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest CT report

Source: MockRIS; record: 00000047-0000-4000-8000-000000082001; order: 00000048-0000-4000-8000-000000082001.

Diffuse bilateral ground-glass and air-space opacities; alveolar haemorrhage considered clinically.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000082005; order: 00000043-0000-4000-8000-000000082005.

Synthetic results associated with this encounter. Creatinine 5.6 mg/dL (high); Haemoglobin 7.4 g/dL (low); Potassium 5.9 mmol/L (high); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000082004; order: 00000043-0000-4000-8000-000000082004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000082003; order: 00000043-0000-4000-8000-000000082003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000082002; order: 00000043-0000-4000-8000-000000082002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000082001; order: 00000043-0000-4000-8000-000000082001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Nephrology → Internal Medicine: Coordinate respiratory evaluation and pending autoimmune investigation review. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Haemoptysis, worsening breathlessness and oliguria.
Background: Recent haematuria and proteinuria investigation. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Haemoptysis, worsening breathlessness and oliguria. BP 148/88 mmHg, pulse 126/min, SpO₂ 84% on room air. Supporting results: Creatinine 5.6 mg/dL; Haemoglobin 7.4 g/dL; Potassium 5.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Creatinine 5.6 mg/dL; Haemoglobin 7.4 g/dL; Potassium 5.9 mmol/L; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Haemoptysis, worsening breathlessness and oliguria. Critical at this synthetic assessment: Haemoptysis, worsening breathlessness and oliguria. BP 148/88 mmHg, pulse 126/min, SpO₂ 84% on room air. Supporting results: Creatinine 5.6 mg/dL; Haemoglobin 7.4 g/dL; Potassium 5.9 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate respiratory evaluation and pending autoimmune investigation review. Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Rapidly progressive glomerulonephritis with pulmonary haemorrhage. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate respiratory evaluation and pending autoimmune investigation review.
Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Coordinate respiratory evaluation and pending autoimmune investigation review. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Haemoptysis, worsening breathlessness and oliguria.
Background: Recent haematuria and proteinuria investigation. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; Chest CT report
Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Rapidly progressive glomerulonephritis with pulmonary haemorrhage. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate respiratory evaluation and pending autoimmune investigation review.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Creatinine result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0083 — Ravindra Kale, 57M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Dialysis catheter-related bloodstream infection with shock; Hypertension; Type 2 Diabetes.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Rigors during dialysis followed by hypotension and confusion; catheter cultures pending.

CKD stage 5 on haemodialysis, Type 2 Diabetes and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Rigors during dialysis followed by hypotension and confusion; catheter cultures pending. BP 78/46 mmHg, pulse 128/min, SpO₂ 92% on room air. Supporting results: WBC 24.2 10^3/µL; Lactate 5.7 mmol/L; Potassium 5.6 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired postal employee. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Nephrology assessment. Background: CKD stage 5 on haemodialysis, Type 2 Diabetes and hypertension.
  Record: 00000041-0000-4000-8000-000000083001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000083002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000083003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000083004
- 2026-09-08T02:00:00.000Z: IPD, active. Rigors during dialysis followed by hypotension and confusion; catheter cultures pending.
  Record: 00000041-0000-4000-8000-000000083005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000083001; order: 00000048-0000-4000-8000-000000083001.

Catheter tip projects at the cavoatrial region; no focal lobar consolidation.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000083005; order: 00000043-0000-4000-8000-000000083005.

Synthetic results associated with this encounter. WBC 24.2 10^3/µL (high); Lactate 5.7 mmol/L (high); Potassium 5.6 mmol/L (high); Creatinine 6.2 mg/dL (high); Haemoglobin 10.2 g/dL (low); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000083004; order: 00000043-0000-4000-8000-000000083004.

Synthetic results associated with this encounter. Creatinine 6.2 mg/dL (high); Haemoglobin 10.2 g/dL (low); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000083003; order: 00000043-0000-4000-8000-000000083003.

Synthetic results associated with this encounter. Creatinine 6.3 mg/dL (high); Haemoglobin 10.3 g/dL (low); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000083002; order: 00000043-0000-4000-8000-000000083002.

Synthetic results associated with this encounter. Creatinine 6.2 mg/dL (high); Haemoglobin 10.2 g/dL (low); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000083001; order: 00000043-0000-4000-8000-000000083001.

Synthetic results associated with this encounter. Creatinine 6.2 mg/dL (high); Haemoglobin 10.2 g/dL (low); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Metformin, 500 mg, oral, Twice daily; held. Home history; acute illness and renal suitability require review. This is not a prescribing instruction.

### Department coordination

Nephrology → Internal Medicine: Coordinate culture review and systemic infection documentation. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Rigors during dialysis followed by hypotension and confusion; catheter cultures pending.
Background: CKD stage 5 on haemodialysis, Type 2 Diabetes and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Rigors during dialysis followed by hypotension and confusion; catheter cultures pending. BP 78/46 mmHg, pulse 128/min, SpO₂ 92% on room air. Supporting results: WBC 24.2 10^3/µL; Lactate 5.7 mmol/L; Potassium 5.6 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: WBC 24.2 10^3/µL; Lactate 5.7 mmol/L; Potassium 5.6 mmol/L; Creatinine 6.2 mg/dL; Haemoglobin 10.2 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Rigors during dialysis followed by hypotension and confusion; catheter cultures pending. Critical at this synthetic assessment: Rigors during dialysis followed by hypotension and confusion; catheter cultures pending. BP 78/46 mmHg, pulse 128/min, SpO₂ 92% on room air. Supporting results: WBC 24.2 10^3/µL; Lactate 5.7 mmol/L; Potassium 5.6 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate culture review and systemic infection documentation. Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Dialysis catheter-related bloodstream infection with shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate culture review and systemic infection documentation.
Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Coordinate culture review and systemic infection documentation. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Rigors during dialysis followed by hypotension and confusion; catheter cultures pending.
Background: CKD stage 5 on haemodialysis, Type 2 Diabetes and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; Chest radiograph
Pending: Repeat WBC result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Dialysis catheter-related bloodstream infection with shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate culture review and systemic infection documentation.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat WBC result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0084 — Leela Narayanan, 65F

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Symptomatic severe hyponatraemia with seizures; Hypertension.

Allergies: Penicillin — rash reported; verification pending.

### Presentation and history

New confusion followed by a witnessed seizure with sodium 112 mmol/L.

Hypertension and previously recorded mild sodium reduction. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: New confusion followed by a witnessed seizure with sodium 112 mmol/L. BP 142/86 mmHg, pulse 110/min, SpO₂ 94% on room air. Supporting results: Sodium 112 mmol/L; Serum osmolality 238 mOsm/kg; Creatinine 1.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Textile worker. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Nephrology assessment. Background: Hypertension and previously recorded mild sodium reduction.
  Record: 00000041-0000-4000-8000-000000084001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000084002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000084003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000084004
- 2026-09-08T02:00:00.000Z: IPD, active. New confusion followed by a witnessed seizure with sodium 112 mmol/L.
  Record: 00000041-0000-4000-8000-000000084005

### Investigation history

#### 2026-09-08T04:30:00.000Z — CT head without contrast

Source: MockRIS; record: 00000047-0000-4000-8000-000000084001; order: 00000048-0000-4000-8000-000000084001.

No acute intracranial haemorrhage or focal mass effect.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000084005; order: 00000043-0000-4000-8000-000000084005.

Synthetic results associated with this encounter. Sodium 112 mmol/L (low); Serum osmolality 238 mOsm/kg (low); Creatinine 1.1 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000084004; order: 00000043-0000-4000-8000-000000084004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000084003; order: 00000043-0000-4000-8000-000000084003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000084002; order: 00000043-0000-4000-8000-000000084002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000084001; order: 00000043-0000-4000-8000-000000084001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Nephrology → Internal Medicine: Review neurological observations and medication contributors to sodium disturbance. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

New confusion followed by a witnessed seizure with sodium 112 mmol/L.
Background: Hypertension and previously recorded mild sodium reduction. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: New confusion followed by a witnessed seizure with sodium 112 mmol/L. BP 142/86 mmHg, pulse 110/min, SpO₂ 94% on room air. Supporting results: Sodium 112 mmol/L; Serum osmolality 238 mOsm/kg; Creatinine 1.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: Sodium 112 mmol/L; Serum osmolality 238 mOsm/kg; Creatinine 1.1 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: New confusion followed by a witnessed seizure with sodium 112 mmol/L. Critical at this synthetic assessment: New confusion followed by a witnessed seizure with sodium 112 mmol/L. BP 142/86 mmHg, pulse 110/min, SpO₂ 94% on room air. Supporting results: Sodium 112 mmol/L; Serum osmolality 238 mOsm/kg; Creatinine 1.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review neurological observations and medication contributors to sodium disturbance. Pending: Repeat Sodium result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Symptomatic severe hyponatraemia with seizures. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review neurological observations and medication contributors to sodium disturbance.
Pending: Repeat Sodium result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Department question (Internal Medicine): Review neurological observations and medication contributors to sodium disturbance. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: New confusion followed by a witnessed seizure with sodium 112 mmol/L.
Background: Hypertension and previously recorded mild sodium reduction. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; CT head without contrast
Pending: Repeat Sodium result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Symptomatic severe hyponatraemia with seizures. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review neurological observations and medication contributors to sodium disturbance.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Sodium result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0085 — Rohit Bhargava, 39M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Crush-associated rhabdomyolysis with acute kidney injury; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Muscle pain, dark urine and oliguria after prolonged lower-limb compression.

Hypertension; occupational crush exposure occurred this admission. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Muscle pain, dark urine and oliguria after prolonged lower-limb compression. BP 94/58 mmHg, pulse 122/min, SpO₂ 95% on room air. Supporting results: Creatine kinase 28400 U/L; Creatinine 4.8 mg/dL; Potassium 6.4 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Accounts assistant. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: IPD, completed. Initial Nephrology assessment. Background: Hypertension; occupational crush exposure occurred this admission.
  Record: 00000041-0000-4000-8000-000000085001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000085002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000085003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000085004
- 2026-09-08T02:00:00.000Z: IPD, active. Muscle pain, dark urine and oliguria after prolonged lower-limb compression.
  Record: 00000041-0000-4000-8000-000000085005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Lower-leg radiographs

Source: MockRIS; record: 00000047-0000-4000-8000-000000085001; order: 00000048-0000-4000-8000-000000085001.

Extensive soft-tissue swelling without a displaced fracture on available views.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000085005; order: 00000043-0000-4000-8000-000000085005.

Synthetic results associated with this encounter. Creatine kinase 28400 U/L (high); Creatinine 4.8 mg/dL (high); Potassium 6.4 mmol/L (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000085004; order: 00000043-0000-4000-8000-000000085004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000085003; order: 00000043-0000-4000-8000-000000085003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000085002; order: 00000043-0000-4000-8000-000000085002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000085001; order: 00000043-0000-4000-8000-000000085001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Nephrology → Orthopaedics: Assess the injured limb and document additional surgical concerns. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Muscle pain, dark urine and oliguria after prolonged lower-limb compression.
Background: Hypertension; occupational crush exposure occurred this admission. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Muscle pain, dark urine and oliguria after prolonged lower-limb compression. BP 94/58 mmHg, pulse 122/min, SpO₂ 95% on room air. Supporting results: Creatine kinase 28400 U/L; Creatinine 4.8 mg/dL; Potassium 6.4 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: Creatine kinase 28400 U/L; Creatinine 4.8 mg/dL; Potassium 6.4 mmol/L; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Muscle pain, dark urine and oliguria after prolonged lower-limb compression. Critical at this synthetic assessment: Muscle pain, dark urine and oliguria after prolonged lower-limb compression. BP 94/58 mmHg, pulse 122/min, SpO₂ 95% on room air. Supporting results: Creatine kinase 28400 U/L; Creatinine 4.8 mg/dL; Potassium 6.4 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess the injured limb and document additional surgical concerns. Pending: Repeat Creatine kinase result and source review; Orthopaedics assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Crush-associated rhabdomyolysis with acute kidney injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess the injured limb and document additional surgical concerns.
Pending: Repeat Creatine kinase result and source review; Orthopaedics assessment and documented response; Senior review of physiology and escalation plan.
Department question (Orthopaedics): Assess the injured limb and document additional surgical concerns. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Muscle pain, dark urine and oliguria after prolonged lower-limb compression.
Background: Hypertension; occupational crush exposure occurred this admission. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; Lower-leg radiographs
Pending: Repeat Creatine kinase result and source review; Orthopaedics assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Crush-associated rhabdomyolysis with acute kidney injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess the injured limb and document additional surgical concerns.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Creatine kinase result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Orthopaedics assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0086 — Savita Gokhale, 51F

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Lupus nephritis flare with hypertensive pulmonary oedema; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Severe breathlessness, headache and increasing oedema.

Systemic lupus erythematosus, previously biopsied nephritis and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Severe breathlessness, headache and increasing oedema. BP 218/126 mmHg, pulse 124/min, SpO₂ 82% on room air. Supporting results: Creatinine 3.9 mg/dL; Potassium 5.8 mmol/L; Urine protein creatinine ratio 4.7 g/g. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: Homemaker. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Nephrology assessment. Background: Systemic lupus erythematosus, previously biopsied nephritis and hypertension.
  Record: 00000041-0000-4000-8000-000000086001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000086002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000086003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000086004
- 2026-09-08T02:00:00.000Z: IPD, active. Severe breathlessness, headache and increasing oedema.
  Record: 00000041-0000-4000-8000-000000086005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000086001; order: 00000048-0000-4000-8000-000000086001.

Bilateral perihilar opacities with small effusions compatible with pulmonary oedema.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000086005; order: 00000043-0000-4000-8000-000000086005.

Synthetic results associated with this encounter. Creatinine 3.9 mg/dL (high); Potassium 5.8 mmol/L (high); Urine protein creatinine ratio 4.7 g/g (high); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000086004; order: 00000043-0000-4000-8000-000000086004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000086003; order: 00000043-0000-4000-8000-000000086003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000086002; order: 00000043-0000-4000-8000-000000086002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000086001; order: 00000043-0000-4000-8000-000000086001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Nephrology → Cardiology: Review cardiac function and haemodynamics during the acute renal flare. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe breathlessness, headache and increasing oedema.
Background: Systemic lupus erythematosus, previously biopsied nephritis and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Severe breathlessness, headache and increasing oedema. BP 218/126 mmHg, pulse 124/min, SpO₂ 82% on room air. Supporting results: Creatinine 3.9 mg/dL; Potassium 5.8 mmol/L; Urine protein creatinine ratio 4.7 g/g. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: Creatinine 3.9 mg/dL; Potassium 5.8 mmol/L; Urine protein creatinine ratio 4.7 g/g; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Severe breathlessness, headache and increasing oedema. Critical at this synthetic assessment: Severe breathlessness, headache and increasing oedema. BP 218/126 mmHg, pulse 124/min, SpO₂ 82% on room air. Supporting results: Creatinine 3.9 mg/dL; Potassium 5.8 mmol/L; Urine protein creatinine ratio 4.7 g/g. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review cardiac function and haemodynamics during the acute renal flare. Pending: Repeat Creatinine result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Lupus nephritis flare with hypertensive pulmonary oedema. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review cardiac function and haemodynamics during the acute renal flare.
Pending: Repeat Creatinine result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Cardiology): Review cardiac function and haemodynamics during the acute renal flare. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe breathlessness, headache and increasing oedema.
Background: Systemic lupus erythematosus, previously biopsied nephritis and hypertension. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; Chest radiograph
Pending: Repeat Creatinine result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Lupus nephritis flare with hypertensive pulmonary oedema. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review cardiac function and haemodynamics during the acute renal flare.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Creatinine result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Cardiology assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0087 — Imran Shaikh, 46M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Renal transplant pyelonephritis with septic shock; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fever, graft-region tenderness and oliguria with hypotension.

Renal transplant follow-up and hypertension; specialist medication list requires verification. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fever, graft-region tenderness and oliguria with hypotension. BP 80/50 mmHg, pulse 130/min, SpO₂ 93% on room air. Supporting results: Creatinine 3.6 mg/dL; WBC 18.2 10^3/µL; Lactate 5.2 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Bus conductor. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Nephrology assessment. Background: Renal transplant follow-up and hypertension; specialist medication list requires verification.
  Record: 00000041-0000-4000-8000-000000087001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000087002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000087003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000087004
- 2026-09-08T02:00:00.000Z: IPD, active. Fever, graft-region tenderness and oliguria with hypotension.
  Record: 00000041-0000-4000-8000-000000087005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Transplant kidney Doppler ultrasound

Source: MockRIS; record: 00000047-0000-4000-8000-000000087001; order: 00000048-0000-4000-8000-000000087001.

Enlarged graft with preserved main arterial flow, collecting-system debris and no large collection.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000087005; order: 00000043-0000-4000-8000-000000087005.

Synthetic results associated with this encounter. Creatinine 3.6 mg/dL (high); WBC 18.2 10^3/µL (high); Lactate 5.2 mmol/L (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000087004; order: 00000043-0000-4000-8000-000000087004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000087003; order: 00000043-0000-4000-8000-000000087003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000087002; order: 00000043-0000-4000-8000-000000087002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000087001; order: 00000043-0000-4000-8000-000000087001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Nephrology → Internal Medicine: Coordinate culture follow-up and infection source review with transplant nephrology. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fever, graft-region tenderness and oliguria with hypotension.
Background: Renal transplant follow-up and hypertension; specialist medication list requires verification. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fever, graft-region tenderness and oliguria with hypotension. BP 80/50 mmHg, pulse 130/min, SpO₂ 93% on room air. Supporting results: Creatinine 3.6 mg/dL; WBC 18.2 10^3/µL; Lactate 5.2 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Creatinine 3.6 mg/dL; WBC 18.2 10^3/µL; Lactate 5.2 mmol/L; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fever, graft-region tenderness and oliguria with hypotension. Critical at this synthetic assessment: Fever, graft-region tenderness and oliguria with hypotension. BP 80/50 mmHg, pulse 130/min, SpO₂ 93% on room air. Supporting results: Creatinine 3.6 mg/dL; WBC 18.2 10^3/µL; Lactate 5.2 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate culture follow-up and infection source review with transplant nephrology. Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Renal transplant pyelonephritis with septic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate culture follow-up and infection source review with transplant nephrology.
Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Internal Medicine): Coordinate culture follow-up and infection source review with transplant nephrology. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fever, graft-region tenderness and oliguria with hypotension.
Background: Renal transplant follow-up and hypertension; specialist medication list requires verification. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; Transplant kidney Doppler ultrasound
Pending: Repeat Creatinine result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Renal transplant pyelonephritis with septic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate culture follow-up and infection source review with transplant nephrology.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Working summary has not yet been written.

### Pending work

- Repeat Creatinine result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: planned. Target: 2026-09-15. Owner: Dr. Devika Rao.

Clinical clearance: Not approved. Documents checked: false.

Summary not yet written.

## F-DEMO-0088 — Devendra Suri, 70M

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Uraemic encephalopathy in advanced kidney disease; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Progressive confusion, nausea and asterixis with severe renal impairment.

CKD stage 5 and hypertension with renal replacement planning discussed previously. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Progressive confusion, nausea and asterixis with severe renal impairment. BP 168/96 mmHg, pulse 108/min, SpO₂ 94% on room air. Supporting results: Urea 224 mg/dL; Creatinine 9.6 mg/dL; Bicarbonate 11 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired teacher. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Nephrology assessment. Background: CKD stage 5 and hypertension with renal replacement planning discussed previously.
  Record: 00000041-0000-4000-8000-000000088001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000088002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000088003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000088004
- 2026-09-08T02:00:00.000Z: IPD, active. Progressive confusion, nausea and asterixis with severe renal impairment.
  Record: 00000041-0000-4000-8000-000000088005

### Investigation history

#### 2026-09-08T04:30:00.000Z — CT head without contrast

Source: MockRIS; record: 00000047-0000-4000-8000-000000088001; order: 00000048-0000-4000-8000-000000088001.

No acute haemorrhage or large infarct; chronic small-vessel changes.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000088005; order: 00000043-0000-4000-8000-000000088005.

Synthetic results associated with this encounter. Urea 224 mg/dL (high); Creatinine 9.6 mg/dL (high); Bicarbonate 11 mmol/L (low); Haemoglobin 10.2 g/dL (low); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000088004; order: 00000043-0000-4000-8000-000000088004.

Synthetic results associated with this encounter. Creatinine 6.2 mg/dL (high); Haemoglobin 10.2 g/dL (low); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000088003; order: 00000043-0000-4000-8000-000000088003.

Synthetic results associated with this encounter. Creatinine 6.3 mg/dL (high); Haemoglobin 10.3 g/dL (low); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000088002; order: 00000043-0000-4000-8000-000000088002.

Synthetic results associated with this encounter. Creatinine 6.2 mg/dL (high); Haemoglobin 10.2 g/dL (low); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000088001; order: 00000043-0000-4000-8000-000000088001.

Synthetic results associated with this encounter. Creatinine 6.2 mg/dL (high); Haemoglobin 10.2 g/dL (low); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Nephrology → Internal Medicine: Review alternative contributors to altered sensorium and document medical assessment. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Progressive confusion, nausea and asterixis with severe renal impairment.
Background: CKD stage 5 and hypertension with renal replacement planning discussed previously. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Progressive confusion, nausea and asterixis with severe renal impairment. BP 168/96 mmHg, pulse 108/min, SpO₂ 94% on room air. Supporting results: Urea 224 mg/dL; Creatinine 9.6 mg/dL; Bicarbonate 11 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: Urea 224 mg/dL; Creatinine 9.6 mg/dL; Bicarbonate 11 mmol/L; Haemoglobin 10.2 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Progressive confusion, nausea and asterixis with severe renal impairment. Critical at this synthetic assessment: Progressive confusion, nausea and asterixis with severe renal impairment. BP 168/96 mmHg, pulse 108/min, SpO₂ 94% on room air. Supporting results: Urea 224 mg/dL; Creatinine 9.6 mg/dL; Bicarbonate 11 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review alternative contributors to altered sensorium and document medical assessment. Pending: Repeat Urea result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Uraemic encephalopathy in advanced kidney disease. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review alternative contributors to altered sensorium and document medical assessment.
Pending: Repeat Urea result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Internal Medicine): Review alternative contributors to altered sensorium and document medical assessment. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Progressive confusion, nausea and asterixis with severe renal impairment.
Background: CKD stage 5 and hypertension with renal replacement planning discussed previously. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; CT head without contrast
Pending: Repeat Urea result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Uraemic encephalopathy in advanced kidney disease. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review alternative contributors to altered sensorium and document medical assessment.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Uraemic encephalopathy in advanced kidney disease. Progressive confusion, nausea and asterixis with severe renal impairment.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Nephrology; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat Urea result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Devika Rao.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Uraemic encephalopathy in advanced kidney disease. Progressive confusion, nausea and asterixis with severe renal impairment.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Nephrology; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0089 — Ayesha Kapadia, 40F

Department: Nephrology. Acuity at snapshot: critical.

Conditions: Thrombotic microangiopathy with severe acute kidney injury; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fatigue, bruising, oliguria and intermittent confusion.

Previously investigated anaemia and hypertension without advanced renal disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fatigue, bruising, oliguria and intermittent confusion. BP 184/108 mmHg, pulse 120/min, SpO₂ 95% on room air. Supporting results: Platelets 24 10^3/µL; Haemoglobin 7.2 g/dL; Creatinine 5.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Small business owner. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Nephrology assessment. Background: Previously investigated anaemia and hypertension without advanced renal disease.
  Record: 00000041-0000-4000-8000-000000089001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000089002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000089003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000089004
- 2026-09-08T02:00:00.000Z: IPD, active. Fatigue, bruising, oliguria and intermittent confusion.
  Record: 00000041-0000-4000-8000-000000089005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000089001; order: 00000048-0000-4000-8000-000000089001.

Normal-sized echogenic kidneys without obstructive hydronephrosis.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000089005; order: 00000043-0000-4000-8000-000000089005.

Synthetic results associated with this encounter. Platelets 24 10^3/µL (low); Haemoglobin 7.2 g/dL (low); Creatinine 5.1 mg/dL (high); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000089004; order: 00000043-0000-4000-8000-000000089004.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000089003; order: 00000043-0000-4000-8000-000000089003.

Synthetic results associated with this encounter. Haemoglobin 12.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000089002; order: 00000043-0000-4000-8000-000000089002.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000089001; order: 00000043-0000-4000-8000-000000089001.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Nephrology → Internal Medicine: Coordinate blood-film and haemolysis review; final subtype remains unconfirmed. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fatigue, bruising, oliguria and intermittent confusion.
Background: Previously investigated anaemia and hypertension without advanced renal disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fatigue, bruising, oliguria and intermittent confusion. BP 184/108 mmHg, pulse 120/min, SpO₂ 95% on room air. Supporting results: Platelets 24 10^3/µL; Haemoglobin 7.2 g/dL; Creatinine 5.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: Platelets 24 10^3/µL; Haemoglobin 7.2 g/dL; Creatinine 5.1 mg/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fatigue, bruising, oliguria and intermittent confusion. Critical at this synthetic assessment: Fatigue, bruising, oliguria and intermittent confusion. BP 184/108 mmHg, pulse 120/min, SpO₂ 95% on room air. Supporting results: Platelets 24 10^3/µL; Haemoglobin 7.2 g/dL; Creatinine 5.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Coordinate blood-film and haemolysis review; final subtype remains unconfirmed. Pending: Repeat Platelets result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Thrombotic microangiopathy with severe acute kidney injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate blood-film and haemolysis review; final subtype remains unconfirmed.
Pending: Repeat Platelets result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Internal Medicine): Coordinate blood-film and haemolysis review; final subtype remains unconfirmed. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fatigue, bruising, oliguria and intermittent confusion.
Background: Previously investigated anaemia and hypertension without advanced renal disease. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; Ultrasound KUB
Pending: Repeat Platelets result and source review; Internal Medicine assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Thrombotic microangiopathy with severe acute kidney injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Coordinate blood-film and haemolysis review; final subtype remains unconfirmed.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Thrombotic microangiopathy with severe acute kidney injury. Fatigue, bruising, oliguria and intermittent confusion.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Nephrology; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat Platelets result and source review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Internal Medicine assessment and documented response — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Devika Rao.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Thrombotic microangiopathy with severe acute kidney injury. Fatigue, bruising, oliguria and intermittent confusion.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Nephrology; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0090 — Mohan Subramaniam, 68M

Department: Nephrology. Acuity at snapshot: noncritical.

Conditions: Recovered prerenal acute kidney injury after gastroenteritis; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Eating and drinking normally, adequate urine output and creatinine near baseline.

Hypertension and CKD stage 2 with documented renal baseline. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Noncritical recovery at this assessment: Eating and drinking normally, adequate urine output and creatinine near baseline. Stable recorded physiology; final discharge status is documented separately.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Office assistant. Preferred language: Tamil, English.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Nephrology assessment. Background: Hypertension and CKD stage 2 with documented renal baseline.
  Record: 00000041-0000-4000-8000-000000090001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000090002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Nephrology review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000090003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000090004
- 2026-09-05T02:00:00.000Z: IPD, active. Eating and drinking normally, adequate urine output and creatinine near baseline.
  Record: 00000041-0000-4000-8000-000000090005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Ultrasound KUB

Source: MockRIS; record: 00000047-0000-4000-8000-000000090001; order: 00000048-0000-4000-8000-000000090001.

No hydronephrosis; preserved renal size with mild chronic cortical change.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000090005; order: 00000043-0000-4000-8000-000000090005.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal); Potassium 4.2 mmol/L (normal); Bicarbonate 24 mmol/L (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.7 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-09-05T03:30:00.000Z — Admission laboratory assessment

Source: MockLIS; record: 00000064-0000-4000-8000-000000090001; order: 00000065-0000-4000-8000-000000090001.

Synthetic admission results, before the separate recovery report: Creatinine 2.7 mg/dL; Potassium 4.8 mmol/L; Bicarbonate 19 mmol/L.

#### 2026-08-25T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000090004; order: 00000043-0000-4000-8000-000000090004.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000090003; order: 00000043-0000-4000-8000-000000090003.

Synthetic results associated with this encounter. Creatinine 1.3 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000090002; order: 00000043-0000-4000-8000-000000090002.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Nephrology laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000090001; order: 00000043-0000-4000-8000-000000090001.

Synthetic results associated with this encounter. Creatinine 1.2 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Nephrology → Gastroenterology: Confirm gastrointestinal symptom resolution and follow-up instructions. Status: completed. Synthetic Gastroenterology review completed. Eating and drinking normally, adequate urine output and creatinine near baseline. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

### Current notes and handover draft

#### Current clinical assessment

Eating and drinking normally, adequate urine output and creatinine near baseline.
Background: Hypertension and CKD stage 2 with documented renal baseline. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Noncritical recovery at this assessment: Eating and drinking normally, adequate urine output and creatinine near baseline. Stable recorded physiology; final discharge status is documented separately.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: Creatinine 1.2 mg/dL; Potassium 4.2 mmol/L; Bicarbonate 24 mmol/L; Haemoglobin 13.8 g/dL; Albumin 3.7 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Admission assessment and hospital course

Admission with diarrhoea, poor intake and reduced urine output. Initial renal indices are above the prior baseline; repeat renal assessment is pending.

#### Ward round — current admission review

Findings: Eating and drinking normally, adequate urine output and creatinine near baseline. Noncritical recovery at this assessment: Eating and drinking normally, adequate urine output and creatinine near baseline. Stable recorded physiology; final discharge status is documented separately.
Plan: Confirm gastrointestinal symptom resolution and follow-up instructions. Pending: Discharge completion after documented review; Nephrology follow-up appointment. Decisions remain with the treating team.

#### Latest progress and pending work

Recovered prerenal acute kidney injury after gastroenteritis. Stable recovery; check the working-list stage before completing discharge. Confirm gastrointestinal symptom resolution and follow-up instructions.
Pending: Discharge completion after documented review; Nephrology follow-up appointment.
Department question (Gastroenterology): Confirm gastrointestinal symptom resolution and follow-up instructions. Status: completed. Synthetic Gastroenterology review completed. Eating and drinking normally, adequate urine output and creatinine near baseline. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

#### Synthetic handover draft — not approved

Situation: Eating and drinking normally, adequate urine output and creatinine near baseline.
Background: Hypertension and CKD stage 2 with documented renal baseline. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Nephrology laboratory review; Admission laboratory assessment; Ultrasound KUB
Pending: Discharge completion after documented review; Nephrology follow-up appointment.
Continuity: Recovered prerenal acute kidney injury after gastroenteritis. Stable recovery; check the working-list stage before completing discharge. Confirm gastrointestinal symptom resolution and follow-up instructions.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Ready after synthetic clinician approval; final discharge completion is still pending.
Synthetic discharge working draft: Recovered prerenal acute kidney injury after gastroenteritis. Eating and drinking normally, adequate urine output and creatinine near baseline.
Current recovery assessment reviewed; the checklist below determines whether final approval is complete.
Follow-up: Nephrology; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Discharge completion after documented review — Dr. Devika Rao; due 2026-09-08T08:00:00.000Z.
- Nephrology follow-up appointment — Dr. Devika Rao; due 2026-09-15T04:00:00.000Z.

### Discharge working list

Status: ready. Target: 2026-09-08. Owner: Dr. Devika Rao.

Clinical clearance: Synthetic clinician fixture only. Documents checked: true.

Synthetic discharge working draft: Recovered prerenal acute kidney injury after gastroenteritis. Eating and drinking normally, adequate urine output and creatinine near baseline.
Current recovery assessment reviewed; the checklist below determines whether final approval is complete.
Follow-up: Nephrology; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0091 — Deepak Yadav, 27M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Severe dengue with plasma leakage and shock.

Allergies: Penicillin — rash reported; verification pending.

### Presentation and history

Fever followed by abdominal pain, lethargy and cold extremities during defervescence.

First hospital attendance; chronic history and medication list unverified. First hospital encounter; outside history is reported, not a retained hospital record.

Critical-state rationale: Critical at this synthetic assessment: Fever followed by abdominal pain, lethargy and cold extremities during defervescence. BP 80/64 mmHg, pulse 136/min, SpO₂ 94% on room air. Supporting results: Platelets 22 10^3/µL; Haematocrit 54 %; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: School administrator. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2026-09-08T02:00:00.000Z: IPD, active. Fever followed by abdominal pain, lethargy and cold extremities during defervescence.
  Record: 00000041-0000-4000-8000-000000091001

### Investigation history

#### 2026-09-08T04:30:00.000Z — Ultrasound abdomen and pleural spaces

Source: MockRIS; record: 00000047-0000-4000-8000-000000091001; order: 00000048-0000-4000-8000-000000091001.

Gallbladder wall oedema, ascites and small bilateral pleural effusions.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000091001; order: 00000043-0000-4000-8000-000000091001.

Synthetic results associated with this encounter. Platelets 22 10^3/µL (low); Haematocrit 54 % (high); Creatinine 1.9 mg/dL (high). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Internal Medicine → Nephrology: Assess renal perfusion and urine-output trends during the acute febrile illness. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fever followed by abdominal pain, lethargy and cold extremities during defervescence.
Background: First hospital attendance; chronic history and medication list unverified. First hospital encounter; outside history is reported, not a retained hospital record.
Recorded acuity: Critical at this synthetic assessment: Fever followed by abdominal pain, lethargy and cold extremities during defervescence. BP 80/64 mmHg, pulse 136/min, SpO₂ 94% on room air. Supporting results: Platelets 22 10^3/µL; Haematocrit 54 %; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: Platelets 22 10^3/µL; Haematocrit 54 %; Creatinine 1.9 mg/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fever followed by abdominal pain, lethargy and cold extremities during defervescence. Critical at this synthetic assessment: Fever followed by abdominal pain, lethargy and cold extremities during defervescence. BP 80/64 mmHg, pulse 136/min, SpO₂ 94% on room air. Supporting results: Platelets 22 10^3/µL; Haematocrit 54 %; Creatinine 1.9 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess renal perfusion and urine-output trends during the acute febrile illness. Pending: Repeat Platelets result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Severe dengue with plasma leakage and shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal perfusion and urine-output trends during the acute febrile illness.
Pending: Repeat Platelets result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Assess renal perfusion and urine-output trends during the acute febrile illness. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fever followed by abdominal pain, lethargy and cold extremities during defervescence.
Background: First hospital attendance; chronic history and medication list unverified. First hospital encounter; outside history is reported, not a retained hospital record.
Recent results: Internal Medicine laboratory review; Ultrasound abdomen and pleural spaces
Pending: Repeat Platelets result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Severe dengue with plasma leakage and shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal perfusion and urine-output trends during the acute febrile illness.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Platelets result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0092 — Chandrika Bose, 43F

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Severe falciparum malaria with cerebral involvement.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fever, altered consciousness and jaundice; admission note records a positive malaria smear.

Earlier anaemia review; recent travel recorded in current history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fever, altered consciousness and jaundice; admission note records a positive malaria smear. BP 88/54 mmHg, pulse 124/min, SpO₂ 92% on room air. Supporting results: Haemoglobin 7.1 g/dL; Platelets 46 10^3/µL; Creatinine 3.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Shopkeeper. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Internal Medicine assessment. Background: Earlier anaemia review; recent travel recorded in current history.
  Record: 00000041-0000-4000-8000-000000092001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000092002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000092003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000092004
- 2026-09-08T02:00:00.000Z: IPD, active. Fever, altered consciousness and jaundice; admission note records a positive malaria smear.
  Record: 00000041-0000-4000-8000-000000092005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000092001; order: 00000048-0000-4000-8000-000000092001.

Patchy bilateral interstitial opacities without focal lobar consolidation.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000092005; order: 00000043-0000-4000-8000-000000092005.

Synthetic results associated with this encounter. Haemoglobin 7.1 g/dL (low); Platelets 46 10^3/µL (low); Creatinine 3.2 mg/dL (high); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000092004; order: 00000043-0000-4000-8000-000000092004.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000092003; order: 00000043-0000-4000-8000-000000092003.

Synthetic results associated with this encounter. Haemoglobin 12.9 g/dL (normal); Creatinine 1 mg/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000092002; order: 00000043-0000-4000-8000-000000092002.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000092001; order: 00000043-0000-4000-8000-000000092001.

Synthetic results associated with this encounter. Haemoglobin 12.8 g/dL (normal); Creatinine 0.9 mg/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Internal Medicine → Nephrology: Assess renal deterioration and fluid balance during severe infection. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fever, altered consciousness and jaundice; admission note records a positive malaria smear.
Background: Earlier anaemia review; recent travel recorded in current history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fever, altered consciousness and jaundice; admission note records a positive malaria smear. BP 88/54 mmHg, pulse 124/min, SpO₂ 92% on room air. Supporting results: Haemoglobin 7.1 g/dL; Platelets 46 10^3/µL; Creatinine 3.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Haemoglobin 7.1 g/dL; Platelets 46 10^3/µL; Creatinine 3.2 mg/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fever, altered consciousness and jaundice; admission note records a positive malaria smear. Critical at this synthetic assessment: Fever, altered consciousness and jaundice; admission note records a positive malaria smear. BP 88/54 mmHg, pulse 124/min, SpO₂ 92% on room air. Supporting results: Haemoglobin 7.1 g/dL; Platelets 46 10^3/µL; Creatinine 3.2 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess renal deterioration and fluid balance during severe infection. Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Severe falciparum malaria with cerebral involvement. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal deterioration and fluid balance during severe infection.
Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Assess renal deterioration and fluid balance during severe infection. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fever, altered consciousness and jaundice; admission note records a positive malaria smear.
Background: Earlier anaemia review; recent travel recorded in current history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; Chest radiograph
Pending: Repeat Haemoglobin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Severe falciparum malaria with cerebral involvement. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal deterioration and fluid balance during severe infection.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Haemoglobin result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0093 — Santosh Naik, 46M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Leptospirosis with pulmonary haemorrhage and kidney injury; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fever, jaundice, haemoptysis and oliguria after water exposure.

Hypertension; floodwater exposure reported in the admission history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fever, jaundice, haemoptysis and oliguria after water exposure. BP 86/52 mmHg, pulse 128/min, SpO₂ 83% on room air. Supporting results: Bilirubin 9.4 mg/dL; Creatinine 4.2 mg/dL; Platelets 48 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired postal employee. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: IPD, completed. Initial Internal Medicine assessment. Background: Hypertension; floodwater exposure reported in the admission history.
  Record: 00000041-0000-4000-8000-000000093001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000093002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000093003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000093004
- 2026-09-08T02:00:00.000Z: IPD, active. Fever, jaundice, haemoptysis and oliguria after water exposure.
  Record: 00000041-0000-4000-8000-000000093005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest CT report

Source: MockRIS; record: 00000047-0000-4000-8000-000000093001; order: 00000048-0000-4000-8000-000000093001.

Extensive bilateral ground-glass and air-space opacities; haemorrhage considered clinically.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000093005; order: 00000043-0000-4000-8000-000000093005.

Synthetic results associated with this encounter. Bilirubin 9.4 mg/dL (high); Creatinine 4.2 mg/dL (high); Platelets 48 10^3/µL (low); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000093004; order: 00000043-0000-4000-8000-000000093004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000093003; order: 00000043-0000-4000-8000-000000093003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000093002; order: 00000043-0000-4000-8000-000000093002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000093001; order: 00000043-0000-4000-8000-000000093001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Internal Medicine → Nephrology: Review renal injury and electrolyte monitoring; confirmatory infection testing remains pending. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fever, jaundice, haemoptysis and oliguria after water exposure.
Background: Hypertension; floodwater exposure reported in the admission history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fever, jaundice, haemoptysis and oliguria after water exposure. BP 86/52 mmHg, pulse 128/min, SpO₂ 83% on room air. Supporting results: Bilirubin 9.4 mg/dL; Creatinine 4.2 mg/dL; Platelets 48 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: Bilirubin 9.4 mg/dL; Creatinine 4.2 mg/dL; Platelets 48 10^3/µL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fever, jaundice, haemoptysis and oliguria after water exposure. Critical at this synthetic assessment: Fever, jaundice, haemoptysis and oliguria after water exposure. BP 86/52 mmHg, pulse 128/min, SpO₂ 83% on room air. Supporting results: Bilirubin 9.4 mg/dL; Creatinine 4.2 mg/dL; Platelets 48 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review renal injury and electrolyte monitoring; confirmatory infection testing remains pending. Pending: Repeat Bilirubin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Leptospirosis with pulmonary haemorrhage and kidney injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal injury and electrolyte monitoring; confirmatory infection testing remains pending.
Pending: Repeat Bilirubin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Review renal injury and electrolyte monitoring; confirmatory infection testing remains pending. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fever, jaundice, haemoptysis and oliguria after water exposure.
Background: Hypertension; floodwater exposure reported in the admission history. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; Chest CT report
Pending: Repeat Bilirubin result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Leptospirosis with pulmonary haemorrhage and kidney injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal injury and electrolyte monitoring; confirmatory infection testing remains pending.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Bilirubin result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0094 — Anjali Biswas, 31F

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Scrub typhus with acute respiratory distress.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Persistent fever and progressive breathlessness with diffuse lung findings.

Prior thyroid-clinic visits; current note records rural travel and an eschar. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Persistent fever and progressive breathlessness with diffuse lung findings. BP 92/58 mmHg, pulse 126/min, SpO₂ 81% on room air. Supporting results: Platelets 68 10^3/µL; ALT 246 U/L; Creatinine 2.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Textile worker. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Internal Medicine assessment. Background: Prior thyroid-clinic visits; current note records rural travel and an eschar.
  Record: 00000041-0000-4000-8000-000000094001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000094002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000094003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000094004
- 2026-09-08T02:00:00.000Z: IPD, active. Persistent fever and progressive breathlessness with diffuse lung findings.
  Record: 00000041-0000-4000-8000-000000094005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000094001; order: 00000048-0000-4000-8000-000000094001.

Diffuse bilateral air-space opacities without a large pleural effusion.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000094005; order: 00000043-0000-4000-8000-000000094005.

Synthetic results associated with this encounter. Platelets 68 10^3/µL (low); ALT 246 U/L (high); Creatinine 2.1 mg/dL (high); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000094004; order: 00000043-0000-4000-8000-000000094004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000094003; order: 00000043-0000-4000-8000-000000094003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000094002; order: 00000043-0000-4000-8000-000000094002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000094001; order: 00000043-0000-4000-8000-000000094001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Internal Medicine → Nephrology: Review renal and electrolyte abnormalities during multisystem infection assessment. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Persistent fever and progressive breathlessness with diffuse lung findings.
Background: Prior thyroid-clinic visits; current note records rural travel and an eschar. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Persistent fever and progressive breathlessness with diffuse lung findings. BP 92/58 mmHg, pulse 126/min, SpO₂ 81% on room air. Supporting results: Platelets 68 10^3/µL; ALT 246 U/L; Creatinine 2.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: Platelets 68 10^3/µL; ALT 246 U/L; Creatinine 2.1 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Persistent fever and progressive breathlessness with diffuse lung findings. Critical at this synthetic assessment: Persistent fever and progressive breathlessness with diffuse lung findings. BP 92/58 mmHg, pulse 126/min, SpO₂ 81% on room air. Supporting results: Platelets 68 10^3/µL; ALT 246 U/L; Creatinine 2.1 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review renal and electrolyte abnormalities during multisystem infection assessment. Pending: Repeat Platelets result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Scrub typhus with acute respiratory distress. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal and electrolyte abnormalities during multisystem infection assessment.
Pending: Repeat Platelets result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Review renal and electrolyte abnormalities during multisystem infection assessment. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Persistent fever and progressive breathlessness with diffuse lung findings.
Background: Prior thyroid-clinic visits; current note records rural travel and an eschar. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; Chest radiograph
Pending: Repeat Platelets result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Scrub typhus with acute respiratory distress. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal and electrolyte abnormalities during multisystem infection assessment.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Platelets result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0095 — Vijay More, 58M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Severe community-acquired pneumonia with septic shock; Hypertension; Type 2 Diabetes.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Fever, productive cough, pleuritic pain and new confusion.

Type 2 Diabetes, hypertension and previous respiratory-infection follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Fever, productive cough, pleuritic pain and new confusion. BP 82/48 mmHg, pulse 130/min, SpO₂ 84% on room air. Supporting results: WBC 26.2 10^3/µL; Lactate 5.4 mmol/L; Creatinine 2.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Accounts assistant. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Internal Medicine assessment. Background: Type 2 Diabetes, hypertension and previous respiratory-infection follow-up.
  Record: 00000041-0000-4000-8000-000000095001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000095002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000095003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000095004
- 2026-09-08T02:00:00.000Z: IPD, active. Fever, productive cough, pleuritic pain and new confusion.
  Record: 00000041-0000-4000-8000-000000095005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000095001; order: 00000048-0000-4000-8000-000000095001.

Right lower-zone consolidation with additional left basal opacity.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000095005; order: 00000043-0000-4000-8000-000000095005.

Synthetic results associated with this encounter. WBC 26.2 10^3/µL (high); Lactate 5.4 mmol/L (high); Creatinine 2.6 mg/dL (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000095004; order: 00000043-0000-4000-8000-000000095004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000095003; order: 00000043-0000-4000-8000-000000095003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000095002; order: 00000043-0000-4000-8000-000000095002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000095001; order: 00000043-0000-4000-8000-000000095001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Metformin, 500 mg, oral, Twice daily; held. Home history; acute illness and renal suitability require review. This is not a prescribing instruction.

### Department coordination

Internal Medicine → Nephrology: Assess renal dysfunction and ongoing urine-output monitoring. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Fever, productive cough, pleuritic pain and new confusion.
Background: Type 2 Diabetes, hypertension and previous respiratory-infection follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Fever, productive cough, pleuritic pain and new confusion. BP 82/48 mmHg, pulse 130/min, SpO₂ 84% on room air. Supporting results: WBC 26.2 10^3/µL; Lactate 5.4 mmol/L; Creatinine 2.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: WBC 26.2 10^3/µL; Lactate 5.4 mmol/L; Creatinine 2.6 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Fever, productive cough, pleuritic pain and new confusion. Critical at this synthetic assessment: Fever, productive cough, pleuritic pain and new confusion. BP 82/48 mmHg, pulse 130/min, SpO₂ 84% on room air. Supporting results: WBC 26.2 10^3/µL; Lactate 5.4 mmol/L; Creatinine 2.6 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess renal dysfunction and ongoing urine-output monitoring. Pending: Repeat WBC result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Severe community-acquired pneumonia with septic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal dysfunction and ongoing urine-output monitoring.
Pending: Repeat WBC result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Assess renal dysfunction and ongoing urine-output monitoring. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Fever, productive cough, pleuritic pain and new confusion.
Background: Type 2 Diabetes, hypertension and previous respiratory-infection follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; Chest radiograph
Pending: Repeat WBC result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Severe community-acquired pneumonia with septic shock. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal dysfunction and ongoing urine-output monitoring.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat WBC result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0096 — Tara Sanyal, 37F

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Diabetic ketoacidosis with severe metabolic acidosis; Type 2 Diabetes.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Vomiting, deep breathing, dehydration and drowsiness; ketonaemia recorded in the note.

Type 2 Diabetes; recent missed medication during vomiting is reported. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Vomiting, deep breathing, dehydration and drowsiness; ketonaemia recorded in the note. BP 86/54 mmHg, pulse 134/min, SpO₂ 97% on room air. Supporting results: Glucose 486 mg/dL; Bicarbonate 7 mmol/L; Potassium 5.7 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Spouse provides history and keeps a folder of reports; home medicines still need verification.

Occupation: Homemaker. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Internal Medicine assessment. Background: Type 2 Diabetes; recent missed medication during vomiting is reported.
  Record: 00000041-0000-4000-8000-000000096001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000096002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000096003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000096004
- 2026-09-08T02:00:00.000Z: IPD, active. Vomiting, deep breathing, dehydration and drowsiness; ketonaemia recorded in the note.
  Record: 00000041-0000-4000-8000-000000096005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000096001; order: 00000048-0000-4000-8000-000000096001.

No focal consolidation; this image does not establish the metabolic diagnosis.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000096005; order: 00000043-0000-4000-8000-000000096005.

Synthetic results associated with this encounter. Glucose 486 mg/dL (high); Bicarbonate 7 mmol/L (low); Potassium 5.7 mmol/L (high); Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000096004; order: 00000043-0000-4000-8000-000000096004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000096003; order: 00000043-0000-4000-8000-000000096003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000096002; order: 00000043-0000-4000-8000-000000096002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000096001; order: 00000043-0000-4000-8000-000000096001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Metformin, 500 mg, oral, Twice daily; held. Home history; acute illness and renal suitability require review. This is not a prescribing instruction.

### Department coordination

Internal Medicine → Nephrology: Review renal function and electrolyte trends during the metabolic emergency. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Vomiting, deep breathing, dehydration and drowsiness; ketonaemia recorded in the note.
Background: Type 2 Diabetes; recent missed medication during vomiting is reported. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Vomiting, deep breathing, dehydration and drowsiness; ketonaemia recorded in the note. BP 86/54 mmHg, pulse 134/min, SpO₂ 97% on room air. Supporting results: Glucose 486 mg/dL; Bicarbonate 7 mmol/L; Potassium 5.7 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Spouse provides history and keeps a folder of reports; home medicines still need verification.
Available results: Glucose 486 mg/dL; Bicarbonate 7 mmol/L; Potassium 5.7 mmol/L; Creatinine 0.9 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Vomiting, deep breathing, dehydration and drowsiness; ketonaemia recorded in the note. Critical at this synthetic assessment: Vomiting, deep breathing, dehydration and drowsiness; ketonaemia recorded in the note. BP 86/54 mmHg, pulse 134/min, SpO₂ 97% on room air. Supporting results: Glucose 486 mg/dL; Bicarbonate 7 mmol/L; Potassium 5.7 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review renal function and electrolyte trends during the metabolic emergency. Pending: Repeat Glucose result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan. Decisions remain with the treating team.

#### Latest progress and pending work

Diabetic ketoacidosis with severe metabolic acidosis. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal function and electrolyte trends during the metabolic emergency.
Pending: Repeat Glucose result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Department question (Nephrology): Review renal function and electrolyte trends during the metabolic emergency. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Vomiting, deep breathing, dehydration and drowsiness; ketonaemia recorded in the note.
Background: Type 2 Diabetes; recent missed medication during vomiting is reported. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; Chest radiograph
Pending: Repeat Glucose result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan.
Continuity: Diabetic ketoacidosis with severe metabolic acidosis. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review renal function and electrolyte trends during the metabolic emergency.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

### Pending work

- Repeat Glucose result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

## F-DEMO-0097 — Baldev Arora, 74M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Hyperosmolar hyperglycaemic state with acute kidney injury; Hypertension; Type 2 Diabetes.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Polyuria and poor intake followed by marked dehydration and confusion.

Type 2 Diabetes and hypertension with earlier monitoring visits. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Polyuria and poor intake followed by marked dehydration and confusion. BP 84/50 mmHg, pulse 122/min, SpO₂ 95% on room air. Supporting results: Glucose 864 mg/dL; Serum osmolality 352 mOsm/kg; Creatinine 3.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.

Occupation: Bus conductor. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Internal Medicine assessment. Background: Type 2 Diabetes and hypertension with earlier monitoring visits.
  Record: 00000041-0000-4000-8000-000000097001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000097002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000097003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000097004
- 2026-09-08T02:00:00.000Z: IPD, active. Polyuria and poor intake followed by marked dehydration and confusion.
  Record: 00000041-0000-4000-8000-000000097005

### Investigation history

#### 2026-09-08T04:30:00.000Z — CT head without contrast

Source: MockRIS; record: 00000047-0000-4000-8000-000000097001; order: 00000048-0000-4000-8000-000000097001.

No acute intracranial haemorrhage; chronic small-vessel changes.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000097005; order: 00000043-0000-4000-8000-000000097005.

Synthetic results associated with this encounter. Glucose 864 mg/dL (high); Serum osmolality 352 mOsm/kg (high); Creatinine 3.3 mg/dL (high); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000097004; order: 00000043-0000-4000-8000-000000097004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000097003; order: 00000043-0000-4000-8000-000000097003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000097002; order: 00000043-0000-4000-8000-000000097002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000097001; order: 00000043-0000-4000-8000-000000097001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; held. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Metformin, 500 mg, oral, Twice daily; held. Home history; acute illness and renal suitability require review. This is not a prescribing instruction.

### Department coordination

Internal Medicine → Nephrology: Assess renal recovery and electrolyte trends alongside primary-team care. Status: accepted. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Polyuria and poor intake followed by marked dehydration and confusion.
Background: Type 2 Diabetes and hypertension with earlier monitoring visits. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Polyuria and poor intake followed by marked dehydration and confusion. BP 84/50 mmHg, pulse 122/min, SpO₂ 95% on room air. Supporting results: Glucose 864 mg/dL; Serum osmolality 352 mOsm/kg; Creatinine 3.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Adult daughter accompanies the patient and requests written investigation and follow-up instructions.
Available results: Glucose 864 mg/dL; Serum osmolality 352 mOsm/kg; Creatinine 3.3 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Polyuria and poor intake followed by marked dehydration and confusion. Critical at this synthetic assessment: Polyuria and poor intake followed by marked dehydration and confusion. BP 84/50 mmHg, pulse 122/min, SpO₂ 95% on room air. Supporting results: Glucose 864 mg/dL; Serum osmolality 352 mOsm/kg; Creatinine 3.3 mg/dL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Assess renal recovery and electrolyte trends alongside primary-team care. Pending: Repeat Glucose result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Hyperosmolar hyperglycaemic state with acute kidney injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal recovery and electrolyte trends alongside primary-team care.
Pending: Repeat Glucose result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Nephrology): Assess renal recovery and electrolyte trends alongside primary-team care. Status: accepted. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Polyuria and poor intake followed by marked dehydration and confusion.
Background: Type 2 Diabetes and hypertension with earlier monitoring visits. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; CT head without contrast
Pending: Repeat Glucose result and source review; Nephrology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Hyperosmolar hyperglycaemic state with acute kidney injury. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Assess renal recovery and electrolyte trends alongside primary-team care.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Working summary has not yet been written.

### Pending work

- Repeat Glucose result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Nephrology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: planned. Target: 2026-09-15. Owner: Dr. Ananya Mehta.

Clinical clearance: Not approved. Documents checked: false.

Summary not yet written.

## F-DEMO-0098 — Falguni Doshi, 50F

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Myasthenic crisis with respiratory failure.

Allergies: Penicillin — rash reported; verification pending.

### Presentation and history

Progressive bulbar weakness and shallow breathing after a febrile illness.

Established myasthenia gravis with neuromuscular follow-up recorded in medical notes. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Progressive bulbar weakness and shallow breathing after a febrile illness. BP 108/68 mmHg, pulse 118/min, SpO₂ 89% on room air. Supporting results: PaCO2 62 mmHg; WBC 14.3 10^3/µL; Potassium 4.1 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.

Context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.

Occupation: Retired teacher. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Internal Medicine assessment. Background: Established myasthenia gravis with neuromuscular follow-up recorded in medical notes.
  Record: 00000041-0000-4000-8000-000000098001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000098002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000098003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000098004
- 2026-09-08T02:00:00.000Z: IPD, active. Progressive bulbar weakness and shallow breathing after a febrile illness.
  Record: 00000041-0000-4000-8000-000000098005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000098001; order: 00000048-0000-4000-8000-000000098001.

Low lung volumes with bibasal atelectatic change.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000098005; order: 00000043-0000-4000-8000-000000098005.

Synthetic results associated with this encounter. PaCO2 62 mmHg (high); WBC 14.3 10^3/µL (high); Potassium 4.1 mmol/L (normal); Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000098004; order: 00000043-0000-4000-8000-000000098004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000098003; order: 00000043-0000-4000-8000-000000098003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000098002; order: 00000043-0000-4000-8000-000000098002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000098001; order: 00000043-0000-4000-8000-000000098001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

No reconciled medication record supplied.

### Department coordination

Internal Medicine → Cardiology: Review rhythm monitoring and comorbidity while respiratory and neurology assessments are coordinated. Status: in_progress. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Progressive bulbar weakness and shallow breathing after a febrile illness.
Background: Established myasthenia gravis with neuromuscular follow-up recorded in medical notes. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Progressive bulbar weakness and shallow breathing after a febrile illness. BP 108/68 mmHg, pulse 118/min, SpO₂ 89% on room air. Supporting results: PaCO2 62 mmHg; WBC 14.3 10^3/µL; Potassium 4.1 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Irregular working hours complicate weekday reviews; medication nonadherence is not assumed.
Available results: PaCO2 62 mmHg; WBC 14.3 10^3/µL; Potassium 4.1 mmol/L; Creatinine 0.9 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Progressive bulbar weakness and shallow breathing after a febrile illness. Critical at this synthetic assessment: Progressive bulbar weakness and shallow breathing after a febrile illness. BP 108/68 mmHg, pulse 118/min, SpO₂ 89% on room air. Supporting results: PaCO2 62 mmHg; WBC 14.3 10^3/µL; Potassium 4.1 mmol/L. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review rhythm monitoring and comorbidity while respiratory and neurology assessments are coordinated. Pending: Repeat PaCO2 result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Myasthenic crisis with respiratory failure. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review rhythm monitoring and comorbidity while respiratory and neurology assessments are coordinated.
Pending: Repeat PaCO2 result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Cardiology): Review rhythm monitoring and comorbidity while respiratory and neurology assessments are coordinated. Status: in_progress. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Progressive bulbar weakness and shallow breathing after a febrile illness.
Background: Established myasthenia gravis with neuromuscular follow-up recorded in medical notes. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; Chest radiograph
Pending: Repeat PaCO2 result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Myasthenic crisis with respiratory failure. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review rhythm monitoring and comorbidity while respiratory and neurology assessments are coordinated.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Myasthenic crisis with respiratory failure. Progressive bulbar weakness and shallow breathing after a febrile illness.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Internal Medicine; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat PaCO2 result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Cardiology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Ananya Mehta.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Myasthenic crisis with respiratory failure. Progressive bulbar weakness and shallow breathing after a febrile illness.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Internal Medicine; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0099 — Pankaj Lohia, 62M

Department: Internal Medicine. Acuity at snapshot: critical.

Conditions: Acute severe asthma with hypercapnic respiratory failure; Hypertension.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Severe breathlessness, inability to complete sentences and increasing exhaustion.

Asthma and hypertension with previous exacerbation records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Critical at this synthetic assessment: Severe breathlessness, inability to complete sentences and increasing exhaustion. BP 106/64 mmHg, pulse 138/min, SpO₂ 85% on room air. Supporting results: PaCO2 58 mmHg; Potassium 3.2 mmol/L; WBC 12.8 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.

Context: Relative helps with communication with patient consent; preferred-language instructions are requested.

Occupation: Small business owner. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Internal Medicine assessment. Background: Asthma and hypertension with previous exacerbation records.
  Record: 00000041-0000-4000-8000-000000099001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000099002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000099003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000099004
- 2026-09-08T02:00:00.000Z: IPD, active. Severe breathlessness, inability to complete sentences and increasing exhaustion.
  Record: 00000041-0000-4000-8000-000000099005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Chest radiograph

Source: MockRIS; record: 00000047-0000-4000-8000-000000099001; order: 00000048-0000-4000-8000-000000099001.

Hyperinflated lungs without focal infiltrate or pneumothorax.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000099005; order: 00000043-0000-4000-8000-000000099005.

Synthetic results associated with this encounter. PaCO2 58 mmHg (high); Potassium 3.2 mmol/L (low); WBC 12.8 10^3/µL (high); Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.1 g/dL (low). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000099004; order: 00000043-0000-4000-8000-000000099004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000099003; order: 00000043-0000-4000-8000-000000099003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 13.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000099002; order: 00000043-0000-4000-8000-000000099002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000099001; order: 00000043-0000-4000-8000-000000099001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 13.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.

### Department coordination

Internal Medicine → Cardiology: Review tachycardia and electrolyte-related rhythm concerns alongside respiratory care. Status: received. Response pending.

### Current notes and handover draft

#### Current clinical assessment

Severe breathlessness, inability to complete sentences and increasing exhaustion.
Background: Asthma and hypertension with previous exacerbation records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Critical at this synthetic assessment: Severe breathlessness, inability to complete sentences and increasing exhaustion. BP 106/64 mmHg, pulse 138/min, SpO₂ 85% on room air. Supporting results: PaCO2 58 mmHg; Potassium 3.2 mmol/L; WBC 12.8 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.
History source and context: Relative helps with communication with patient consent; preferred-language instructions are requested.
Available results: PaCO2 58 mmHg; Potassium 3.2 mmol/L; WBC 12.8 10^3/µL; Creatinine 0.9 mg/dL; Haemoglobin 13.8 g/dL; Albumin 3.1 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. Senior team assessment is documented. Acute resuscitation, administration records and full critical-care charting are intentionally not represented; this is not a complete treatment record.

#### Ward round — current admission review

Findings: Severe breathlessness, inability to complete sentences and increasing exhaustion. Critical at this synthetic assessment: Severe breathlessness, inability to complete sentences and increasing exhaustion. BP 106/64 mmHg, pulse 138/min, SpO₂ 85% on room air. Supporting results: PaCO2 58 mmHg; Potassium 3.2 mmol/L; WBC 12.8 10^3/µL. Senior assessment is required; a working-list entry does not mean readiness.
Plan: Review tachycardia and electrolyte-related rhythm concerns alongside respiratory care. Pending: Repeat PaCO2 result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance. Decisions remain with the treating team.

#### Latest progress and pending work

Acute severe asthma with hypercapnic respiratory failure. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review tachycardia and electrolyte-related rhythm concerns alongside respiratory care.
Pending: Repeat PaCO2 result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Department question (Cardiology): Review tachycardia and electrolyte-related rhythm concerns alongside respiratory care. Status: received. No completed specialist response available.

#### Synthetic handover draft — not approved

Situation: Severe breathlessness, inability to complete sentences and increasing exhaustion.
Background: Asthma and hypertension with previous exacerbation records. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; Chest radiograph
Pending: Repeat PaCO2 result and source review; Cardiology assessment and documented response; Senior review of physiology and escalation plan; Discharge planning only — current critical illness prevents clinical clearance.
Continuity: Acute severe asthma with hypercapnic respiratory failure. Critical state remains unresolved; do not mistake anticipatory discharge planning for approval. Review tachycardia and electrolyte-related rhythm concerns alongside respiratory care.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Future planning only. Acute investigations and clinical review remain pending. Patient must stay in the active clinical workflow.
Synthetic discharge working draft: Acute severe asthma with hypercapnic respiratory failure. Severe breathlessness, inability to complete sentences and increasing exhaustion.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Internal Medicine; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Repeat PaCO2 result and source review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Cardiology assessment and documented response — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Senior review of physiology and escalation plan — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Discharge planning only — current critical illness prevents clinical clearance — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.

### Discharge working list

Status: in_progress. Target: 2026-09-15. Owner: Dr. Ananya Mehta.

Clinical clearance: Not approved. Documents checked: false.

Synthetic discharge working draft: Acute severe asthma with hypercapnic respiratory failure. Severe breathlessness, inability to complete sentences and increasing exhaustion.
Anticipatory planning only. Critical illness is ongoing; there is no clinical clearance and no discharge decision.
Follow-up: Internal Medicine; specific appointment and instructions must be verified before the patient leaves.

## F-DEMO-0100 — Lata Dhamija, 60F

Department: Internal Medicine. Acuity at snapshot: noncritical.

Conditions: Recovered uncomplicated cellulitis admission; Hypertension; Type 2 Diabetes.

Allergies: Not documented; do not equate with no known allergy.

### Presentation and history

Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake.

Type 2 Diabetes and hypertension with regular outpatient follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.

Critical-state rationale: Noncritical recovery at this assessment: Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake. Stable recorded physiology; final discharge status is documented separately.

Context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.

Occupation: Office assistant. Preferred language: Bengali, Hindi.

### Hospital encounters

- 2025-07-15T02:00:00.000Z: OPD, completed. Initial Internal Medicine assessment. Background: Type 2 Diabetes and hypertension with regular outpatient follow-up.
  Record: 00000041-0000-4000-8000-000000100001
- 2026-03-12T02:00:00.000Z: OPD, completed. Follow-up of the recorded background; symptoms and available medication history reviewed.
  Record: 00000041-0000-4000-8000-000000100002
- 2026-07-10T02:00:00.000Z: OPD, completed. Interval Internal Medicine review with nutrition and laboratory context; current acute findings were not recorded at this visit.
  Record: 00000041-0000-4000-8000-000000100003
- 2026-08-25T02:00:00.000Z: OPD, completed. Most recent outpatient clinic review of existing records and follow-up arrangements.
  Record: 00000041-0000-4000-8000-000000100004
- 2026-09-05T02:00:00.000Z: IPD, active. Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake.
  Record: 00000041-0000-4000-8000-000000100005

### Investigation history

#### 2026-09-08T04:30:00.000Z — Lower-limb soft-tissue ultrasound

Source: MockRIS; record: 00000047-0000-4000-8000-000000100001; order: 00000048-0000-4000-8000-000000100001.

Mild subcutaneous oedema without a drainable collection.
Synthetic report text only; no DICOM acquisition or diagnostic image is supplied.

#### 2026-09-08T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000100005; order: 00000043-0000-4000-8000-000000100005.

Synthetic results associated with this encounter. WBC 7.9 10^3/µL (normal); CRP 12 mg/L (high); Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.7 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-09-05T03:30:00.000Z — Admission laboratory assessment

Source: MockLIS; record: 00000064-0000-4000-8000-000000100001; order: 00000065-0000-4000-8000-000000100001.

Synthetic admission results, before the separate recovery report: WBC 14.8 10^3/µL; CRP 86 mg/L; Creatinine 1.2 mg/dL.

#### 2026-08-25T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000100004; order: 00000043-0000-4000-8000-000000100004.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 3.8 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-07-10T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000100003; order: 00000043-0000-4000-8000-000000100003.

Synthetic results associated with this encounter. Creatinine 1 mg/dL (normal); Haemoglobin 12.9 g/dL (normal); Albumin 3.9 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2026-03-12T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000100002; order: 00000043-0000-4000-8000-000000100002.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

#### 2025-07-15T03:30:00.000Z — Internal Medicine laboratory review

Source: MockLIS; record: 00000042-0000-4000-8000-000000100001; order: 00000043-0000-4000-8000-000000100001.

Synthetic results associated with this encounter. Creatinine 0.9 mg/dL (normal); Haemoglobin 12.8 g/dL (normal); Albumin 4.1 g/dL (normal). Laboratory reference flags are distinct from patient acuity and individual treatment targets.

### Medication reconciliation

- Amlodipine, 5 mg, oral, Once daily; documented_home. Synthetic home-list entry only; current administration and discharge prescribing require clinician reconciliation.
- Metformin, 500 mg, oral, Twice daily; documented_home. Home history; acute illness and renal suitability require review. This is not a prescribing instruction.

### Department coordination

Internal Medicine → Orthopaedics: Confirm no deep musculoskeletal concern and document outpatient review arrangements. Status: completed. Synthetic Orthopaedics review completed. Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

### Current notes and handover draft

#### Current clinical assessment

Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake.
Background: Type 2 Diabetes and hypertension with regular outpatient follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recorded acuity: Noncritical recovery at this assessment: Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake. Stable recorded physiology; final discharge status is documented separately.
History source and context: Family can assist after discharge, but travel and support arrangements have not yet been confirmed.
Available results: WBC 7.9 10^3/µL; CRP 12 mg/L; Creatinine 0.9 mg/dL; Haemoglobin 12.8 g/dL; Albumin 3.7 g/dL.
Assessment is a synthetic authored scenario, not an AI diagnosis. No critical state is asserted.

#### Admission assessment and hospital course

Admission with fever and increasing leg erythema. Inflammatory markers are elevated; serial clinical review is planned. Drug administration records are not represented in this fixture.

#### Ward round — current admission review

Findings: Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake. Noncritical recovery at this assessment: Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake. Stable recorded physiology; final discharge status is documented separately.
Plan: Confirm no deep musculoskeletal concern and document outpatient review arrangements. Pending: Discharge completion after documented review; Internal Medicine follow-up appointment. Decisions remain with the treating team.

#### Latest progress and pending work

Recovered uncomplicated cellulitis admission. Stable recovery; check the working-list stage before completing discharge. Confirm no deep musculoskeletal concern and document outpatient review arrangements.
Pending: Discharge completion after documented review; Internal Medicine follow-up appointment.
Department question (Orthopaedics): Confirm no deep musculoskeletal concern and document outpatient review arrangements. Status: completed. Synthetic Orthopaedics review completed. Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake. No unresolved issue within this consultation is recorded; primary-team discharge approval remains separate.

#### Synthetic handover draft — not approved

Situation: Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake.
Background: Type 2 Diabetes and hypertension with regular outpatient follow-up. Four previous hospital visits are retained. Current acute findings must not be backdated into earlier encounters.
Recent results: Internal Medicine laboratory review; Admission laboratory assessment; Lower-limb soft-tissue ultrasound
Pending: Discharge completion after documented review; Internal Medicine follow-up appointment.
Continuity: Recovered uncomplicated cellulitis admission. Stable recovery; check the working-list stage before completing discharge. Confirm no deep musculoskeletal concern and document outpatient review arrangements.
This is a seeded VDoc draft, not evidence of a Fortis handover system.

#### Discharge working-list review (synthetic)

Ready after synthetic clinician approval; final discharge completion is still pending.
Synthetic discharge working draft: Recovered uncomplicated cellulitis admission. Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake.
Current recovery assessment reviewed; the checklist below determines whether final approval is complete.
Follow-up: Internal Medicine; specific appointment and instructions must be verified before the patient leaves.

### Pending work

- Discharge completion after documented review — Dr. Ananya Mehta; due 2026-09-08T08:00:00.000Z.
- Internal Medicine follow-up appointment — Dr. Ananya Mehta; due 2026-09-15T04:00:00.000Z.

### Discharge working list

Status: ready. Target: 2026-09-08. Owner: Dr. Ananya Mehta.

Clinical clearance: Synthetic clinician fixture only. Documents checked: true.

Synthetic discharge working draft: Recovered uncomplicated cellulitis admission. Afebrile with receding leg erythema, comfortable mobilisation and normal oral intake.
Current recovery assessment reviewed; the checklist below determines whether final approval is complete.
Follow-up: Internal Medicine; specific appointment and instructions must be verified before the patient leaves.

## Reference provenance

- [https://www.icmr.gov.in/standard-treatment-workflows-stws](https://www.icmr.gov.in/standard-treatment-workflows-stws): Indian clinical topic catalogue consulted; not a source of patient records or validation of generated values.
- [https://clinicalestablishments.mohfw.gov.in/en/standard-treatment-guidelines](https://clinicalestablishments.mohfw.gov.in/en/standard-treatment-guidelines): Indian specialty/trauma guideline catalogue consulted; no real patient records imported.
- [https://www.icmr.gov.in/icmrobject/uploads/STWs/1768823342_cardiology_1-4.pdf](https://www.icmr.gov.in/icmrobject/uploads/STWs/1768823342_cardiology_1-4.pdf): NSTEMI clinical reference consulted. Synthetic scenario is not a treatment protocol.
