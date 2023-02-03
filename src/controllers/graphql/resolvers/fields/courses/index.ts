import { CourseAppResolver } from './app';
import { CourseAvatarResolver } from './avatar';
import { CourseCreatedByResolver } from './created-by';
import { CourseCourseInstructorsResolver } from './instructors';
import { CourseReferenceResolver } from './reference';
import { CourseUpdatedByResolver } from './updated-by';

export const CoursesFieldsResolvers = [
  CourseReferenceResolver,
  CourseAppResolver,
  CourseAvatarResolver,
  CourseCreatedByResolver,
  CourseUpdatedByResolver,
  CourseCourseInstructorsResolver
];
