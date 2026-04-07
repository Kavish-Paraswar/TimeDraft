'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCalendar } from '@/hooks/useCalendar';
import { useNotes } from '@/hooks/useNotes';
import { useTheme } from '@/hooks/useTheme';
import { useSwipe } from '@/hooks/useSwipe';
import { getMonthGrid } from '@/utils/dateUtils';
import { getHeroImage } from '@/data/heroImages';
import { getHolidayMap } from '@/data/holidays';
import { applyThemeVars } from '@/utils/colorUtils';

import HeroPanel from '../HeroPanel/HeroPanel';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import NotesPanel from '../NotesPanel/NotesPanel';
import RangeSummary from '../RangeSummary/RangeSummary';
import ActionBar from '../ActionBar/ActionBar';

import styles from './CalendarPage.module.css';

// Helper for staggered entry animations — avoids Variants typing issues with custom
function fadeUpProps(i: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const },
  };
}

export default function CalendarPage() {
  const calendar = useCalendar();
  const notesState = useNotes();
  const theme = useTheme();

  const hero = getHeroImage(calendar.currentMonth + 1);
  const days = useMemo(
    () => getMonthGrid(calendar.currentYear, calendar.currentMonth),
    [calendar.currentYear, calendar.currentMonth]
  );
  const holidayMap = useMemo(
    () => getHolidayMap(calendar.currentYear),
    [calendar.currentYear]
  );

  // Apply dynamic theme variables whenever month changes
  useEffect(() => {
    applyThemeVars(hero.accentColor, hero.gradientFrom, hero.gradientTo);
    theme.setAccent(hero.accentColor, hero.gradientFrom, hero.gradientTo);
  }, [calendar.currentMonth, calendar.currentYear]); // eslint-disable-line

  // Set of dateKeys that have notes for indicator dots
  const dateNotesSet = useMemo(
    () => new Set(Object.keys(notesState.byDate)),
    [notesState.byDate]
  );

  // Swipe navigation for mobile
  const swipeHandlers = useSwipe(calendar.goToNextMonth, calendar.goToPrevMonth);

  // Range label for hero panel
  const rangeLabel = useMemo(() => {
    if (!calendar.selectedStartDate) return 'No range';
    if (!calendar.selectedEndDate) return 'Selecting…';
    const firstDate = calendar.selectedStartDate < calendar.selectedEndDate ? calendar.selectedStartDate : calendar.selectedEndDate;
    const lastDate = calendar.selectedStartDate < calendar.selectedEndDate ? calendar.selectedEndDate : calendar.selectedStartDate;
    return `${firstDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${lastDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`;
  }, [calendar.selectedStartDate, calendar.selectedEndDate]);

  return (
    <main className={styles.page} aria-label="Wall Calendar">
      <div className={styles.calendarWrapper}>

        {/* LEFT — Hero */}
        <motion.div
          className={styles.leftCol}
          {...fadeUpProps(0)}
        >
          <div className={styles.heroWrap}>
            <HeroPanel
              month={calendar.currentMonth}
              year={calendar.currentYear}
              hero={hero}
              rangeLabel={rangeLabel}
              noteCount={notesState.noteCount}
            />
          </div>
        </motion.div>

        {/* RIGHT — Calendar + Notes + Actions */}
        <div className={styles.rightCol}>
          {/* Calendar card */}
          <motion.div
            className={styles.calendarCard}
            {...fadeUpProps(1)}
            {...swipeHandlers}
          >
            {/* Decorative wire loops */}
            <div className={styles.wireBar} aria-hidden>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={styles.wireLoop} />
              ))}
            </div>

            <CalendarHeader
              month={calendar.currentMonth}
              year={calendar.currentYear}
              onPrev={calendar.goToPrevMonth}
              onNext={calendar.goToNextMonth}
              onToday={calendar.goToToday}
            />

            <CalendarGrid
              days={days}
              currentMonth={calendar.currentMonth}
              currentYear={calendar.currentYear}
              selectedStartDate={calendar.selectedStartDate}
              selectedEndDate={calendar.selectedEndDate}
              hoveredDate={calendar.hoveredDate}
              dateNotesMap={dateNotesSet}
              holidayMap={holidayMap}
              transitionDirection={calendar.transitionDirection}
              onDateClick={calendar.handleDateClick}
              onDateHover={calendar.handleDateHover}
            />
          </motion.div>

          {/* Range summary */}
          <motion.div {...fadeUpProps(2)}>
            <RangeSummary
              selectedStartDate={calendar.selectedStartDate}
              selectedEndDate={calendar.selectedEndDate}
              onResetSelection={calendar.resetSelection}
            />
          </motion.div>

          {/* Notes panel */}
          <motion.div {...fadeUpProps(3)}>
            <NotesPanel
              notesState={notesState}
              currentYear={calendar.currentYear}
              currentMonth={calendar.currentMonth}
              selectedStartDate={calendar.selectedStartDate}
              selectedEndDate={calendar.selectedEndDate}
            />
          </motion.div>

          {/* Action bar */}
          <motion.div {...fadeUpProps(4)}>
            <ActionBar
              themeMode={theme.mode}
              onToggleTheme={theme.toggleMode}
              onGoToToday={calendar.goToToday}
              onResetSelection={calendar.resetSelection}
              hasSelection={calendar.selectedStartDate !== null}
            />
          </motion.div>
        </div>

      </div>
    </main>
  );
}
