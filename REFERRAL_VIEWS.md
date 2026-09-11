# Referrals and coordination

- Referrals represent patient consultations; department coordination represents a specific shared question/action. Each page filters its own record kind and retains the existing connected status and response workflow.
- Pin a doctor as the default referral filter in this browser. Received uses assigned clinician; Sent uses the recorded requesting clinician. Pinning is a display preference, not authentication or permissions.
- Select All doctors / department view plus a department to see its full queue, including team-assigned work. In Received the department is the receiver; in Sent it is the sender.
- Counts on Received/Sent respect clinician, department, search and requested-date filters. The pending count shows distinct patients and unfinished consultations/actions before the status filter. It does not claim a patient is unseen; existing statuses do not record a separate seen event.
- Dates use IST: today, yesterday, last seven/thirty days and inclusive custom calendar dates. Filters, direction, pagination and the open detail record are URL-backed.
- Historical records without a recorded sender stay visible in department/all-doctor views but are not falsely attributed to a named doctor’s Sent list.
- Patient Back uses the actual preceding browser entry, with a safe list fallback for direct links. Referral links also carry their return URL and label; returning restores filters and an open referral drawer. Other source pages retain whatever state those pages already persist.

No database migration or synthetic clinical record changes are required. Pin preferences are browser-local; clinical assignments and responses still use the existing shared workflow persistence.
