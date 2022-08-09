import { AccessAppResolver } from './app';
import { AccessCreatedByResolver } from './created-by';
import { AccessReferenceResolver } from './reference';
import { AccessUpdatedByResolver } from './updated-by';

export const AccessesFieldsResolvers = [
  AccessReferenceResolver,
  AccessAppResolver,
  AccessCreatedByResolver,
  AccessUpdatedByResolver
];
