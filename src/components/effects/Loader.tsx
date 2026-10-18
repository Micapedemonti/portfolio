import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { clamp } from '@/lib/math';
import { cx } from '@/lib/css';
import styles from './Loader.module.css';

const DURATION = 1300;

interface LoaderProps {
  /** Se llama cuando la cortina empieza a subir: momento de revelar el contenido. */
  onReveal: () => void;
  /** Se llama cuando la animación de salida terminó: se puede desmontar. */
  onExit: () => void;
}

/** Pantalla de carga con contador 0–100 y cortina de salida. */
export function Loader({ onReveal, onExit }: LoaderProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const count = countRef.current;
    const bar = barRef.current;
    if (!count || !bar) return;

    const t0 = performance.now();
    let id = 0;
    let timer = 0;
    let cancelled = false;

    const step = (now: number) => {
      const p = clamp((now - t0) / DURATION, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      count.textContent = String(Math.round(eased * 100));
      bar.style.transform = `scaleX(${eased})`;
      if (p < 1) {
        id = requestAnimationFrame(step);
        return;
      }
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        setLeaving(true);
        timer = window.setTimeout(onReveal, 350);
      });
    };
    id = requestAnimationFrame(step);

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      window.clearTimeout(timer);
    };
  }, [onReveal]);

  return (
    <div
      className={cx(styles.loader, leaving && styles.out)}
      aria-hidden="true"
      onTransitionEnd={(e) => { if (e.target === e.currentTarget && leaving) onExit(); }}
    >
      <div className={styles.top}>
        <span>{site.name}</span>
        <span>{site.role} · {site.city}</span>
      </div>
      <div>
        <div className={styles.count}><span ref={countRef}>0</span>%</div>
        <div className={styles.bar}><i ref={barRef} /></div>
      </div>
    </div>
  );
}
