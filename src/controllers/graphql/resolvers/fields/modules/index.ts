import { ModuleAppResolver } from './app';
import { ModuleCreatedByResolver } from './created-by';
import { ModuleReferenceResolver } from './reference';
import { ModuleUpdatedByResolver } from './updated-by';

export const ModulesFieldsResolvers = [
  ModuleReferenceResolver,
  ModuleAppResolver,
  ModuleCreatedByResolver,
  ModuleUpdatedByResolver
];
