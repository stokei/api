import { ClassroomInstructorAppResolver } from './app';
import { ClassroomInstructorReferenceResolver } from './reference';

export const ClassroomInstructorsFieldsResolvers = [
  ClassroomInstructorReferenceResolver,
  ClassroomInstructorAppResolver
];
