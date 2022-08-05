import { CourseStudentReferenceResolver } from './reference';

import { CourseStudentAppResolver } from './app';
import { CourseStudentReferenceResolver } from './reference';

export const CourseStudentsFieldsResolvers = [
  CourseStudentReferenceResolver,
  CourseStudentAppResolver
];
