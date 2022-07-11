import { CreateCourseStudentResolver } from './create-course-student';
import { RemoveCourseStudentResolver } from './remove-course-student';
import { UpdateCourseStudentResolver } from './update-course-student';

export const CourseStudentsMutations = [
  CreateCourseStudentResolver,
  RemoveCourseStudentResolver,
  UpdateCourseStudentResolver
];
