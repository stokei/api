import { ModuleAppResolver } from './app';
import { ModuleCreatedByResolver } from './created-by';
import { ModuleReferenceResolver } from './reference';
import { ModuleUpdatedByResolver } from './updated-by';
import { ModuleVideosResolver } from './videos';

export const ModulesFieldsResolvers = [
  ModuleReferenceResolver,
  ModuleAppResolver,
  ModuleCreatedByResolver,
  ModuleUpdatedByResolver,
  ModuleVideosResolver
];
