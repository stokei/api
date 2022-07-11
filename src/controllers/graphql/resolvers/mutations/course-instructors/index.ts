import { CreateCourseInstructorResolver } from './create-course-instructor';
import { RemoveCourseInstructorResolver } from './remove-course-instructor';
import { UpdateCourseInstructorResolver } from './update-course-instructor';

export const CourseInstructorsMutations = [
  CreateCourseInstructorResolver,
  RemoveCourseInstructorResolver,
  UpdateCourseInstructorResolver
];
