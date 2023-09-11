import { SiteAppResolver } from './app';
import { SiteCreatedByResolver } from './created-by';
import { SiteReferenceResolver } from './reference';
import { SiteUpdatedByResolver } from './updated-by';

export const SitesFieldsResolvers = [
  SiteReferenceResolver,
  SiteAppResolver,
  SiteCreatedByResolver,
  SiteUpdatedByResolver
];
