import { CourseInstructorCreatedHandler } from './course-instructor-created.handler';
import { CourseInstructorRemovedHandler } from './course-instructor-removed.handler';
import { CourseInstructorUpdatedHandler } from './course-instructor-updated.handler';

export const CourseInstructorEventsHandlers = [
  CourseInstructorCreatedHandler,
  CourseInstructorUpdatedHandler,
  CourseInstructorRemovedHandler
];
