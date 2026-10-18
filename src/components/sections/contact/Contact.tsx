import { Trans, useTranslation } from 'react-i18next';
import { Fade } from '@/components/ui/Fade';
import { Magnetic } from '@/components/ui/Magnetic';
import { useReveal } from '@/hooks/useReveal';
import { cx } from '@/lib/css';
import { site } from '@/lib/site';
import { ContactForm } from './ContactForm';
import { SplitText } from './SplitText';
import styles from './Contact.module.css';

export function Contact() {
  const { t } = useTranslation();
  const [ref, revealed] = useReveal<HTMLElement>();
  const [firstLine = '', secondLine = ''] = t('contact.title', { returnObjects: true });
  const socials = [
    { label: 'GitHub', href: site.socials.github },
    { label: 'LinkedIn', href: site.socials.linkedin },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <section ref={ref} className={cx('section', styles.contact, revealed && styles.revealed)} id="contact">
      <Fade className="eyebrow">{t('contact.eyebrow')}</Fade>
      <h2 className={styles.title} aria-label={`${firstLine} ${secondLine}`}>
        <SplitText
          lineClassName={styles.line}
          charClassName={styles.char}
          lines={[{ text: firstLine }, { text: secondLine, className: styles.stroke }]}
        />
      </h2>

      <div className={styles.row}>
        <Fade as="p" className={styles.note}>
          <Trans i18nKey="contact.note" components={{ br: <br /> }} />
        </Fade>
        <Fade delay={120}>
          <Magnetic>
            <a className={styles.email} href={`mailto:${site.email}`} data-cursor="big">{site.email} ↗</a>
          </Magnetic>
          {socials.length > 0 && (
            <div className={styles.socials}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              ))}
            </div>
          )}
        </Fade>
      </div>

      <ContactForm />
    </section>
  );
}
