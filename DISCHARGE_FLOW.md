# Explicit discharge routing

- Clinical readiness or a discharge-related task alone never enrols a patient.
- The doctor selects **Send to discharge process** in the patient workspace, or selects a patient through the discharge queue's send action.
- This creates a persistent, audited `planned` entry for the active IPD encounter. The patient leaves the dashboard's normal patient counts/table and patient directory, including OPD/IPD directory shortcuts.
- Processing moves through `planned`, `in_progress`, and `ready`. Ready means ready within an already initiated process, not automatic admission to this queue.
- Patients remain admitted until **Complete discharge** passes the existing checks. Results, requests, clinical alerts, handovers and patient records remain available throughout.
- Cancelling planning restores the active patient to normal lists; cancellation history is separate from discharged history.
- Completed discharges appear under **Discharged**, searchable and filterable, with 10 records per page by default. A previous admission's discharge does not hide a new active admission.
- The 20 synthetic expansion entries represent previously initiated processes, not patients selected automatically by acuity or readiness.

All views use the shared workflow snapshot and refresh after mutations. Source HIS lookup and patient record APIs retain access to every patient; only the normal worklist is filtered.

Compatibility: the old untouched, deterministic planning fixtures for the original cohort are removed on load because they were inferred from generic tasks. Edited or audited records, explicit doctor-created entries, historical discharges and the 20 initiated expansion fixtures are preserved. No patient or clinical record is deleted.
