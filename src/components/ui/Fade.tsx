import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cssVars, cx } from '@/lib/css';

interface FadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'p' | 'span';
}

/** Aparece con fade y un leve desplazamiento al entrar en pantalla. */
export function Fade({ children, delay = 0, className, as: Tag = 'div' }: FadeProps) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={cx('fade', visible && 'in', className)} style={cssVars({ '--d': `${delay}ms` })}>
      {children}
    </Tag>
  );
}
