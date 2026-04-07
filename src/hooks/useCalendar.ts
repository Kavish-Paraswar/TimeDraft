'use client';
import { useState, useCallback } from 'react';
import { addMonths, getRangeKey, isSameDay } from '@/utils/dateUtils';
export interface CalendarState {
  currentMonth: number; 
  currentYear: number;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  hoveredDate: Date | null;
  selectionStep: 0 | 1 | 2;
  transitionDirection: 'forward' | 'backward';
}
export interface CalendarActions {
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  handleDateClick: (date: Date) => void;
  handleDateHover: (date: Date | null) => void;
  resetSelection: () => void;
  getRangeKeyForCurrentSelection: () => string | null;
}
export function useCalendar(): CalendarState & CalendarActions {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectionStep, setSelectionStep] = useState<0 | 1 | 2>(0);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const goToPrevMonth = useCallback(() => {
    setTransitionDirection('backward');
    const previousDate = addMonths(new Date(currentYear, currentMonth), -1);
    setCurrentMonth(previousDate.getMonth());
    setCurrentYear(previousDate.getFullYear());
  }, [currentMonth, currentYear]);
  const goToNextMonth = useCallback(() => {
    setTransitionDirection('forward');
    const nextDate = addMonths(new Date(currentYear, currentMonth), 1);
    setCurrentMonth(nextDate.getMonth());
    setCurrentYear(nextDate.getFullYear());
  }, [currentMonth, currentYear]);
  const goToToday = useCallback(() => {
    const now = new Date();
    const prevMonth = currentMonth;
    const prevYear = currentYear;
    const nextMonth = now.getMonth();
    const nextYear = now.getFullYear();
    if (nextYear > prevYear || (nextYear === prevYear && nextMonth > prevMonth)) {
      setTransitionDirection('forward');
    } else {
      setTransitionDirection('backward');
    }
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
  }, [currentMonth, currentYear]);
  const handleDateClick = useCallback(
    (date: Date) => {
      if (selectionStep === 0 || selectionStep === 2) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
        setSelectionStep(1);
      } else if (selectionStep === 1) {
        if (isSameDay(date, selectedStartDate!)) {
          setSelectedEndDate(date);
          setSelectionStep(2);
        } else {
          if (date < selectedStartDate!) {
            setSelectedEndDate(selectedStartDate);
            setSelectedStartDate(date);
          } else {
            setSelectedEndDate(date);
          }
          setSelectionStep(2);
        }
      }
    },
    [selectionStep, selectedStartDate]
  );
  const handleDateHover = useCallback((date: Date | null) => {
    setHoveredDate(date);
  }, []);
  const resetSelection = useCallback(() => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setHoveredDate(null);
    setSelectionStep(0);
  }, []);
  const getRangeKeyForCurrentSelection = useCallback((): string | null => {
    if (!selectedStartDate || !selectedEndDate) return null;
    return getRangeKey(selectedStartDate, selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);
  return {
    currentMonth,
    currentYear,
    selectedStartDate,
    selectedEndDate,
    hoveredDate,
    selectionStep,
    transitionDirection,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    handleDateClick,
    handleDateHover,
    resetSelection,
    getRangeKeyForCurrentSelection,
  };
}
