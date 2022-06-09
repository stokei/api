import { Args, Query, Resolver } from '@nestjs/graphql';

import { SitesLoader } from '@/controllers/graphql/dataloaders/sites.loader';
import { Site } from '@/controllers/graphql/types/site';
import { ParamNotFoundException, SiteNotFoundException } from '@/errors';

@Resolver(() => Site)
export class SiteResolver {
  constructor(private readonly sitesLoader: SitesLoader) {}

  @Query(() => Site)
  async site(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const site = await this.sitesLoader.findByIds.load(id);
    if (!site) {
      throw new SiteNotFoundException();
    }
    return site;
  }
}
