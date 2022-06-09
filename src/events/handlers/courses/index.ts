import { CourseCreatedHandler } from './course-created.handler';
import { CourseRemovedHandler } from './course-removed.handler';
import { CourseUpdatedHandler } from './course-updated.handler';

export const CourseEventsHandlers = [
  CourseCreatedHandler,
  CourseUpdatedHandler,
  CourseRemovedHandler
];
