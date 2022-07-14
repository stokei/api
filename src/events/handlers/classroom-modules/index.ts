import { ClassroomModuleCreatedHandler } from './classroom-module-created.handler';
import { ClassroomModuleRemovedHandler } from './classroom-module-removed.handler';

export const ClassroomModuleEventsHandlers = [
  ClassroomModuleCreatedHandler,
  ClassroomModuleRemovedHandler
];
