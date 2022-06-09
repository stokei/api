import { MetatagCreatedHandler } from './metatag-created.handler';
import { MetatagRemovedHandler } from './metatag-removed.handler';
import { MetatagUpdatedHandler } from './metatag-updated.handler';

export const MetatagEventsHandlers = [
  MetatagCreatedHandler,
  MetatagUpdatedHandler,
  MetatagRemovedHandler
];
