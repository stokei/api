import { ClassroomStudentAppResolver } from './app';
import { ClassroomStudentReferenceResolver } from './reference';

export const ClassroomStudentsFieldsResolvers = [
  ClassroomStudentReferenceResolver,
  ClassroomStudentAppResolver
];
