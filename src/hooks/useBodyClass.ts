import { useEffect } from 'react';

/** Agrega una clase al <body> mientras `active` sea true. */
export function useBodyClass(className: string, active: boolean): void {
  useEffect(() => {
    if (!active) return;
    document.body.classList.add(className);
    return () => document.body.classList.remove(className);
  }, [className, active]);
}
