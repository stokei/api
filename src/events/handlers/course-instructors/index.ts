import { CourseInstructorCreatedHandler } from './course-instructor-created.handler';
import { CourseInstructorRemovedHandler } from './course-instructor-removed.handler';

export const CourseInstructorEventsHandlers = [
  CourseInstructorCreatedHandler,
  CourseInstructorRemovedHandler
];
