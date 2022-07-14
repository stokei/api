import { CreateCourseStudentCommandHandler } from './create-course-student';
import { RemoveCourseStudentCommandHandler } from './remove-course-student';

export const CourseStudentCommandHandlers = [
  CreateCourseStudentCommandHandler,
  RemoveCourseStudentCommandHandler
];
