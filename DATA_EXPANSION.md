# Additional 50 patients and 20 discharge fixtures

## Dataset

Synthetic internal-demo cases only. No patient records were downloaded, and no generated case has medical sign-off. The [ICMR workflow catalogue](https://www.icmr.gov.in/standard-treatment-workflows-stws) was consulted for specialty/topic context, not used as a source of real patient data or validation of these invented values.

| Group | Patients | Critical now | Repeat visitors | First hospital visits |
|---|---:|---:|---:|---:|
| Existing, preserved | 50 | 43 | 35 | 15 |
| Added, UHIDs 0051–0100 | 50 | 45 | 45 | 5 |
| Total | 100 | 88 | 80 | 20 |

The requested 90% critical mix applies to the added group, not hospital prevalence. All added cases are IPD: 45 current critical/HDU cases and five stable recovery admissions. Each of Cardiology, Gastroenterology, Orthopaedics, Nephrology and Internal Medicine receives ten new patients with distinct primary scenario titles.

Repeat visitors have four historical hospital encounters and a current admission, linked laboratory history, imaging text, current vitals, dated clinician notes, handover context, department questions and pending work. Acute-only measurements are not copied into past visits. First-time visitors have only the current hospital encounter, reported outside history and no invented hospital immunization records.

The five recovery admissions have separate admission and recovery reports three days apart. Admission notes do not reference future outcomes. Medication data is limited home/reconciliation context, not a complete acute treatment or administration chart. Missing records are not filled with guessed prescriptions, images or negative histories.

Snapshot for new records: 8 September 2026, 13:00 IST. Original records retain their earlier dates. The scenario clock is fixed; date filters are relative to the actual day, so use All dates when demonstrating on another day.

## Discharge scenarios

There are **20 added active entries**, representing explicitly initiated synthetic discharge processes, plus historical discharges. Generic discharge tasks or clinical readiness do not automatically create a working-list entry. Existing edited discharge records are retained.

| New UHIDs | Status | Meaning |
|---|---|---|
| 0057, 0067, 0077, 0087, 0097 | Planned | Summary not started; critical illness, results and specialist review pending |
| 0058–0059, 0068–0069, 0078–0079, 0088–0089, 0098–0099 | In progress | Anticipatory paperwork only; ongoing critical illness, no clearance |
| 0060 — Ritu Malhotra | In progress | Discharge summary and documents need completion |
| 0070 — Zarina Contractor | In progress | Documents and patient instructions pending |
| 0080 — Anita Fernandes | In progress | Final consultant approval missing |
| 0090 — Mohan Subramaniam | Ready | Stable recovery with synthetic clinician review; final completion pending |
| 0100 — Lata Dhamija | Ready | Stable recovery with synthetic clinician review; final completion pending |

Critical planning targets are provisional future dates, not a discharge commitment. No critical patient has clinical clearance or ready status. Ready fixtures have reviewed reports/responses and no outstanding discharge blockers. Their completed checklist is fictional workflow data, not medical validation of the generated case.

## Installation and persistence

### Local browser demo

- Reload the application. Missing patient IDs 0051–0100 are merged under the existing browser workflow lock.
- Existing patients, completed discharges, clinical edits and audit history are retained. Applying the expansion again does not duplicate or reset patients.
- Separate doctor-note, voice preference, AI brief and chat storage keys are untouched.
- Workflow data is compressed before saving; previous plain-JSON snapshots remain readable. Use a modern localhost/HTTPS browser supporting Web Locks and Compression Streams.
- Export or back up demo data before using an older application build: old code cannot decode the new compressed envelope. Compression is storage optimization, not encryption or a production security control.

### Existing Supabase demo

1. Ensure the foundation, longitudinal and workflow migrations (001–003) are present.
2. Run `npm run data:export` to regenerate the current artifacts.
3. Execute `data/generated/expansion.sql` in the dedicated demo project's SQL editor.
4. Refresh VDoc and source portals; normal polling reads the updated shared snapshot.

The additive script inserts new source-table rows with conflict protection and appends only missing patients to an existing workflow snapshot inside a transaction and advisory lock. Existing notes, requests, reports, discharges and audit entries are retained. When no snapshot exists, the application initializes from the newly seeded database instead.

Do not use the full `seed.sql` to update an existing edited source dataset: it upserts source fixtures. Use `expansion.sql` for the additive install. No hosted SQL or live database verification was performed for this change.

## Exported files

- `data/generated/cohort.json`: full clinical dataset including seeded discharge-review notes.
- `data/generated/patients/`: one JSON and Markdown casebook per UHID; new patients include discharge fixture details where applicable.
- `data/generated/workflow-expansion.json`: new-patient workflow payload, reviewed reports and discharge stages.
- `data/generated/discharge-fixtures.json`: twenty new working-list records.
- `data/generated/CASEBOOK.md`, CSV tables and `manifest.json`: readable catalogue and actual counts.
- `data/generated/expansion.sql`: additive source/snapshot install.

Current export totals: 420 encounters, 420 laboratory reports, 1,330 laboratory observations, 99 imaging reports, 814 notes, 104 requests and 2,246 timeline events. Imaging contains synthetic report text only, never fabricated diagnostic images.

## Validation

Automated checks cover cohort size/ratios, unique new case titles, department distribution, source references, new-record chronology, first-visit history boundaries, discharge stage/blocker consistency, stable discharge completion, idempotent additive merging, preservation of old edits and notes/chat keys, and compressed/legacy storage round trips.

No Playwright or browser automation was run. Clinical realism still requires a doctor's review; these fixtures deliberately omit full ICU charting, drug administration and many specialist systems.
