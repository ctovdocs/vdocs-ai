import { cohort, recordId, scenarios } from './cohort.js';
import type { Report } from '../domain/models.js';
import { workflowStateSchema, type WorkflowState } from '../domain/workflow.js';

// v2/v3 replace earlier imports in place (same ids/times) with the demo disease profiles.
export const LAB_TREND_SEED = 'vdoc.lab-trends.v3';
export const labTrendPatientIds = cohort.patients.slice(0, 5).map(patient => patient.id);
export const trendPanelNames = ['CBC with differential', 'KFT / renal and electrolytes', 'LFT / liver profile', 'Urine routine and microscopy'];

type Overrides = Record<string, number | string>;
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

// Illustrative disease signatures for the four high-acuity demo patients (Rahul, Sunita, Farah, Arjun), worsening
// toward the latest (acute) collection. Scenario anchor values (sourceValue) are kept so the
// trend agrees with the reports already in their chart. Flags are still derived from the
// reference intervals in numeric()/qualitative(), never set by hand.
function criticalProfile(patientIndex: number, sequence: number, sourceValue: (name: string, fallback: number) => number): Overrides {
  const t = sequence / 6;
  const acute = sequence === 6;
  const recent = sequence >= 2;
  if (patientIndex === 0) return { // Rahul Sharma · advanced CKD with iron-deficient anaemia, uncontrolled type 2 diabetes, fatty liver
    MCV: lerp(79, 76, t), 'RDW-CV': lerp(15.4, 16.6, t), Neutrophils: lerp(76, 80, t), Lymphocytes: lerp(18, 15, t), Eosinophils: 7, Platelets: lerp(160, 138, t),
    Urea: lerp(60, 95, t), Sodium: lerp(134, 132, t), Chloride: lerp(97, 95, t), Bicarbonate: lerp(21, 18, t), Calcium: lerp(8.3, 7.9, t), Phosphate: lerp(4.8, 5.8, t),
    Albumin: lerp(3.3, 3.0, t), 'Total protein': lerp(5.9, 5.6, t), ALP: lerp(135, 150, t), GGT: lerp(58, 72, t), ALT: lerp(60, 70, t), AST: lerp(44, 52, t),
    Protein: sequence > 3 ? '3+' : '2+', Glucose: '2+',
  };
  if (patientIndex === 2) return { // Sunita Rao · CKD stage 5 on haemodialysis, hyperkalaemia, functional iron deficiency
    MCV: lerp(78, 76, t), 'RDW-CV': lerp(16.2, 17.4, t), Neutrophils: lerp(76, 80, t), Lymphocytes: lerp(16, 13, t), Monocytes: 11, Eosinophils: 7, Platelets: lerp(145, 128, t), WBC: 6.4,
    Urea: lerp(120, 170, t), Sodium: lerp(133.5, 132, t), Chloride: lerp(97, 95, t), Bicarbonate: sourceValue('Bicarbonate', 22), Calcium: lerp(8.0, 7.6, t), Phosphate: lerp(6.0, 7.4, t),
    // Low aminotransferases are typical in dialysis patients (pyridoxine deficiency).
    Albumin: lerp(3.2, 2.9, t), 'Total protein': lerp(5.8, 5.5, t), ALP: lerp(150, 190, t), AST: 8, ALT: 5,
    Protein: '3+', Glucose: '1+', Blood: '1+', 'Specific gravity': 1.01,
  };
  if (patientIndex === 3) return { // Farah Khan · type 2 diabetes with iron-deficiency anaemia building to sepsis / pneumonia / AKI
    MCV: lerp(77, 75, t), 'RDW-CV': lerp(15.2, 16, t), Phosphate: lerp(2.4, 2.2, t), ALT: acute ? 70 : lerp(60, 66, t), GGT: acute ? 82 : lerp(56, 66, t), AST: acute ? 76 : lerp(44, 50, t), Glucose: recent ? '2+' : '1+',
    ...(recent ? { Neutrophils: lerp(76, 80, t), Lymphocytes: lerp(18, 14, t), Monocytes: 11, Urea: lerp(48, 62, t), Sodium: 134, Bicarbonate: 21, Chloride: 97, Albumin: 3.3, Calcium: 8.3, ALP: 134, 'Total protein': 5.9 } : {}),
    ...(acute ? {
      Neutrophils: 88, Lymphocytes: 7, Eosinophils: 0.2, Urea: 78, Sodium: 131, Potassium: 5.4, Chloride: 96, Bicarbonate: 17, Calcium: 8.2,
      'Total bilirubin': 1.8, 'Direct bilirubin': 0.7, ALP: 146, Albumin: 2.8, 'Total protein': 5.7,
      Protein: '1+', 'Leukocyte esterase': '1+', 'Specific gravity': 1.028,
    } : {}),
  };
  if (patientIndex === 4) return { // Arjun Desai · poorly controlled type 1 diabetes (glycogenic hepatopathy) building to DKA with dehydration
    Haemoglobin: lerp(17.2, 17.8, t), MCV: 84, WBC: acute ? 17.2 : lerp(11.4, 12.6, t), Neutrophils: acute ? 86 : lerp(76, 82, t), Lymphocytes: acute ? 8 : lerp(18, 14, t), Platelets: lerp(460, 480, t),
    Urea: acute ? 58 : lerp(48, 54, t), Sodium: acute ? 129 : lerp(134, 132, t), Chloride: acute ? 94 : lerp(97, 96, t), Bicarbonate: acute ? 9 : lerp(21, 18, t), Phosphate: acute ? 5.4 : lerp(4.7, 5.1, t),
    ALT: lerp(78, 96, t), AST: lerp(62, 80, t), ALP: lerp(136, 150, t),
    'Specific gravity': acute ? 1.036 : lerp(1.032, 1.034, t), 'Urine pH': acute ? 4.4 : 5, Glucose: acute ? '3+' : '2+', Ketones: acute ? '3+' : sequence >= 3 ? 'Trace' : 'Negative',
    Albumin: lerp(5.05, 5.2, t), 'Total protein': lerp(8.35, 8.6, t),
  };
  return {};
}

export function seedLabTrends(input: WorkflowState, at: string, actor: string): WorkflowState {
  if (input.commands.includes(LAB_TREND_SEED)) return input;
  const state = structuredClone(input);
  for (const [patientIndex, patientId] of labTrendPatientIds.entries()) {
    const patient = state.patients.find(item => item.id === patientId && item.hospital_id === state.hospital_id);
    const history = state.histories.find(item => item.context.patient_id === patientId);
    if (!patient || !history) throw new Error('The five foundation patients must exist before adding lab history.');
    const scenario = scenarios[patientIndex];
    const visits = [...history.encounters].sort((first, second) => first.started_at.localeCompare(second.started_at)).slice(-5);
    if (visits.length < 5) throw new Error('Foundation visit history is incomplete.');
    const positions = [0, 1, 2, 2.33, 2.66, 3, 4];
    for (const [sequence, position] of positions.entries()) {
      const lower = Math.floor(position);
      const upper = Math.ceil(position);
      const fraction = position - lower;
      const sampleTime = new Date(new Date(visits[lower].started_at).getTime() * (1 - fraction) + new Date(visits[upper].started_at).getTime() * fraction + 3600000).toISOString();
      const encounterId = Number.isInteger(position) ? visits[lower].id : null;
      const sourceValue = (name: string, fallback: number) => {
        const series = scenario.labs.find(series => series.name.toLowerCase() === name.toLowerCase());
        if (!series || series.values.length < 5) return fallback;
        return series.values[lower] * (1 - fraction) + series.values[upper] * fraction;
      };
      const override = criticalProfile(patientIndex, sequence, sourceValue);
      const numeric = (name: string, value: number, unit: string, low: number, high: number, decimals = 1): Report['observations'][number] => {
        const rounded = Number((typeof override[name] === 'number' ? override[name] : value).toFixed(decimals));
        return { name, value: rounded.toFixed(decimals), unit, reference: `${low}–${high}`, flag: rounded < low ? 'low' : rounded > high ? 'high' : 'normal' };
      };
      const qualitative = (name: string, raw: string, reference = 'Negative'): Report['observations'][number] => {
        const value = typeof override[name] === 'string' ? override[name] : raw;
        return { name, value, unit: '', reference, flag: value === reference ? 'normal' : 'high' };
      };
      const acute = sequence === 6 && patientIndex >= 3;
      const renal = patientIndex === 0 || patientIndex === 2;
      const hb = typeof override.Haemoglobin === 'number' ? override.Haemoglobin : sourceValue('Haemoglobin', patientIndex === 3 ? 11.8 : 14.2);
      const mcv = typeof override.MCV === 'number' ? override.MCV : patientIndex === 1 ? 69 + sequence * 2 : 86 + patientIndex;
      const hematocrit = hb * 3;
      const rbc = hematocrit * 10 / mcv;
      const wbc = sourceValue('WBC', acute ? 16.8 : 6.2 + patientIndex * 0.5 + sequence * 0.1);
      const neutrophils = acute ? 86 : 59 + patientIndex;
      const lymphocytes = acute ? 8 : 32 - patientIndex;
      const panels: Report['observations'][] = [
        [numeric('Haemoglobin', hb, 'g/dL', patient.sex === 'M' ? 13 : 12, patient.sex === 'M' ? 17 : 15), numeric('RBC count', rbc, '10^12/L', patient.sex === 'M' ? 4.5 : 3.8, patient.sex === 'M' ? 6 : 5.3, 2), numeric('Haematocrit', hematocrit, '%', patient.sex === 'M' ? 40 : 36, patient.sex === 'M' ? 52 : 46), numeric('MCV', mcv, 'fL', 80, 100), numeric('MCH', hb * 10 / rbc, 'pg', 27, 33), numeric('MCHC', hb * 100 / hematocrit, 'g/dL', 32, 36), numeric('RDW-CV', patientIndex === 1 ? 18 - sequence * 0.3 : 13.4 + patientIndex * 0.2, '%', 11.5, 14.5), numeric('WBC', wbc, '10^9/L', 4, 11), numeric('Neutrophils', neutrophils, '%', 40, 75), numeric('Lymphocytes', lymphocytes, '%', 20, 45), numeric('Monocytes', acute ? 5 : 6, '%', 2, 10), numeric('Eosinophils', acute ? 0.5 : 2.5, '%', 0, 6), numeric('Basophils', 0.5, '%', 0, 1), numeric('Platelets', sourceValue('Platelets', patientIndex === 1 ? 420 - sequence * 14 : 260 - sequence * 3), '10^9/L', 150, 450, 0)],
        [numeric('Creatinine', sourceValue('Creatinine', 0.9), 'mg/dL', patient.sex === 'M' ? 0.7 : 0.6, patient.sex === 'M' ? 1.3 : 1.1, 2), numeric('Urea', renal ? 38 + sequence * (patientIndex === 2 ? 8 : 3) : acute ? 62 : 24 + patientIndex, 'mg/dL', 15, 45), numeric('Sodium', acute ? 132 : 139 - patientIndex * 0.3, 'mmol/L', 135, 145), numeric('Potassium', sourceValue('Potassium', 4.2), 'mmol/L', 3.5, 5.1), numeric('Chloride', acute ? 96 : 103, 'mmol/L', 98, 107), numeric('Bicarbonate', sequence === 6 && patientIndex === 4 ? 9 : renal ? 25 - sequence * 0.5 : 24, 'mmol/L', 22, 29), numeric('Calcium', renal ? 8.9 - sequence * 0.06 : 9.3, 'mg/dL', 8.5, 10.5), numeric('Phosphate', renal ? 3.6 + sequence * 0.15 : 3.4, 'mg/dL', 2.5, 4.5)],
        [numeric('Total bilirubin', acute ? 1.5 : 0.6 + patientIndex * 0.07, 'mg/dL', 0.2, 1.2, 2), numeric('Direct bilirubin', acute ? 0.6 : 0.2, 'mg/dL', 0, 0.3, 2), numeric('AST', acute ? 68 : 22 + patientIndex + sequence, 'U/L', 10, 40, 0), numeric('ALT', acute ? 54 : 24 + patientIndex * 2 + sequence, 'U/L', 7, 56, 0), numeric('ALP', acute ? 138 : 82 + patientIndex * 4, 'U/L', 40, 129, 0), numeric('GGT', acute ? 74 : 25 + sequence, 'U/L', 9, 48, 0), numeric('Albumin', renal || acute ? 3.8 - sequence * 0.08 : 4.2, 'g/dL', 3.5, 5), numeric('Total protein', renal || acute ? 6.5 - sequence * 0.05 : 7.1, 'g/dL', 6, 8.3)],
        [qualitative('Colour', 'Pale yellow', 'Pale yellow'), qualitative('Appearance', 'Clear', 'Clear'), numeric('Specific gravity', patientIndex === 4 && acute ? 1.03 : 1.015 + patientIndex * 0.001, '', 1.005, 1.03, 3), numeric('Urine pH', 5.5 + patientIndex * 0.2, '', 4.5, 8), qualitative('Protein', renal ? sequence > 3 ? '2+' : '1+' : acute ? 'Trace' : 'Negative'), qualitative('Glucose', patientIndex === 4 && acute ? '3+' : patientIndex === 0 && sequence > 3 ? '1+' : 'Negative'), qualitative('Ketones', patientIndex === 4 && acute ? '3+' : 'Negative'), qualitative('Blood', 'Negative'), qualitative('Nitrite', 'Negative'), qualitative('Leukocyte esterase', 'Negative'), { name: 'Urine WBC', value: '0–2', unit: '/HPF', reference: '0–5', flag: 'normal' }, { name: 'Urine RBC', value: '0–1', unit: '/HPF', reference: '0–2', flag: 'normal' }, qualitative('Casts', 'Not seen', 'Not seen'), qualitative('Crystals', 'Not seen', 'Not seen')],
      ];
      for (const [panelIndex, observations] of panels.entries()) {
        const id = recordId(91 + panelIndex, patientIndex + 1, sequence + 1);
        const reportedAt = new Date(new Date(sampleTime).getTime() + (panelIndex + 1) * 1800000).toISOString();
        const report: Report = { id, hospital_id: state.hospital_id, patient_id: patientId, encounter_id: encounterId, kind: 'lab', title: trendPanelNames[panelIndex], source: 'MockLIS', specimen_at: sampleTime, performed_at: sampleTime, reported_at: reportedAt, observations, author: 'Synthetic laboratory reporting team', indication: `Synthetic longitudinal ${panelIndex === 3 ? 'urine' : 'blood'} monitoring fixture; not an actual clinical order.`, findings: `Synthetic demo report. Specimen: ${['EDTA whole blood', 'Serum', 'Serum', 'Midstream urine'][panelIndex]}. Illustrative adult reference intervals, not Fortis laboratory ranges. Interpret against the dated clinical record; no treatment recommendation.${encounterId ? '' : ' Archived outpatient laboratory collection; encounter linkage unavailable.'}` };
        const existing = state.reports.findIndex(item => item.id === id);
        if (existing === -1) state.reports.push(report); else state.reports[existing] = report;
        if (encounterId && !history.timeline.some(item => item.id === id)) history.timeline.unshift({ id, hospital_id: state.hospital_id, patient_id: patientId, encounter_id: encounterId, kind: 'result', title: report.title, source_id: id, source_system: 'MockLIS', occurred_at: sampleTime, available_at: reportedAt });
      }
    }
  }
  state.reports.sort((first, second) => second.reported_at.localeCompare(first.reported_at));
  state.commands.push(LAB_TREND_SEED);
  state.revision++;
  state.audit.push({ id: LAB_TREND_SEED, patient_id: labTrendPatientIds[0], entity_id: LAB_TREND_SEED, actor, action: 'labs.seed', at });
  return workflowStateSchema.parse(state);
}
