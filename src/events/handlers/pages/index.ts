import { PageCreatedHandler } from './page-created.handler';
import { PageUpdatedHandler } from './page-updated.handler';
import { PageRemovedHandler } from './page-removed.handler';

export const PageEventsHandlers = [
  PageCreatedHandler,
  PageUpdatedHandler,
  PageRemovedHandler
];
