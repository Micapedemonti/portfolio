import { useIntroDone } from '@/lib/introContext';
import { useInView } from './useInView';

export function useReveal<T extends Element>() {
  const [ref, inView] = useInView<T>();
  const introDone = useIntroDone();
  return [ref, inView && introDone] as const;
}
