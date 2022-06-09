import { CategoryCreatedHandler } from './category-created.handler';
import { CategoryRemovedHandler } from './category-removed.handler';
import { CategoryUpdatedHandler } from './category-updated.handler';

export const CategoryEventsHandlers = [
  CategoryCreatedHandler,
  CategoryUpdatedHandler,
  CategoryRemovedHandler
];
