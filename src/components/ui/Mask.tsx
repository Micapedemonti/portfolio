import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cssVars, cx } from '@/lib/css';

interface MaskProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Línea de texto que sube desde una máscara al entrar en pantalla. */
export function Mask({ children, delay = 0, className }: MaskProps) {
  const [ref, visible] = useReveal<HTMLSpanElement>();
  return (
    <span ref={ref} className={cx('m', visible && 'in', className)}>
      <span style={cssVars({ '--d': `${delay}ms` })}>{children}</span>
    </span>
  );
}
