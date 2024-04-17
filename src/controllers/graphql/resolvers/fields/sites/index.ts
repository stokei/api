import { SiteAppResolver } from './app';
import { SiteCreatedByResolver } from './created-by';
import { SiteDefaultDomainResolver } from './default-domain';
import { SiteFaviconResolver } from './favicon';
import { SiteHomePageResolver } from './home-page';
import { SiteLoginPageResolver } from './login-page';
import { SiteLogoResolver } from './logo';
import { SiteReferenceResolver } from './reference';
import { SiteSignUpPageResolver } from './signup-page';
import { SiteStokeiDomainResolver } from './stokei-domain';
import { SiteUpdatedByResolver } from './updated-by';

export const SitesFieldsResolvers = [
  SiteReferenceResolver,
  SiteAppResolver,
  SiteCreatedByResolver,
  SiteUpdatedByResolver,
  SiteHomePageResolver,
  SiteLoginPageResolver,
  SiteSignUpPageResolver,
  SiteLogoResolver,
  SiteFaviconResolver,
  SiteStokeiDomainResolver,
  SiteDefaultDomainResolver
];
