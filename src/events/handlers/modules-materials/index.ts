import { ModulesMaterialCreatedHandler } from './modules-material-created.handler';
import { ModulesMaterialUpdatedHandler } from './modules-material-updated.handler';
import { ModulesMaterialRemovedHandler } from './modules-material-removed.handler';

export const ModulesMaterialEventsHandlers = [
  ModulesMaterialCreatedHandler,
  ModulesMaterialUpdatedHandler,
  ModulesMaterialRemovedHandler
];
