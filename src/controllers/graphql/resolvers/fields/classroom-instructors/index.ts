import { ClassroomInstructorAppResolver } from './app';
import { ClassroomInstructorClassroomResolver } from './classroom';
import { ClassroomInstructorCreatedByResolver } from './created-by';
import { ClassroomInstructorInstructorResolver } from './instructor';
import { ClassroomInstructorReferenceResolver } from './reference';
import { ClassroomInstructorUpdatedByResolver } from './updated-by';

export const ClassroomInstructorsFieldsResolvers = [
  ClassroomInstructorReferenceResolver,
  ClassroomInstructorAppResolver,
  ClassroomInstructorClassroomResolver,
  ClassroomInstructorInstructorResolver,
  ClassroomInstructorCreatedByResolver,
  ClassroomInstructorUpdatedByResolver
];
