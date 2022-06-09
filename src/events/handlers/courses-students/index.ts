import { CoursesStudentCreatedHandler } from './courses-student-created.handler';
import { CoursesStudentRemovedHandler } from './courses-student-removed.handler';
import { CoursesStudentUpdatedHandler } from './courses-student-updated.handler';

export const CoursesStudentEventsHandlers = [
  CoursesStudentCreatedHandler,
  CoursesStudentUpdatedHandler,
  CoursesStudentRemovedHandler
];
