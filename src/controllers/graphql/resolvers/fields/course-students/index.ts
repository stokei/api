import { CourseStudentAppResolver } from './app';
import { CourseStudentCreatedByResolver } from './created-by';
import { CourseStudentReferenceResolver } from './reference';
import { CourseStudentUpdatedByResolver } from './updated-by';

export const CourseStudentsFieldsResolvers = [
  CourseStudentReferenceResolver,
  CourseStudentAppResolver,
  CourseStudentCreatedByResolver,
  CourseStudentUpdatedByResolver
];
