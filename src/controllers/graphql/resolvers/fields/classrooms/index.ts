import { ClassroomAppResolver } from './app';
import { ClassroomReferenceResolver } from './reference';

export const ClassroomsFieldsResolvers = [
  ClassroomReferenceResolver,
  ClassroomAppResolver
];
