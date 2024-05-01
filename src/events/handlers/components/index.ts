import { ComponentCreatedHandler } from './component-created.handler';
import { ComponentRemovedHandler } from './component-removed.handler';
import { ComponentUpdatedHandler } from './component-updated.handler';

export const ComponentEventsHandlers = [
  ComponentCreatedHandler,
  ComponentUpdatedHandler,
  ComponentRemovedHandler
];
