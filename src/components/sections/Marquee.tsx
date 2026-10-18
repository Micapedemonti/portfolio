import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRafLoop } from '@/hooks/useRafLoop';
import { lerp } from '@/lib/math';
import { prefersReducedMotion } from '@/lib/media';
import styles from './Marquee.module.css';

/** Cinta infinita que acelera y cambia de dirección según el scroll. */
export function Marquee() {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, vel: 0, dir: 1, lastY: 0 });

  const tick = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = state.current;
    const y = window.scrollY;
    const dy = y - s.lastY;
    s.lastY = y;
    if (dy) s.dir = dy > 0 ? 1 : -1;
    s.vel = lerp(s.vel, Math.abs(dy), 0.1);
    s.x -= (0.6 + s.vel * 0.5) * s.dir;

    // El contenido está duplicado: al recorrer la mitad, se vuelve al inicio sin salto visible
    const half = track.scrollWidth / 2;
    if (s.x < -half) s.x += half;
    if (s.x > 0) s.x -= half;

    track.style.transform = `translate3d(${s.x}px, 0, 0)`;
    track.querySelectorAll<HTMLElement>('b').forEach((star) => {
      star.style.transform = `rotate(${s.x * 0.6}deg)`;
    });
  }, []);

  useRafLoop(tick, !prefersReducedMotion());

  const marqueeItems = t('marquee', { returnObjects: true });
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div ref={trackRef} className={styles.track}>
        {items.map((item, i) => (
          <span key={i}>{item}<b>✳</b></span>
        ))}
      </div>
    </div>
  );
}
