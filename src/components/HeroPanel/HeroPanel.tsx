'use client';
import Image from 'next/image';
import { Calendar, StickyNote, ChevronRight } from 'lucide-react';
import { MONTH_NAMES } from '@/utils/dateUtils';
import { HeroImage } from '@/data/heroImages';
import styles from './HeroPanel.module.css';
interface HeroPanelProps {
  month: number; 
  year: number;
  hero: HeroImage;
  rangeLabel: string;
  noteCount: number;
}
export default function HeroPanel({ month, year, hero, rangeLabel, noteCount }: HeroPanelProps) {
  return (
    <div className={styles.heroPanel}>
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 45vw, 38vw"
        className={styles.heroImage}
      />
      {}
      <div className={styles.gradient} />
      {}
      <div className={styles.accentShape1} />
      <div className={styles.accentShape2} />
      {}
      <div className={styles.content}>
        <p className={styles.yearLabel}>{year}</p>
        <h1 className={styles.monthLabel}>{MONTH_NAMES[month]}</h1>
        <div className={styles.stats}>
          <div className={styles.statChip}>
            <Calendar />
            <span>{rangeLabel}</span>
          </div>
          {noteCount > 0 && (
            <div className={styles.statChip}>
              <StickyNote />
              <span>{noteCount} note{noteCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
