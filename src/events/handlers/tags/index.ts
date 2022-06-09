import { TagCreatedHandler } from './tag-created.handler';
import { TagRemovedHandler } from './tag-removed.handler';
import { TagUpdatedHandler } from './tag-updated.handler';

export const TagEventsHandlers = [
  TagCreatedHandler,
  TagUpdatedHandler,
  TagRemovedHandler
];
