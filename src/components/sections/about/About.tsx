import { Trans, useTranslation } from 'react-i18next';
import { Cta } from '@/components/ui/Cta';
import { Emphasis } from '@/components/ui/Emphasis';
import { Fade } from '@/components/ui/Fade';
import { Mask } from '@/components/ui/Mask';
import { cx } from '@/lib/css';
import { StackGrid } from './StackGrid';
import styles from './About.module.css';

export function About() {
  const { t } = useTranslation();
  const titleLines = t('about.title', { returnObjects: true });

  return (
    <section className={cx('section', styles.about)} id="about">
      <div className={styles.grid}>
        <div>
          <Fade className="eyebrow">{t('about.eyebrow')}</Fade>
          <h2 className={styles.big}>
            {titleLines.map((line, i) => (
              <Mask key={line} delay={i * 80}><Emphasis text={line} /></Mask>
            ))}
          </h2>
          <Fade as="p" className={styles.text}>
            <Trans i18nKey="about.p1" components={{ b: <b /> }} />
          </Fade>
          <Fade as="p" className={styles.text} delay={100}>
            <Trans i18nKey="about.p2" components={{ b: <b /> }} />
          </Fade>
          <Fade as="p" className={styles.text} delay={150}>
            <Trans i18nKey="about.p3" components={{ b: <b /> }} />
          </Fade>
          <Fade delay={200}>
            <Cta href="#contact">{t('about.cta')}</Cta>
          </Fade>
        </div>
        <div>
          <Fade className={styles.stackTitle}>{t('about.stackTitle')}</Fade>
          <StackGrid />
          <Fade className={styles.principle}>
            <span>{t('about.learning')}</span>
          </Fade>
        </div>
      </div>
    </section>
  );
}
