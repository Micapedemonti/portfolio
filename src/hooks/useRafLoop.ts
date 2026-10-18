import { useEffect } from 'react';

export function useRafLoop(tick: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    let id = 0;
    const loop = () => {
      tick();
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [tick, enabled]);
}
