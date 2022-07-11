import { FindAllCourseStudentsQueryHandler } from './find-all-course-students';
import { FindCourseStudentByIdQueryHandler } from './find-course-student-by-id';

export const CourseStudentQueriesHandlers = [
  FindCourseStudentByIdQueryHandler,
  FindAllCourseStudentsQueryHandler
];
