import { useEffect, type RefObject } from 'react';
import { lerp } from '@/lib/math';
import { hasFinePointer, prefersReducedMotion } from '@/lib/media';

/** El elemento sigue un poco al puntero mientras está encima. */
export function useMagnetic(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    let tx = 0, ty = 0, x = 0, y = 0, id = 0;
    const loop = () => {
      x = lerp(x, tx, 0.18);
      y = lerp(y, ty, 0.18);
      el.style.transform = `translate(${x}px, ${y}px)`;
      id = Math.abs(x - tx) + Math.abs(y - ty) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!id) id = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) * 0.3;
      ty = (e.clientY - r.top - r.height / 2) * 0.45;
      start();
    };
    const onLeave = () => { tx = 0; ty = 0; start(); };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(id);
    };
  }, [ref]);
}
