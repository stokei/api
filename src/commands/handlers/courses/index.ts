import { CreateCourseCommandHandler } from './create-course';
import { RemoveCourseCommandHandler } from './remove-course';
import { UpdateCourseCommandHandler } from './update-course';

export const CourseCommandHandlers = [
  CreateCourseCommandHandler,
  RemoveCourseCommandHandler,
  UpdateCourseCommandHandler
];
