import { useTranslation } from 'react-i18next';
import type { ArtProps } from './types';
import { cx } from '@/lib/css';
import { Panel } from './Panel';
import styles from './Art.module.css';

export function TeacherArt({ bgRef, panelRef }: ArtProps) {
  const { t } = useTranslation();
  return (
    <>
      <div ref={bgRef} className={cx(styles.bg, styles.teacher)} />
      <div className={styles.teacherOrb} />
      <Panel
        ref={panelRef}
        title={t('projects.items.miProfe.panel.title')}
        badge={<span className={styles.live}>● LIVE</span>}
        rotate="-5deg"
        box={{ width: '62%', height: '40%', left: '19%', top: '52%', padding: 14 }}
      >
        <div className={styles.row}><span>{t('projects.items.miProfe.panel.audio')}</span><b>I&apos;m <span className={styles.acid}>gonna</span> go for a run</b></div>
        <div className={styles.row}><span>{t('projects.items.miProfe.panel.typed')}</span><span>I go for a run</span></div>
        <span className={styles.warn}>{t('projects.items.miProfe.panel.insight')}</span>
      </Panel>
    </>
  );
}
