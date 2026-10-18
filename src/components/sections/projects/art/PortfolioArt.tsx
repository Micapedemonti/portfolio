import { useTranslation } from 'react-i18next';
import type { ArtProps } from './types';
import { cx } from '@/lib/css';
import { Panel } from './Panel';
import styles from './Art.module.css';

export function PortfolioArt({ bgRef, panelRef }: ArtProps) {
  const { t } = useTranslation();
  const p = (key: 'title' | 'design' | 'code' | 'deploy' | 'me') => t(`projects.items.portfolio.panel.${key}`);

  return (
    <>
      <div ref={bgRef} className={cx(styles.bg, styles.portfolio)} />
      <div className={styles.miniOrb} />
      <Panel
        ref={panelRef}
        title={p('title')}
        badge={<span className={styles.acid}>✳</span>}
        rotate="4deg"
        box={{ width: '58%', height: '44%', left: '30%', top: '40%', padding: 14 }}
      >
        <div className={styles.row}><span>{p('design')}</span><b>Claude + skill</b></div>
        <div className={styles.row}><span>{p('code')}</span><b>Claude · React + TS</b></div>
        <div className={styles.row}><span>{p('deploy')}</span><span className={styles.acid}>{p('me')} ✓</span></div>
      </Panel>
    </>
  );
}
