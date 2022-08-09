import { ClassroomStudentAppResolver } from './app';
import { ClassroomStudentCreatedByResolver } from './created-by';
import { ClassroomStudentReferenceResolver } from './reference';
import { ClassroomStudentUpdatedByResolver } from './updated-by';

export const ClassroomStudentsFieldsResolvers = [
  ClassroomStudentReferenceResolver,
  ClassroomStudentAppResolver,
  ClassroomStudentCreatedByResolver,
  ClassroomStudentUpdatedByResolver
];
