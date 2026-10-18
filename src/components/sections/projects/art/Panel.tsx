import type { CSSProperties, ReactNode, Ref } from 'react';
import styles from './Art.module.css';

interface PanelProps {
  ref: Ref<HTMLDivElement>;
  title: string;
  badge: ReactNode;
  rotate: string;
  box: Pick<CSSProperties, 'width' | 'height' | 'left' | 'top' | 'padding'>;
  children: ReactNode;
}

export function Panel({ ref, title, badge, rotate, box, children }: PanelProps) {
  return (
    <div ref={ref} className={styles.panel} style={{ ...box, ['--r' as string]: rotate } as CSSProperties}>
      <div className={styles.uiTop}><span>{title}</span><span>{badge}</span></div>
      <div className={styles.uiBody}>{children}</div>
    </div>
  );
}
