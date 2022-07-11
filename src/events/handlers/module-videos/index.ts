import { ModuleVideoCreatedHandler } from './module-video-created.handler';
import { ModuleVideoRemovedHandler } from './module-video-removed.handler';
import { ModuleVideoUpdatedHandler } from './module-video-updated.handler';

export const ModuleVideoEventsHandlers = [
  ModuleVideoCreatedHandler,
  ModuleVideoUpdatedHandler,
  ModuleVideoRemovedHandler
];
