import { FindAllCourseStudentsQueryHandler } from './find-all-course-students';
import { FindCourseStudentByCourseAndStudentQueryHandler } from './find-course-student-by-course-and-student';
import { FindCourseStudentByIdQueryHandler } from './find-course-student-by-id';

export const CourseStudentQueriesHandlers = [
  FindCourseStudentByIdQueryHandler,
  FindAllCourseStudentsQueryHandler,
  FindCourseStudentByCourseAndStudentQueryHandler
];
