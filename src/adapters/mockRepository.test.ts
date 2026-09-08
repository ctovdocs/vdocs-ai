import { describe, expect, it } from 'vitest';
import { createMockRepository } from './mockRepository';
import { DEMO_HOSPITAL_ID, patients } from '../data/fixtures';

describe('shared clinical repository', () => {
  it('finds the same patient by copied UHID and by case-insensitive name', async () => {
    const repository = createMockRepository(DEMO_HOSPITAL_ID);
    const byUhid = await repository.listPatients(' F-DEMO-0001 ');
    expect(byUhid).toEqual(await repository.listPatients('rahul'));
    expect(byUhid).toHaveLength(1);
    const reports = await repository.listReports(byUhid[0].id);
    expect(reports.filter(report => report.kind === 'lab')).toHaveLength(5);
    expect(reports.filter(report => report.kind === 'imaging')).toHaveLength(2);
    expect(reports.every(report => report.patient_id === byUhid[0].id && report.order_id && report.encounter_id)).toBe(true);
  });

  it('does not expose patient or report fixtures from another hospital', async () => {
    const repository = createMockRepository('10000000-0000-4000-8000-000000000002');
    expect(await repository.listPatients()).toEqual([]);
    expect(await repository.getPatient(patients[0].id)).toBeNull();
    expect(await repository.listReports(patients[0].id)).toEqual([]);
  });

  it('does not leak changes to a retrieved fixture into subsequent requests', async () => {
    const repository = createMockRepository(DEMO_HOSPITAL_ID);
    const patient = await repository.getPatient(patients[0].id);
    patient!.conditions.push('Unapproved mutation');
    expect((await repository.getPatient(patients[0].id))!.conditions).not.toContain('Unapproved mutation');
  });
});
