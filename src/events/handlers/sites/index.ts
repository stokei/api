import { SiteCreatedHandler } from './site-created.handler';
import { SiteRemovedHandler } from './site-removed.handler';
import { SiteUpdatedHandler } from './site-updated.handler';

export const SiteEventsHandlers = [
  SiteCreatedHandler,
  SiteUpdatedHandler,
  SiteRemovedHandler
];
