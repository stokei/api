import { CountSitesLightColorsRepository } from './count-sites-light-colors';
import { CreateSitesLightColorRepository } from './create-sites-light-color';
import { ExistsSitesLightColorsRepository } from './exists-sites-light-colors';
import { FindAllSitesLightColorsRepository } from './find-all-sites-light-colors';
import { FindSitesLightColorByIdRepository } from './find-sites-light-color-by-id';
import { RemoveSitesLightColorRepository } from './remove-sites-light-color';
import { UpdateSitesLightColorRepository } from './update-sites-light-color';

export const SitesLightColorsRepositories = [
  CountSitesLightColorsRepository,
  CreateSitesLightColorRepository,
  ExistsSitesLightColorsRepository,
  FindSitesLightColorByIdRepository,
  FindAllSitesLightColorsRepository,
  RemoveSitesLightColorRepository,
  UpdateSitesLightColorRepository
];
