import { RoleAppResolver } from './app';
import { RoleCreatedByResolver } from './created-by';
import { RoleReferenceResolver } from './reference';
import { RoleUpdatedByResolver } from './updated-by';

export const RolesFieldsResolvers = [
  RoleReferenceResolver,
  RoleCreatedByResolver,
  RoleUpdatedByResolver,
  RoleAppResolver
];
