# Investigation ordering and referral workflow

## Catalog scope

The demo contains 122 laboratory investigations/panels, 58 imaging studies and 27 receiving departments. This is a curated, extensible demonstration catalog, not every possible test, a licensed terminology dataset, a clinical protocol, or a verified Fortis service directory.

Public primary references used for category research:
- [Dr Lal PathLabs reference guide](https://refguide.lalpathlabs.com/wp/) provides a searchable test directory.
- [Dr Lal PathLabs stool culture](https://www.lalpathlabs.com/test/pathology/culture-stool/hyderabad) supports stool culture as a catalog example.
- [RCPA APTT reference](https://www.rcpa.edu.au/Manuals/RCPA-Manual/Pathology-Tests/A/APTT) supports the APTT terminology.
- [AIIMS radiodiagnosis outpatient services](https://www.aiims.edu/index.php/en/2014-11-05-10-00-53/outpatient-services/119-radio-diagnosis) describes ultrasound, CT and MRI modalities.
- [Apollo Delhi departments](https://www.apollohospitals.com/delhi/departments) provides examples of multispecialty hospital services, not evidence of Fortis capabilities.

Individual catalog entries are authored demo examples; preparation, specimen containers/volumes, test availability, panel composition, turnaround time, billing codes, radiology protocols and safety screening require local service validation. No prices or treatment recommendations are included. Echocardiography is grouped with imaging for demonstration; actual ownership/routing must be configured by the hospital.

## Doctor flow

1. Open a patient or start from the Lab / Imaging order list and select an active patient.
2. Search by test name, abbreviation, specimen or category. Add multiple items across categories, e.g. a blood panel, urine test and stool test.
3. Review the basket. Add per-investigation site, collection details or instructions. Missing catalog items can be entered as custom orders with a specimen or modality.
4. Enter the shared clinical indication and priority. Submit up to 30 items atomically.
5. Each investigation receives an independent order ID, pending status, encounter/hospital scope, source-system metadata and timeline reference. Orders placed together share a batch ID.
6. View them in the patient record and investigation queue. The order drawer retains site, specimen/modality, instructions and sibling orders.
7. A receiving service uses the existing `order.status` and `order.publish` commands. Publishing links a report to that specific order; other items remain pending. Results require separate clinician review and participate in discharge blockers and handover context.

Exact-title pending duplicates and duplicate items in one basket are rejected. This is not a panel-overlap checker or support for repeated timed specimens of the same test. Use separate submissions for different priority/indication. Structured scheduling, accessioning, specimen rejection, partial panel reporting and production radiology safety screening remain future work.

## Referrals and department requests

Select a receiving department independently of whether it already has synthetic patients. Choose a named clinician/team, purpose, urgency, clinical question, callback contact and current or historical report attachments. The requester identity is retained. Identical open requests are rejected; different clinical questions are allowed.

Received → Accepted → In progress → Completed with response → Requester reviewed. The existing workflow enforces the sequence. Cancellation requires a reason. A referral does not transfer the admission or grant discharge clearance. The department filter includes all demo receiving services.

## Persistence and separate applications

The current app is configured for Supabase mode. `dispatchWorkflow` reads the hospital snapshot and commits the complete next state with `save_demo_workflow(target_hospital, expected_revision, next_state)`. One basket produces one revision and one atomic database save; a failure does not retain part of the basket or show success. Conflict retries use the same command ID.

**The authoritative live database record is `public.demo_workflow_state.state`, not the bootstrap `demo_orders` or `demo_requests` tables.** Live orders are under `state.histories[].orders`, requests under `state.histories[].requests`, and reports under `state.reports`. New optional metadata lives in that JSON, so this change needs no additional SQL columns. Existing migration 003 and authenticated hospital membership are required.

Future HIS/Lab/Imaging repositories must read that shared workflow state and use the same command/compare-and-swap contract. Writing only to bootstrap source tables will not update VDoc's existing snapshot. Do not independently increment revisions for every basket item or overwrite a stale snapshot. Publishable client keys require authenticated membership; never place service-role keys in a frontend.

Local preview mode remains browser persistence only, explicitly labelled in the ordering modal. Successful mutations invalidate shared queries; other open sessions poll for updates. Separate source apps are not built or reintroduced by this change.

## Validation

Automated tests cover catalog identity, atomic multi-order placement, independent result publication, replay idempotency, duplicates, invalid catalog/custom entries, extended referral data, and a mocked Supabase RPC write/read contract including database failures. No live authenticated database write or browser automation was performed during this implementation.
