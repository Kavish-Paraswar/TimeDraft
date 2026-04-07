'use client';
import { CalendarDay } from '@/utils/dateUtils';
import { Holiday } from '@/data/holidays';
import styles from './DateCell.module.css';
interface DateCellProps {
  day: CalendarDay;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isInHoverRange: boolean;
  hasNote: boolean;
  holiday?: Holiday;
  onClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: () => void;
}
export default function DateCell({
  day,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isInHoverRange,
  hasNote,
  holiday,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: DateCellProps) {
  const classNames = [
    styles.cell,
    day.isToday ? styles.today : '',
    !day.isCurrentMonth ? styles.otherMonth : '',
    day.isWeekend && day.isCurrentMonth ? styles.weekend : '',
    isRangeStart ? styles.rangeStart : '',
    isRangeEnd ? styles.rangeEnd : '',
    isInRange ? styles.inRange : '',
    !isRangeStart && !isRangeEnd && !isInRange && isInHoverRange ? styles.hoverRange : '',
  ]
    .filter(Boolean)
    .join(' ');
  const handleClick = () => {
    if (day.isCurrentMonth) onClick(day.date);
  };
  const isSelected = isRangeStart || isRangeEnd;
  const label = `${day.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}${holiday ? `, ${holiday.name}` : ''}${isSelected ? ', selected' : ''}${isInRange ? ', in selected range' : ''}`;
  return (
    <div
      className={classNames}
      onClick={handleClick}
      onMouseEnter={() => day.isCurrentMonth && onMouseEnter(day.date)}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={day.isCurrentMonth ? 0 : -1}
      aria-label={label}
      aria-pressed={isSelected}
      aria-disabled={!day.isCurrentMonth}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && day.isCurrentMonth) {
          e.preventDefault();
          onClick(day.date);
        }
      }}
    >
      <span className={styles.dayNum}>{day.dayOfMonth}</span>
      {}
      <div className={styles.badges}>
        {day.isToday && !isSelected && <span className={styles.todayDot} aria-hidden />}
        {hasNote && <span className={styles.noteDot} aria-hidden />}
        {holiday && (
          <span
            className={styles.holidayDot}
            style={{ background: holiday.color || 'var(--accent)' }}
            aria-hidden
          />
        )}
      </div>
      {}
      {holiday && <span className={styles.holidayLabel}>{holiday.name}</span>}
    </div>
  );
}
