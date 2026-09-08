export function toLocalDateTime(iso: string) {
  const date = new Date(iso);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

export function withinDateRange(date: string, range: string, now = new Date()) {
  if (!range || range === 'all') return true;
  const localDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
  const today = new Date(`${localDate}T00:00:00+05:30`).getTime();
  const value = new Date(date.length === 10 ? `${date}T00:00:00+05:30` : date).getTime();
  const oneDay = 86_400_000;
  if (range === 'today') return value >= today && value < today + oneDay;
  if (range === 'yesterday') return value >= today - oneDay && value < today;
  return value >= today - (Number(range) - 1) * oneDay && value < today + oneDay;
}

export const dateRangeOptions = [
  { value: 'all', label: 'All dates' }, { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' }, { value: '7', label: 'Last 7 days' }, { value: '30', label: 'Last 30 days' },
];
