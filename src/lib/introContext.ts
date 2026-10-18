import { createContext, useContext } from 'react';

/**
 * Indica si el preloader terminó. Las animaciones de entrada esperan
 * a que esto sea true para no correr detrás de la pantalla de carga.
 */
export const IntroContext = createContext<boolean>(true);

export const useIntroDone = (): boolean => useContext(IntroContext);
