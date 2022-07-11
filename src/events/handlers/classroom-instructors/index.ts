import { ClassroomInstructorCreatedHandler } from './classroom-instructor-created.handler';
import { ClassroomInstructorRemovedHandler } from './classroom-instructor-removed.handler';
import { ClassroomInstructorUpdatedHandler } from './classroom-instructor-updated.handler';

export const ClassroomInstructorEventsHandlers = [
  ClassroomInstructorCreatedHandler,
  ClassroomInstructorUpdatedHandler,
  ClassroomInstructorRemovedHandler
];
