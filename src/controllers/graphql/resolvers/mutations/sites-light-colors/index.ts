import { CreateSitesLightColorResolver } from './create-sites-light-color';
import { RemoveSitesLightColorResolver } from './remove-sites-light-color';
import { UpdateSitesLightColorResolver } from './update-sites-light-color';

export const SitesLightColorsMutations = [
  CreateSitesLightColorResolver,
  RemoveSitesLightColorResolver,
  UpdateSitesLightColorResolver
];
