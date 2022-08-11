import { CourseInstructorAppResolver } from './app';
import { CourseInstructorCourseResolver } from './course';
import { CourseInstructorCreatedByResolver } from './created-by';
import { CourseInstructorInstructorResolver } from './instructor';
import { CourseInstructorReferenceResolver } from './reference';
import { CourseInstructorUpdatedByResolver } from './updated-by';

export const CourseInstructorsFieldsResolvers = [
  CourseInstructorReferenceResolver,
  CourseInstructorAppResolver,
  CourseInstructorCourseResolver,
  CourseInstructorInstructorResolver,
  CourseInstructorCreatedByResolver,
  CourseInstructorUpdatedByResolver
];
