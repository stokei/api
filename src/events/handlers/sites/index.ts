import { SiteCreatedHandler } from './site-created.handler';
import { SiteUpdatedHandler } from './site-updated.handler';
import { SiteRemovedHandler } from './site-removed.handler';

export const SiteEventsHandlers = [
  SiteCreatedHandler,
  SiteUpdatedHandler,
  SiteRemovedHandler
];
