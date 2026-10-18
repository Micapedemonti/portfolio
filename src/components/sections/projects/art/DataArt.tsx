import { useTranslation } from 'react-i18next';
import type { ArtProps } from './types';
import { cx } from '@/lib/css';
import { Panel } from './Panel';
import styles from './Art.module.css';

export function DataArt({ bgRef, panelRef }: ArtProps) {
  const { t } = useTranslation();
  const p = (key: 'tenderKey' | 'tender' | 'verdictKey' | 'verdict' | 'discardedKey') =>
    t(`projects.items.licitaSimple.panel.${key}`);

  return (
    <>
      <div ref={bgRef} className={cx(styles.bg, styles.data)} />
      <div className={styles.crystal} data-art="crystal" />
      <Panel
        ref={panelRef}
        title="licitaciones.json"
        badge="↗"
        rotate="5deg"
        box={{ width: '50%', height: '46%', left: '44%', top: '40%', padding: 12 }}
      >
        {'{'}<br />
        &nbsp; &quot;{p('tenderKey')}&quot;: <b>&quot;{p('tender')}&quot;</b>,<br />
        &nbsp; &quot;{p('verdictKey')}&quot;: <span className={styles.acid}>&quot;{p('verdict')}&quot;</span>,<br />
        &nbsp; &quot;{p('discardedKey')}&quot;: 37<br />
        {'}'}
      </Panel>
    </>
  );
}
