import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { DomainsLoader } from '@/controllers/graphql/dataloaders/domains.loader';
import { Domain } from '@/controllers/graphql/types/domain';
import { Site } from '@/controllers/graphql/types/site';
import { SiteModel } from '@/models/site.model';
import { getSiteStokeiDomain } from '@/utils/get-site-stokei-domain';

@Resolver(() => Site)
export class SiteDefaultDomainResolver {
  constructor(private readonly domainsLoader: DomainsLoader) {}

  @ResolveField(() => Domain, { nullable: true })
  async defaultDomain(@Parent() site: SiteModel) {
    const defaultSiteMock = getSiteStokeiDomain({
      site
    });
    try {
      if (!site.defaultDomain) {
        return defaultSiteMock;
      }
      const domain = await this.domainsLoader.findByIds.load(
        site.defaultDomain
      );
      if (!domain) {
        return defaultSiteMock;
      }
      return domain;
    } catch (error) {
      return defaultSiteMock;
    }
  }
}
