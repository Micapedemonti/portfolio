/**
 * Cloudflare Pages Function: POST /api/contact
 * Valida el mensaje con las mismas reglas del front y lo envía por email con Resend.
 *
 * Variables de entorno (configurar en Cloudflare Pages):
 *   RESEND_API_KEY  — API key de Resend
 *   CONTACT_TO      — casilla donde quieres recibir los mensajes
 *   CONTACT_FROM    — remitente verificado en Resend, ej: "Portfolio <contacto@micaela.dev>"
 */
import { validateContact } from '../../src/lib/contactValidation';

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  const result = validateContact(raw);
  if (!result.ok) return json({ errors: result.errors }, 422);

  // Bot: responde OK sin enviar nada para no darle pistas
  if (result.data.company) return json({ ok: true });

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error('Faltan variables de entorno: RESEND_API_KEY, CONTACT_TO o CONTACT_FROM');
    return json({ error: 'Servidor mal configurado' }, 500);
  }

  const { name, email, message } = result.data;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO,
      reply_to: email,
      subject: `Portfolio: mensaje de ${name}`,
      html: `<p><b>${escapeHtml(name)}</b> (${escapeHtml(email)}) escribió:</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    }),
  });

  if (!res.ok) {
    // Se ve en la terminal de wrangler y en los logs de Cloudflare; al cliente no se le expone el detalle
    console.error('Resend rechazó el envío', res.status, await res.text());
    return json({ error: 'No se pudo enviar el email' }, 502);
  }
  return json({ ok: true });
}
