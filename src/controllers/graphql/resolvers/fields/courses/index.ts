import { CourseAppResolver } from './app';
import { CourseCreatedByResolver } from './created-by';
import { CourseReferenceResolver } from './reference';
import { CourseUpdatedByResolver } from './updated-by';

export const CoursesFieldsResolvers = [
  CourseReferenceResolver,
  CourseAppResolver,
  CourseCreatedByResolver,
  CourseUpdatedByResolver
];
