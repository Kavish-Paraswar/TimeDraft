export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  dateKey: string; 
}
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
export const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
export const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const WEEKDAY_LABELS_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
export function fromDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}
export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const [s, e] = start <= end ? [start, end] : [end, start];
  return date > s && date < e;
}
export function isRangeStart(date: Date, start: Date | null): boolean {
  if (!start) return false;
  return isSameDay(date, start);
}
export function isRangeEnd(date: Date, end: Date | null): boolean {
  if (!end) return false;
  return isSameDay(date, end);
}
export function isInHoverRange(date: Date, start: Date | null, hover: Date | null): boolean {
  if (!start || !hover) return false;
  const [s, e] = start <= hover ? [start, hover] : [hover, start];
  return date >= s && date <= e;
}
export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.abs(Math.round((b.getTime() - a.getTime()) / msPerDay));
}
export function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  d.setDate(1);
  return d;
}
export function getMonthGrid(year: number, month: number): CalendarDay[] {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let startOffset = firstDay.getDay() - 1; 
  if (startOffset < 0) startOffset = 6;
  const days: CalendarDay[] = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({
      date,
      dayOfMonth: date.getDate(),
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      dateKey: toDateKey(date),
    });
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    days.push({
      date,
      dayOfMonth: d,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      dateKey: toDateKey(date),
    });
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(year, month + 1, d);
    days.push({
      date,
      dayOfMonth: d,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      dateKey: toDateKey(date),
    });
  }
  return days;
}
export function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start) return 'No dates selected';
  if (!end || isSameDay(start, end)) {
    return start.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  const [s, e] = start <= end ? [start, end] : [end, start];
  const count = daysBetween(s, e) + 1;
  const startStr = s.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const endStr = e.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${startStr} → ${endStr}  (${count} day${count > 1 ? 's' : ''})`;
}
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
export function getRangeKey(start: Date, end: Date): string {
  const [s, e] = start <= end ? [start, end] : [end, start];
  return `${toDateKey(s)}__${toDateKey(e)}`;
}
