import { CreateSiteCommandHandler } from './create-site';
import { RemoveSiteCommandHandler } from './remove-site';
import { RemoveSiteDependenciesCommandHandler } from './remove-site-dependencies';
import { UpdateSiteCommandHandler } from './update-site';

export const SiteCommandHandlers = [
  CreateSiteCommandHandler,
  RemoveSiteCommandHandler,
  UpdateSiteCommandHandler,
  RemoveSiteDependenciesCommandHandler
];
