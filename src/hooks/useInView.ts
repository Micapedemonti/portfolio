import { useEffect, useState } from 'react';

/**
 * Devuelve un callback ref y si el elemento ya entró en pantalla.
 * Se dispara una sola vez: después de revelarse no vuelve a ocultarse.
 */
export function useInView<T extends Element>(rootMargin = '0px 0px -12% 0px') {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, inView, rootMargin]);

  return [setNode, inView] as const;
}
