import { SortedItemCreatedHandler } from './sorted-item-created.handler';
import { SortedItemRemovedHandler } from './sorted-item-removed.handler';
import { SortedItemUpdatedHandler } from './sorted-item-updated.handler';

export const SortedItemEventsHandlers = [
  SortedItemCreatedHandler,
  SortedItemRemovedHandler,
  SortedItemUpdatedHandler
];
