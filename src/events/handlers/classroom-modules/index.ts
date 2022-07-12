import { ClassroomModuleCreatedHandler } from './classroom-module-created.handler';
import { ClassroomModuleRemovedHandler } from './classroom-module-removed.handler';
import { ClassroomModuleUpdatedHandler } from './classroom-module-updated.handler';

export const ClassroomModuleEventsHandlers = [
  ClassroomModuleCreatedHandler,
  ClassroomModuleUpdatedHandler,
  ClassroomModuleRemovedHandler
];
