import { CoursesStudentCreatedHandler } from './courses-student-created.handler';
import { CoursesStudentUpdatedHandler } from './courses-student-updated.handler';
import { CoursesStudentRemovedHandler } from './courses-student-removed.handler';

export const CoursesStudentEventsHandlers = [
  CoursesStudentCreatedHandler,
  CoursesStudentUpdatedHandler,
  CoursesStudentRemovedHandler
];
