import { CreateCourseStudentCommandHandler } from './create-course-student';
import { RemoveCourseStudentCommandHandler } from './remove-course-student';
import { UpdateCourseStudentCommandHandler } from './update-course-student';

export const CourseStudentCommandHandlers = [
  CreateCourseStudentCommandHandler,
  RemoveCourseStudentCommandHandler,
  UpdateCourseStudentCommandHandler
];
