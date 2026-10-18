import { useTranslation } from 'react-i18next';
import styles from './Topbar.module.css';

const LINKS = [
  { href: '#home', labelKey: 'nav.home' },
  { href: '#work', labelKey: 'nav.work' },
  { href: '#about', labelKey: 'nav.about' },
  { href: '#contact', labelKey: 'nav.contact' },
] as const;

const LANGUAGES = {
  es: { next: 'en', label: 'English', cv: '/cv/micaela-pedemonti-cv-es.pdf' },
  en: { next: 'es', label: 'Español', cv: '/cv/micaela-pedemonti-cv-en.pdf' },
} as const;

export function Topbar() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage === 'en' ? 'en' : 'es';
  const { next, label: switchLabel, cv } = LANGUAGES[current];

  return (
    <header className={styles.topbar}>
      <a className={styles.wordmark} href="#home">MICAELA<br />PEDEMONTI</a>
      <nav className={styles.nav} aria-label={t('nav.label')}>
        {LINKS.map(({ href, labelKey }) => {
          const label = t(labelKey);
          return (
            <a key={href} href={href}>
              <span data-t={label}>{label}</span>
            </a>
          );
        })}
      </nav>
      <div className={styles.actions}>
        <a
          className={styles.pill}
          href={cv}
          target="_blank"
          rel="noreferrer"
          aria-label={t('topbar.cvLabel')}
        >
          {t('topbar.cv')} <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className={styles.pill}
          lang={next}
          onClick={() => void i18n.changeLanguage(next)}
        >
          {switchLabel}
        </button>
      </div>
    </header>
  );
}