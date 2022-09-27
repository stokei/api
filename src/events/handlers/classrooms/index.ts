import { ClassroomActivatedHandler } from './classroom-activated.handler';
import { ClassroomCreatedHandler } from './classroom-created.handler';
import { ClassroomDeactivatedHandler } from './classroom-deactivated.handler';
import { ClassroomUpdatedHandler } from './classroom-updated.handler';

export const ClassroomEventsHandlers = [
  ClassroomCreatedHandler,
  ClassroomUpdatedHandler,
  ClassroomActivatedHandler,
  ClassroomDeactivatedHandler
];
