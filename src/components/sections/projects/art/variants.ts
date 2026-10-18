import type { ComponentType } from 'react';
import type { ProjectArtVariant } from '@/types/project';
import type { ArtProps } from './types';
import { BillArt } from './BillArt';
import { DataArt } from './DataArt';
import { PatagoniaArt } from './PatagoniaArt';
import { PortfolioArt } from './PortfolioArt';
import { TeacherArt } from './TeacherArt';

/** Registro de ilustraciones: agregar una variante = un archivo nuevo + una entrada aquí. */
export const artVariants: Record<ProjectArtVariant, ComponentType<ArtProps>> = {
  teacher: TeacherArt,
  data: DataArt,
  bill: BillArt,
  patagonia: PatagoniaArt,
  portfolio: PortfolioArt,
};
