import type { ReactNode } from 'react';
import { Magnetic } from './Magnetic';
import styles from './Cta.module.css';

export function Cta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Magnetic>
      <a href={href} className={styles.cta} data-cursor="big">
        {children} <span className={styles.arrow}>↗</span>
      </a>
    </Magnetic>
  );
}
