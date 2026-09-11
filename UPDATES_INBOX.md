# Doctor Updates inbox

`/app/updates` consolidates current-encounter lab/imaging reports, investigation orders, incoming/outgoing referrals and coordination requests, handovers, discharge work and recorded follow-up tasks.

- Compact Ant Design sidebar badges show unread counts, including when collapsed.
- Search by patient, UHID or update content; filter All / Unread / Needs attention and category. Pagination and filters remain in the URL when opening a detail drawer or returning from a workflow.
- Opening an update marks it read. Individual updates can be marked unread; bulk marking applies to filtered results (up to 500 per action).
- Reading never marks a report clinically reviewed, completes a request or acknowledges a handover. Those actions remain in their clinical workflows.
- Changed request/order/discharge versions and updated handover packets become unread again. New reports appear with their own IDs.

## Persistence and scope

The feed is derived from the existing shared workflow snapshot, not a separate immutable notification history. Each entity shows its latest state; superseded versions disappear from the inbox. Existing audit records remain unchanged.

Read timestamps are stored in `update_receipts[doctor][update_id]` inside `demo_workflow_state.state`, using the existing revision-checked `save_demo_workflow` RPC in Supabase mode (local storage in local mode). No extra database table or migration is required. Shared workflow sync polls every five seconds while visible; successful local actions trigger invalidation immediately.

The demo recipient is Dr. Ananya Mehta, with Internal Medicine patients, actively owned encounters and incoming consultations. Requests also include those sent by the doctor/department. This is demo recipient scoping, not production per-clinician authorization. A production rollout needs authenticated clinician IDs and server-enforced recipient access.

Only data committed to the shared workflow snapshot generates updates. External HIS/LIS/RIS integrations and appointment booking notifications are not fabricated or connected by this change. Follow-ups use existing recorded tasks.

This inbox is not a clinical alarm delivery system: Needs attention reflects existing review/workflow state, not independently validated medical urgency. Hosted database and browser behavior require signed-in verification; unit tests exercise workflow commands without Playwright.
