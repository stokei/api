import { ClassroomsInstructorCreatedHandler } from './classrooms-instructor-created.handler';
import { ClassroomsInstructorRemovedHandler } from './classrooms-instructor-removed.handler';
import { ClassroomsInstructorUpdatedHandler } from './classrooms-instructor-updated.handler';

export const ClassroomsInstructorEventsHandlers = [
  ClassroomsInstructorCreatedHandler,
  ClassroomsInstructorUpdatedHandler,
  ClassroomsInstructorRemovedHandler
];
