import { CountSitesDarkColorsRepository } from './count-sites-dark-colors';
import { CreateSitesDarkColorRepository } from './create-sites-dark-color';
import { ExistsSitesDarkColorsRepository } from './exists-sites-dark-colors';
import { FindSitesDarkColorByIdRepository } from './find-sites-dark-color-by-id';
import { FindAllSitesDarkColorsRepository } from './find-all-sites-dark-colors';
import { RemoveSitesDarkColorRepository } from './remove-sites-dark-color';
import { UpdateSitesDarkColorRepository } from './update-sites-dark-color';

export const SitesDarkColorsRepositories = [
  CountSitesDarkColorsRepository,
  CreateSitesDarkColorRepository,
  ExistsSitesDarkColorsRepository,
  FindSitesDarkColorByIdRepository,
  FindAllSitesDarkColorsRepository,
  RemoveSitesDarkColorRepository,
  UpdateSitesDarkColorRepository
];
