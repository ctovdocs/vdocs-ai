# Connected workflow implementation

## Dependency-ordered plan

1. Keep the improved patient screens and expanded synthetic scenarios.
2. Establish one persisted workflow state for every VDoc and source-portal screen.
3. Implement discharge planning, readiness checks, completion and retained history.
4. Implement requests/referrals, ownership, draft responses, status transitions and requester review.
5. Connect investigation ordering to source-system publication and clinician result review.
6. Implement IPD shift handover drafts, clinician approval and receiving-doctor acknowledgement.
7. Wire patient-context actions, attention counts, timeline sources and queue filters.
8. Remove oversized clinical page gutters/headings; paginate dashboard and patient directory.
9. Validate through TypeScript, ESLint, unit tests and build. Do not run Playwright without permission.

These steps are implemented for the demo. Hosted Supabase migration/RLS validation and browser verification remain separate checks, not completed claims.

## Working flows

### Discharge

- `/app/discharges`: active working list and retained history; search, doctor, department, priority, status and date filters.
- Adding a patient starts planning; it does not remove the patient from IPD or approve readiness.
- Clinician-authored working summary, clearance rationale, medication reconciliation, follow-up instructions and document checks persist.
- Pending investigations, open requests, unread specialist responses, unreviewed current-encounter reports and unresolved review tasks block readiness.
- Completing discharge requires a saved ready state and rechecks every blocker at save time.
- Newly pending work revokes an existing ready state. It does not silently remain ready after a new order.
- Completion closes the active encounter, retains the patient and discharge record, updates lists and appends a discharge note.
- A generic task's Done button cannot bypass discharge completion.

### Coordination

- Requests and referrals share a lifecycle with distinct types and list routes.
- Patient, reason, receiving department, priority, owner and attached report IDs persist.
- Received → accepted → in progress → completed. A completed specialist response is required; requester review is a separate action.
- Assignment and draft response can be saved before completion. Cancellation requires a reason.
- `/demo/referrals` is a proposed receiving-team simulator, not an existing Fortis system. Simulated actions are labelled; this is not production role authorization.
- Current diagnoses, allergies, medication context and report sources are available beside the request.
- Authored same-department consultation questions are retained as review tasks, not mislabeled interdepartmental requests.

### Investigations

- Place lab or imaging orders from a patient or queue. Active duplicate test titles of the same kind are blocked.
- Source inboxes are `/demo/lab/orders` and `/demo/radiology/orders`; source lookup screens link to them.
- Start processing; enter collection/study time and synthetic findings. Laboratory publication requires at least one named result.
- Publication atomically completes the order and links the patient report. VDoc shows the result as awaiting review.
- Mark reviewed from the result drawer or investigation queue; attention and discharge blockers update.
- Cancellation requires a reason. Completed/cancelled orders cannot receive another result.

### Handover

- Active IPD encounters only. Select incoming doctor, shift and date/time.
- Prepare a deterministic draft from the current chart, recent notes, reports, completed coordination, pending orders and unreviewed work.
- Edit situation, history, recent events, completed actions, pending items and next actions.
- Save edits before approval. Situation and next actions must be completed before approval.
- The approved snapshot is immutable. Subsequent changes require a new handover; live queues continue to show current work.
- The simulated named incoming doctor acknowledges receipt separately; timestamps and actors are retained.
- A warning identifies later patient actions; source reports and record references remain accessible. No voice capture or LLM is claimed.

## Shared-state architecture

`UI → useWorkflowAction → dispatchWorkflow → applyWorkflowCommand → persisted state → query invalidation → all views`

- `src/domain/workflow.ts`: command/state contracts and schema validation.
- `src/services/workflowEngine.ts`: pure transitions, entity versions, audit events, blockers and timeline entries.
- `src/services/workflowStore.ts`: local browser storage or Supabase snapshot persistence.
- `src/services/clinical.ts`: patient/history/report reads use the same snapshot, including dummy portals.
- `src/app/WorkflowSync.tsx`: same-tab updates, cross-tab storage notifications and five-second visible-page refresh. Supabase synchronization is polling, not Realtime.
- Commands have IDs; retrying an already applied command is idempotent. Per-record expected versions reject stale edits. Local Web Locks serialize tab writes; Supabase revision checks reject/retry concurrent snapshot writes.
- Failed storage, stale versions, missing migrations and invalid input surface errors rather than reporting success.

Local mode is browser-profile and origin scoped: separate devices, incognito profiles, ports or hostnames do not share local storage. Use the configured Supabase mode to share across devices. The initial source-table read is paginated so the expanded timeline is not truncated by default API row limits.

The SQL RPC is a demo snapshot persistence boundary, not a production clinical command API. Hospital membership and scope are checked server-side; clinical lifecycle logic remains client-side and can be bypassed by a modified client. Do not use real patient data or expose this as a production clinical system. Hosted migrations have not been applied or tested here.

## Compact layout and pagination

- Clinical outer gutter removed; top bar reduced to 40px; small Ant Design controls and compact tables used throughout.
- Schedule's DAILY WORK banner and explanatory hero paragraph removed; title sits beside the filters.
- `box-sizing: border-box` is preserved because it is not the source of empty space.
- Dashboard and patient list share the same paginated directory: 10 rows initially, 20/50 selectable, filtered total shown.
- Search/filter/sort changes return to page one. The page is clamped if synchronized changes shrink the filtered list.
- OPD and IPD directory shortcuts also inherit the pagination.

## Presenter walkthrough

1. Open `/app`; use the doctor selector and patient filters. Change the page size or open page two in the full patient directory.
2. Open Rahul Sharma (`F-DEMO-0001`). Existing history, reports and pending work are already in context.
3. Click **+ Lab**, select KFT, enter a clinical indication and place the synthetic order.
4. Open `/demo/lab` in a second same-origin tab. Click **Order inbox / publish results**, search Rahul, and open the new KFT order.
5. Start processing. Enter a valid collection time, test values/units/reference flags and a synthetic report comment; publish.
6. Return to Rahul or Results to review. Open the linked report and mark it reviewed; refresh either tab to confirm persistence.
7. Create a new department request or open Rahul's existing Nephrology request. In `/demo/referrals`, accept it, start review, save a response draft, and complete it.
8. Return to VDoc and explicitly review the completed specialist response.
9. Use Shift handover → + Handover. Enter the receiving doctor and shift; prepare the draft, add next actions, save and approve.
10. Acknowledge as the named incoming doctor using the explicitly labelled simulated action. Check the patient notes/timeline.
11. Open Discharge list and Rahul's working entry. Resolve or explicitly cancel remaining investigations/requests, review results/responses and complete outstanding review tasks.
12. Enter the discharge summary and clinical clearance rationale; check medications, follow-up and documents. Mark ready, then complete discharge.
13. Switch to History; Rahul remains findable. His encounter is closed and the discharge note is retained. A critical patient is never automatically cleared.

Only use invented findings and clinician-authored synthetic decisions for this walkthrough. This script does not prescribe treatment.

## Validation and limitations

`npm run check` covers TypeScript, lint, 19 unit tests and a production build. Tests exercise source publication/readback, local persistence, concurrent writes, corruption/storage failure, stale edits, lifecycle guards, readiness revocation, approved handover immutability, receipt identity, cross-patient source rejection and IST date boundaries.

`npm run data:export` validates the expanded authored seed. Current counts: 50 patients, 43 critical, 35 with multiple visits, 190 encounters, 185 laboratory reports and 49 imaging reports. The expanded data does not retain the earlier 80%/90% targets; no user-authored scenarios were silently changed to force those ratios.

No Playwright or browser automation was run. The production build currently warns about a large bundled chunk; code splitting is a later performance task. Pagination UI behavior still needs manual/browser verification. SQL deployment, real HIS/LIS/RIS APIs, production authorization, AI, prescription submission and voice handover are not validated/implemented by this slice.
