import { CoursesInstructorCreatedHandler } from './courses-instructor-created.handler';
import { CoursesInstructorRemovedHandler } from './courses-instructor-removed.handler';
import { CoursesInstructorUpdatedHandler } from './courses-instructor-updated.handler';

export const CoursesInstructorEventsHandlers = [
  CoursesInstructorCreatedHandler,
  CoursesInstructorUpdatedHandler,
  CoursesInstructorRemovedHandler
];
