'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getRangeKey } from '@/utils/dateUtils';
export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface NotesState {
  byDate: Record<string, Note[]>;   
  notes: Record<string, string>;  
  monthly: Record<string, string>;  
}
export interface NotesActions {
  addNote: (key: string, type: 'date' | 'range' | 'monthly', content: string) => void;
  updateNote: (key: string, type: 'date' | 'range' | 'monthly', noteId: string, content: string) => void;
  deleteNote: (key: string, type: 'date' | 'range' | 'monthly', noteId?: string) => void;
  getDateNotes: (dateKey: string) => Note[];
  getRangeNote: (start: Date | null, end: Date | null) => string;
  setRangeNote: (start: Date | null, end: Date | null, text: string) => void;
  getMonthlyMemo: (year: number, month: number) => string;
  setMonthlyMemo: (year: number, month: number, text: string) => void;
  noteCount: number;
}
const STORAGE_KEY = 'wall-calendar-notes';
function generateId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function loadFromStorage(): NotesState {
  if (typeof window === 'undefined') return { byDate: {}, notes: {}, monthly: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        byDate: parsed.byDate || {},
        notes: parsed.notes || parsed.byRange || {},
        monthly: parsed.monthly || {}
      };
    }
  } catch {}
  return { byDate: {}, notes: {}, monthly: {} };
}
export function useNotes(): NotesState & NotesActions {
  const [notesStateObj, setNotesStateObj] = useState<NotesState>({ byDate: {}, notes: {}, monthly: {} });
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setNotesStateObj(loadFromStorage());
  }, []);
  const save = useCallback((state: NotesState) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    }, 400);
  }, []);
  const update = useCallback(
    (updater: (prev: NotesState) => NotesState) => {
      setNotesStateObj((prev) => {
        const next = updater(prev);
        save(next);
        return next;
      });
    },
    [save]
  );
  const addNote = useCallback(
    (key: string, type: 'date' | 'range' | 'monthly', content: string) => {
      const newNote: Note = {
        id: generateId(),
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      update((prev) => {
        if (type === 'monthly') {
          return { ...prev, monthly: { ...prev.monthly, [key]: content } };
        }
        const bucket = 'byDate';
        const existing = prev[bucket][key] || [];
        return {
          ...prev,
          [bucket]: { ...prev[bucket], [key]: [...existing, newNote] },
        };
      });
    },
    [update]
  );
  const updateNote = useCallback(
    (key: string, type: 'date' | 'range' | 'monthly', noteId: string, content: string) => {
      update((prev) => {
        if (type === 'monthly') {
          return { ...prev, monthly: { ...prev.monthly, [key]: content } };
        }
        const bucket = 'byDate';
        const existing = prev[bucket][key] || [];
        return {
          ...prev,
          [bucket]: {
            ...prev[bucket],
            [key]: existing.map((n) =>
              n.id === noteId ? { ...n, content, updatedAt: new Date().toISOString() } : n
            ),
          },
        };
      });
    },
    [update]
  );
  const deleteNote = useCallback(
    (key: string, type: 'date' | 'range' | 'monthly', noteId?: string) => {
      update((prev) => {
        if (type === 'monthly') {
          const m = { ...prev.monthly };
          delete m[key];
          return { ...prev, monthly: m };
        }
        const bucket = 'byDate';
        const existing = prev[bucket][key] || [];
        const filtered = noteId ? existing.filter((n) => n.id !== noteId) : [];
        const newBucket = { ...prev[bucket] };
        if (filtered.length === 0) {
          delete newBucket[key];
        } else {
          newBucket[key] = filtered;
        }
        return { ...prev, [bucket]: newBucket };
      });
    },
    [update]
  );
  const getDateNotes = useCallback(
    (dateKey: string): Note[] => notesStateObj.byDate[dateKey] || [],
    [notesStateObj]
  );
  const getRangeNote = useCallback(
    (start: Date | null, end: Date | null): string => {
      if (!start || !end) return '';
      const [s, e] = start <= end ? [start, end] : [end, start];
      const key = `${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,'0')}-${String(s.getDate()).padStart(2,'0')}_${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,'0')}-${String(e.getDate()).padStart(2,'0')}`;
      return notesStateObj.notes[key] || '';
    },
    [notesStateObj]
  );
  const setRangeNote = useCallback(
    (start: Date | null, end: Date | null, text: string) => {
      if (!start || !end) return;
      const [s, e] = start <= end ? [start, end] : [end, start];
      const key = `${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,'0')}-${String(s.getDate()).padStart(2,'0')}_${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,'0')}-${String(e.getDate()).padStart(2,'0')}`;
      update((prev) => {
        const newNotes = { ...prev.notes };
        if (!text) {
          delete newNotes[key];
        } else {
          newNotes[key] = text;
        }
        return { ...prev, notes: newNotes };
      });
    },
    [update]
  );
  const getMonthlyMemo = useCallback(
    (year: number, month: number): string => {
      const key = `${year}-${String(month + 1).padStart(2, '0')}`;
      return notesStateObj.monthly[key] || '';
    },
    [notesStateObj]
  );
  const setMonthlyMemo = useCallback(
    (year: number, month: number, text: string) => {
      const key = `${year}-${String(month + 1).padStart(2, '0')}`;
      update((prev) => ({ ...prev, monthly: { ...prev.monthly, [key]: text } }));
    },
    [update]
  );
  const noteCount =
    Object.values(notesStateObj.byDate).flat().length +
    Object.values(notesStateObj.notes).filter(Boolean).length +
    Object.values(notesStateObj.monthly).filter(Boolean).length;
  return {
    ...notesStateObj,
    addNote,
    updateNote,
    deleteNote,
    getDateNotes,
    getRangeNote,
    setRangeNote,
    getMonthlyMemo,
    setMonthlyMemo,
    noteCount,
  };
}
