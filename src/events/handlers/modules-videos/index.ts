import { ModulesVideoCreatedHandler } from './modules-video-created.handler';
import { ModulesVideoUpdatedHandler } from './modules-video-updated.handler';
import { ModulesVideoRemovedHandler } from './modules-video-removed.handler';

export const ModulesVideoEventsHandlers = [
  ModulesVideoCreatedHandler,
  ModulesVideoUpdatedHandler,
  ModulesVideoRemovedHandler
];
