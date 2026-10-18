import { useEffect, type RefObject } from 'react';

/** Escala horizontalmente `bar` según cuánto se ha scrolleado la página. */
export function useScrollProgress(bar: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    let id = 0;
    const loop = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [bar]);
}
