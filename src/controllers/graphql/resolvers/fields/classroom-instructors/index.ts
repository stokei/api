import { ClassroomInstructorAppResolver } from './app';
import { ClassroomInstructorCreatedByResolver } from './created-by';
import { ClassroomInstructorReferenceResolver } from './reference';
import { ClassroomInstructorUpdatedByResolver } from './updated-by';

export const ClassroomInstructorsFieldsResolvers = [
  ClassroomInstructorReferenceResolver,
  ClassroomInstructorAppResolver,
  ClassroomInstructorCreatedByResolver,
  ClassroomInstructorUpdatedByResolver
];
