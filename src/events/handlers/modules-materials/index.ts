import { ModulesMaterialCreatedHandler } from './modules-material-created.handler';
import { ModulesMaterialRemovedHandler } from './modules-material-removed.handler';
import { ModulesMaterialUpdatedHandler } from './modules-material-updated.handler';

export const ModulesMaterialEventsHandlers = [
  ModulesMaterialCreatedHandler,
  ModulesMaterialUpdatedHandler,
  ModulesMaterialRemovedHandler
];
