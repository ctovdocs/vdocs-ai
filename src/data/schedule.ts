import type { Department } from './scenarios';

export type ScheduleBlockType = 'opd' | 'round' | 'theatre' | 'meeting' | 'consult';
export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type ScheduleBlock = { id: string; days: WeekDay[]; startTime: string; endTime: string; type: ScheduleBlockType; title: string; patientId?: string };
export type DoctorSchedule = { doctor: string; department: Department; blocks: ScheduleBlock[] };

export const WEEK_DAYS: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const TODAY: WeekDay = 'Mon';

const ALL_DAYS: WeekDay[] = WEEK_DAYS;
const WEEKDAYS: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function patientId(number: number) {
  return `20000000-0000-4000-8000-${String(number).padStart(12, '0')}`;
}

export const doctorSchedules: DoctorSchedule[] = [
  {
    doctor: 'Dr. Ananya Mehta', department: 'Internal Medicine', blocks: [
      { id: 'am-round', days: ALL_DAYS, startTime: '08:00', endTime: '08:30', type: 'round', title: 'Ward round — Rahul Sharma', patientId: patientId(1) },
      { id: 'am-opd-priya', days: ['Mon'], startTime: '09:00', endTime: '09:20', type: 'opd', title: 'OPD review — Priya Patel', patientId: patientId(2) },
      { id: 'am-opd', days: ['Mon', 'Wed', 'Fri'], startTime: '09:20', endTime: '11:00', type: 'opd', title: 'OPD clinic — general medicine' },
      { id: 'am-meeting', days: ['Mon'], startTime: '11:00', endTime: '11:30', type: 'meeting', title: 'Multidisciplinary case discussion — Rahul Sharma (Internal Medicine, Nephrology, Cardiology)', patientId: patientId(1) },
      { id: 'am-evening', days: WEEKDAYS, startTime: '14:00', endTime: '14:30', type: 'round', title: 'Evening ward round — ICU', patientId: patientId(4) },
    ],
  },
  {
    doctor: 'Dr. Rohan Shah', department: 'Cardiology', blocks: [
      { id: 'rs-round', days: ALL_DAYS, startTime: '08:30', endTime: '09:00', type: 'round', title: 'CCU round — Rajesh Nair', patientId: patientId(6) },
      { id: 'rs-opd', days: ['Tue', 'Thu'], startTime: '09:30', endTime: '12:00', type: 'opd', title: 'OPD clinic — cardiology' },
      { id: 'rs-theatre', days: ['Wed'], startTime: '09:30', endTime: '13:00', type: 'theatre', title: 'Cath lab — cardiology procedures' },
      { id: 'rs-meeting', days: ['Mon'], startTime: '11:00', endTime: '11:30', type: 'meeting', title: 'Multidisciplinary case discussion — Rahul Sharma (Internal Medicine, Nephrology, Cardiology)', patientId: patientId(1) },
      { id: 'rs-consult', days: ['Mon'], startTime: '13:00', endTime: '13:20', type: 'consult', title: 'Consult review — Rahul Sharma', patientId: patientId(1) },
    ],
  },
  {
    doctor: 'Dr. Kavya Menon', department: 'Gastroenterology', blocks: [
      { id: 'km-opd', days: ['Mon', 'Wed'], startTime: '09:00', endTime: '11:30', type: 'opd', title: 'OPD clinic — gastroenterology' },
      { id: 'km-round', days: ALL_DAYS, startTime: '11:30', endTime: '12:00', type: 'round', title: 'Ward round — gastroenterology' },
      { id: 'km-theatre', days: ['Fri'], startTime: '09:00', endTime: '13:00', type: 'theatre', title: 'Endoscopy list' },
    ],
  },
  {
    doctor: 'Dr. Nikhil Joshi', department: 'Orthopaedics', blocks: [
      { id: 'nj-round', days: ALL_DAYS, startTime: '08:00', endTime: '08:30', type: 'round', title: 'Ward round — orthopaedics' },
      { id: 'nj-opd', days: ['Mon', 'Thu'], startTime: '09:00', endTime: '11:00', type: 'opd', title: 'OPD clinic — orthopaedics' },
      { id: 'nj-theatre', days: ['Fri'], startTime: '09:00', endTime: '14:00', type: 'theatre', title: 'Operation theatre — orthopaedics' },
    ],
  },
  {
    doctor: 'Dr. Devika Rao', department: 'Nephrology', blocks: [
      { id: 'dr-round-1', days: ['Mon'], startTime: '08:00', endTime: '08:30', type: 'round', title: 'Ward round — Sunita Rao', patientId: patientId(3) },
      { id: 'dr-round-2', days: ['Mon'], startTime: '08:30', endTime: '09:00', type: 'round', title: 'Ward round — Amit Verma', patientId: patientId(14) },
      { id: 'dr-round-3', days: ['Mon'], startTime: '09:00', endTime: '09:30', type: 'round', title: 'Ward round — Suresh Kulkarni', patientId: patientId(15) },
      { id: 'dr-round-4', days: ['Mon'], startTime: '09:30', endTime: '10:00', type: 'round', title: 'Ward round — Nisha Thomas', patientId: patientId(16) },
      { id: 'dr-round-generic', days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], startTime: '08:00', endTime: '10:00', type: 'round', title: 'Ward rounds — nephrology' },
      { id: 'dr-opd', days: ['Tue', 'Thu'], startTime: '10:00', endTime: '12:00', type: 'opd', title: 'OPD clinic — nephrology' },
      { id: 'dr-meeting', days: ['Mon'], startTime: '11:00', endTime: '11:30', type: 'meeting', title: 'Multidisciplinary case discussion — Rahul Sharma (Internal Medicine, Nephrology, Cardiology)', patientId: patientId(1) },
      { id: 'dr-consult', days: ['Mon'], startTime: '13:30', endTime: '13:50', type: 'consult', title: 'Consult review — Rahul Sharma', patientId: patientId(1) },
    ],
  },
];
