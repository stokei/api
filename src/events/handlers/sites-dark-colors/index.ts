import { SitesDarkColorCreatedHandler } from './sites-dark-color-created.handler';
import { SitesDarkColorRemovedHandler } from './sites-dark-color-removed.handler';
import { SitesDarkColorUpdatedHandler } from './sites-dark-color-updated.handler';

export const SitesDarkColorEventsHandlers = [
  SitesDarkColorCreatedHandler,
  SitesDarkColorUpdatedHandler,
  SitesDarkColorRemovedHandler
];
