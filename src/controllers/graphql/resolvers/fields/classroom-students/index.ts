import { ClassroomStudentAppResolver } from './app';
import { ClassroomStudentClassroomResolver } from './classroom';
import { ClassroomStudentCreatedByResolver } from './created-by';
import { ClassroomStudentReferenceResolver } from './reference';
import { ClassroomStudentStudentResolver } from './student';
import { ClassroomStudentUpdatedByResolver } from './updated-by';

export const ClassroomStudentsFieldsResolvers = [
  ClassroomStudentReferenceResolver,
  ClassroomStudentAppResolver,
  ClassroomStudentStudentResolver,
  ClassroomStudentClassroomResolver,
  ClassroomStudentCreatedByResolver,
  ClassroomStudentUpdatedByResolver
];
