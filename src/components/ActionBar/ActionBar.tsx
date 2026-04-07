'use client';
import { CalendarCheck, RotateCcw, Sun, Moon } from 'lucide-react';
import { ThemeMode } from '@/hooks/useTheme';
import styles from './ActionBar.module.css';
interface ActionBarProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onGoToToday: () => void;
  onResetSelection: () => void;
  hasSelection: boolean;
}
export default function ActionBar({
  themeMode,
  onToggleTheme,
  onGoToToday,
  onResetSelection,
  hasSelection,
}: ActionBarProps) {
  return (
    <div className={styles.bar}>
      <button className={styles.btn} onClick={onGoToToday} aria-label="Go to today">
        <CalendarCheck />
        Today
      </button>
      {hasSelection && (
        <button className={styles.btn} onClick={onResetSelection} aria-label="Reset selection">
          <RotateCcw />
          Reset
        </button>
      )}
      <button
        className={styles.btn}
        onClick={onToggleTheme}
        aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
        title={`${themeMode === 'dark' ? 'Light' : 'Dark'} mode`}
      >
        {themeMode === 'dark' ? <Sun /> : <Moon />}
        {themeMode === 'dark' ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}
