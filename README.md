# VDoc · Fortis Workflow Demo

Patient-centric clinical workflow foundation using synthetic data. This is an independent internal demo, not an official Fortis product or a live hospital integration.

## Developer handbook

New to the repository? Start with the [developer handbook](docs/developer/README.md). It explains the current architecture, folders, important files, persistence, and each workflow separately, with diagrams. The [production roadmap](docs/developer/PRODUCTION_ROADMAP.md) and [AWS deployment guide](docs/developer/AWS_DEPLOYMENT.md) describe future work; they are not implemented infrastructure.

The handbook was checked against the code on 19 October 2026. Some older sections below and older planning documents predate the current AI, voice, insurer portal, and simulator API implementations. Use the handbook for the current implementation and the source files it links for exact behavior.

## Run locally

Requires Node.js 22.12+ (Node 22 recommended) and npm.

```sh
npm install
npm run dev
```

Open http://localhost:5173/app. No credentials are required in the default local demo mode. Workflow changes persist in this browser's local storage and synchronize across same-origin tabs. This is a preview, not a simulated successful authentication. Use synthetic data only.

```sh
npm run check
```

Runs TypeScript, ESLint, repository/workflow/persistence tests and the production build. It does not run Playwright.

Browser smoke tests are separate and must only be run when explicitly requested:

```sh
npx playwright install chromium
npm run test:e2e
```

Run browser tests in default mock mode. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` optionally selects an existing Chromium binary.

## Stack and scope

- Vite + React + TypeScript for the frontend.
- Ant Design for tables, accessible form primitives, navigation and report drawers; one clinical theme.
- React Router for separate clinical and simulator routes.
- TanStack Query for shared data fetching/cache and refresh on focus.
- Supabase JS + Auth and an initial Postgres migration with hospital membership RLS.
- Zod validates records at the service boundary.
- Indian date formatting and explicit Asia/Kolkata report timestamps.

Ant Design is a general enterprise UI library, not a healthcare-certified or India-specific clinical library. Healthcare suitability comes from the workflow, data model, validation and clinical review.

This foundation intentionally supersedes the original plan's Next.js/shadcn frontend choice following the latest request. No second CSS/component framework is needed. Future privileged clinical mutations and OpenAI calls belong in Supabase Edge Functions or another server API, never in Vite client code.

## Routes

| URL | Purpose |
|---|---|
| `/app` | VDoc starting workspace |
| `/app/patients` | Searchable patient directory |
| `/app/patients/:patientId` | Patient context and report drawers |
| `/app/schedule` | Compact synthetic weekly roster |
| `/app/opd`, `/app/rounds` | Patient directory initially filtered to OPD / IPD |
| `/app/discharges` | Persistent discharge working list, checklist and history |
| `/app/claims` | 10-case cashless claims worklist with reviews, queries, settlement and 5 completed examples |
| `/app/requests`, `/app/referrals` | Request/referral queues, assignment, response and review |
| `/app/lab-orders`, `/app/imaging-orders` | Orders, processing status and linked reports |
| `/app/results` | Published results awaiting clinician review |
| `/app/handovers` | IPD shift drafts, approval and incoming-doctor acknowledgement |

The embedded demo launcher and source-system portal routes have been removed. HIS, laboratory and advanced-imaging simulators are planned as separate repositories; they are not connected yet. Shared synthetic data, workflow services and adapters remain available for that work.

Start in VDoc at `/app`, search `F-DEMO-0001`, and open Rahul's workspace to review the linked patient history and reports.

For the insurance-desk pitch, open **Cashless claims**. It starts with 10 patient claims, including 5 completed and reconciled examples. Open Mohan (`F-DEMO-0090`) to demonstrate the full flow. Claims save separately in local storage; no additional hosting or AI service is needed. Insurer responses, billing and payments are explicitly synthetic. See [the claims demo walkthrough](CLAIMS_DEMO.md). The clinical workflow architecture below is unchanged; claims use the separate `services/claimsDemo.ts` service.

All active screens read through `services/clinical.ts` and `services/workflowStore.ts`. Writes use the validated workflow command engine. In local mode, the shared browser snapshot is serialized with Web Locks; storage failures are surfaced rather than reported as successful saves. In Supabase mode, a hospital-scoped shared snapshot is saved through an atomic compare-and-swap RPC. See [workflow implementation and demo walkthrough](WORKFLOW_IMPLEMENTATION.md).

Dashboard and directory tables paginate at 10 patients by default, with 20/50 options. Search and filters reset to page one; filtering applies before pagination.

## Repository boundaries

This repository contains the VDoc clinical workspace. Source-system simulators will live in separate repositories. Sharing a database alone will not connect separate apps in local preview mode: they must use the same Supabase project and compatible workflow contracts. Configure authentication and hospital scope in each app; never expose service-role credentials in a frontend. A static host must rewrite non-asset routes to `index.html` for direct links to work.

## Connect Supabase

1. Use a dedicated demo Supabase project.
2. Apply migrations `202609070001_foundation.sql`, `202609070002_longitudinal_cohort.sql`, and `202609070003_workflow_state.sql` in that order, once each. On an existing project, apply only migrations not already applied.
3. Run `npm run data:export`, then execute `data/generated/seed.sql` in that project. This upserts the current synthetic source fixtures; it does not replace an existing workflow snapshot. The old `supabase/seed.sql` contains only the original three-patient foundation and is not the current dataset.
4. Create a confirmed email/password user in Supabase Authentication for the presenter.
5. Add that user's UUID to hospital membership using the SQL editor:

```sql
insert into public.hospital_memberships (user_id, hospital_id, display_name)
values (
  'REPLACE_WITH_AUTH_USER_UUID',
  '10000000-0000-4000-8000-000000000001',
  'Dr. Ananya Mehta'
);
```

6. Copy `.env.example` to `.env.local` and populate:

```dotenv
VITE_DATA_MODE=supabase
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

7. Restart Vite and sign in with the provisioned account. Without membership, records are inaccessible. The initial UI uses Dr. Mehta as the fixed demo persona; it is not a multi-user profile UI.

Only publishable browser keys belong in `VITE_*`. Never put a Supabase secret/service-role key or OpenAI API key there. Authenticated members read hospital fixtures and can save the shared demo snapshot through `save_demo_workflow`. Direct snapshot table writes are not granted. Membership provisioning is an administrator action.

No hosted migration or live Supabase verification has been performed. Live connectivity requires the configuration above. Unit tests do not establish deployed SQL/RLS correctness. Test member, non-member, signed-out, concurrent-write and cross-hospital behavior against a disposable Supabase project before presenting shared-device persistence as verified.

The normalized `demo_*` source tables initialize the workflow snapshot once. Subsequent workflow writes update `demo_workflow_state`, not the normalized seed tables. All working VDoc and dummy-portal screens read that shared snapshot. This deliberately small demo architecture is not a production integration or clinical backend: transition validation is in TypeScript, while the RPC enforces hospital scope and concurrent-save revision checks. Production needs server-side command authorization/validation, normalized transactional writes, immutable audit guarantees and integration-specific adapters.

## Structure

```text
src/
  app/          Routing, auth gate, clinical theme
  pages/        VDoc workspace and separate simulator screens
  components/   Shared report viewer and loading/error state
  domain/       Validated records and repository interface
  services/     Patient, lab and imaging use cases
  adapters/     Local fixture and Supabase implementations
  data/         Synthetic seed fixtures
  lib/          Environment, Supabase client, date formatting
supabase/
  migrations/   Foundation tables and access policies
  seed.sql      Matching synthetic patient and report records
```

## Synthetic dataset

The original 50 cases remain in `src/data/scenarios.ts`; `src/data/expandedScenarios.ts` adds 50 distinct scenarios across the same five departments. The new group has 45 critical patients (90%), five stable recovery admissions, 45 repeat visitors and five first-time visitors. The full cohort has 100 patients, 88 critical scenarios, 80 repeat visitors, 420 encounters, 420 lab reports and 99 imaging reports. Ratios apply to the new group; existing authored cases were not rewritten to force whole-cohort percentages. This deliberately enriched mix is not Fortis or Indian hospital prevalence.

Twenty additional active discharge fixtures include five planning entries, thirteen in progress and two ready after explicitly synthetic clinician review. Critical cases are never seeded ready. See [expanded dataset and installation notes](DATA_EXPANSION.md).

Local mode automatically merges only missing new patients into the existing workflow and preserves existing clinical edits, doctor-note and chat storage keys. Workflow snapshots are gzip-compressed to leave browser storage capacity for notes/chat; legacy uncompressed snapshots remain readable. Do not clear browser storage to install this expansion.

For an existing Supabase demo, run the generated `data/generated/expansion.sql` after migrations 001–003. It inserts only the additional source records and merges missing patients into an existing workflow snapshot without resetting old work. This SQL has been generated but not applied or database-validated here. For a fresh database, the complete `data/generated/seed.sql` remains available.

`npm run data:export` validates and exports the cohort to `data/generated/`: JSON, per-patient JSON/Markdown, a casebook, CSV tables and SQL seed. Clinical sign-off remains pending. No real patient records or diagnostic images are included.

## Remaining scope

Live OpenAI summarization, autonomous actions, prescription creation/pharmacy readback, voice transcription and diagnostic image viewing are not implemented. The chart summary and structured handover draft are deterministic record-based features, not claimed AI output. The weekly roster is illustrative, not a live appointment-management service. Prescriptions and follow-ups remain explicitly unconnected sidebar entries; this implementation focuses on discharge, coordination, investigations and IPD handover.

Read [the full product plan](VDOCS_DEMO_PLAN.md) and [the Fortis discovery evidence](findings.txt) before extending the scope. Findings remain specific to this discovery site.

## Official references

- [Vite setup and Node requirements](https://vite.dev/guide/)
- [Ant Design getting started](https://ant.design/docs/react/getting-started/)
- [Supabase React quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security)
