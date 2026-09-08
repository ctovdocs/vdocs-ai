export type CatalogItem = { id: string; title: string; kind: 'lab' | 'imaging'; category: string; specimen?: string; modality?: string; aliases: string };

const labGroups: [string, string, string[]][] = [
  ['Haematology', 'Blood', ['CBC|Complete blood count hemogram FBC', 'ESR|Erythrocyte sedimentation rate', 'Peripheral blood smear', 'Reticulocyte count', 'Haemoglobin electrophoresis', 'Blood group and Rh type', 'Direct antiglobulin test|Direct Coombs', 'Indirect antiglobulin test|Indirect Coombs']],
  ['Coagulation', 'Blood', ['PT / INR|Prothrombin time', 'APTT|Activated partial thromboplastin time', 'D-dimer', 'Fibrinogen']],
  ['Renal and electrolytes', 'Blood', ['KFT|RFT kidney renal function panel', 'Creatinine', 'Urea|BUN', 'Electrolytes|Sodium potassium chloride', 'Sodium', 'Potassium', 'Chloride', 'Bicarbonate', 'Calcium', 'Ionised calcium', 'Magnesium', 'Phosphate', 'Uric acid']],
  ['Liver and pancreas', 'Blood', ['LFT|Liver function panel', 'Bilirubin total and direct', 'AST|SGOT', 'ALT|SGPT', 'ALP|Alkaline phosphatase', 'GGT', 'Albumin', 'Total protein', 'Amylase', 'Lipase', 'Ammonia']],
  ['Diabetes and lipids', 'Blood', ['HbA1c|Glycated haemoglobin', 'Fasting glucose|FBS blood sugar', 'Random glucose|RBS blood sugar', 'Postprandial glucose|PPBS', 'Lipid profile|Cholesterol triglycerides HDL LDL', 'Serum ketones', 'C-peptide']],
  ['Cardiac and inflammation', 'Blood', ['Troponin I', 'Troponin T', 'NT-proBNP', 'BNP', 'CK-MB', 'Creatine kinase|CK CPK', 'LDH', 'CRP|C-reactive protein', 'Procalcitonin', 'Lactate']],
  ['Endocrine and nutrition', 'Blood', ['TSH', 'Free T4', 'Free T3', 'Thyroid profile|TFT', 'Cortisol', 'PTH|Parathyroid hormone', 'Vitamin B12', 'Folate', 'Vitamin D 25-OH', 'Ferritin', 'Iron studies', 'Beta-hCG', 'Prolactin']],
  ['Infection and serology', 'Blood', ['Blood culture and sensitivity', 'Dengue NS1 antigen', 'Dengue IgM', 'Malaria smear', 'Malaria antigen', 'HBsAg', 'Anti-HCV', 'HIV antigen / antibody', 'HAV IgM', 'HEV IgM', 'Scrub typhus IgM', 'Leptospira IgM', 'VDRL']],
  ['Urine', 'Urine', ['Urine routine and microscopy|Urinalysis R/E R/M', 'Urine culture and sensitivity', 'Urine albumin / creatinine ratio|UACR microalbumin', 'Urine protein / creatinine ratio|UPCR', '24-hour urine protein', 'Urine sodium', 'Urine osmolality', 'Urine ketones', 'Urine pregnancy test']],
  ['Stool', 'Stool', ['Stool routine and microscopy', 'Stool culture and sensitivity', 'Stool occult blood', 'Faecal calprotectin', 'Stool ova and parasites', 'Clostridioides difficile toxin', 'H. pylori stool antigen', 'Faecal elastase']],
  ['Respiratory', 'Respiratory sample — specify', ['Sputum culture and sensitivity', 'Sputum AFB smear', 'TB molecular test|CBNAAT GeneXpert', 'Mycobacterial culture', 'Respiratory viral PCR', 'Influenza PCR', 'SARS-CoV-2 PCR']],
  ['Body fluids and tissue', 'Specify fluid / tissue', ['CSF analysis', 'CSF culture', 'Pleural fluid analysis', 'Ascitic fluid analysis', 'Synovial fluid analysis', 'Body fluid culture', 'Histopathology biopsy', 'Cytology', 'FNAC']],
  ['Immunology', 'Blood', ['ANA', 'Anti-dsDNA', 'Complement C3', 'Complement C4', 'ANCA', 'Rheumatoid factor', 'Anti-CCP', 'Serum protein electrophoresis']],
  ['Blood gases', 'Specify arterial / venous', ['Arterial blood gas|ABG', 'Venous blood gas|VBG']],
];
const imagingGroups: [string, string[]][] = [
  ['X-ray', ['Chest X-ray', 'Abdominal X-ray', 'Pelvis X-ray', 'Cervical spine X-ray', 'Lumbar spine X-ray', 'Shoulder X-ray', 'Elbow X-ray', 'Wrist / hand X-ray', 'Hip X-ray', 'Knee X-ray', 'Ankle / foot X-ray', 'Long bone X-ray']],
  ['Ultrasound', ['Ultrasound abdomen', 'Ultrasound pelvis', 'Ultrasound KUB', 'Ultrasound thyroid', 'Ultrasound breast', 'Ultrasound scrotum', 'Soft tissue ultrasound', 'Obstetric ultrasound']],
  ['Doppler', ['Lower limb venous Doppler', 'Lower limb arterial Doppler', 'Upper limb venous Doppler', 'Carotid Doppler', 'Renal artery Doppler', 'Portal venous Doppler']],
  ['CT', ['CT head (non-contrast)', 'CT head with contrast', 'HRCT chest', 'CT chest with contrast', 'CT abdomen and pelvis (non-contrast)', 'CT abdomen and pelvis with contrast', 'CT KUB (non-contrast)', 'CT pulmonary angiography', 'CT coronary angiography', 'CT aortogram', 'CT paranasal sinuses', 'CT spine']],
  ['MRI', ['MRI brain', 'MRI brain with contrast', 'MR angiography brain', 'MRI cervical spine', 'MRI thoracic spine', 'MRI lumbar spine', 'MRI knee', 'MRI shoulder', 'MRI hip', 'MRI abdomen', 'MRI pelvis', 'MRCP', 'Cardiac MRI']],
  ['Other imaging', ['Mammography', 'DEXA bone density', 'PET-CT', 'Bone scintigraphy', 'Renal scintigraphy', 'Thyroid scintigraphy', 'Echocardiogram']],
];
const makeId = (kind: string, title: string) => `${kind}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`;
export const orderCatalog: CatalogItem[] = [
  ...labGroups.flatMap(([category, specimen, titles]) => titles.map(value => {
    const [title, aliases = ''] = value.split('|');
    return { id: makeId('lab', title), title, aliases, kind: 'lab' as const, category, specimen };
  })),
  ...imagingGroups.flatMap(([modality, titles]) => titles.map(title => ({ id: makeId('imaging', title), title, aliases: '', kind: 'imaging' as const, category: modality, modality }))),
];
export const referralDepartments = ['Internal Medicine', 'Cardiology', 'Gastroenterology', 'Orthopaedics', 'Nephrology', 'Neurology', 'Neurosurgery', 'Pulmonology', 'Endocrinology', 'General Surgery', 'Urology', 'Oncology', 'Haematology', 'Infectious Diseases', 'Critical Care', 'Anaesthesiology', 'Obstetrics and Gynaecology', 'Paediatrics', 'ENT', 'Ophthalmology', 'Dermatology', 'Psychiatry', 'Rheumatology', 'Radiology', 'Pathology', 'Physiotherapy', 'Dietetics'];
