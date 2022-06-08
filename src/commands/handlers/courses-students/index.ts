import { CreateCoursesStudentCommandHandler } from './create-courses-student';
import { RemoveCoursesStudentCommandHandler } from './remove-courses-student';
import { UpdateCoursesStudentCommandHandler } from './update-courses-student';

export const CoursesStudentCommandHandlers = [
  CreateCoursesStudentCommandHandler,
  RemoveCoursesStudentCommandHandler,
  UpdateCoursesStudentCommandHandler
];
