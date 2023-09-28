import { FindAllSitesQueryHandler } from './find-all-sites';
import { FindSiteByIdQueryHandler } from './find-site-by-id';
import { FindSiteBySlugQueryHandler } from './find-site-by-slug';

export const SiteQueriesHandlers = [
  FindSiteByIdQueryHandler,
  FindAllSitesQueryHandler,
  FindSiteBySlugQueryHandler
];
