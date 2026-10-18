import type { ReactNode } from 'react';
import { Magnetic } from './Magnetic';
import styles from './Cta.module.css';

/** Link de llamada a la acción con flecha y efecto magnético. */
export function Cta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Magnetic>
      <a href={href} className={styles.cta} data-cursor="big">
        {children} <span className={styles.arrow}>↗</span>
      </a>
    </Magnetic>
  );
}
