import { useTranslation } from 'react-i18next';
import { useContactForm } from '@/hooks/useContactForm';
import { CONTACT_LIMITS, MESSAGE_MIN } from '@/lib/contactValidation';
import { site } from '@/lib/site';
import { cx } from '@/lib/css';
import type { ContactField } from '@/types/contact';
import styles from './ContactForm.module.css';

const FIELDS: ReadonlyArray<{ name: ContactField; type: 'text' | 'email' | 'textarea' }> = [
  { name: 'name', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'message', type: 'textarea' },
];

/** Formulario de contacto. La lógica vive en useContactForm; aquí solo UI. */
export function ContactForm() {
  const { t } = useTranslation();
  const { values, errors, status, onChange, onSubmit } = useContactForm();

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {FIELDS.map(({ name, type }) => {
        const id = `contact-${name}`;
        const error = errors[name];
        const common = {
          id,
          name,
          value: values[name],
          onChange,
          placeholder: t(`contact.form.${name}Placeholder`),
          maxLength: CONTACT_LIMITS[name],
          'aria-invalid': Boolean(error),
          'aria-describedby': error ? `${id}-error` : undefined,
          className: cx(styles.input, error && styles.invalid),
        };
        return (
          <div key={name} className={cx(styles.field, type === 'textarea' && styles.full)}>
            <label className={styles.label} htmlFor={id}>{t(`contact.form.${name}`)}</label>
            {type === 'textarea' ? <textarea rows={4} {...common} /> : <input type={type} autoComplete={name} {...common} />}
            {error && (
              <span id={`${id}-error`} className={styles.error}>
                {t(`contact.form.errors.${error}`, { min: MESSAGE_MIN, max: CONTACT_LIMITS[name] })}
              </span>
            )}
          </div>
        );
      })}

      {/* Honeypot anti-spam: invisible para personas */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-company">{t('contact.form.company')}</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
      </div>

      <div className={cx(styles.actions, styles.full)}>
        <button type="submit" className={styles.submit} disabled={status === 'sending'}>
          {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')} <span aria-hidden="true">↗</span>
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {status === 'sent' && <span className={styles.sent}>{t('contact.form.sent')}</span>}
          {status === 'error' && <span className={styles.failed}>{t('contact.form.failed', { email: site.email })}</span>}
        </p>
      </div>
    </form>
  );
}
