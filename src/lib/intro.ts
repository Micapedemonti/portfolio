import { prefersReducedMotion } from './media';

const KEY = 'mp-intro-seen';

/** El preloader se muestra una vez por sesión y nunca con movimiento reducido. Lectura pura. */
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
    // Sin storage (modo privado estricto): el preloader se verá en cada visita, no pasa nada.
  }
}
