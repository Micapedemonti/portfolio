import { useState, type ChangeEvent, type FormEvent } from 'react';
import { validateContact } from '@/lib/contactValidation';
import { sendContact } from '@/services/contactService';
import type { ContactErrors, ContactInput, ContactStatus } from '@/types/contact';

const EMPTY: ContactInput = { name: '', email: '', message: '', company: '' };

/** Estado, validación y envío del formulario. El componente solo renderiza. */
export function useContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<ContactStatus>('idle');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setStatus('sending');
    try {
      await sendContact(result.data);
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return { values, errors, status, onChange, onSubmit };
}
