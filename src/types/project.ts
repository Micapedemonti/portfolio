export type ProjectStatus = 'live' | 'wip' | 'landing';

/** Variantes de ilustración CSS disponibles para la tarjeta. */
export type ProjectArtVariant = 'teacher' | 'data' | 'bill' | 'patagonia' | 'portfolio';

/** Coincide con las keys de projects.items.* en los JSON de traducción. */
export type ProjectId = 'miProfe' | 'licitaSimple' | 'portfolio';

/** Solo datos que no dependen del idioma; los textos viven en src/locales. */
export interface Project {
  id: ProjectId;
  number: string;
  tags: readonly string[];
  status: ProjectStatus;
  art: ProjectArtVariant;
  href: string | null; // null = todavía no hay link público
}
