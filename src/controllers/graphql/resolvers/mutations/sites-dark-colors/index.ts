import { CreateSitesDarkColorResolver } from './create-sites-dark-color';
import { RemoveSitesDarkColorResolver } from './remove-sites-dark-color';
import { UpdateSitesDarkColorResolver } from './update-sites-dark-color';

export const SitesDarkColorsMutations = [
  CreateSitesDarkColorResolver,
  RemoveSitesDarkColorResolver,
  UpdateSitesDarkColorResolver
];
