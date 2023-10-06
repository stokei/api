import { CreateSiteService } from './create-site';
import { FindAllSitesService } from './find-all-sites';
import { FindSiteByIdService } from './find-site-by-id';
import { FindSiteBySlugService } from './find-site-by-slug';
import { FindSiteCurrentDomainService } from './find-site-current-domain';
import { RemoveSiteService } from './remove-site';
import { UpdateSiteService } from './update-site';

export const SiteServices = [
  CreateSiteService,
  RemoveSiteService,
  UpdateSiteService,
  FindSiteByIdService,
  FindAllSitesService,
  FindSiteBySlugService,
  FindSiteCurrentDomainService
];
