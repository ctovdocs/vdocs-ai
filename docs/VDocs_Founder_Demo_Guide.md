# VDoc Demo Guide for Founders

*Two flows: Discharge Summary and Cashless Claim. Simple words, no tech needed.*

Live demo link: **https://vdoc-demo.vercel.app/app**

---

## 1. The big idea (30 seconds)

Hospital staff lose a lot of time on two paperwork jobs:

1. **Writing the discharge summary** when a patient goes home.
2. **Sending a cashless claim** to the insurance company and chasing it.

VDoc already holds the patient's data. So VDoc **fills these papers by itself**. Staff only **check, fix and approve**.

---

## 2. Flow One: Discharge Summary

### What is it?
The paper a patient takes home. It says what the illness was, what tests were done, what treatment was given, which medicines to take, and when to come back.

### How it works (5 steps)
1. **Start.** A patient is marked for discharge.
2. **Auto-fill.** VDoc opens the summary and fills it from the patient's records.
3. **Check and edit.** A nurse or doctor reads it, fixes it, and adds anything missing.
4. **Doctor signs.** Only a doctor can approve it.
5. **Download.** The signed summary is saved as a PDF for the patient. Only then can the patient be marked "discharged".

### What VDoc fills in by itself
- Name, age, ID number, date of birth, department, bed, doctor
- Diagnosis (the illness)
- Complaints and past history
- Test results, for example *Creatinine 2.7 → 1.2*
- Hospital course (what happened day by day, from the doctors' notes)
- Medicines with dose
- Vitals at the end (BP, pulse, temperature, oxygen)
- Advice on diet, activity and warning signs (**suggested**, staff can change it)

Next to each part, a small grey tag says **where the data came from**.

### What staff add by hand
Medicine duration, any procedure done, and anything the chart did not have.

### Good to know
- Address, phone and doctor registration number are **made-up demo values** (marked "synthetic").
- If anyone edits the summary after the doctor signs, the **signature is removed** and the doctor must sign again. This is like a real hospital.

---

## 3. Flow Two: Cashless Claim

### What is it?
When an insured patient is discharged, the hospital asks the insurance company to pay the bill directly. The hospital sends the papers, the insurer checks them, and money comes later.

### The journey of one claim
1. **Prepare.** VDoc gathers the patient details and the papers (summary, bill, test report and more).
2. **Review.** A doctor checks the medical papers. A billing person checks the bill. Both must approve.
3. **Submit.** The claim goes to the insurer. The insurer gives a **claim number**.
4. **Query (maybe).** The insurer may ask for one more paper, for example the pharmacy bill.
5. **Reply.** The hospital attaches it and answers.
6. **Approval.** The insurer approves an amount.
7. **Settlement.** The hospital sends the final papers.
8. **Payment.** The insurer pays.
9. **Close.** Hospital accounts match the payment with the bill. Done.

### What VDoc fills in by itself
Patient name, ID, policy and member number, diagnosis, dates, bill amount, and the PDF papers. A panel called **"Data sent to insurer"** shows each item and **where it came from**.

### The two-tab trick (the best moment)
Open **two browser tabs**:
- **Tab A: the hospital** (VDoc)
- **Tab B: the insurer** (a pretend insurance company called *Northwind Assurance*)

When the hospital clicks submit in Tab A, the **same fields and PDF files appear in Tab B**. This shows the data really moves from one side to the other.

---

## 4. What is real and what is pretend

| Real | Pretend (for the demo) |
|---|---|
| Patient data in VDoc | The insurance company "Northwind Assurance" |
| Auto-fill from that data | Insurer decisions and payments (we click buttons to simulate) |
| Real PDF files are made | Address, phone and doctor registration number |
| Files really travel to the insurer tab | Bank, payment ID |
| Checks on the files (file is a real PDF, nothing missing) | |

In real life, the pretend insurer would be replaced by a real insurer's system.

---

## 5. Demo video: where to click

**Before you record:** ask your tech teammate to start the app and clear the old insurer data (one command). Use a big screen, zoom 100%, and close other tabs.

### Video 1: Discharge Summary (about 3 minutes)

| # | Say | Click |
|---|---|---|
| 1 | "A patient is ready to go home." | Left menu → **Discharge list** |
| 2 | "Let's open Mohan." | Type **Mohan** in the search box → click **Open** |
| 3 | "VDoc has already prepared the summary." | Click **Prepare discharge summary** |
| 4 | "Everything is filled from his records. See the grey tags." | Scroll down slowly. Point at diagnosis, test results, medicines |
| 5 | "The nurse can add details from the side panel." | Right side → **Notes** tab → click **Insert** on a note |
| 6 | "Add a medicine in one click." | **Medications** tab → **Add to discharge list** |
| 7 | "Save it." | Top → **Save draft** |
| 8 | "A nurse cannot sign." | Top → switch **Doctor / Nurse** to **Nurse** (the Sign button is greyed) |
| 9 | "Only the doctor can." | Switch back to **Doctor** → **Sign off** → **Sign off** |
| 10 | "The patient gets a PDF." | **Preview PDF**, then **Download PDF** |
| 11 | "Now the patient can go home." | Click **← Discharge process** → **Complete discharge** → confirm |
| 12 | "Old discharges are all signed and saved." | Discharge list → **Discharged** tab → click any **Signed** |

*Quick extras:* Geeta, Poonam and Neelam have a **Draft** waiting for a doctor. Bipin, Nitin and Lata are already **Signed**.

### Video 2: Cashless Claim (about 5 minutes)

| # | Say | Click |
|---|---|---|
| 1 | "Here are all our claims and where each one is." | Left menu → **Cashless claims** |
| 2 | "Some are waiting, some have questions, some are paid." | Point at the **Stage** column |
| 3 | "Let's send a new one for Mohan." | Click **Mohan → Open claim** |
| 4 | "VDoc collects all papers." | **Prepare claim** → **Attach matching report** |
| 5 | "See what we send and where each item came from." | Open **Data sent to insurer** |
| 6 | "Doctor and billing person approve." | **Record clinical review**, **Record billing review** |
| 7 | "Final approval and send." | Tick the box → **Approve & submit claim** |
| 8 | "We get a claim number. Now look at the insurer's side." | Click **View in insurer portal** (opens a new tab) |
| 9 | "The same data and PDFs arrived." | Show the fields, click a document to open it |
| 10 | "The insurer asks for one more paper." | Insurer tab → **Request document** |
| 11 | "The hospital sees the question at once." | Go back to the hospital tab (shows **Query received**) |
| 12 | "Attach and reply." | **Prepare response** → tick the box → **Approve & send response** |
| 13 | "The insurer sees the answer on the same claim." | Insurer tab: open **History** |
| 14 | "Insurer approves, hospital sends final papers, insurer pays." | Hospital tab, bottom: **Presenter controls** → **Issue final authorisation** → **Submit settlement packet** → **Simulate insurer payment** → **Confirm demo receipts & reconcile** |
| 15 | "Done. The full story is saved." | Insurer tab → **History**, and the patient's page |

*Already in the middle:* Rohit (waiting on insurer), Anita (insurer has a question), Lata (approved), Shweta (waiting for payment), Vivek (paid, needs closing). Use them to show "this is what a real busy day looks like".

### Tips for the video
- Move the mouse slowly. Pause 2 seconds on each new screen.
- Keep the Doctor / Nurse switch visible. It shows who is allowed to do what.
- If a click does nothing, wait 2 seconds and click again.
- To repeat the demo: on the Claims page open **Presenter controls** → **Restore 10 demo records**.

---

## 6. What to say about the future (ideas, not built yet)

- Connect to the hospital's real software, so no one types patient data again.
- Connect to real insurers (through their system or a robot that fills their website).
- Send the discharge PDF to the patient on WhatsApp.
- Use the doctor's real profile and stamp for signing.
- Support Hindi and other languages in the PDF.

---

## 7. One-line summary for investors

**"VDoc fills the two most painful hospital papers by itself, and a doctor only has to check and sign. Claims travel to the insurer and come back with a trail anyone can verify."**
