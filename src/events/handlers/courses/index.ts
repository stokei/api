import { CourseCreatedHandler } from './course-created.handler';
import { CourseUpdatedHandler } from './course-updated.handler';
import { CourseRemovedHandler } from './course-removed.handler';

export const CourseEventsHandlers = [
  CourseCreatedHandler,
  CourseUpdatedHandler,
  CourseRemovedHandler
];
