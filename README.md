# Portfolio · Micaela Pedemonti

Portfolio personal de desarrolladora full stack. Sitio bilingüe (español / inglés) con animaciones hechas en CSS y un formulario de contacto que envía emails desde una función serverless.

## Stack

- **React 19** + **TypeScript** (modo estricto) con **React Compiler**
- **Vite** para desarrollo y build
- **i18next** para la traducción, con detección automática del idioma
- **CSS Modules**, sin librerías de UI ni de animación
- **Cloudflare Pages** para el hosting y **Pages Functions** para la API
- **Resend** para enviar los emails del formulario de contacto

## Estructura

```
src/
  components/   effects, layout, sections y ui
  data/         proyectos y stack (datos que no se traducen)
  hooks/        lógica reutilizable (parallax, tilt, reveal, formulario...)
  lib/          utilidades y validación compartida con el backend
  locales/      textos en es.json y en.json
  services/     llamadas a la API
functions/
  api/contact.ts   endpoint POST /api/contact
```

La validación del formulario (`src/lib/contactValidation.ts`) es la misma en el front y en el servidor.

## Desarrollo

```bash
npm install
npm run dev       # solo el front, en http://localhost:5173
npm run build     # chequeo de tipos + build a dist/
npm run lint
```

Para probar el formulario de contacto en local hace falta levantar también la función con Wrangler:

```bash
npm run build
npx wrangler pages dev dist
```

## Variables de entorno

La función de contacto necesita estas variables. En local van en un archivo `.dev.vars`, que está en `.gitignore`; en producción se configuran en Cloudflare Pages.

| Variable         | Descripción                                             |
| ---------------- | ------------------------------------------------------- |
| `RESEND_API_KEY` | API key de Resend                                       |
| `CONTACT_TO`     | Email donde llegan los mensajes                         |
| `CONTACT_FROM`   | Remitente verificado en Resend, ej. `Portfolio <contacto@tudominio.com>` |

## Deploy

En Cloudflare Pages, con el repo conectado:

- Comando de build: `npm run build`
- Directorio de salida: `dist`
- La carpeta `functions/` se publica sola como Pages Functions.
