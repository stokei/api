import { ClassroomsModuleCreatedHandler } from './classrooms-module-created.handler';
import { ClassroomsModuleUpdatedHandler } from './classrooms-module-updated.handler';
import { ClassroomsModuleRemovedHandler } from './classrooms-module-removed.handler';

export const ClassroomsModuleEventsHandlers = [
  ClassroomsModuleCreatedHandler,
  ClassroomsModuleUpdatedHandler,
  ClassroomsModuleRemovedHandler
];
