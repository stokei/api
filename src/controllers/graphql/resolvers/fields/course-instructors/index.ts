import { CourseInstructorAppResolver } from './app';
import { CourseInstructorCreatedByResolver } from './created-by';
import { CourseInstructorReferenceResolver } from './reference';
import { CourseInstructorUpdatedByResolver } from './updated-by';

export const CourseInstructorsFieldsResolvers = [
  CourseInstructorReferenceResolver,
  CourseInstructorAppResolver,
  CourseInstructorCreatedByResolver,
  CourseInstructorUpdatedByResolver
];
