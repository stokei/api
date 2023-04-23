import { DomainAppResolver } from './app';
import { DomainCreatedByResolver } from './created-by';
import { DomainReferenceResolver } from './reference';
import { DomainUpdatedByResolver } from './updated-by';

export const DomainsFieldsResolvers = [
  DomainReferenceResolver,
  DomainAppResolver,
  DomainCreatedByResolver,
  DomainUpdatedByResolver
];
