import { MetatagCreatedHandler } from './metatag-created.handler';
import { MetatagUpdatedHandler } from './metatag-updated.handler';
import { MetatagRemovedHandler } from './metatag-removed.handler';

export const MetatagEventsHandlers = [
  MetatagCreatedHandler,
  MetatagUpdatedHandler,
  MetatagRemovedHandler
];
