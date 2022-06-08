import { CreateCoursesStudentResolver } from './create-courses-student';
import { RemoveCoursesStudentResolver } from './remove-courses-student';
import { UpdateCoursesStudentResolver } from './update-courses-student';

export const CoursesStudentsMutations = [
  CreateCoursesStudentResolver,
  RemoveCoursesStudentResolver,
  UpdateCoursesStudentResolver
];
