export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function adjustLightness(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  return rgbToHex(clamp(rgb.r + amount), clamp(rgb.g + amount), clamp(rgb.b + amount));
}

export function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(rgb.r) + 0.7152 * toLinear(rgb.g) + 0.0722 * toLinear(rgb.b);
}

export function getContrastColor(hex: string): string {
  return getLuminance(hex) > 0.35 ? '#0f172a' : '#ffffff';
}

export function applyThemeVars(
  accentColor: string,
  gradientFrom: string,
  gradientTo: string
): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const rgb = hexToRgb(accentColor);
  if (rgb) {
    root.style.setProperty('--accent', accentColor);
    root.style.setProperty('--accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    root.style.setProperty('--accent-light', adjustLightness(accentColor, 40));
    root.style.setProperty('--accent-dark', adjustLightness(accentColor, -40));
    root.style.setProperty('--accent-alpha', withAlpha(accentColor, 0.15));
    root.style.setProperty('--accent-alpha-strong', withAlpha(accentColor, 0.35));
    root.style.setProperty('--hero-gradient-from', gradientFrom);
    root.style.setProperty('--hero-gradient-to', gradientTo);
    root.style.setProperty('--accent-contrast', getContrastColor(accentColor));
  }
}
