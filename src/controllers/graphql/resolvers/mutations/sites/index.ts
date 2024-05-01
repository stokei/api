import { CreateSiteResolver } from './create-site';
import { RemoveSiteResolver } from './remove-site';
import { UpdateSiteResolver } from './update-site';

export const SitesMutations = [
  RemoveSiteResolver,
  UpdateSiteResolver,
  CreateSiteResolver
];
