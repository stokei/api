import { ModuleCreatedHandler } from './module-created.handler';
import { ModuleRemovedHandler } from './module-removed.handler';
import { ModuleUpdatedHandler } from './module-updated.handler';

export const ModuleEventsHandlers = [
  ModuleCreatedHandler,
  ModuleUpdatedHandler,
  ModuleRemovedHandler
];
