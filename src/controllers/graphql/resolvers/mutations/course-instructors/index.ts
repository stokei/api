import { CreateCourseInstructorResolver } from './create-course-instructor';
import { RemoveCourseInstructorResolver } from './remove-course-instructor';

export const CourseInstructorsMutations = [
  CreateCourseInstructorResolver,
  RemoveCourseInstructorResolver
];
