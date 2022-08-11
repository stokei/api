import { ClassroomModuleAppResolver } from './app';
import { ClassroomModuleClassroomResolver } from './classroom';
import { ClassroomModuleCreatedByResolver } from './created-by';
import { ClassroomModuleModuleResolver } from './module';
import { ClassroomModuleReferenceResolver } from './reference';
import { ClassroomModuleUpdatedByResolver } from './updated-by';

export const ClassroomModulesFieldsResolvers = [
  ClassroomModuleReferenceResolver,
  ClassroomModuleAppResolver,
  ClassroomModuleModuleResolver,
  ClassroomModuleClassroomResolver,
  ClassroomModuleCreatedByResolver,
  ClassroomModuleUpdatedByResolver
];
