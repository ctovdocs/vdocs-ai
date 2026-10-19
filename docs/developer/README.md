# VDocs developer handbook

This is the starting point for a developer joining VDocs. Read it to understand what runs today, where a change belongs, and what still needs to be built for a production product on AWS.

Prefer a single formal report? Read the [26-page architecture PDF](../architecture/VDocs_Architecture.pdf) or its [editable source](../architecture/VDocs_Architecture.md).

**Reviewed:** 19 October 2026, against the local source based on commit `cb2c985`. This is a code review of the repository, not verification of the deployed Vercel application, database policies, external providers, or AWS infrastructure.

## Read in this order

| Guide | What you will learn |
| --- | --- |
| [1. Architecture](ARCHITECTURE.md) | How the browser, workflow engine, server handlers, and database fit together |
| [2. Folders and files](FOLDERS_AND_FILES.md) | Where the code lives and what the important files do |
| [3. Data and persistence](DATA_AND_PERSISTENCE.md) | Models, snapshots, browser storage, Supabase, revisions, and audit limitations |
| [4. Local development](LOCAL_DEVELOPMENT.md) | Setup, configuration, checks, debugging, and how to change a feature |
| [5. Patient workspace](flows/PATIENT_WORKSPACE.md) | Patient search, history, ward rounds, notes, and updates |
| [6. Discharge](flows/DISCHARGE.md) | Planning, blockers, summaries, sign-off, completion, and reopening |
| [7. Referrals](flows/REFERRALS.md) | Specialist consultation, assignment, response, and requester review |
| [8. Care coordination](flows/CARE_COORDINATION.md) | Department collaboration, requests, and work items |
| [9. Investigations](flows/INVESTIGATIONS.md) | Lab/imaging ordering, source portals, reports, and review |
| [10. Shift handover](flows/SHIFT_HANDOVER.md) | Source snapshots, shift packets, approval, and acknowledgement |
| [11. Claims](flows/CLAIMS.md) | Hospital claims, PDF packets, insurer intake, queries, and reconciliation |
| [12. AI and voice](flows/AI_AND_VOICE.md) | Chart questions, citations, dictation, cleanup, and provider calls |
| [13. Production roadmap](PRODUCTION_ROADMAP.md) | The gaps, service boundaries, API contracts, migration sequence, and release gates |
| [14. AWS deployment](AWS_DEPLOYMENT.md) | The proposed AWS layout and how to build, deploy, observe, and recover it |
| [15. Deployment and business costs](COST_ESTIMATE.md) | Researched AWS/model/voice prices, hospital-size scenarios, USD/INR budgets, pricing and fundraising inputs |
| [16. Minimum shared cost](MINIMUM_SHARED_COST.md) | Simple low-cost setup for three to five hospitals sharing one server, database and frontend |

For the first hour, read guides 1–4, run the app, and follow one patient through an order, a referral, and a discharge. Then read the flow you will work on. Read guides 13–14 before changing deployment or persistence.

## What this product currently is

VDocs is a patient workspace with synthetic hospital records and working demo workflows. It supports patient history, investigations, referrals, department requests, discharge summaries, handovers, claims demonstrations, AI assistance, and voice input. It is not a verified live hospital, payer, pharmacy, or bank integration.

The default experience runs without login and saves clinical workflow changes in the browser. An optional Supabase mode adds authentication and shared clinical snapshot storage. AI and voice require separately configured server credentials. The insurer demonstration has its own server storage, while hospital-side claims remain in browser storage.

## Words used throughout these guides

| Word | Meaning here |
| --- | --- |
| Patient | A person record with an internal UUID and a readable UHID |
| Encounter | One OPD visit or IPD admission; a patient can have many |
| Workflow state / snapshot | One large object containing the hospital's demo patients and workflow records |
| Command | An instruction such as `order.place` or `request.review`, validated by the workflow engine |
| Entity version | A counter on one record; prevents saving an edit based on an old version |
| Snapshot revision | A counter on the whole hospital snapshot; prevents overwriting another save |
| Review | An explicit clinician action acknowledging a result or completed response |
| Source | The record used to support a summary, report reference, or handover entry |
| Adapter | Code translating between the application and a storage system or outside provider |
| Tenant | A hospital or organization whose records must be isolated from other organizations |
| Backend | Trusted server application that authenticates requests, applies rules, and saves records |
| Worker | A server process that performs queued work outside the user's HTTP request |
| Idempotency | Safely treating a retry as the same request instead of repeating its effects |
| Outbox | Database records of events to deliver after the related transaction commits |
| Proposed | Future work described in these guides; it does not exist just because it appears in a diagram |

## The rule to remember

A screen is only one view of a workflow. Before changing it, trace its command, validation, storage, and downstream effects. For example, a completed investigation can still block discharge until its result is reviewed. A completed referral can still block discharge until its response is reviewed. A claim authorisation does not mean clinical discharge is complete.

Older root-level documents contain useful feature history and demo walkthroughs. They can describe earlier stages of the product. When a statement conflicts with this handbook, inspect the linked implementation and tests before changing behavior.
