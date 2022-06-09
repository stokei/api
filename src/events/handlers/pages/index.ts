import { PageCreatedHandler } from './page-created.handler';
import { PageRemovedHandler } from './page-removed.handler';
import { PageUpdatedHandler } from './page-updated.handler';

export const PageEventsHandlers = [
  PageCreatedHandler,
  PageUpdatedHandler,
  PageRemovedHandler
];
