import type { StackItem } from '@/types/stack';

/** Nombres de tecnologías (no se traducen). Las categorías viven en stack.* de src/locales. */
export const stack: readonly StackItem[] = [
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'language' },
  { name: 'NestJS', category: 'backend' },
  { name: 'Node.js', category: 'runtime' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Prisma', category: 'orm' },
  { name: 'Docker', category: 'devops' },
  { name: 'CI/CD', category: 'deploy' },
  { name: 'AWS', category: 'cloud' },
  { name: 'Zustand', category: 'state' },
  { name: 'AI Tool Use', category: 'agents' },
  { name: 'Oracle Cloud', category: 'hosting' },
];
