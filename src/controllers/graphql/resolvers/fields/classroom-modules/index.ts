import { ClassroomModuleAppResolver } from './app';
import { ClassroomModuleReferenceResolver } from './reference';

export const ClassroomModulesFieldsResolvers = [
  ClassroomModuleReferenceResolver,
  ClassroomModuleAppResolver
];
