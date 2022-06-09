import { ModulesVideoCreatedHandler } from './modules-video-created.handler';
import { ModulesVideoRemovedHandler } from './modules-video-removed.handler';
import { ModulesVideoUpdatedHandler } from './modules-video-updated.handler';

export const ModulesVideoEventsHandlers = [
  ModulesVideoCreatedHandler,
  ModulesVideoUpdatedHandler,
  ModulesVideoRemovedHandler
];
