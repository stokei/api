import { CountSitesRepository } from './count-sites';
import { CreateSiteRepository } from './create-site';
import { ExistsSitesRepository } from './exists-sites';
import { FindAllSitesRepository } from './find-all-sites';
import { FindSiteByIdRepository } from './find-site-by-id';
import { RemoveSiteRepository } from './remove-site';
import { UpdateSiteRepository } from './update-site';

export const SitesRepositories = [
  CountSitesRepository,
  CreateSiteRepository,
  ExistsSitesRepository,
  FindSiteByIdRepository,
  FindAllSitesRepository,
  RemoveSiteRepository,
  UpdateSiteRepository
];
