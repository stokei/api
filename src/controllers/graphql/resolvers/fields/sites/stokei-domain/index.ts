import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Domain } from '@/controllers/graphql/types/domain';
import { Site } from '@/controllers/graphql/types/site';
import { SiteModel } from '@/models/site.model';
import { getSiteStokeiDomain } from '@/utils/get-site-stokei-domain';

@Resolver(() => Site)
export class SiteStokeiDomainResolver {
  @ResolveField(() => Domain, { nullable: true })
  async stokeiDomain(@Parent() site: SiteModel) {
    return getSiteStokeiDomain({
      site
    });
  }
}
