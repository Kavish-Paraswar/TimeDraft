'use client';
import { useState, useRef } from 'react';
import { StickyNote, Calendar, Hash, Plus, Trash2, BookOpen } from 'lucide-react';
import { NotesActions, NotesState, Note } from '@/hooks/useNotes';
import { formatShortDate, getRangeKey } from '@/utils/dateUtils';
import styles from './NotesPanel.module.css';
type TabType = 'monthly' | 'range' | 'date';
interface NotesPanelProps {
  notesState: NotesState & NotesActions;
  currentYear: number;
  currentMonth: number;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
}
export default function NotesPanel({
  notesState,
  currentYear,
  currentMonth,
  selectedStartDate,
  selectedEndDate,
}: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('monthly');
  const [newNoteText, setNewNoteText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const monthlyMemo = notesState.getMonthlyMemo(currentYear, currentMonth);
  const rangeMemo = notesState.getRangeNote(selectedStartDate, selectedEndDate);
  const dateNoteList = Object.entries(notesState.byDate)
    .filter(([key]) => key.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`))
    .map(([dateKey, notes]) => ({ dateKey, notes: notes as Note[] }));
  const rangeBadgeCount = Object.values(notesState.notes || {}).filter(Boolean).length;
  const dateBadgeCount = Object.values(notesState.byDate).flat().length;
  const handleAddNote = (type: 'date' | 'range', key: string) => {
    if (!newNoteText.trim()) return;
    notesState.addNote(key, type, newNoteText.trim());
    setNewNoteText('');
  };
  const handleKeyDown = (e: React.KeyboardEvent, dateKey: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote('date', dateKey);
    }
  };
  return (
    <section className={styles.panel} aria-label="Notes">
      {}
      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'monthly'}
          className={`${styles.tab} ${activeTab === 'monthly' ? styles.active : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          <BookOpen /> Monthly
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'range'}
          className={`${styles.tab} ${activeTab === 'range' ? styles.active : ''}`}
          onClick={() => setActiveTab('range')}
        >
          <Calendar />
          Range
          {rangeBadgeCount > 0 && <span className={styles.badge}>{rangeBadgeCount}</span>}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'date'}
          className={`${styles.tab} ${activeTab === 'date' ? styles.active : ''}`}
          onClick={() => setActiveTab('date')}
        >
          <Hash />
          Daily
          {dateBadgeCount > 0 && <span className={styles.badge}>{dateBadgeCount}</span>}
        </button>
      </div>
      {}
      <div className={styles.content} role="tabpanel">
        {}
        {activeTab === 'monthly' && (
          <textarea
            className={styles.monthlyArea}
            placeholder={`Jot down notes for this month…`}
            value={monthlyMemo}
            onChange={(e) => notesState.setMonthlyMemo(currentYear, currentMonth, e.target.value)}
            aria-label="Monthly memo"
            rows={2}
          />
        )}
        {}
        {activeTab === 'range' && (
          <>
            {!selectedStartDate || !selectedEndDate ? (
              <p className={styles.noRangeMsg}>
                Select a date range on the calendar to attach notes to it.
              </p>
            ) : (
              <>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 'var(--sp-3)' }}>
                  {formatShortDate(selectedStartDate < selectedEndDate ? selectedStartDate : selectedEndDate)} →{' '}
                  {formatShortDate(selectedStartDate < selectedEndDate ? selectedEndDate : selectedStartDate)}
                </p>
                <textarea
                  className={styles.monthlyArea}
                  placeholder="Jot down notes for this specific date range…"
                  value={rangeMemo}
                  onChange={(e) => notesState.setRangeNote(selectedStartDate, selectedEndDate, e.target.value)}
                  aria-label="Range memo"
                  rows={3}
                />
              </>
            )}
          </>
        )}
        {}
        {activeTab === 'date' && (
          <>
            {dateNoteList.length === 0 ? (
              <div className={styles.empty}>
                <Hash />
                <p>Click any date to add a note to it.</p>
              </div>
            ) : (
              <div className={styles.noteList}>
                {dateNoteList.map(({ dateKey, notes }) => (
                  <div key={dateKey}>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>
                      {new Date(dateKey + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                    {notes.map((note) => (
                      <NoteItem
                        key={note.id}
                        note={note}
                        onUpdate={(id, text) => notesState.updateNote(dateKey, 'date', id, text)}
                        onDelete={(id) => notesState.deleteNote(dateKey, 'date', id)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
function NoteItem({
  note,
  onUpdate,
  onDelete,
}: {
  note: Note;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}) {
  const [text, setText] = useState(note.content);
  return (
    <div className={styles.noteItem}>
      <div className={styles.noteItemHeader}>
        <span className={styles.noteDate}>
          {new Date(note.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <button
          className={styles.noteDeleteBtn}
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
        >
          <Trash2 />
        </button>
      </div>
      <textarea
        className={styles.noteTextarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => { if (text !== note.content) onUpdate(note.id, text); }}
        aria-label="Note content"
        rows={2}
      />
    </div>
  );
}
