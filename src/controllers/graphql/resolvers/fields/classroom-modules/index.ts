import { ClassroomModuleAppResolver } from './app';
import { ClassroomModuleCreatedByResolver } from './created-by';
import { ClassroomModuleReferenceResolver } from './reference';
import { ClassroomModuleUpdatedByResolver } from './updated-by';

export const ClassroomModulesFieldsResolvers = [
  ClassroomModuleReferenceResolver,
  ClassroomModuleAppResolver,
  ClassroomModuleCreatedByResolver,
  ClassroomModuleUpdatedByResolver
];
