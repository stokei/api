import { CreateSitesLightColorService } from './create-sites-light-color';
import { FindAllSitesLightColorsService } from './find-all-sites-light-colors';
import { FindSitesLightColorByIdService } from './find-sites-light-color-by-id';
import { RemoveSitesLightColorService } from './remove-sites-light-color';
import { UpdateSitesLightColorService } from './update-sites-light-color';

export const SitesLightColorServices = [
  CreateSitesLightColorService,
  RemoveSitesLightColorService,
  UpdateSitesLightColorService,
  FindSitesLightColorByIdService,
  FindAllSitesLightColorsService
];
