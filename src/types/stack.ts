export type StackCategory =
  | 'frontend' | 'language' | 'backend' | 'runtime' | 'database' | 'orm'
  | 'devops' | 'deploy' | 'cloud' | 'state' | 'agents' | 'hosting';

export interface StackItem {
  name: string;
  category: StackCategory;
}
