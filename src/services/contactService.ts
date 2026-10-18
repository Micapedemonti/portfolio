import type { ContactInput } from '@/types/contact';

/** Único punto que conoce el endpoint. Si cambia el backend, solo se toca esto. */
export async function sendContact(input: ContactInput): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Contacto falló con status ${res.status}`);
}
