export type ProjectStatus = 'live' | 'wip' | 'landing';

export type ProjectArtVariant = 'teacher' | 'data' | 'bill' | 'patagonia' | 'portfolio';

export type ProjectId = 'miProfe' | 'licitaSimple' | 'portfolio';

export interface Project {
  id: ProjectId;
  number: string;
  tags: readonly string[];
  status: ProjectStatus;
  art: ProjectArtVariant;
  href: string | null;
  /** Texto del botón: 'live' = Ver en vivo, 'repo' = Ver repo */
  linkKind: 'live' | 'repo';
}
