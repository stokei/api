import { CreateCoursesInstructorCommandHandler } from './create-courses-instructor';
import { RemoveCoursesInstructorCommandHandler } from './remove-courses-instructor';
import { UpdateCoursesInstructorCommandHandler } from './update-courses-instructor';

export const CoursesInstructorCommandHandlers = [
  CreateCoursesInstructorCommandHandler,
  RemoveCoursesInstructorCommandHandler,
  UpdateCoursesInstructorCommandHandler
];
