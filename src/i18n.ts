import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import esTranslation from './locales/es.json';
import enTranslation from './locales/en.json';

export const defaultResources = {
  es: { translation: esTranslation },
  en: { translation: enTranslation },
} as const;

export type Language = keyof typeof defaultResources;

// Mantiene <html lang>, el <title> y la meta description en el idioma activo
i18n.on('languageChanged', () => {
  const lng = i18n.resolvedLanguage ?? 'es';
  document.documentElement.lang = lng;
  document.title = i18n.t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'));
});

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: defaultResources,
    supportedLngs: ['es', 'en'],
    load: 'languageOnly', // es-CL → es, en-US → en
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React ya escapa el contenido
    },
  });

// Tipado estricto de las keys: una key que no existe es error de TypeScript
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: (typeof defaultResources)['es'];
  }
}

export default i18n;
