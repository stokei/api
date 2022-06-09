import { FindAllCoursesStudentsQueryHandler } from './find-all-courses-students';
import { FindCoursesStudentByIdQueryHandler } from './find-courses-student-by-id';

export const CoursesStudentQueriesHandlers = [
  FindCoursesStudentByIdQueryHandler,
  FindAllCoursesStudentsQueryHandler
];
