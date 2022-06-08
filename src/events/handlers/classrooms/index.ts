import { ClassroomCreatedHandler } from './classroom-created.handler';
import { ClassroomUpdatedHandler } from './classroom-updated.handler';
import { ClassroomRemovedHandler } from './classroom-removed.handler';

export const ClassroomEventsHandlers = [
  ClassroomCreatedHandler,
  ClassroomUpdatedHandler,
  ClassroomRemovedHandler
];
