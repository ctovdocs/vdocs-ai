import type { Department } from './scenarios';

export type VitalKey = 'systolic' | 'diastolic' | 'pulse' | 'respiratory_rate' | 'spo2' | 'temperature_c';

export type SpecialtyFocus = {
  label: string;
  relevantLabs: string[];
  relevantVitals: VitalKey[];
};

export const GENERAL_LENS = 'General';

export const specialtyFocus: Record<Department, SpecialtyFocus> = {
  'Internal Medicine': {
    label: 'Internal Medicine',
    relevantLabs: ['Creatinine', 'Potassium', 'Haemoglobin', 'HbA1c', 'Glucose', 'Ferritin', 'WBC', 'Platelets', 'Bicarbonate', 'Venous pH', 'Beta-hydroxybutyrate', 'Lactate'],
    relevantVitals: ['spo2', 'temperature_c', 'pulse'],
  },
  Cardiology: {
    label: 'Cardiology',
    relevantLabs: ['High-sensitivity troponin I', 'NT-proBNP', 'INR', 'Sodium', 'Potassium', 'Haemoglobin'],
    relevantVitals: ['systolic', 'diastolic', 'pulse'],
  },
  Gastroenterology: {
    label: 'Gastroenterology',
    relevantLabs: ['Total bilirubin', 'ALP', 'Lipase', 'Triglycerides', 'INR', 'Platelets', 'Calcium', 'Haemoglobin', 'Lactate'],
    relevantVitals: ['pulse', 'temperature_c', 'spo2'],
  },
  Nephrology: {
    label: 'Nephrology',
    relevantLabs: ['Creatinine', 'Potassium', 'Bicarbonate', 'Urea', 'Sodium', 'Serum osmolality'],
    relevantVitals: ['systolic', 'diastolic', 'pulse'],
  },
  Orthopaedics: {
    label: 'Orthopaedics',
    relevantLabs: ['Haemoglobin', 'Lactate', 'CRP', 'WBC', 'Creatinine'],
    relevantVitals: ['pulse', 'spo2', 'temperature_c'],
  },
};
