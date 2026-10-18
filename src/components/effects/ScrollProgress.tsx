import { useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref);
  return <div ref={ref} className={styles.progress} aria-hidden="true" />;
}
