import { ModuleVideoCreatedHandler } from './module-video-created.handler';
import { ModuleVideoRemovedHandler } from './module-video-removed.handler';

export const ModuleVideoEventsHandlers = [
  ModuleVideoCreatedHandler,
  ModuleVideoRemovedHandler
];
