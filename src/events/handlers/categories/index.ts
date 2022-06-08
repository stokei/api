import { CategoryCreatedHandler } from './category-created.handler';
import { CategoryUpdatedHandler } from './category-updated.handler';
import { CategoryRemovedHandler } from './category-removed.handler';

export const CategoryEventsHandlers = [
  CategoryCreatedHandler,
  CategoryUpdatedHandler,
  CategoryRemovedHandler
];
