import { CreateCoursesAdminResolver } from './create-courses-admin';
import { RemoveCoursesAdminResolver } from './remove-courses-admin';
import { UpdateCoursesAdminResolver } from './update-courses-admin';

export const CoursesAdminsMutations = [
  CreateCoursesAdminResolver,
  RemoveCoursesAdminResolver,
  UpdateCoursesAdminResolver
];
