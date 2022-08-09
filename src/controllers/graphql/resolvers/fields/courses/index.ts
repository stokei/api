import { CourseAppResolver } from './app';
import { CourseReferenceResolver } from './reference';

export const CoursesFieldsResolvers = [
  CourseReferenceResolver,
  CourseAppResolver
];
