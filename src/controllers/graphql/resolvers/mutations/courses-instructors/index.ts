import { CreateCoursesInstructorResolver } from './create-courses-instructor';
import { RemoveCoursesInstructorResolver } from './remove-courses-instructor';
import { UpdateCoursesInstructorResolver } from './update-courses-instructor';

export const CoursesInstructorsMutations = [
  CreateCoursesInstructorResolver,
  RemoveCoursesInstructorResolver,
  UpdateCoursesInstructorResolver
];
