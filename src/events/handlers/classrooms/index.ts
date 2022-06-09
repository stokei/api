import { ClassroomCreatedHandler } from './classroom-created.handler';
import { ClassroomRemovedHandler } from './classroom-removed.handler';
import { ClassroomUpdatedHandler } from './classroom-updated.handler';

export const ClassroomEventsHandlers = [
  ClassroomCreatedHandler,
  ClassroomUpdatedHandler,
  ClassroomRemovedHandler
];
