import { CreateCourseStudentResolver } from './create-course-student';
import { RemoveCourseStudentResolver } from './remove-course-student';

export const CourseStudentsMutations = [
  CreateCourseStudentResolver,
  RemoveCourseStudentResolver
];
