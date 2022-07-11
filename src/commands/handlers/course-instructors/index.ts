import { CreateCourseInstructorCommandHandler } from './create-course-instructor';
import { RemoveCourseInstructorCommandHandler } from './remove-course-instructor';
import { UpdateCourseInstructorCommandHandler } from './update-course-instructor';

export const CourseInstructorCommandHandlers = [
  CreateCourseInstructorCommandHandler,
  RemoveCourseInstructorCommandHandler,
  UpdateCourseInstructorCommandHandler
];
