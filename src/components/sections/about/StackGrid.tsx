import { useTranslation } from 'react-i18next';
import { stack } from '@/data/stack';
import { useReveal } from '@/hooks/useReveal';
import { cssVars, cx } from '@/lib/css';
import styles from './StackGrid.module.css';

export function StackGrid() {
  const { t } = useTranslation();
  const [ref, revealed] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cx(styles.grid, revealed && styles.revealed)}>
      {stack.map((item, i) => (
        <div key={item.name} className={styles.item} style={cssVars({ '--i': i })}>
          {item.name} <span>{t(`stack.${item.category}`)}</span>
        </div>
      ))}
    </div>
  );
}
