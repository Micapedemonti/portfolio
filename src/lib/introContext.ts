import { createContext, useContext } from 'react';

export const IntroContext = createContext<boolean>(true);

export const useIntroDone = (): boolean => useContext(IntroContext);
