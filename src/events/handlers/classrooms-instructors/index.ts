import { ClassroomsInstructorCreatedHandler } from './classrooms-instructor-created.handler';
import { ClassroomsInstructorUpdatedHandler } from './classrooms-instructor-updated.handler';
import { ClassroomsInstructorRemovedHandler } from './classrooms-instructor-removed.handler';

export const ClassroomsInstructorEventsHandlers = [
  ClassroomsInstructorCreatedHandler,
  ClassroomsInstructorUpdatedHandler,
  ClassroomsInstructorRemovedHandler
];
