import { ComponentAppResolver } from './app';
import { ComponentCreatedByResolver } from './created-by';
import { ComponentReferenceResolver } from './reference';
import { ComponentUpdatedByResolver } from './updated-by';

export const ComponentsFieldsResolvers = [
  ComponentReferenceResolver,
  ComponentAppResolver,
  ComponentCreatedByResolver,
  ComponentUpdatedByResolver
];
