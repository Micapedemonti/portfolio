import type { Project } from '@/types/project';

/** Textos de cada proyecto: projects.items.<id> en src/locales/*.json */
export const projects: readonly Project[] = [
  {
    id: 'miProfe',
    number: '01',
    tags: ['NESTJS', 'REACT', 'POSTGRESQL', 'DOCKER', 'CI/CD'],
    status: 'live',
    art: 'teacher',
    href: 'https://miprofe.micaela.dev',
  },
  {
    id: 'licitaSimple',
    number: '02',
    tags: ['REACT', 'NESTJS', 'TYPESCRIPT', 'DOCKER', 'TOOL USE'],
    status: 'live',
    art: 'data',
    href: 'https://licitasimple.micaela.dev',
  },
  {
    id: 'portfolio',
    number: '03',
    tags: ['REACT', 'TYPESCRIPT', 'I18N', 'CLAUDE', 'CLOUDFLARE'],
    status: 'live',
    art: 'portfolio',
    href: null, // TODO: link al repo de GitHub
  },
];
