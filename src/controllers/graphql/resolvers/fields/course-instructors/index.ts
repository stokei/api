import { CourseInstructorAppResolver } from './app';
import { CourseInstructorReferenceResolver } from './reference';

export const CourseInstructorsFieldsResolvers = [
  CourseInstructorReferenceResolver,
  CourseInstructorAppResolver
];
