import { ModuleCreatedHandler } from './module-created.handler';
import { ModuleUpdatedHandler } from './module-updated.handler';
import { ModuleRemovedHandler } from './module-removed.handler';

export const ModuleEventsHandlers = [
  ModuleCreatedHandler,
  ModuleUpdatedHandler,
  ModuleRemovedHandler
];
