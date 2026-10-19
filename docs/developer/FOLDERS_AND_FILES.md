# Folders and important files

[Handbook index](README.md) · [Architecture](ARCHITECTURE.md)

Paths in this guide are relative to the repository root. This map covers the maintained application areas and groups closely related files. Generated per-patient exports are explained as a group rather than as individual application modules.

## 1. Repository tree

```text
VDocs/
├── index.html                  Browser HTML entry
├── package.json                Dependencies and development commands
├── package-lock.json           Locked npm dependency tree
├── vite.config.ts              Frontend build, Vitest, local API middleware
├── vercel.json                 Hosted build and routing rules
├── tsconfig.json               TypeScript settings and included source folders
├── eslint.config.js            Lint configuration
├── playwright.config.ts        Browser smoke-test configuration
├── .env.example                Configuration names and placeholders
├── src/
│   ├── main.tsx                React entry and shared providers
│   ├── styles.css              Application styling
│   ├── app/                    Routes, authentication, sync, theme
│   ├── pages/                  Route screens
│   ├── components/             Reusable feature UI
│   ├── domain/                 Types, schemas, command contracts
│   ├── services/               Workflow engine, storage, feature logic
│   ├── adapters/               Fixture and normalized Supabase repositories
│   ├── data/                   Synthetic scenarios and seed builders
│   ├── hooks/                  Voice recording and dictation hooks
│   ├── lib/                    Configuration and browser utilities
│   └── test/                   Shared test helpers
├── api/
│   ├── _lib/                   Privileged workflow / insurer storage helpers
│   ├── orders/                 Source-portal order APIs
│   ├── patients/               Source-portal patient registration API
│   └── *.ts                    AI, transcription, cleanup, insurer endpoints
├── server/                     Reusable Node handlers and provider clients
├── supabase/
│   ├── config.toml             Local Supabase configuration
│   ├── migrations/             Ordered schema, RPC, and policy migrations
│   └── seed.sql                Old foundation seed, not the full current cohort
├── scripts/                    Cohort and shift export / seeding tools
├── data/generated/             Derived SQL, CSV, JSON, patient files and casebook
├── e2e/                        Playwright tests
└── docs/
    └── developer/              This handbook and separate flow guides
```

`node_modules/`, `dist/`, `.insurer-inbox/`, `.vercel/`, test output, and local environment files are working/generated state, not source code to copy into a new feature.

## 2. Application shell and pages

| Files | Purpose |
| --- | --- |
| `src/app/App.tsx` | Authoritative route table, clinical shell, and separate insurer branch |
| `AuthGate.tsx` | Supabase session / sign-in handling and cache clearing on user changes |
| `WorkflowSync.tsx` | Storage/custom events and five-second visible-page polling |
| `theme.ts` | Ant Design clinical theme |
| `pages/DashboardPage.tsx` | Starting workspace and work summaries |
| `PatientsPage.tsx`, `PatientPage.tsx` | Directory wrapper and individual chart |
| `SchedulePage.tsx` | Synthetic roster |
| `UpdatesPage.tsx` | Derived doctor update inbox |
| `DischargesPage.tsx`, `DischargeSummaryPage.tsx` | Discharge list/checklist and document editor |
| `CoordinationPage.tsx` | Shared screen configured as referrals or department requests |
| `InvestigationsPage.tsx` | Lab, imaging, and results-to-review views |
| `ShiftHandoversPage.tsx` | Main shift handover and archive experience |
| `HandoversPage.tsx` | Legacy individual handover UI, still used inside the shift page |
| `ClaimsPage.tsx`, `InsurerPortalPage.tsx` | Hospital claim workflow and separate insurer demonstration |

## 3. Domain contracts

| File in `src/domain/` | Purpose |
| --- | --- |
| `models.ts` | Patient/report schemas and `ClinicalRepository` interface |
| `longitudinal.ts` | Encounters, notes, vitals, medications, orders, requests, timeline, history |
| `workflow.ts` | Full workflow state, discharge/handover records, command schema, command types |
| `dischargeSummary.ts` | Structured summary schema, document text and signing completeness checks |
| `roles.ts` | Demo role definitions / inference |
| `claims.ts` | Hospital claims records, actions, document and review contracts |
| `insurer.ts` | Insurer submissions, required packet fields/documents, receipts, events, validation contracts |

Read the schema before adding a field to a form. A field that only exists in React state will disappear when the user reloads.

## 4. Workflow and feature services

| Files in `src/services/` | Purpose |
| --- | --- |
| `clinical.ts` | Patient/history and lab/imaging read facade over the active snapshot |
| `useWorkflow.ts` | React Query read and mutation hooks |
| `workflowStore.ts` | Read, initialize, save, retry, and notify for mock / Supabase snapshots |
| `workflowEngine.ts` | Clinical command validation and state transitions |
| `workflowDiff.ts` | Build a smaller change patch for remote saves |
| `workflowStorageCodec.ts` | Encode/decode compressed and legacy browser snapshots |
| `worklistSelectors.ts` | Normal clinical worklist versus discharge worklists |
| `historyView.ts` | Patient history grouping and presentation data |
| `doctorUpdates.ts` | Derive updates and read/unread behavior from workflow data |
| `activeDoctor.ts` | Demo default doctor or Supabase membership display name |
| `workingAs.ts` | Browser-persisted demo author/role selection |
| `referralViews.ts` | Incoming/outgoing scope and date filtering |
| `labTrends.ts` | Derive graphable lab results and report links |
| `shiftHandover.ts` | Capture chart sources and apply multi-patient shift commands |
| `shiftArchive.ts` | Shift roster/archive grouping, filters, and URL parameters |
| `dischargeMigration.ts` | Remove legacy inferred discharge records |
| `dischargeSummaryBuilder.ts` | Build/reset document sections from chart data and format dates |
| `dischargeSummaryPdf.ts` | Render structured discharge summary PDF |
| `dischargeSummarySeed.ts`, `wardRoundSeed.ts` | In-memory synthetic read overlays |
| `claimsDemo.ts` | Hospital claim seeds, transitions, reviews, local storage, and version checks |
| `claimsExport.ts` | Claim PDF packet building, checksums, insurer HTTP calls, mirrored events |
| `claimsInsurerSeed.ts` | Replay seeded in-flight claim history to the synthetic insurer |
| `aiAssistant.ts` | Browser request/response contract for chart AI and unavailable/error states |
| `*.test.ts` | Tests colocated with the behavior; read them for allowed and rejected cases |

## 5. Components

| Files in `src/components/` | Responsibility |
| --- | --- |
| `Sidebar.tsx`, `PatientBackButton.tsx` | Navigation and return context |
| `QueryState.tsx`, `WorkflowToolbar.tsx`, `RoleTag.tsx` | Query feedback, common filters, role display |
| `ClinicalOverlay.tsx` | Shared clinical drawer/modal presentation |
| `PatientDirectoryTable.tsx` | Directory filters, pagination, encounter views |
| `PatientHistoryPanel.tsx`, `ClinicalSummaryCard.tsx` | Chart history and deterministic chart overview |
| `ReportList.tsx`, `EvidenceDrawer.tsx` | Report content and opening cited source records |
| `LabTrends.tsx`, `LabTrendGraph.tsx`, `LabTrendCombinedGraph.tsx` | Lab history controls and graphs |
| `NewOrderMenu.tsx`, `OrderBasket.tsx` | Investigation menu, catalog/custom items, batch order form |
| `CreateClinicalAction.tsx` | Create investigation, referral, or coordination action |
| `CareCoordinationCard.tsx`, `RequestDetail.tsx` | Patient-level request/task summary and shared request lifecycle form |
| `WardRoundsCard.tsx` | Display ward-round notes and add findings/plan |
| `AiBriefCard.tsx`, `AiAssistantDock.tsx` | AI brief, chart conversation, and evidence interactions |
| `VoiceField.tsx`, `VoiceModeToggle.tsx` | Dictation-enabled form controls and mode selector; toggle is currently hidden in the shell |

## 6. Browser utilities and hooks

| Files | Purpose |
| --- | --- |
| `src/lib/env.ts`, `supabase.ts` | Validate frontend mode/config and create optional Supabase client |
| `format.ts`, `dateRange.ts` | Date/number display and date filters |
| `aiBriefCache.ts`, `aiChatStore.ts` | Brief cache and browser conversation persistence |
| `doctorNotesStore.ts` | Browser scratch-note persistence; separate from `note.create` clinical records |
| `voiceMode.tsx` | Browser-persisted push-to-talk/live setting |
| `voiceCleanup.ts` | Shared cleanup schemas, protected-content checks, vocabulary, text insertion |
| `wavEncode.ts`, `pcmCapture.ts` | Recorded audio conversion and streaming PCM capture |
| `src/hooks/useVoiceRecorder.ts` | Select recording mode, transcribe, then apply cleanup |
| `useLiveVoiceRecorder.ts` | Streaming token, microphone capture, WebSocket lifecycle and recovered text |
| `useDictationField.tsx` | Insert text safely, preserve original, recover if the field changed, undo cleanup |
| `voiceRecorderTypes.ts` | Shared recorder state types |

## 7. Synthetic data and repositories

| Files | Purpose |
| --- | --- |
| `src/data/scenarios.ts`, `expandedScenarios.ts` | Authored original/expanded patient scenarios |
| `cohort.ts`, `fixtures.ts`, `validateCohort.ts` | Construct and validate records and hospital/doctor constants |
| `expansionWorkflow.ts` | Additional workflow fixtures and merge of missing patients |
| `orderCatalog.ts` | Lab/imaging catalog and referral departments |
| `specialtyFocus.ts` | Optional specialty-specific chart emphasis; specialty selector is currently hidden |
| `schedule.ts` | Synthetic weekly schedule |
| `shiftDemo.ts`, `labTrendDemo.ts` | Shift demonstrations and trend fixtures |
| `src/adapters/mockRepository.ts`, `supabaseRepository.ts` | Earlier `ClinicalRepository` implementations; useful reference, not the current active workflow write path |
| `src/test/signSummary.ts` | Shared helper for workflow tests requiring signed summaries |

## 8. Server and API files

| File | Purpose |
| --- | --- |
| `server/patientAi.ts` | Chart prompts, provider configuration, JSON parsing, citation-ID filtering |
| `server/aiProviders.ts` | Anthropic, OpenAI, and Gemini provider HTTP adapters |
| `server/transcribe.ts` | AssemblyAI transcription and temporary streaming token generation |
| `server/voiceCleanup.ts` | Gemini cleanup with validation and original-text fallback |
| `server/insurer.ts` | Synthetic insurer packet validation, receipts, queries, events, files, backend interface |
| `server/insurer.test.ts` | Insurer behavior tests, using test storage |
| `api/patient-ai.ts` | Hosted patient AI handler |
| `api/transcribe.ts`, `transcribe-token.ts`, `voice-cleanup.ts` | Hosted batch transcription, streaming token, cleanup |
| `api/insurer.ts` | Hosted insurer subpath adapter |
| `api/_lib/workflowState.ts` | Fixed demo hospital/project, CORS, service-role client, shared snapshot concurrency loop |
| `api/_lib/insurerSupabase.ts` | Persist insurer records and base64 files to demo Supabase tables |
| `api/patients/register.ts` | Register a synthetic patient/encounter and update workflow state |
| `api/orders/list.ts`, `create.ts` | Read and create source-portal investigation orders |
| `api/orders/walkin.ts`, `publish.ts` | Walk-in investigation workflow and report publication |

The API files currently have demo trust assumptions. See [production gaps](PRODUCTION_ROADMAP.md) before exposing them to real users or real records.

## 9. SQL, scripts, exports, tests, and older documents

The exact migration inventory and storage behavior are in [Data and persistence](DATA_AND_PERSISTENCE.md). `scripts/export-data.ts` generates the cohort exports; `export-shifts.mjs` and `seed-shifts.mjs` generate/install shift demo data. Generated `data/generated/` includes SQL, table CSVs, JSON, a casebook, and per-patient JSON/Markdown. Edit the seed sources and regenerate intentionally; generated exports are not the running database.

`e2e/foundation.spec.ts` is the browser smoke suite. `playwright.config.ts` starts the static preview in mock mode. Unit tests are under `src/` and `server/`; Vite's test include patterns define what runs.

Root guides such as `DISCHARGE_FLOW.md`, `ORDERING_FLOW.md`, `REFERRAL_VIEWS.md`, `WORKFLOW_IMPLEMENTATION.md`, `SHIFT_*`, `CLAIMS_DEMO.md`, `VOICE_CLEANUP.md`, `UPDATES_INBOX.md`, `LAB_TRENDS.md`, and `DATA_EXPANSION.md` explain feature history. `VDOCS_DEMO_PLAN.md` and `findings.txt` contain product/discovery context. Existing `docs/VDocs_*` guides support founder demonstrations and claims research. Use the source and this handbook to resolve older statements.
