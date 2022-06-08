import { CreateCourseResolver } from './create-course';
import { RemoveCourseResolver } from './remove-course';
import { UpdateCourseResolver } from './update-course';

export const CoursesMutations = [
  CreateCourseResolver,
  RemoveCourseResolver,
  UpdateCourseResolver
];
