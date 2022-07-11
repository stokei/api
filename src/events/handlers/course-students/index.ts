import { CourseStudentCreatedHandler } from './course-student-created.handler';
import { CourseStudentRemovedHandler } from './course-student-removed.handler';
import { CourseStudentUpdatedHandler } from './course-student-updated.handler';

export const CourseStudentEventsHandlers = [
  CourseStudentCreatedHandler,
  CourseStudentUpdatedHandler,
  CourseStudentRemovedHandler
];
