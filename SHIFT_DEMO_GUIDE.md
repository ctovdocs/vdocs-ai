# Ten-shift demonstration dataset

## Save to the live demo database

Sign in to VDoc and open **Handovers → Shift handovers**. Missing demo fixtures are now imported automatically, once, through the authenticated `save_demo_workflow` RPC. The page shows preparation progress or a persistent error with Retry; it never silently pretends that a database save succeeded. No service-role key is needed in the browser.

This workspace has only the Supabase URL and publishable key, not a CLI-authenticated user or database administration credential. The fixtures have been generated and tested locally; they have **not** been inserted into the hosted database from the CLI. The authenticated action above performs that insertion.

The importer preserves existing patient records, notes, edits and handovers. A saved marker prevents duplicate imports, including replays after the first import. If fewer than 12 eligible synthetic IPD patients exist in any of the three departments, the complete import fails without partial changes. Load the 100-patient cohort first.

## Included data

The importer does not wait for the device clock to reach the authored fixture dates. These are fixed-date synthetic scenarios, not real-time events. The import audit retains the actual command timestamp; ordinary clinical shift approval still respects its shift-end checks.

- 10 packets, 12 patients per packet: 10 primary-department patients and 2 incoming consultations from another department. Patients repeat across shifts, as on a ward. Incoming consults do not transfer the primary admission or send the patient for discharge.
- Internal Medicine: four shifts. Cardiology and Nephrology: three shifts each.
- Alternating outgoing/incoming clinicians, including Dr. Ananya Mehta, with eight-hour shift windows from 8 September 2026, 07:30 IST through 9 September 2026, 15:30 IST. These are authored coverage examples, not actual Fortis staffing patterns.
- 240 round notes: initial and follow-up rounds with original authors and timestamps.
- 120 laboratory orders and 40 imaging orders; 40 synthetic laboratory reports and 20 imaging report placeholders.
- 140 requests/referrals, including 20 incoming consultation fixtures, with received, in-progress and completed examples.
- Six acknowledged packets, two approved packets awaiting receipt, and two drafts with seven of twelve patients reviewed.

Laboratory repeats reuse available baseline observations and are labelled as synthetic, not evidence of recovery. Imaging entries are explicitly placeholders, not radiologist interpretations. Seeded approvals and acknowledgements are fictional workflow examples—not real clinician signatures or medically validated plans.

## Suggested presentation

1. Open the archive, wait for automatic fixture preparation and reload to demonstrate database persistence.
2. Choose an outgoing doctor and **Last 7 days**; show the shift count and dates. Search by patient name, UHID, `Gastroenterology`, or `follow-up`.
3. Open an acknowledged packet. Switch between patients and inspect **Captured records**; filter notes to compare two rounds and their authors/times.
4. Open the latest Internal Medicine draft. Select a patient marked **Needs review**, edit the next actions and escalation text, tick review, and save. Reload to show the edit is retained.
5. Open the live chart in a new tab and save a Doctor's Note or place a lab order. Return to the draft: source changes should require refresh and re-review before approval.
6. Refresh sources. Edited summaries remain, but review flags reset. Explain why clinicians must reconcile new information rather than blindly reuse a generated summary.
7. Open an already-approved packet, enter a receiver readback, and acknowledge it. Show the incoming doctor, time and readback in the archived packet.
8. Use **New shift packet** to demonstrate selecting the next coverage window and multiple admitted patients. Existing packets are never overwritten.

Archive filters, dates, page number and page size are kept in the URL. Open a packet and use **Back to filtered shifts** to retain them. New packets offer **Select all department & referred patients**. Discharge status is not a requirement for rounds or handover.

## Files and regeneration

`data/generated/shift-demo.json` contains the generated packet snapshots and added clinical fixtures for inspection. Regenerate with `npm run data:shifts`. It is an export, not a SQL migration; import through the authenticated VDoc action so existing live edits are respected and chart snapshots use the current database records.
