import { ClassroomsMaterialCreatedHandler } from './classrooms-material-created.handler';
import { ClassroomsMaterialRemovedHandler } from './classrooms-material-removed.handler';
import { ClassroomsMaterialUpdatedHandler } from './classrooms-material-updated.handler';

export const ClassroomsMaterialEventsHandlers = [
  ClassroomsMaterialCreatedHandler,
  ClassroomsMaterialUpdatedHandler,
  ClassroomsMaterialRemovedHandler
];
