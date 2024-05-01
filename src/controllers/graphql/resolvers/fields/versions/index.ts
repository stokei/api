import { VersionAppResolver } from './app';
import { VersionCreatedByResolver } from './created-by';
import { VersionReferenceResolver } from './reference';
import { VersionUpdatedByResolver } from './updated-by';

export const VersionsFieldsResolvers = [
  VersionReferenceResolver,
  VersionAppResolver,
  VersionCreatedByResolver,
  VersionUpdatedByResolver
];
