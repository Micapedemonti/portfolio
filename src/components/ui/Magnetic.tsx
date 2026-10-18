import { useRef, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

/** Envuelve un elemento para que siga al puntero (efecto magnético). */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMagnetic(ref);
  return (
    <span ref={ref} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </span>
  );
}
