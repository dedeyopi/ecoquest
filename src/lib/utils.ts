import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const LS_KEY = 'ecoquest_v2';

export const clamp = (v: number, a: number, b: number) =>
  Math.max(a, Math.min(b, v));

export const esc = (s = '') => String(s);

/** Simple hash untuk Certificate ID */
export function hashString(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36).toUpperCase().padStart(8, '0');
}

/** Generate Certificate ID deterministik */
export function generateCertId(name: string, className: string, date: number): string {
  const seed = `${name}|${className}|${Math.floor(date / 86400000)}`;
  return `ECO-${hashString(seed).slice(0, 4)}-${hashString(seed + 'x').slice(0, 4)}`;
}

/** Confetti */
export function fireConfetti(count = 60, disabled = false) {
  if (disabled) return;
  const colors = ['#10b981', '#34d399', '#a3e635', '#fbbf24', '#38bdf8', '#f472b6'];
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -20px;
      width: 10px;
      height: 14px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > .5 ? '50%' : '2px'};
      z-index: 9999;
      pointer-events: none;
      transform: rotate(${Math.random() * 360}deg);
      transition: transform ${1.6 + Math.random() * 1.4}s cubic-bezier(.2,.7,.5,1), opacity 2.4s;
    `;
    document.body.appendChild(d);
    requestAnimationFrame(() => {
      d.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${Math.random() * 900}deg)`;
      d.style.opacity = '0';
    });
    setTimeout(() => d.remove(), 3200);
  }
}