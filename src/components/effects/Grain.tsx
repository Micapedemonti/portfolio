import styles from './Grain.module.css';

/** Textura de grano de película sobre toda la página. */
export function Grain() {
  return <div className={styles.grain} aria-hidden="true" />;
}
