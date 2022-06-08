import { CreateSiteCommandHandler } from './create-site';
import { RemoveSiteCommandHandler } from './remove-site';
import { UpdateSiteCommandHandler } from './update-site';

export const SiteCommandHandlers = [
  CreateSiteCommandHandler,
  RemoveSiteCommandHandler,
  UpdateSiteCommandHandler
];
