'use client';

import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
  accentColor: string;
  toggleMode: () => void;
  setAccent: (color: string, gradientFrom: string, gradientTo: string) => void;
}

const STORAGE_KEY = 'wall-calendar-theme';

export function useTheme(): ThemeState {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [accentColor, setAccentColor] = useState('#F59E0B');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { mode: savedMode } = JSON.parse(saved);
        if (savedMode) setMode(savedMode);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, mode }));
    } catch {}
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'dark' ? 'light' : 'dark'));
  }, []);

  const setAccent = useCallback(
    (color: string, gradientFrom: string, gradientTo: string) => {
      setAccentColor(color);
      // Apply CSS variables for dynamic theming
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        const hexToRgbValues = (hex: string) => {
          const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return match ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) } : null;
        };
        const colorValues = hexToRgbValues(color);
        if (colorValues) {
          root.style.setProperty('--accent', color);
          root.style.setProperty('--accent-rgb', `${colorValues.r}, ${colorValues.g}, ${colorValues.b}`);
          root.style.setProperty('--hero-gradient-from', gradientFrom);
          root.style.setProperty('--hero-gradient-to', gradientTo);
        }
      }
    },
    []
  );

  return { mode, accentColor, toggleMode, setAccent };
}
