import { CreateSiteService } from './create-site';
import { FindAllSitesService } from './find-all-sites';
import { FindSiteByIdService } from './find-site-by-id';
import { RemoveSiteService } from './remove-site';
import { UpdateSiteService } from './update-site';

export const SiteServices = [
  CreateSiteService,
  RemoveSiteService,
  UpdateSiteService,
  FindSiteByIdService,
  FindAllSitesService
];
