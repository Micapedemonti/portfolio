import type { CSSProperties } from 'react';

/** Permite pasar variables CSS (--d, --i, ...) al prop style con tipos. */
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}

/** Une clases ignorando las falsy. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
