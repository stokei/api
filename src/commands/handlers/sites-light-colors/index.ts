import { CreateSitesLightColorCommandHandler } from './create-sites-light-color';
import { RemoveSitesLightColorCommandHandler } from './remove-sites-light-color';
import { UpdateSitesLightColorCommandHandler } from './update-sites-light-color';

export const SitesLightColorCommandHandlers = [
  CreateSitesLightColorCommandHandler,
  RemoveSitesLightColorCommandHandler,
  UpdateSitesLightColorCommandHandler
];
