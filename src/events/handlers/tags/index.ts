import { TagCreatedHandler } from './tag-created.handler';
import { TagUpdatedHandler } from './tag-updated.handler';
import { TagRemovedHandler } from './tag-removed.handler';

export const TagEventsHandlers = [
  TagCreatedHandler,
  TagUpdatedHandler,
  TagRemovedHandler
];
