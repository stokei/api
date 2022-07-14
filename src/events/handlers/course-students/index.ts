import { CourseStudentCreatedHandler } from './course-student-created.handler';
import { CourseStudentRemovedHandler } from './course-student-removed.handler';

export const CourseStudentEventsHandlers = [
  CourseStudentCreatedHandler,
  CourseStudentRemovedHandler
];
