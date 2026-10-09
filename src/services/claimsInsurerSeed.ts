import type { ClaimCase } from '../domain/claims';
import type { InsurerClaimRecord, InsurerReceipt, SubmissionRequest } from '../domain/insurer';
import type { WorkflowState } from '../domain/workflow';
import { buildSubmission, fetchInsurerClaim, insurerEventFor, isInsurerReference, requestInsurerDocument, sendClaimToInsurer, sendInsurerEvent, sendResponseToInsurer } from './claimsExport';

/** The slice of the insurer service that replay needs. The default talks HTTP; tests plug the store in directly. */
export interface InsurerClient {
  send(request: SubmissionRequest): Promise<InsurerReceipt>;
  respond(ref: string, request: SubmissionRequest): Promise<InsurerReceipt>;
  get(ref: string): Promise<InsurerClaimRecord>;
  query(ref: string, note: string, at: string): Promise<unknown>;
  event(ref: string, event: Parameters<typeof sendInsurerEvent>[1]): Promise<unknown>;
}
export const httpInsurerClient: InsurerClient = {
  send: sendClaimToInsurer, respond: sendResponseToInsurer, get: fetchInsurerClaim,
  query: (ref, note, at) => requestInsurerDocument(ref, 'pharmacy', note, at), event: sendInsurerEvent,
};

/** Claims that were seeded past submission with a demo reference and have never been sent to the insurer service. */
export const needsInsurerSeed = (claim: ClaimCase) => Boolean(claim.submission) && !isInsurerReference(claim.submission!.reference);

const eventSteps = [
  ['authorisation', 'authorise', 'authorisation'], ['settlement_receipt', 'submit_settlement', 'settlement'],
  ['remittance', 'receive_payment', 'payment'], ['reconciliation', 'reconcile', 'reconciliation'],
] as const;

/**
 * Replays one seeded claim into the insurer service exactly as a live submission would have gone: the saved packet and PDFs,
 * the query, the response, then each insurer decision, all stamped with the claim's own timeline. Safe to run repeatedly
 * (the service dedupes the packet by claim and version) and resumes a partly replayed claim. Returns the insurer's reference.
 */
export async function replayClaimToInsurer(claim: ClaimCase, state: WorkflowState, client: InsurerClient): Promise<string> {
  const packet = claim.submission!;
  const receipt = await client.send(await buildSubmission(claim, state, 'initial', packet));
  const ref = receipt.claim_ref;
  const record = await client.get(ref);
  const done = new Set((record.events ?? []).map(event => event.kind));
  const query = claim.messages.find(message => message.kind === 'query');
  if (query && !done.has('query')) await client.query(ref, query.body, query.at);
  if (claim.response_submission && !done.has('response')) await client.respond(ref, await buildSubmission(claim, state, 'response', claim.response_submission));
  for (const [messageKind, action, kind] of eventSteps) {
    const message = claim.messages.find(item => item.kind === messageKind);
    const event = insurerEventFor(action, claim);
    if (message && event && !done.has(kind)) await client.event(ref, { ...event, at: message.at });
  }
  return ref;
}
