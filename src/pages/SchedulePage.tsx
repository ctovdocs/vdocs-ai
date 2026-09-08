import { useState } from 'react';
import { Segmented, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { doctorSchedules, TODAY, WEEK_DAYS, type ScheduleBlockType, type WeekDay } from '../data/schedule';
import type { Department } from '../data/scenarios';

const DEPARTMENTS: Department[] = ['Internal Medicine', 'Cardiology', 'Gastroenterology', 'Orthopaedics', 'Nephrology'];
const ALL_DEPARTMENTS = 'All departments';

const TYPE_LABEL: Record<ScheduleBlockType, string> = {
  opd: 'OPD', round: 'Ward round', theatre: 'Theatre', meeting: 'Meeting', consult: 'Consult',
};
const TYPE_COLOR: Record<ScheduleBlockType, string> = {
  opd: '#33449e', round: '#155c53', theatre: '#a8264a', meeting: '#7d3c98', consult: '#c07a1e',
};

function formatTime(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour < 12 ? 'am' : 'pm';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0 ? `${displayHour}${period}` : `${displayHour}:${String(minute).padStart(2, '0')}${period}`;
}

export function SchedulePage() {
  const navigate = useNavigate();
  const [day, setDay] = useState<WeekDay>(TODAY);
  const [department, setDepartment] = useState<string>(ALL_DEPARTMENTS);

  const rows = doctorSchedules
    .filter(schedule => department === ALL_DEPARTMENTS || schedule.department === department)
    .flatMap(schedule => schedule.blocks.filter(block => block.days.includes(day)).map(block => ({ ...block, doctor: schedule.doctor, department: schedule.department })))
    .sort((first, second) => first.startTime.localeCompare(second.startTime));

  return <>
    <section className="surface schedule-list">
      <div className="schedule-filters">
        <strong>Schedule</strong>
        <Segmented size="small" value={day} onChange={value => setDay(value as WeekDay)} options={WEEK_DAYS} />
        <Segmented size="small" value={department} onChange={value => setDepartment(value as string)} options={[ALL_DEPARTMENTS, ...DEPARTMENTS]} />
      </div>
      {rows.length === 0
        ? <p className="muted">No scheduled activity for this filter.</p>
        : <ul className="schedule-rows">
          {rows.map(row => <li key={row.id} className={row.patientId ? 'clickable' : ''} onClick={() => row.patientId && navigate(`/app/patients/${row.patientId}`)}>
            <span className="schedule-row-time">{formatTime(row.startTime)}–{formatTime(row.endTime)}</span>
            <span className="schedule-row-dot" style={{ background: TYPE_COLOR[row.type] }} />
            <span className="schedule-row-title">{row.doctor} · {row.title}</span>
            <Tag className="schedule-row-type">{TYPE_LABEL[row.type]}</Tag>
            {department === ALL_DEPARTMENTS && <span className="schedule-row-dept">{row.department}</span>}
          </li>)}
        </ul>}
    </section>
    <p className="foundation-note">Synthetic weekly roster · illustrative pattern, not a live schedule.</p>
  </>;
}
