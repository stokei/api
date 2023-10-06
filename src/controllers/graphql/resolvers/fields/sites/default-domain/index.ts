import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { DomainsLoader } from '@/controllers/graphql/dataloaders/domains.loader';
import { Domain } from '@/controllers/graphql/types/domain';
import { Site } from '@/controllers/graphql/types/site';
import { SiteModel } from '@/models/site.model';

@Resolver(() => Site)
export class SiteDefaultDomainResolver {
  constructor(private readonly domainsLoader: DomainsLoader) {}

  @ResolveField(() => Domain, { nullable: true })
  defaultDomain(@Parent() site: SiteModel) {
    return (
      site.defaultDomain &&
      this.domainsLoader.findByIds.load(site.defaultDomain)
    );
  }
}
