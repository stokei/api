import { SitesDarkColorCreatedHandler } from './sites-dark-color-created.handler';
import { SitesDarkColorUpdatedHandler } from './sites-dark-color-updated.handler';
import { SitesDarkColorRemovedHandler } from './sites-dark-color-removed.handler';

export const SitesDarkColorEventsHandlers = [
  SitesDarkColorCreatedHandler,
  SitesDarkColorUpdatedHandler,
  SitesDarkColorRemovedHandler
];
