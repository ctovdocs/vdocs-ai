import { patients, reports, histories } from '../data/fixtures';
import type { ClinicalRepository } from '../domain/models';

export function createMockRepository(hospitalId: string): ClinicalRepository {
  return {
    async listPatients(search = '') {
      const query = search.trim().toLowerCase();
      return structuredClone(patients.filter(patient =>
        patient.hospital_id === hospitalId &&
        `${patient.name} ${patient.uhid}`.toLowerCase().includes(query),
      ));
    },
    async getPatient(patientId) {
      return structuredClone(patients.find(patient => patient.hospital_id === hospitalId && patient.id === patientId) ?? null);
    },
    async listReports(patientId) {
      return structuredClone(reports.filter(report => report.hospital_id === hospitalId && report.patient_id === patientId));
    },
    async getHistory(patientId) {
      return structuredClone(histories.find(history => history.context.hospital_id === hospitalId && history.context.patient_id === patientId) ?? null);
    },
  };
}
