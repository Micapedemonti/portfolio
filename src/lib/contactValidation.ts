// Import relativo a propósito: este archivo también lo usa functions/api/contact.ts, donde no existe el alias @.
import type { ContactErrors, ContactInput } from '../types/contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = { name: 80, email: 120, message: 2000 } as const;
export const MESSAGE_MIN = 10;

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors };

/**
 * Validación pura: la usan el formulario y la función del servidor.
 * Devuelve códigos, no textos, para que cada idioma traduzca el mensaje.
 */
export function validateContact(raw: Partial<Record<keyof ContactInput, unknown>>): ContactValidation {
  const data: ContactInput = {
    name: String(raw.name ?? '').trim(),
    email: String(raw.email ?? '').trim(),
    message: String(raw.message ?? '').trim(),
    company: String(raw.company ?? '').trim(),
  };

  const errors: ContactErrors = {};
  if (!data.name) errors.name = 'required';
  else if (data.name.length > CONTACT_LIMITS.name) errors.name = 'tooLong';

  if (!data.email) errors.email = 'required';
  else if (!EMAIL_RE.test(data.email)) errors.email = 'invalidEmail';
  else if (data.email.length > CONTACT_LIMITS.email) errors.email = 'tooLong';

  if (!data.message) errors.message = 'required';
  else if (data.message.length < MESSAGE_MIN) errors.message = 'tooShort';
  else if (data.message.length > CONTACT_LIMITS.message) errors.message = 'tooLong';

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
