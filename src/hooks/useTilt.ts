import { useEffect, type RefObject } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/lib/media';

/** Inclina `target` en 3D según la posición del puntero sobre `area`. */
export function useTilt(
  area: RefObject<HTMLElement | null>,
  target: RefObject<HTMLElement | null>,
  maxDeg = 14,
): void {
  useEffect(() => {
    const zone = area.current;
    const el = target.current;
    if (!zone || !el || !hasFinePointer() || prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      el.style.setProperty('--ty', `${((e.clientX - r.left) / r.width - 0.5) * maxDeg}deg`);
      el.style.setProperty('--tx', `${-((e.clientY - r.top) / r.height - 0.5) * maxDeg}deg`);
    };
    const onLeave = () => {
      el.style.setProperty('--tx', '0deg');
      el.style.setProperty('--ty', '0deg');
    };

    zone.addEventListener('pointermove', onMove);
    zone.addEventListener('pointerleave', onLeave);
    return () => {
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', onLeave);
    };
  }, [area, target, maxDeg]);
}
