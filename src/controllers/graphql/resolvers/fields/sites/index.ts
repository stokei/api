import { SiteAppResolver } from './app';
import { SiteCreatedByResolver } from './created-by';
import { SiteDefaultDomainResolver } from './default-domain';
import { SiteFaviconResolver } from './favicon';
import { SitePageResolver } from './home-page';
import { SiteLogoResolver } from './logo';
import { SiteReferenceResolver } from './reference';
import { SiteStokeiDomainResolver } from './stokei-domain';
import { SiteUpdatedByResolver } from './updated-by';

export const SitesFieldsResolvers = [
  SiteReferenceResolver,
  SiteAppResolver,
  SiteCreatedByResolver,
  SiteUpdatedByResolver,
  SitePageResolver,
  SiteLogoResolver,
  SiteFaviconResolver,
  SiteStokeiDomainResolver,
  SiteDefaultDomainResolver
];
