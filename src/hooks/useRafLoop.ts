import { useEffect } from 'react';

/**
 * Corre `tick` en cada frame mientras el componente está montado.
 * Pasar enabled=false lo apaga (por ejemplo, con movimiento reducido).
 */
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
