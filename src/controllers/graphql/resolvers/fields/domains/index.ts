import { DomainAppResolver } from './app';
import { DomainReferenceResolver } from './reference';

export const DomainsFieldsResolvers = [
  DomainReferenceResolver,
  DomainAppResolver
];
