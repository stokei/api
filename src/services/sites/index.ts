import { FindSiteByIdService } from './find-site-by-id';
import { FindAllSitesService } from './find-all-sites';
import { CreateSiteService } from './create-site';
import { RemoveSiteService } from './remove-site';
import { UpdateSiteService } from './update-site';

export const SiteServices = [
  CreateSiteService,
  RemoveSiteService,
  UpdateSiteService,
  FindSiteByIdService,
  FindAllSitesService
];
