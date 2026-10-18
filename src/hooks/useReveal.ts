import { useIntroDone } from '@/lib/introContext';
import { useInView } from './useInView';

/** Visible en pantalla y con el preloader ya terminado. */
export function useReveal<T extends Element>() {
  const [ref, inView] = useInView<T>();
  const introDone = useIntroDone();
  return [ref, inView && introDone] as const;
}
