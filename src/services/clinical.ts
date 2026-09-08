import { readWorkflow } from './workflowStore';

export const patientService = {
  async search(search = '') {
    const query = search.trim().toLowerCase();
    return (await readWorkflow()).patients.filter(patient => `${patient.name} ${patient.uhid}`.toLowerCase().includes(query));
  },
  async get(patientId: string) { return (await readWorkflow()).patients.find(patient => patient.id === patientId) ?? null; },
  async history(patientId: string) { return (await readWorkflow()).histories.find(history => history.context.patient_id === patientId) ?? null; },
};

export const labService = {
  async listReports(patientId: string) {
    return (await readWorkflow()).reports.filter(report => report.patient_id === patientId && report.kind === 'lab');
  },
};

export const imagingService = {
  async listReports(patientId: string) {
    return (await readWorkflow()).reports.filter(report => report.patient_id === patientId && report.kind === 'imaging');
  },
};
