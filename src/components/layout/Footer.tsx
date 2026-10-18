import { useTranslation } from 'react-i18next';
import { useClock } from '@/hooks/useClock';
import { site } from '@/lib/site';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();
  const time = useClock(site.timeZone);
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} <b>{site.name.toUpperCase()}</b></span>
      <span>{t('footer.built')}</span>
      <span>{site.city.toUpperCase()} · <span className={styles.clock}>{time}</span></span>
    </footer>
  );
}
