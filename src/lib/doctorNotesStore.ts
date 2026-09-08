export interface StoredDoctorNote { text: string; savedAt: string }

function storageKey(doctorKey: string, patientId: string) {
  return `vdoc-doctor-note:${doctorKey}:${patientId}`;
}

export function loadDoctorNote(doctorKey: string, patientId: string): StoredDoctorNote | null {
  try {
    const raw = localStorage.getItem(storageKey(doctorKey, patientId));
    return raw ? JSON.parse(raw) as StoredDoctorNote : null;
  } catch { return null; }
}

export function saveDoctorNote(doctorKey: string, patientId: string, text: string): StoredDoctorNote {
  const note: StoredDoctorNote = { text, savedAt: new Date().toISOString() };
  try { localStorage.setItem(storageKey(doctorKey, patientId), JSON.stringify(note)); } catch { /* storage unavailable */ }
  return note;
}
