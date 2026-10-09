# Cashless claims worklist demo

Open **Cashless claims** or `/app/claims`. The starting worklist contains **10 distinct patients: 3 early, 5 in progress and 2 completed claims**. Search by patient, UHID, claim or insurer; use the In progress / Completed tabs and stage filter. Every record opens its own documents, editable form, review trail and next action. The compact toolbar shows counts inline; the next responsible team is listed per record. The audit timeline supports newest/oldest order and shows full IST timestamps, actor names and evidence links. Each link opens a document drawer with the source, saved contents and related audit events. Payment views include the simulated receiving bank and UTR. Documents, correspondence and immutable submitted packets are organised in separate tabs.

## Starting records

| Patient | UHID | Starting stage |
|---|---|---|
| Mohan Subramaniam | F-DEMO-0090 | Ready to prepare |
| Ritu Malhotra | F-DEMO-0060 | Investigation attachment pending |
| Zarina Contractor | F-DEMO-0070 | Clinical and billing review |
| Anita Fernandes | F-DEMO-0080 | Insurer pharmacy query |
| Lata Dhamija | F-DEMO-0100 | Final authorisation; settlement pending |
| Meenal Vyas | F-DEMO-0052 | Completed and reconciled |
| Vivek Bedi | F-DEMO-0063 | Payment received; accounts must reconcile |
| Shweta Kulkarni | F-DEMO-0074 | Settlement packet sent; awaiting payment |
| Rohit Bhargava | F-DEMO-0085 | Submitted; waiting on the insurer |
| Tara Sanyal | F-DEMO-0096 | Completed and reconciled |

The two completed cases (and the in-progress cases for Vivek, Shweta and Rohit) represent separate, explicitly synthetic historical admissions. They do not assert that these patients' current clinical admissions are discharged or their current illnesses resolved. Their episode IDs and mock clinical attachments are isolated from the live clinical workflow.

## Full pitch walkthrough

1. Open Mohan and **Prepare claim**. The assistant maps the current discharge summary and admission-linked report, fills the hospital claim form, and assembles policy, declaration, summary, bill, treatment record and pre-authorisation.
2. Inspect the available investigation and click **Attach matching report**.
3. Expand the prefilled form to inspect policy/member details, room category, treating doctor, diagnosis, procedure and admission type. Saved changes require fresh internal reviews. Unsaved form edits block workflow actions.
4. **Record clinical review** and **Record billing review**, inspect/edit the narrative, tick the final review checkbox, and **Approve & submit claim**. The saved packet and receipt are linked from the timeline.
5. Expand **Presenter controls** and **Send insurer query**. Then **Prepare response**, inspect the pharmacy bill, tick the review checkbox and **Approve & send response**. Query amounts and document references belong to the selected case.
6. Use **Issue final authorisation** in presenter controls. It can follow a complete initial submission directly, or a reviewed query response. Approval does not mark the claim paid or complete.
7. **Submit settlement packet**. A snapshot of all supporting documents and a settlement acknowledgement are saved.
8. Use **Simulate insurer payment** in presenter controls. This records a mock remittance advice and unique demo UTR.
9. Review the bill, remittance and patient liability. **Confirm demo receipts & reconcile** records the synthetic patient receipt and closes the claim only when the amounts balance. Clinical discharge remains unchanged.
10. Return to the worklist to see the updated status. Open a pre-completed claim to inspect its full chronological history, internal reviews, authorisation, settlement packet, remittance and zero-balance accounts closure.

Documents, letters and submitted packets can be downloaded as text files. They are explicitly synthetic and are not payer-issued PDFs.

## Documents and financial assumptions

Each case has a prefilled hospital claim form, policy/member card, mock patient declaration, discharge summary, itemised final bill, investigation report, pharmacy breakup, treatment/prescription attachment and initial pre-authorisation. Selected surgical historical cases also have a mock operative note. Documents retain patient/episode identifiers and source references; submitted snapshots remain immutable.

Billing, insurance membership and signatures are demo fixtures. No real patient consent or bank payment is implied. Deductions vary by case. The illustrative policies have no additional co-pay, deductible or TDS; no insurer-specific adjudication is implemented. Clinical attachments added for the pitch are labelled mock documents and do not create medication orders or clinical sign-off in VDoc.

The initial stage for all cases is after provisional pre-authorisation. The demo does not implement admission eligibility checking or the initial pre-authorisation request loop; it includes their synthetic history and documents. Payer-specific forms, query types, document requirements, payment adjustments, rejection/appeals and production connections are pilot customisation work.

## Persistence and repeatability

No additional hosting, model service or credentials are required. Claims save in this browser, including when clinical records are loaded from Supabase; they do not sync across devices. Existing VDoc authentication still applies.

- Changes affect only the selected claim; stale-window writes are rejected and supported browsers serialize writes with Web Locks.
- Existing work from the original single-case demo is preserved and migrated alongside nine additional records. The original storage key is retained.
- **Reset this claim** returns only that claim to document preparation.
- The list's **Restore 10 demo records** action resets the whole claims worklist to the starting mix (3 early, 5 in progress, 2 completed) after confirmation. It preserves clinical records, discharge work, notes and chats.
- Completed counts increase as active cases are finished. Restore the starting worklist before repeating the pitch.
- Missing source records and storage failures surface errors rather than a false successful submission.

## Validation

`npm run check` runs typecheck, lint, unit tests and production build. Tests cover ten distinct patients/five completed cases, financial reconciliation, complete evidence histories, independent claim edits, required reviews, changed forms/sources, duplicate submissions, direct and queried authorisations, settlement sequencing, migration, reload persistence, stale writes and reset isolation. Browser smoke tests remain opt-in under the repository README.

## Workflow references

- [HDFC ERGO cashless process](https://www.hdfcergo.com/claim/register-health-insurance-claim/cashless-claims): hospital pre-authorisation and final bill authorisation.
- [Medi Assist hospital helpdesk FAQ](https://blog.mediassist.in/frequently-asked-questions-at-hospital-helpdesk/): provisional approval, information requests and deductions.
- [Medi Assist cashless claims guide](https://blog.mediassist.in/cashless-claims-guide/): post-discharge submission of documents for settlement.

Suggested pitch: “Here is the workflow your insurance desk can run inside VDoc, including the hand-offs to clinicians, billing and accounts. We customise it to your hospital's forms and payer connections during the pilot.” Insurer decisions and payments in this demonstration are simulated.

## Two-tab demo with a real transfer (hospital ⇄ insurer portal)

The insurer is fictional, but the transfer is not simulated: VDoc generates real PDFs, POSTs the fields and files to a local intake service (`server/insurer.ts`, mounted at `/api/insurer` by `npm run dev`), which validates and stores them in `.insurer-inbox/` and returns a receipt. Works with `npm run dev` only (the intake service is not deployed).

1. Tab A: `/app/claims?id=cashless-0090` (hospital). Tab B: `/insurer` (Northwind Assurance portal), inbox is empty.
2. Optional proof of automation: edit Mohan's discharge summary on the Discharge page, then click **Prepare claim**. Open "Data sent to insurer · source of each field" to see the new value and its VDoc source.
3. Attach the report, record both reviews, **Approve & submit claim**. The insurer tab shows reference `INS-2026-000N`, validation PASS lines, the exact fields, and the 8 PDFs (open inline, with sha256).
4. In the insurer tab, **Request itemised pharmacy bill**. The hospital claim moves to *Query received* within about 2 s.
5. **Prepare response**, review, **Approve & send response**. The insurer tab shows `INS-…-R1` with the pharmacy PDF on the same claim.
6. Authorisation, settlement and payment still use the hospital-side *Presenter controls*.

Reset between runs: `curl -X POST localhost:5173/api/insurer/reset`, then *Restore 10 demo records* on the claims worklist.

## In-progress claims are real on the insurer side too

The first time the Claims page loads, every seeded claim that is past submission (7 of the 10: the five in progress and the two completed) is replayed into the insurer service: the saved packet and its PDFs, the query and response where there was one, and each authorisation, settlement, payment and closure, stamped with the claim's own dates. The claim then adopts the insurer's reference (`INS-2026-000N`), so the hospital timeline and `/insurer` match. Open any of them from either side; for example answer Anita's pharmacy query (F-DEMO-0080) and watch the response arrive on the same insurer claim.

The replay is idempotent (a second browser reuses the same insurer claims) and is retried on the next load if the insurer service was unavailable. To start clean, `POST /api/insurer/reset` and use **Restore 10 demo records**.
