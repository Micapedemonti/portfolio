import type { ArtProps } from './types';
import { cx } from '@/lib/css';
import { Panel } from './Panel';
import styles from './Art.module.css';

export function BillArt({ bgRef, panelRef }: ArtProps) {
  return (
    <>
      <div ref={bgRef} className={cx(styles.bg, styles.bill)} />
      <div className={styles.bulb} />
      <Panel
        ref={panelRef}
        title="BOLETA · SEPTIEMBRE"
        badge="EJEMPLO"
        rotate="-4deg"
        box={{ width: '60%', height: '54%', left: '10%', top: '30%', padding: 14 }}
      >
        <div className={styles.row}><span>Cargo fijo</span><span>$1.020</span></div>
        <div className={styles.row}><span>Energía base</span><span>$21.340</span></div>
        <div className={styles.row}><span className={styles.warn}>Arriendo medidor</span><span className={styles.warn}>$3.900</span></div>
        <span className={styles.acid}>↑ no aparecía en agosto</span>
      </Panel>
    </>
  );
}
