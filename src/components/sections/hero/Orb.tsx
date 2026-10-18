import { useCallback, useEffect, useRef } from 'react';
import { useRafLoop } from '@/hooks/useRafLoop';
import { cx } from '@/lib/css';
import { prefersReducedMotion } from '@/lib/media';
import { pointer, trackPointer } from '@/lib/pointer';
import styles from './Orb.module.css';

/** Esfera iridiscente hecha solo con CSS. Sigue al puntero y al scroll. */
export function Orb({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const animate = !prefersReducedMotion();

  useEffect(() => { if (animate) trackPointer(); }, [animate]);

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const ox = (pointer.x / window.innerWidth - 0.5) * 24;
    const oy = (pointer.y / window.innerHeight - 0.5) * 24;
    el.style.translate = `${ox}px ${oy + window.scrollY * 0.18}px`;
    // El brillo del fondo del hero también sigue al puntero
    const root = document.documentElement.style;
    root.setProperty('--mx', `${(pointer.x / window.innerWidth) * 100}%`);
    root.setProperty('--my', `${(pointer.y / window.innerHeight) * 100}%`);
  }, []);

  useRafLoop(tick, animate);

  return (
    <div ref={ref} className={cx(styles.wrap, visible && styles.visible)} aria-hidden="true">
      <div className={styles.float}>
        <div className={styles.glow} />
        <div className={styles.orb} />
      </div>
    </div>
  );
}
