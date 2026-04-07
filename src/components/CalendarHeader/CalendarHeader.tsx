'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_NAMES } from '@/utils/dateUtils';
import styles from './CalendarHeader.module.css';

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({ month, year, onPrev, onNext, onToday }: CalendarHeaderProps) {
  return (
    <header className={styles.header} role="navigation" aria-label="Calendar navigation">
      <div className={styles.navGroup}>
        <button
          className={styles.navBtn}
          onClick={onPrev}
          aria-label={`Go to previous month`}
          title="Previous month"
        >
          <ChevronLeft />
        </button>

        <div className={styles.monthYear} aria-live="polite" aria-atomic="true">
          <span className={styles.monthName}>{MONTH_NAMES[month]}</span>
          <span className={styles.yearText}>{year}</span>
        </div>

        <button
          className={styles.navBtn}
          onClick={onNext}
          aria-label={`Go to next month`}
          title="Next month"
        >
          <ChevronRight />
        </button>
      </div>

      <button
        className={styles.todayBtn}
        onClick={onToday}
        aria-label="Go to today"
        title="Jump to today"
      >
        Today
      </button>
    </header>
  );
}
