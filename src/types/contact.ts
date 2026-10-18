export interface ContactInput {
  name: string;
  email: string;
  message: string;
  /** Honeypot: los humanos no lo ven, los bots lo llenan. */
  company: string;
}

export type ContactField = Exclude<keyof ContactInput, 'company'>;

/** Códigos de error sin texto: cada idioma los traduce en contact.form.errors.* */
export type ContactErrorCode = 'required' | 'invalidEmail' | 'tooShort' | 'tooLong';

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';
