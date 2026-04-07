'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDay, WEEKDAY_LABELS, isRangeStart as checkStart, isRangeEnd as checkEnd, isInRange, isInHoverRange } from '@/utils/dateUtils';
import { Holiday } from '@/data/holidays';
import DateCell from '../DateCell/DateCell';
import styles from './CalendarGrid.module.css';

interface CalendarGridProps {
  days: CalendarDay[];
  currentMonth: number;
  currentYear: number;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  hoveredDate: Date | null;
  dateNotesMap: Set<string>;
  holidayMap: Map<string, Holiday>;
  transitionDirection: 'forward' | 'backward';
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
}

const flipVariants = {
  enterForward:  { opacity: 0, rotateY: 90, scale: 0.95 },
  enterBackward: { opacity: 0, rotateY: -90, scale: 0.95 },
  center:        { opacity: 1, rotateY: 0, scale: 1 },
  exitForward:   { opacity: 0, rotateY: -90, scale: 0.95 },
  exitBackward:  { opacity: 0, rotateY: 90, scale: 0.95 },
};

export default function CalendarGrid({
  days,
  currentMonth,
  currentYear,
  selectedStartDate,
  selectedEndDate,
  hoveredDate,
  dateNotesMap,
  holidayMap,
  transitionDirection,
  onDateClick,
  onDateHover,
}: CalendarGridProps) {
  const gridKey = `${currentYear}-${currentMonth}`;
  const effectiveEndDate = selectedEndDate || (hoveredDate && selectedStartDate ? hoveredDate : null);

  return (
    <div className={styles.wrapper}>
      {/* Weekday headers */}
      <div className={styles.weekdayRow} aria-hidden>
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`${styles.weekdayLabel} ${i >= 5 ? styles.weekend : ''}`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Animated grid */}
      <div className={styles.gridContainer}>
        <AnimatePresence initial={false}>
          <motion.div
            key={gridKey}
            className={styles.grid}
            initial={transitionDirection === 'forward' ? flipVariants.enterForward : flipVariants.enterBackward}
            animate={flipVariants.center}
            exit={transitionDirection === 'forward' ? flipVariants.exitForward : flipVariants.exitBackward}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            role="grid"
            aria-label={`Calendar grid for ${currentMonth + 1}/${currentYear}`}
          >
            {days.map((day) => {
              const holiday = holidayMap.get(`${day.date.getFullYear()}-${String(day.date.getMonth()+1).padStart(2,'0')}-${String(day.date.getDate()).padStart(2,'0')}`);

              return (
                <DateCell
                  key={day.dateKey}
                  day={day}
                  isRangeStart={checkStart(day.date, selectedStartDate)}
                  isRangeEnd={checkEnd(day.date, selectedEndDate)}
                  isInRange={isInRange(day.date, selectedStartDate, selectedEndDate)}
                  isInHoverRange={
                    !selectedEndDate
                      ? isInHoverRange(day.date, selectedStartDate, effectiveEndDate)
                      : false
                  }
                  hasNote={dateNotesMap.has(day.dateKey)}
                  holiday={holiday}
                  onClick={onDateClick}
                  onMouseEnter={onDateHover}
                  onMouseLeave={() => onDateHover(null)}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
