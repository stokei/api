import { ClassroomsMaterialCreatedHandler } from './classrooms-material-created.handler';
import { ClassroomsMaterialUpdatedHandler } from './classrooms-material-updated.handler';
import { ClassroomsMaterialRemovedHandler } from './classrooms-material-removed.handler';

export const ClassroomsMaterialEventsHandlers = [
  ClassroomsMaterialCreatedHandler,
  ClassroomsMaterialUpdatedHandler,
  ClassroomsMaterialRemovedHandler
];
