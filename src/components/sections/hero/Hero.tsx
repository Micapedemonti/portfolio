import { Trans, useTranslation } from 'react-i18next';
import { Cta } from '@/components/ui/Cta';
import { Fade } from '@/components/ui/Fade';
import { Mask } from '@/components/ui/Mask';
import { projects } from '@/data/projects';
import { cx } from '@/lib/css';
import { useIntroDone } from '@/lib/introContext';
import { Orb } from './Orb';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useTranslation();
  const introDone = useIntroDone();
  const projectCount = String(projects.length).padStart(2, '0');
  const [first = '', middle = '', last = ''] = t('hero.title', { returnObjects: true });
  const lastWord = last.replace(/\.$/, '');

  return (
    <section className={cx(styles.hero, introDone && 'in')} id="home">
      <Orb visible={introDone} />
      <div className={styles.crosshair} aria-hidden="true" />

      <Fade className={styles.topline} delay={150}>
        <span>●</span> {t('hero.role')} <span>—</span> {t('hero.location')}
      </Fade>

      <h1 className={styles.title}>
        <Mask delay={100}>{first}</Mask>
        <Mask delay={200} className={cx(styles.outline, styles.indent)}>{middle}</Mask>
        <Mask delay={300}>{lastWord}<span className={styles.dot}>.</span></Mask>
      </h1>

      <div className={styles.bottom}>
        <Fade className={styles.intro} delay={550}>
          <Trans i18nKey="hero.intro" components={{ strong: <strong /> }} />
          <br />
          <Cta href="#work">{t('hero.cta')}</Cta>
        </Fade>
        <Fade className={styles.index} delay={650}>
          <b>{projectCount}</b> {t('hero.count')} <span>SCROLL ↓</span>
        </Fade>
      </div>
    </section>
  );
}
