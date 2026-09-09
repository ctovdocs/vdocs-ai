# Doctor-to-doctor shift handover

## Research and scope

[AHRQ I-PASS](https://www.ahrq.gov/teamstepps-program/curriculum/communication/tools/ipass.html) structures handover around illness severity, patient summary, action list, situation awareness/contingency plans and synthesis by the receiver. [WHO handover guidance](https://cdn.who.int/media/docs/default-source/patient-safety/patient-safety-solutions/ps-solution3-communication-during-patient-handovers.pdf) supports standardized communication and opportunities to clarify information. A digital record supports, but does not replace, direct clinical communication.

Observed in the supplied Fortis discovery: informal verbal doctor handover without a structured system. Proposed here: a multi-patient shift packet with attributable source records and reviewed next actions. Staffing patterns, shift duration, escalation contacts, authorization and handover policy require Fortis validation; the demo does not claim an existing Fortis workflow.

## Implementation plan

1. Extend existing patient handovers with a shared shift ID, explicit start/end, department, source snapshots, review flags, escalation instructions and receiver readback. Preserve legacy single-patient handovers.
2. Capture relevant records for each active IPD encounter. Shift activity uses recorded timestamps, not inferred doctor ownership. Display all team activity with author attribution; carry-forward open work remains visible even if it began before this shift.
3. Create the packet atomically through the existing validated command API and Supabase compare-and-swap persistence. Reject cross-hospital patients, OPD encounters, duplicate patient selections, invalid intervals and stale updates.
4. Build a shift directory with outgoing/incoming doctor, department, status, date filters and full packet-text/patient search. Opening a packet shows a patient roster and editable structured handover plus source records.
5. Require explicit patient review, next actions and escalation instructions before packet approval. New chart changes invalidate draft review; refresh snapshots explicitly without overwriting clinician text. Approval freezes the packet. Acknowledgement requires the named receiving doctor and a readback note.
6. Test capture boundaries, independent patient scoping, immutability, review gates, persistence and compatibility. No Playwright unless requested.

## Persistence/API boundary

Commands `shift.create`, `shift.refresh`, `shift.approve`, `shift.receive` and existing `handover.save` use `dispatchWorkflow` and the authenticated Supabase `save_demo_workflow` RPC. The authoritative data is `demo_workflow_state.state.handovers`; a packet groups records by `shift_id`. This is the demo's existing API contract, not a new unauthenticated HTTP server. Hospital membership is enforced by the RPC; clinician names in this demo are attributed actors, not production identity authorization.

Draft capture distinguishes activity within [start,end) from live carry-forward work at capture time. It is not a historical point-in-time reconstruction of pending statuses. Old approved packets retain their captured content while current charts remain accessible separately.

## Implemented workflow

- `/app/handovers` opens the shift archive; legacy individual handovers remain in a separate tab.
- Select a covering department, outgoing/incoming doctor, start/end and up to 50 active IPD patients. Eligibility includes that department's own patients plus patients with open incoming referrals/requests from another department. Discharge is not a prerequisite. Durations and labels are entered explicitly, not claimed as Fortis policy.
- Search the archive by doctor, patient/UHID, date range or packet/source text. The last-seven-days filter and total shift count support reviewing one doctor's recent shifts.
- Packet roster → patient summary → captured records. Each source shows author, timestamp and shift/carry-forward context. Sources include rounds, shared notes, investigations/results, department exchanges, reconciled medications, observations, tasks and discharge processing.
- Clinician edits never overwrite source documents. Refreshing sources preserves edited text and resets patient-review flags. Summaries must be reconciled manually before approval; no autonomous treatment plan is generated.
- Outgoing doctor approves the complete packet only after shift end, with reviewed summaries, next actions and escalation text for every patient. Incoming doctor records readback and acknowledges the complete packet. Approved/received records cannot be edited.
- New Doctor's Notes saves now use `note.create` in the shared chart and are visible to history, AI chart context and shift capture. Old browser-only notes are preserved locally and must be explicitly saved to the chart; they are not silently attributed or imported.
- Changing packet composition after creation, shift cancellation, authenticated clinician roles, structured per-action task assignment, print/export and historical pending-state reconstruction are not included. Patient roster selection is explicit rather than inferred from who authored a note.

Automated validation covers multi-patient scoping, capture boundaries, stale revisions, refreshed reviews, approval immutability, receiver identity/readback and a mocked Supabase round-trip. Live authenticated database verification and browser/Playwright validation have not been performed.
