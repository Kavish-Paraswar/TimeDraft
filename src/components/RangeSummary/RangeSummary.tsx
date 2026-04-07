'use client';

import { CalendarRange, X } from 'lucide-react';
import { formatDateRange, daysBetween } from '@/utils/dateUtils';
import styles from './RangeSummary.module.css';

interface RangeSummaryProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onResetSelection: () => void;
}

export default function RangeSummary({ selectedStartDate, selectedEndDate, onResetSelection }: RangeSummaryProps) {
  const hasSelection = selectedStartDate !== null;
  const isRangeComplete = selectedStartDate !== null && selectedEndDate !== null;
  const selectedDayCount = isRangeComplete ? daysBetween(selectedStartDate!, selectedEndDate!) + 1 : null;

  return (
    <div className={styles.strip} aria-live="polite">
      {!hasSelection ? (
        <p className={styles.noSelection}>Click a date to start selecting a range…</p>
      ) : (
        <>
          <div className={styles.chip}>
            <CalendarRange />
            {isRangeComplete ? `${selectedDayCount} day${selectedDayCount !== 1 ? 's' : ''}` : 'Selecting…'}
          </div>

          <span className={styles.label}>
            {isRangeComplete
              ? formatDateRange(selectedStartDate, selectedEndDate)
              : `From ${selectedStartDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} — click end date`}
          </span>

          <button
            className={styles.resetBtn}
            onClick={onResetSelection}
            aria-label="Clear date selection"
          >
            <X /> Clear
          </button>
        </>
      )}
    </div>
  );
}
