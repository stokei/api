import { ClassroomsModuleCreatedHandler } from './classrooms-module-created.handler';
import { ClassroomsModuleRemovedHandler } from './classrooms-module-removed.handler';
import { ClassroomsModuleUpdatedHandler } from './classrooms-module-updated.handler';

export const ClassroomsModuleEventsHandlers = [
  ClassroomsModuleCreatedHandler,
  ClassroomsModuleUpdatedHandler,
  ClassroomsModuleRemovedHandler
];
