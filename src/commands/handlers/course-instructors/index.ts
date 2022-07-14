import { CreateCourseInstructorCommandHandler } from './create-course-instructor';
import { RemoveCourseInstructorCommandHandler } from './remove-course-instructor';

export const CourseInstructorCommandHandlers = [
  CreateCourseInstructorCommandHandler,
  RemoveCourseInstructorCommandHandler
];
