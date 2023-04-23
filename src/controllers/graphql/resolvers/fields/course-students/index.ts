import { CourseStudentAppResolver } from './app';
import { CourseStudentCourseResolver } from './course';
import { CourseStudentCreatedByResolver } from './created-by';
import { CourseStudentReferenceResolver } from './reference';
import { CourseStudentStudentResolver } from './student';
import { CourseStudentUpdatedByResolver } from './updated-by';

export const CourseStudentsFieldsResolvers = [
  CourseStudentReferenceResolver,
  CourseStudentAppResolver,
  CourseStudentStudentResolver,
  CourseStudentCourseResolver,
  CourseStudentCreatedByResolver,
  CourseStudentUpdatedByResolver
];
