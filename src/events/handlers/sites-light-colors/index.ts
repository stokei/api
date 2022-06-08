import { SitesLightColorCreatedHandler } from './sites-light-color-created.handler';
import { SitesLightColorUpdatedHandler } from './sites-light-color-updated.handler';
import { SitesLightColorRemovedHandler } from './sites-light-color-removed.handler';

export const SitesLightColorEventsHandlers = [
  SitesLightColorCreatedHandler,
  SitesLightColorUpdatedHandler,
  SitesLightColorRemovedHandler
];
