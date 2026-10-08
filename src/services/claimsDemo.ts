import { claimCaseSchema, claimFormSchema, claimsWorklistSchema, type ClaimAction, type ClaimCase, type ClaimDocument, type ClaimsWorklist, type InsurerMessage } from '../domain/claims';
import type { WorkflowState } from '../domain/workflow';

export const CLAIM_DEMO_UHID = 'F-DEMO-0090';
export const CLAIM_DEMO_NUMBERS = [90, 60, 70, 80, 100, 52, 63, 74, 85, 96];
export const claimStatusLabels: Record<ClaimCase['status'], string> = {
  draft: 'Ready to prepare', needs_documents: 'Documents pending', review: 'Internal review', submitted: 'Insurer review',
  query: 'Query received', response_review: 'Response review', response_submitted: 'Response submitted', authorised: 'Final authorised',
  settlement_submitted: 'Settlement submitted', payment_received: 'Payment received', completed: 'Completed · reconciled',
};
export const money = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
const uhidFor = (n: number) => `F-DEMO-${String(n).padStart(4, '0')}`;
const completedDiagnoses = ['Acute gastroenteritis with dehydration', 'Community-acquired pneumonia', 'Distal radius fracture — operative fixation', 'Ureteric calculus — ureteroscopy', 'Uncomplicated cellulitis'];
const initialStatuses: ClaimCase['status'][] = ['draft', 'needs_documents', 'review', 'query', 'authorised', 'completed', 'completed', 'completed', 'completed', 'completed'];

function sources(state: WorkflowState, uhid = CLAIM_DEMO_UHID) {
  const patient = state.patients.find(item => item.uhid === uhid);
  if (!patient) throw new Error(`Patient ${uhid} is unavailable. Restore the demo cohort before opening this claim.`);
  const number = Number(uhid.slice(-4));
  const index = CLAIM_DEMO_NUMBERS.indexOf(number);
  if (index < 0) throw new Error('Unknown claims demo patient.');
  const historical = index >= 5;
  const discharge = historical ? undefined : state.discharges.find(item => item.patient_id === patient.id && item.status !== 'cancelled');
  const history = state.histories.find(item => item.context.patient_id === patient.id);
  const encounter = historical ? undefined : history?.encounters.find(item => item.id === discharge?.encounter_id);
  const liveReport = historical ? undefined : state.reports.find(item => item.patient_id === patient.id && item.encounter_id === encounter?.id && item.kind === 'lab');
  if (!historical && (!discharge || !encounter || !liveReport)) throw new Error(`The demo needs ${patient.name}'s discharge record and admission-linked report.`);
  if (number === 90 && !discharge?.summary.trim()) throw new Error('The demo needs Mohan’s discharge summary before preparing the claim.');
  const encounterId = historical ? `90000000-0000-4000-8000-${String(number).padStart(12, '0')}` : encounter!.id;
  const diagnosis = historical ? completedDiagnoses[index - 5] : patient.conditions[0];
  const admissionDate = historical ? `2026-08-${String(10 + index - 5).padStart(2, '0')}` : encounter!.started_at.slice(0, 10);
  const dischargeDate = historical ? `2026-08-${String(14 + index - 5).padStart(2, '0')}` : discharge!.target_date;
  const doctor = historical ? 'Dr. Kavita Rao · synthetic attending' : encounter!.owner;
  const summary = historical
    ? `CLAIMS-ONLY SYNTHETIC PAST ADMISSION\nDiagnosis: ${diagnosis}\nAdmission: ${admissionDate}; discharge: ${dischargeDate}.\nCourse: inpatient assessment, investigations and ${index === 7 ? 'operative fixation with documented postoperative review' : index === 8 ? 'ureteroscopic intervention with postoperative observation' : 'conservative medical management'} completed.\nCondition at discharge: stable in this synthetic episode.\nFollow-up: treating department review in seven days; written discharge instructions provided.\nAttending: ${doctor}. Synthetic signed document fixture.\nThis episode is independent of the patient's current clinical admission.`
    : discharge!.summary.trim() || `SYNTHETIC CLAIMS SUMMARY — NOT A CLINICAL CHART UPDATE\nDiagnosis: ${diagnosis}\nClinical context: ${encounter!.reason}\nCare summary: ${encounter!.assessment}\nPrepared for the insurance demo; clinical review must be recorded in the claim workspace.\nThe existing discharge checklist remains unchanged.`;
  const reportBody = historical ? `SYNTHETIC INVESTIGATION REPORT\nEpisode: ${diagnosis}\nSample collected: ${admissionDate} 08:00 IST\nCBC: haemoglobin 12.8 g/dL; WBC 8.9 ×10³/µL; platelets 245 ×10³/µL.\nRenal panel: creatinine 0.9 mg/dL; sodium 138 mmol/L; potassium 4.1 mmol/L.\nMock report signed by Demo Pathology. Not a report from the current admission.`
    : `${liveReport!.findings}\n\n${liveReport!.observations.map(item => `${item.name}: ${item.value} ${item.unit} (reference ${item.reference})`).join('\n')}`;
  return { patient, index, historical, encounterId, diagnosis, admissionDate, dischargeDate, doctor, summary, reportBody,
    dischargeId: discharge?.id ?? null, summaryId: discharge?.id ?? `DEMO-DS-${number}`, reportId: liveReport?.id ?? `DEMO-LAB-${number}`,
    reportTitle: liveReport?.title ?? 'CBC and renal panel', reportSource: liveReport?.source ?? 'Demo pathology fixture' };
}
function fingerprint(state: WorkflowState, uhid: string) { return JSON.stringify(sources(state, uhid)); }

function formBody(claim: Pick<ClaimCase, 'form' | 'patient_name' | 'uhid' | 'admission_date' | 'discharge_date' | 'bill_total' | 'preauth_reference'>) {
  return `SYNTHETIC HOSPITAL CASHLESS CLAIM FORM\nPatient: ${claim.patient_name} · ${claim.uhid}\nPolicy: ${claim.form.policy_number}\nMember: ${claim.form.member_id}\nRelationship: ${claim.form.relationship}\nAdmission: ${claim.admission_date} (${claim.form.admission_type})\nDischarge: ${claim.discharge_date}\nRoom category: ${claim.form.room_category}\nTreating doctor: ${claim.form.treating_doctor}\nDiagnosis: ${claim.form.diagnosis}\nTreatment / procedure: ${claim.form.procedure}\nPre-authorisation: ${claim.preauth_reference}\nFinal bill: ${money(claim.bill_total)}\nDeclaration: details and supporting records subject to staff verification.\nHospital signatory: Demo Insurance Desk (synthetic fixture).`;
}

export function seedClaim(state: WorkflowState, uhid = CLAIM_DEMO_UHID): ClaimCase {
  const source = sources(state, uhid);
  const { patient, index, historical, encounterId, diagnosis, admissionDate, dischargeDate, doctor, summary } = source;
  const suffix = uhid.slice(-4);
  const bills = [68400, 124800, 98200, 86500, 42800, 36400, 78400, 138000, 116500, 52400];
  const bill = bills[index];
  const pharmacy = index === 0 ? 18400 : Math.round(bill * .2 / 100) * 100;
  const room = index === 0 ? 24000 : Math.round(bill * .3 / 100) * 100;
  const consultation = index === 0 ? 8000 : Math.round(bill * .1 / 100) * 100;
  const investigation = index === 0 ? 12000 : Math.round(bill * .15 / 100) * 100;
  const consumables = index === 0 ? 6000 : 4000;
  const procedure = bill - pharmacy - room - consultation - investigation - consumables;
  const deduction = [4000, 3200, 2500, 4500, 1800, 1400, 2400, 3600, 2800, 1600][index];
  const preauth = index === 0 ? 60000 : Math.floor(bill * .8 / 1000) * 1000;
  const identity = `SYNTHETIC DEMO DOCUMENT\nPatient: ${patient.name} · ${patient.uhid}\nEpisode: ${encounterId}\nAdmission: ${admissionDate} · Discharge: ${dischargeDate}\n`;
  const doc = (id: string, kind: ClaimDocument['kind'], title: string, system: string, sourceId: string, body: string): ClaimDocument => ({
    id, kind, title, source: system, source_id: sourceId, patient_id: patient.id, encounter_id: encounterId, body: `${identity}\n${body}`, attached: false,
  });
  const form = { policy_number: `DEMO-POL-2026-${suffix}`, member_id: `DEMO-MEMBER-${suffix}`, relationship: index % 2 ? 'Spouse' : 'Self', admission_type: index % 2 ? 'Planned' as const : 'Emergency' as const,
    room_category: 'Single private room', treating_doctor: doctor, diagnosis, procedure: historical && index === 7 ? 'Operative fracture fixation' : historical && index === 8 ? 'Ureteroscopy' : 'As documented in the discharge summary' };
  const base = { form, patient_name: patient.name, uhid, admission_date: admissionDate, discharge_date: dischargeDate, bill_total: bill, preauth_reference: `DEMO-PA-${suffix}` };
  return claimCaseSchema.parse({
    ...base, schema_version: 1, id: `cashless-${suffix}`, version: 0, hospital_id: state.hospital_id, patient_id: patient.id, encounter_id: encounterId, discharge_id: source.dischargeId,
    diagnosis, department: historical ? ['Internal Medicine', 'Pulmonology', 'Orthopaedics', 'Urology', 'Internal Medicine'][index - 5] : patient.department,
    owner: ['Priya Sharma · Insurance desk', 'Amit Patel · Insurance desk', 'Neha Rao · Insurance desk'][index % 3],
    episode_label: historical ? 'Claims-only historical demo admission' : 'Current discharge · synthetic insurance case',
    insurer: ['Demo Care Insurance / Demo TPA', 'Demo Shield Insurance / Demo TPA', 'Demo Assurance / Demo TPA'][index % 3],
    member_id: form.member_id, preauth_amount: preauth, pharmacy_total: pharmacy, deduction,
    status: 'draft', narrative: '', response: '', source_fingerprint: fingerprint(state, uhid),
    documents: [
      doc('claim_form', 'claim_form', 'Hospital claim form', 'Prefilled demo form', `DEMO-FORM-${suffix}`, formBody(base)),
      doc('policy', 'policy', 'Policy & member card', 'Demo policy fixture', form.policy_number, `Policy: ${form.policy_number}\nMember: ${form.member_id}\nInsurer: synthetic demo payer\nCover period: 01 Jan–31 Dec 2026\nSum insured: ₹5,00,000\nRoom eligibility: single private room\nRelationship: ${form.relationship}\nIllustrative coverage only; no real eligibility verification.`),
      doc('consent', 'consent', 'Patient declaration & consent', 'Demo signed declaration', `DEMO-CONSENT-${suffix}`, `I authorise this hospital to share documents for this synthetic claim.\nPatient: ${patient.name}\nSignature: DEMO SIGNATURE PLACEHOLDER\nDate: ${admissionDate}\nThis is a mock declaration, not an actual patient signature or consent.`),
      doc('summary', 'summary', 'Discharge summary', historical || !state.discharges.find(item => item.id === source.dischargeId)?.summary.trim() ? 'Demo discharge document' : 'VDoc discharge record', source.summaryId, summary),
      doc('bill', 'bill', 'Itemised final bill', 'Demo billing fixture', `DEMO-BILL-${suffix}`, `Final bill: DEMO-BILL-${suffix}\nRoom & nursing: ${money(room)}\nConsultations: ${money(consultation)}\nInvestigations: ${money(investigation)}\nPharmacy: ${money(pharmacy)}\nConsumables: ${money(consumables)}\nProcedures / other services: ${money(procedure)}\nTOTAL: ${money(bill)}\nBilling signatory: Demo Accounts. All amounts illustrative.`),
      doc('investigation', 'investigation', source.reportTitle, source.reportSource, source.reportId, source.reportBody),
      doc('pharmacy', 'pharmacy', 'Itemised pharmacy bill', 'Demo billing fixture', `DEMO-PHARM-${suffix}`, `Illustrative billing categories, not medication orders:\nInpatient medicines: ${money(pharmacy - 6400)}\nIV preparations: ₹4,000\nDispensed medicines: ₹2,400\nTOTAL: ${money(pharmacy)}\nIncluded in final bill DEMO-BILL-${suffix}; not an additional charge.`),
      doc('prescription', 'prescription', 'Treatment & prescription record', 'Demo clinical attachment', `DEMO-RX-${suffix}`, `Diagnosis: ${diagnosis}\nTreatment record: see attached episode discharge summary.\nMedication reconciliation and discharge instructions: mock signed documentation for the insurance packet.\nTreating doctor: ${doctor}\nNo new medication order is created by this document.`),
      doc('preauth', 'preauth', 'Initial pre-authorisation', 'Demo insurer fixture', `DEMO-PA-${suffix}`, `Reference: DEMO-PA-${suffix}\nProvisional authorisation: ${money(preauth)}\nIssued for this episode after policy and medical review (synthetic).\nSubject to final bill and documents. This is not final authorisation or payment.`),
      ...(historical && [7, 8].includes(index) ? [doc('procedure', 'procedure', 'Procedure / operative note', 'Demo operative record', `DEMO-OT-${suffix}`, `Procedure: ${form.procedure}\nEpisode diagnosis: ${diagnosis}\nProcedure completed during this synthetic admission. Postoperative review documented in the summary.\nSurgeon: ${doctor}\nMock signed operative attachment; unrelated to current clinical care.`)] : []),
    ], events: [{ id: 'preauth-history', at: `${admissionDate}T05:00:00.000Z`, title: 'Eligibility checked & pre-authorisation received', detail: `${money(preauth)} provisional approval recorded for this admission. Synthetic insurer history.`, actor: 'Demo insurer / TPA', evidence: ['policy', 'preauth', 'consent'], tone: 'success' }],
    messages: [], submission: null, response_submission: null, settlement_submission: null, authorised_amount: null, patient_payable: null, settlement: 'pending',
    clinical_review: null, billing_review: null, bank_name: 'Demo Settlement Bank', paid_amount: null, patient_collected: null, utr: null, completed_at: null,
  });
}

export function claimBlockers(claim: ClaimCase): string[] {
  const required = ['summary', 'bill', 'investigation', 'preauth', 'claim_form', 'policy', 'consent', 'prescription'];
  const errors = required.filter(kind => !claim.documents.some(doc => doc.kind === kind && doc.attached)).map(kind => `${kind === 'investigation' ? 'Investigation report' : kind} not attached`);
  if (claim.documents.some(doc => doc.patient_id !== claim.patient_id || doc.encounter_id !== claim.encounter_id)) errors.push('Document patient or admission does not match');
  if (!claim.narrative.trim()) errors.push('Treatment narrative is required');
  if (!claimFormSchema.safeParse(claim.form).success) errors.push('Complete the claim form');
  return errors;
}

export function transitionClaim(current: ClaimCase, action: ClaimAction, state: WorkflowState, at = new Date().toISOString()): ClaimCase {
  const claim = structuredClone(claimCaseSchema.parse(current));
  const requireStatus = (...statuses: ClaimCase['status'][]) => { if (!statuses.includes(claim.status)) throw new Error('This action is no longer available. Refresh the claim.'); };
  const event = (title: string, detail: string, evidence: string[], tone: 'success' | 'attention' | 'info' = 'success', actor = claim.owner) => claim.events.push({ id: `event-${claim.version}-${claim.events.length}`, at, title, detail, actor, evidence, tone });
  const message = (kind: InsurerMessage['kind'], title: string, body: string) => { const id = `message-${kind}`; claim.messages.push({ id, kind, at, title, body }); return id; };
  const invalidateReviews = () => { claim.clinical_review = null; claim.billing_review = null; };
  const suffix = claim.uhid.slice(-4);
  if (action.type === 'prepare') {
    requireStatus('draft', 'needs_documents', 'review');
    const fresh = seedClaim(state, claim.uhid);
    claim.documents = fresh.documents.map(doc => ({ ...doc, attached: !['investigation', 'pharmacy'].includes(doc.kind) || Boolean(claim.documents.find(old => old.id === doc.id)?.attached) }));
    claim.source_fingerprint = fresh.source_fingerprint;
    claim.diagnosis = fresh.diagnosis; claim.admission_date = fresh.admission_date; claim.discharge_date = fresh.discharge_date; claim.patient_name = fresh.patient_name;
    claim.form = fresh.form; claim.member_id = fresh.member_id;
    claim.narrative = `${fresh.diagnosis}.\n${sources(state, claim.uhid).summary}`;
    invalidateReviews(); claim.status = claimBlockers(claim).length ? 'needs_documents' : 'review';
    event('Patient and admission matched', `${claim.uhid} · ${claim.encounter_id}`, ['claim_form']);
    event('Claim form filled & documents assembled', 'Policy, declaration, summary, final bill, treatment record and provisional authorisation attached.', ['claim_form', 'summary', 'bill']);
    event(claim.status === 'review' ? 'Packet ready for review' : 'Investigation report needs attachment', 'A matching report is available for this admission. Inspect the source before review.', ['investigation'], claim.status === 'review' ? 'success' : 'attention');
  } else if (action.type === 'attach_report') {
    requireStatus('needs_documents'); claim.documents.find(doc => doc.kind === 'investigation')!.attached = true;
    invalidateReviews(); claim.status = claimBlockers(claim).length ? 'needs_documents' : 'review';
    event('Investigation report attached', 'Patient and encounter identifiers match the claim.', ['investigation']);
  } else if (action.type === 'edit' || action.type === 'edit_form') {
    requireStatus('needs_documents', 'review', ...(action.type === 'edit' ? ['response_review' as const] : []));
    if (action.type === 'edit_form') {
      claim.form = claimFormSchema.parse(action.fields); claim.member_id = claim.form.member_id;
      claim.documents.find(doc => doc.kind === 'claim_form')!.body = formBody(claim);
    } else {
      if (!action.text.trim()) throw new Error('Review text cannot be empty.');
      if (claim.status === 'response_review') claim.response = action.text.trim(); else claim.narrative = action.text.trim();
    }
    invalidateReviews();
    event('Packet updated — review required', 'Saved changes invalidate previous internal approvals.', [claim.status === 'response_review' ? 'response' : 'claim_form'], 'info');
  } else if (action.type === 'review_clinical' || action.type === 'review_billing') {
    requireStatus('review');
    if (action.reviewed_version !== claim.version) throw new Error('The packet changed. Review the latest version.');
    if (claimBlockers(claim).length) throw new Error(claimBlockers(claim).join('; '));
    if (fingerprint(state, claim.uhid) !== claim.source_fingerprint) throw new Error('The patient source records changed. Refresh the packet and review it again.');
    if (action.type === 'review_clinical') { claim.clinical_review = at; event('Clinical documents reviewed', 'Diagnosis, summary and investigation attachments checked for this claim. This does not change clinical discharge clearance.', ['summary', 'investigation'], 'success', `${claim.form.treating_doctor} · demo reviewer`); }
    else { claim.billing_review = at; event('Billing & policy review complete', 'Final bill, membership details and claim form checked. Final payable amount remains the insurer’s decision.', ['bill', 'claim_form', 'policy'], 'success', 'Demo billing reviewer'); }
  } else if (action.type === 'submit') {
    if (claim.submission) return current;
    requireStatus('review');
    if (action.reviewed_version !== claim.version) throw new Error('The packet changed. Review the latest version before submitting.');
    if (fingerprint(state, claim.uhid) !== claim.source_fingerprint) throw new Error('The patient source records changed. Refresh the packet and review it again.');
    const blockers = claimBlockers(claim); if (blockers.length) throw new Error(blockers.join('; '));
    if (!claim.clinical_review || !claim.billing_review) throw new Error('Clinical and billing reviews are required before submission.');
    claim.submission = { reference: action.insurer_ref ?? `DEMO-CLM-${suffix}-${claim.version}`, at, version: claim.version, narrative: claim.narrative, documents: structuredClone(claim.documents.filter(doc => doc.attached)) };
    claim.status = 'submitted';
    const id = message('receipt', 'Final bill request received', `Reference: ${claim.submission.reference}\nBill: ${money(claim.bill_total)}\n${claim.submission.documents.length} documents received by the demo insurer.\nAwaiting final authorisation; this receipt is not approval.`);
    event('Reviewed claim submitted', 'Clinical and billing reviews completed; staff approved this packet.', [id, 'packet']);
  } else if (action.type === 'send_query') {
    requireStatus('submitted'); claim.status = 'query';
    const id = message('query', 'Additional information required', `${action.note?.trim() || `Please provide the itemised pharmacy bill supporting the ${money(claim.pharmacy_total)} pharmacy charge in final bill DEMO-BILL-${suffix}.`}`);
    event('Insurer requested pharmacy breakup', 'Demo insurer query · staff response needed.', [id], 'attention', 'Demo insurer / TPA');
  } else if (action.type === 'prepare_response') {
    requireStatus('query'); claim.status = 'response_review'; claim.documents.find(doc => doc.kind === 'pharmacy')!.attached = true;
    claim.response = `Regarding ${claim.submission!.reference}: attached is pharmacy bill DEMO-PHARM-${suffix}, total ${money(claim.pharmacy_total)}, included in final bill DEMO-BILL-${suffix}. Please review the breakup for final authorisation.`;
    event('Query response prepared', 'Matching pharmacy bill located and attached. Staff review is required.', ['pharmacy', 'response']);
  } else if (action.type === 'submit_response') {
    if (claim.response_submission) return current;
    requireStatus('response_review');
    if (action.reviewed_version !== claim.version) throw new Error('The response changed. Review the latest version.');
    if (!claim.response.trim() || !claim.documents.some(doc => doc.kind === 'pharmacy' && doc.attached && doc.patient_id === claim.patient_id && doc.encounter_id === claim.encounter_id)) throw new Error('A response and matching pharmacy bill are required.');
    claim.response_submission = { reference: `${claim.submission!.reference}-R1`, at, version: claim.version, narrative: claim.response, documents: structuredClone(claim.documents.filter(doc => doc.kind === 'pharmacy' && doc.attached)) };
    claim.status = 'response_submitted';
    const id = message('response_receipt', 'Query response received', `Reference: ${claim.response_submission.reference}\nItemised pharmacy bill received. Awaiting final authorisation.`);
    event('Reviewed response submitted', 'The demo insurer acknowledged the supporting bill.', [id, 'response']);
  } else if (action.type === 'authorise') {
    requireStatus('submitted', 'response_submitted'); claim.status = 'authorised';
    claim.authorised_amount = claim.bill_total - claim.deduction; claim.patient_payable = claim.deduction;
    const id = message('authorisation', 'Final cashless authorisation', `DEMO AUTHORISATION — ${claim.submission!.reference}\nFinal bill: ${money(claim.bill_total)}\nAuthorised amount: ${money(claim.authorised_amount)}\nIllustrative non-payable items: ${money(claim.deduction)}\nPatient payable: ${money(claim.patient_payable)}\nNo additional co-pay or deductible in this synthetic policy.\nPayment settlement: pending. Clinical discharge remains a separate hospital decision.`);
    event('Final authorisation received', 'Final bill and authorised/patient amounts balance. Settlement is still pending.', [id, 'bill'], 'success', 'Demo insurer / TPA');
  } else if (action.type === 'submit_settlement') {
    requireStatus('authorised'); claim.status = 'settlement_submitted'; claim.settlement = 'submitted';
    claim.documents.forEach(doc => { doc.attached = true; });
    claim.settlement_submission = { reference: `DEMO-SET-${suffix}`, at, version: claim.version, narrative: `Settlement packet for ${claim.submission!.reference}. Final authorised amount: ${money(claim.authorised_amount!)}.`, documents: structuredClone(claim.documents) };
    const id = message('settlement_receipt', 'Settlement packet acknowledged', `Settlement reference: DEMO-SET-${suffix}\nClaim: ${claim.submission!.reference}\nHospital claim form, final authorisation, summary and ${claim.documents.length} supporting documents received.\nPayable to hospital: ${money(claim.authorised_amount!)}\nThis is a synthetic electronic settlement acknowledgement; no bank payment has occurred.`);
    event('Settlement packet sent to payer', 'Hospital accounts submitted the complete supporting documents after final authorisation.', [id, 'settlement_packet', 'bill'], 'success', 'Demo hospital accounts');
  } else if (action.type === 'receive_payment') {
    requireStatus('settlement_submitted'); claim.status = 'payment_received'; claim.settlement = 'received';
    claim.paid_amount = claim.authorised_amount; claim.utr = `DEMO-UTR-${suffix}-${at.slice(0, 10).replaceAll('-', '')}`;
    const id = message('remittance', 'Insurer remittance advice', `DEMO PAYMENT — no real bank transfer\nClaim: ${claim.submission!.reference}\nUTR: ${claim.utr}\nReceiving bank: ${claim.bank_name}\nBeneficiary: Demo Hospital Accounts\nInsurer remitted: ${money(claim.paid_amount!)}\nValue date: ${at.slice(0, 10)}\nTDS / other adjustments: ₹0 in this demo scenario.\nAwaiting hospital accounts reconciliation.`);
    event('Insurer payment advice received', 'Match the remittance and patient receipt before closing the claim.', [id], 'info', `${claim.bank_name} · simulated remittance feed`);
  } else if (action.type === 'reconcile') {
    requireStatus('payment_received');
    if (claim.paid_amount !== claim.authorised_amount || claim.paid_amount! + claim.patient_payable! !== claim.bill_total || !claim.utr) throw new Error('Payment does not reconcile with the final bill. Accounts review required.');
    claim.patient_collected = claim.patient_payable; claim.status = 'completed'; claim.settlement = 'reconciled'; claim.completed_at = at;
    const id = message('reconciliation', 'Accounts reconciliation & patient receipt', `DEMO ACCOUNTS CLOSURE\nClaim: ${claim.submission!.reference}\nHospital bill: ${money(claim.bill_total)}\nInsurer payment: ${money(claim.paid_amount!)} · ${claim.utr}\nReceiving bank: ${claim.bank_name}\nPatient payment receipt: DEMO-RCPT-${suffix}\nPatient collected: ${money(claim.patient_collected!)}\nOutstanding balance: ₹0\nReconciled by Demo Accounts on ${at.slice(0, 10)}.\nMock payment receipts; no actual financial transaction or clinical discharge action.`);
    event('Claim completed & accounts reconciled', 'Insurer remittance and synthetic patient receipt cover the final bill. Outstanding balance is zero.', [id, 'message-remittance', 'bill'], 'success', 'Demo hospital accounts');
  }
  claim.version++; return claimCaseSchema.parse(claim);
}

export function seedWorklist(state: WorkflowState): ClaimsWorklist {
  const claims = CLAIM_DEMO_NUMBERS.map((number, index) => {
    let claim = seedClaim(state, uhidFor(number));
    const target = initialStatuses[index];
    if (target === 'draft') return claim;
    let tick = 0;
    const run = (action: ClaimAction) => {
      const date = new Date(`${claim.discharge_date}T05:00:00.000Z`); date.setUTCMinutes(date.getUTCMinutes() + tick++ * 12);
      if (action.type === 'receive_payment' || action.type === 'reconcile') date.setUTCDate(date.getUTCDate() + 10);
      claim = transitionClaim(claim, action, state, date.toISOString());
    };
    run({ type: 'prepare' }); if (target === 'needs_documents') return claim;
    run({ type: 'attach_report' }); if (target === 'review') return claim;
    run({ type: 'review_clinical', reviewed_version: claim.version }); run({ type: 'review_billing', reviewed_version: claim.version });
    run({ type: 'submit', reviewed_version: claim.version });
    if (target === 'query' || index % 2 === 0) {
      run({ type: 'send_query' }); if (target === 'query') return claim;
      run({ type: 'prepare_response' }); run({ type: 'submit_response', reviewed_version: claim.version });
    }
    run({ type: 'authorise' }); if (target === 'authorised') return claim;
    run({ type: 'submit_settlement' }); run({ type: 'receive_payment' }); run({ type: 'reconcile' }); return claim;
  });
  return claimsWorklistSchema.parse({ schema_version: 2, revision: 0, hospital_id: state.hospital_id, claims });
}

export const claimStorageKey = (hospitalId: string) => `vdoc.claims.demo.v2.${hospitalId}`;
export function readClaims(state: WorkflowState, storage: Pick<Storage, 'getItem'> = localStorage): ClaimsWorklist {
  const raw = storage.getItem(claimStorageKey(state.hospital_id));
  if (raw) {
    const list = claimsWorklistSchema.parse(JSON.parse(raw));
    if (list.hospital_id !== state.hospital_id) throw new Error('Claims belong to a different hospital.');
    return list;
  }
  const list = seedWorklist(state);
  // Preserve the first demo's work while adding the other nine records. Its original key is retained.
  const legacyRaw = storage.getItem(`vdoc.claims.demo.v1.${state.hospital_id}`);
  if (legacyRaw) {
    const legacy = JSON.parse(legacyRaw);
    const fresh = seedClaim(state);
    if (legacy.hospital_id !== state.hospital_id || legacy.id !== fresh.id) throw new Error('Legacy claim does not match this demo hospital.');
    const upgraded = claimCaseSchema.parse({ ...fresh, ...legacy,
      form: fresh.form, department: fresh.department, owner: fresh.owner, episode_label: fresh.episode_label,
      pharmacy_total: fresh.pharmacy_total, deduction: fresh.deduction,
      clinical_review: legacy.submission?.at ?? null, billing_review: legacy.submission?.at ?? null,
      documents: [...legacy.documents, ...fresh.documents.filter(doc => !legacy.documents.some((old: ClaimDocument) => old.id === doc.id)).map(doc => ({ ...doc, attached: legacy.status !== 'draft' }))],
    });
    list.claims[0] = upgraded;
  }
  return list;
}
export function readClaim(state: WorkflowState, storage: Pick<Storage, 'getItem'> = localStorage): ClaimCase { return readClaims(state, storage).claims[0]; }
export function saveClaimAction(state: WorkflowState, action: ClaimAction | { type: 'reset' }, expectedVersion: number, storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage, claimId = 'cashless-0090'): ClaimCase {
  const list = readClaims(state, storage);
  const current = list.claims.find(item => item.id === claimId);
  if (!current) throw new Error('Claim not found.');
  if (current.version !== expectedVersion) throw new Error('This claim changed in another window. Review the latest version.');
  const next = action.type === 'reset' ? { ...seedClaim(state, current.uhid), version: current.version + 1 } : transitionClaim(current, action, state);
  list.claims = list.claims.map(item => item.id === claimId ? next : item); list.revision++;
  storage.setItem(claimStorageKey(state.hospital_id), JSON.stringify(claimsWorklistSchema.parse(list))); return next;
}
export function resetClaims(state: WorkflowState, expectedRevision: number, storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage): ClaimsWorklist {
  const current = readClaims(state, storage);
  if (current.revision !== expectedRevision) throw new Error('Claims changed in another window. Refresh before resetting.');
  const next = seedWorklist(state); next.revision = current.revision + 1;
  next.claims.forEach(claim => { claim.version = Math.max(claim.version, current.claims.find(old => old.id === claim.id)?.version ?? 0) + 1; });
  storage.setItem(claimStorageKey(state.hospital_id), JSON.stringify(next)); return next;
}
