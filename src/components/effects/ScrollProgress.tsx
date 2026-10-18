import { useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

/** Barra superior que muestra cuánto se ha recorrido la página. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref);
  return <div ref={ref} className={styles.progress} aria-hidden="true" />;
}
