export interface HeroImage {
  src: string;
  alt: string;
  accentColor: string;      
  gradientFrom: string;
  gradientTo: string;
  season: string;
}
export const HERO_IMAGES: Record<number, HeroImage> = {
  1: {
    src: '/heroes/hero_january.png',
    alt: 'Snow-covered mountain peak at golden hour',
    accentColor: '#F59E0B',
    gradientFrom: '#1e3a5f',
    gradientTo: '#0f172a',
    season: 'winter',
  },
  2: {
    src: '/heroes/hero_february.png',
    alt: 'Pink cherry blossoms at twilight',
    accentColor: '#EC4899',
    gradientFrom: '#4a1d60',
    gradientTo: '#1e1b4b',
    season: 'spring',
  },
  3: {
    src: '/heroes/hero_march.png',
    alt: 'Holi festival vibrant colors',
    accentColor: '#8B5CF6',
    gradientFrom: '#4c1d95',
    gradientTo: '#1e1b4b',
    season: 'spring',
  },
  4: {
    src: '/heroes/hero_april.png',
    alt: 'Lush spring forest with sunlight rays',
    accentColor: '#10B981',
    gradientFrom: '#064e3b',
    gradientTo: '#022c22',
    season: 'spring',
  },
  5: {
    src: '/heroes/hero_may.png',
    alt: 'Golden wheat fields at sunset in India',
    accentColor: '#F59E0B',
    gradientFrom: '#78350f',
    gradientTo: '#451a03',
    season: 'summer',
  },
  6: {
    src: '/heroes/hero_june.png',
    alt: 'Monsoon clouds over Indian ocean',
    accentColor: '#0EA5E9',
    gradientFrom: '#0c4a6e',
    gradientTo: '#082f49',
    season: 'monsoon',
  },
  7: {
    src: '/heroes/hero_july.png',
    alt: 'Ganges river at dawn with marigolds',
    accentColor: '#F97316',
    gradientFrom: '#7c2d12',
    gradientTo: '#431407',
    season: 'monsoon',
  },
  8: {
    src: '/heroes/hero_august.png',
    alt: 'Independence Day tricolor kites celebration',
    accentColor: '#22C55E',
    gradientFrom: '#14532d',
    gradientTo: '#052e16',
    season: 'monsoon',
  },
  9: {
    src: '/heroes/hero_september.png',
    alt: 'Ancient temple at sunrise with lotus pond',
    accentColor: '#F59E0B',
    gradientFrom: '#78350f',
    gradientTo: '#3f1a06',
    season: 'autumn',
  },
  10: {
    src: '/heroes/hero_october.png',
    alt: 'Navratri Dandiya festival celebration',
    accentColor: '#EF4444',
    gradientFrom: '#7f1d1d',
    gradientTo: '#450a0a',
    season: 'autumn',
  },
  11: {
    src: '/heroes/hero_november.png',
    alt: 'Diwali festival of lights',
    accentColor: '#EAB308',
    gradientFrom: '#713f12',
    gradientTo: '#3f1a06',
    season: 'autumn',
  },
  12: {
    src: '/heroes/hero_december.png',
    alt: 'Snow-capped Himalayas at dawn',
    accentColor: '#60A5FA',
    gradientFrom: '#1e3a5f',
    gradientTo: '#0f172a',
    season: 'winter',
  },
};
export function getHeroImage(month: number): HeroImage {
  return HERO_IMAGES[month] || HERO_IMAGES[1];
}
