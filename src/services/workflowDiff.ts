import type { WorkflowState } from '../domain/workflow';
import type { PatientHistory } from '../domain/longitudinal';

// Every command mutates the WorkflowState tree in one of three ways, and this
// module leans on that instead of a generic positional diff (which would treat
// most of an array as "changed" after a single unshift):
//   - append-only arrays (commands, audit, notes): new tail elements only.
//   - prepend-only arrays (timeline): new head elements only.
//   - id-keyed arrays (patients, discharges, handovers, reports, encounters,
//     orders, requests, work_items): new-or-changed records, upserted by id.
// vitals/medications/immunizations/context are never mutated post-seed, so they
// never appear in a patch.

export interface HistoryPatch {
  patient_id: string;
  full?: PatientHistory;
  encounters?: PatientHistory['encounters'];
  orders?: PatientHistory['orders'];
  requests?: PatientHistory['requests'];
  work_items?: PatientHistory['work_items'];
  notes?: PatientHistory['notes'];
  timeline?: PatientHistory['timeline'];
}

export interface WorkflowStatePatch {
  hospital_id: string;
  schema_version: 1;
  expected_revision: number;
  revision: number;
  patients?: WorkflowState['patients'];
  discharges?: WorkflowState['discharges'];
  handovers?: WorkflowState['handovers'];
  reports?: { upsert?: WorkflowState['reports']; order?: string[] };
  histories?: HistoryPatch[];
  reviews?: WorkflowState['reviews'];
  update_receipts?: NonNullable<WorkflowState['update_receipts']>;
  commands: string[];
  audit: WorkflowState['audit'];
}

function diffKeyed<T extends { id: string }>(prev: T[], next: T[]): T[] | undefined {
  const before = new Map(prev.map(item => [item.id, item]));
  const changed = next.filter(item => JSON.stringify(before.get(item.id)) !== JSON.stringify(item));
  return changed.length ? changed : undefined;
}

function diffAppend<T>(prev: T[], next: T[]): T[] | undefined {
  const added = next.slice(prev.length);
  return added.length ? added : undefined;
}

function diffPrepend<T>(prev: T[], next: T[]): T[] | undefined {
  const count = next.length - prev.length;
  return count > 0 ? next.slice(0, count) : undefined;
}

function diffRecord<T>(prev: Record<string, T> | undefined, next: Record<string, T> | undefined): Record<string, T> | undefined {
  if (!next) return undefined;
  const changed: Record<string, T> = {};
  let any = false;
  for (const [key, value] of Object.entries(next)) {
    if (JSON.stringify(prev?.[key]) !== JSON.stringify(value)) { changed[key] = value; any = true; }
  }
  return any ? changed : undefined;
}

export function diffWorkflowState(prev: WorkflowState, next: WorkflowState): WorkflowStatePatch {
  const patch: WorkflowStatePatch = {
    hospital_id: next.hospital_id, schema_version: 1,
    expected_revision: prev.revision, revision: next.revision,
    commands: diffAppend(prev.commands, next.commands) ?? [],
    audit: diffAppend(prev.audit, next.audit) ?? [],
  };

  const patients = diffKeyed(prev.patients, next.patients);
  if (patients) patch.patients = patients;
  const discharges = diffKeyed(prev.discharges, next.discharges);
  if (discharges) patch.discharges = discharges;
  const handovers = diffKeyed(prev.handovers, next.handovers);
  if (handovers) patch.handovers = handovers;

  const reportsUpsert = diffKeyed(prev.reports, next.reports);
  const reportsReordered = prev.reports.map(report => report.id).join(',') !== next.reports.map(report => report.id).join(',');
  if (reportsUpsert || reportsReordered) {
    patch.reports = {
      ...(reportsUpsert ? { upsert: reportsUpsert } : {}),
      ...(reportsReordered ? { order: next.reports.map(report => report.id) } : {}),
    };
  }

  const prevHistories = new Map(prev.histories.map(history => [history.context.patient_id, history]));
  const histories: HistoryPatch[] = [];
  for (const history of next.histories) {
    const before = prevHistories.get(history.context.patient_id);
    if (!before) { histories.push({ patient_id: history.context.patient_id, full: history }); continue; }
    const entry: HistoryPatch = { patient_id: history.context.patient_id };
    let changed = false;
    const encounters = diffKeyed(before.encounters, history.encounters); if (encounters) { entry.encounters = encounters; changed = true; }
    const orders = diffKeyed(before.orders, history.orders); if (orders) { entry.orders = orders; changed = true; }
    const requests = diffKeyed(before.requests, history.requests); if (requests) { entry.requests = requests; changed = true; }
    const workItems = diffKeyed(before.work_items, history.work_items); if (workItems) { entry.work_items = workItems; changed = true; }
    const notes = diffAppend(before.notes, history.notes); if (notes) { entry.notes = notes; changed = true; }
    const timeline = diffPrepend(before.timeline, history.timeline); if (timeline) { entry.timeline = timeline; changed = true; }
    if (changed) histories.push(entry);
  }
  if (histories.length) patch.histories = histories;

  const reviews = diffRecord(prev.reviews, next.reviews);
  if (reviews) patch.reviews = reviews;
  const receipts = diffRecord(prev.update_receipts, next.update_receipts);
  if (receipts) patch.update_receipts = receipts;

  return patch;
}

function upsertInto<T extends { id: string }>(arr: T[], items: T[]) {
  for (const item of items) {
    const idx = arr.findIndex(existing => existing.id === item.id);
    if (idx === -1) arr.push(item); else arr[idx] = item;
  }
}

/**
 * Reference implementation of what save_demo_workflow_patch applies server-side —
 * used as the round-trip oracle in tests, and as the spec the SQL mirrors.
 */
export function applyWorkflowPatch(state: WorkflowState, patch: WorkflowStatePatch): WorkflowState {
  const next = structuredClone(state);
  if (patch.patients) upsertInto(next.patients, patch.patients);
  if (patch.discharges) upsertInto(next.discharges, patch.discharges);
  if (patch.handovers) upsertInto(next.handovers, patch.handovers);
  if (patch.reports?.upsert) upsertInto(next.reports, patch.reports.upsert);
  if (patch.reports?.order) {
    const byId = new Map(next.reports.map(report => [report.id, report]));
    next.reports = patch.reports.order.map(id => byId.get(id)!);
  }
  for (const entry of patch.histories ?? []) {
    if (entry.full) {
      const idx = next.histories.findIndex(history => history.context.patient_id === entry.patient_id);
      if (idx === -1) next.histories.push(entry.full); else next.histories[idx] = entry.full;
      continue;
    }
    const history = next.histories.find(history => history.context.patient_id === entry.patient_id);
    if (!history) throw new Error('Patch target not found');
    if (entry.encounters) upsertInto(history.encounters, entry.encounters);
    if (entry.orders) upsertInto(history.orders, entry.orders);
    if (entry.requests) upsertInto(history.requests, entry.requests);
    if (entry.work_items) upsertInto(history.work_items, entry.work_items);
    if (entry.notes) history.notes.push(...entry.notes);
    if (entry.timeline) history.timeline.unshift(...entry.timeline);
  }
  if (patch.reviews) Object.assign(next.reviews, patch.reviews);
  if (patch.update_receipts) { next.update_receipts ??= {}; Object.assign(next.update_receipts, patch.update_receipts); }
  next.commands.push(...patch.commands);
  next.audit.push(...patch.audit);
  next.revision = patch.revision;
  return next;
}
