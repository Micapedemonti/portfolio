import type { ArtProps } from './types';
import { cx } from '@/lib/css';
import { Panel } from './Panel';
import styles from './Art.module.css';

export function PatagoniaArt({ bgRef, panelRef }: ArtProps) {
  return (
    <>
      <div ref={bgRef} className={cx(styles.bg, styles.patagonia)}>
        <div className={styles.moon} />
        <div className={styles.mountains}><i /><i /><i /></div>
      </div>
      <Panel
        ref={panelRef}
        title="VIVEPATAGONIA / ARQUITECTURA"
        badge="AWS"
        rotate="-3deg"
        box={{ width: '56%', height: '44%', left: '36%', top: '16%', padding: 14 }}
      >
        <div className={styles.row}><span>front</span><b>S3 + CloudFront</b></div>
        <div className={styles.row}><span>api</span><b>EC2 · NestJS</b></div>
        <div className={styles.row}><span>datos</span><b>RDS · PostgreSQL</b></div>
      </Panel>
    </>
  );
}
