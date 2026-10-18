import { prefersReducedMotion } from './media';

const KEY = 'mp-intro-seen';

export function shouldShowIntro(): boolean {
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(KEY) !== '1';
  } catch {
    return true;
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    return;
  }
}
