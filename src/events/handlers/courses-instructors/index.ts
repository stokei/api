import { CoursesInstructorCreatedHandler } from './courses-instructor-created.handler';
import { CoursesInstructorUpdatedHandler } from './courses-instructor-updated.handler';
import { CoursesInstructorRemovedHandler } from './courses-instructor-removed.handler';

export const CoursesInstructorEventsHandlers = [
  CoursesInstructorCreatedHandler,
  CoursesInstructorUpdatedHandler,
  CoursesInstructorRemovedHandler
];
