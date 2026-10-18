import { useEffect, type RefObject } from 'react';
import { prefersReducedMotion } from '@/lib/media';

/** Desplaza `layer` según la posición de `frame` en el viewport. */
export function useParallax(
  frame: RefObject<HTMLElement | null>,
  layer: RefObject<HTMLElement | null>,
  strength = 40,
): void {
  useEffect(() => {
    const box = frame.current;
    const el = layer.current;
    if (!box || !el || prefersReducedMotion()) return;

    let id = 0;
    const loop = () => {
      const r = box.getBoundingClientRect();
      if (r.bottom >= 0 && r.top <= window.innerHeight) {
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.translate = `0 ${p * -strength}px`;
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [frame, layer, strength]);
}
