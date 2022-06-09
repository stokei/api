import { CreateSitesDarkColorService } from './create-sites-dark-color';
import { FindAllSitesDarkColorsService } from './find-all-sites-dark-colors';
import { FindSitesDarkColorByIdService } from './find-sites-dark-color-by-id';
import { RemoveSitesDarkColorService } from './remove-sites-dark-color';
import { UpdateSitesDarkColorService } from './update-sites-dark-color';

export const SitesDarkColorServices = [
  CreateSitesDarkColorService,
  RemoveSitesDarkColorService,
  UpdateSitesDarkColorService,
  FindSitesDarkColorByIdService,
  FindAllSitesDarkColorsService
];
