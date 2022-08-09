import { ClassroomAppResolver } from './app';
import { ClassroomCreatedByResolver } from './created-by';
import { ClassroomReferenceResolver } from './reference';
import { ClassroomUpdatedByResolver } from './updated-by';

export const ClassroomsFieldsResolvers = [
  ClassroomReferenceResolver,
  ClassroomAppResolver,
  ClassroomCreatedByResolver,
  ClassroomUpdatedByResolver
];
