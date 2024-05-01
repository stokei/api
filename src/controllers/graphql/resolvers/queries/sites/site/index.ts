import { Args, Query, Resolver } from '@nestjs/graphql';

import { SitesLoader } from '@/controllers/graphql/dataloaders/sites.loader';
import { Site } from '@/controllers/graphql/types/site';
import { SiteNotFoundException } from '@/errors';
import { SiteModel } from '@/models/site.model';
import { FindSiteBySlugService } from '@/services/sites/find-site-by-slug';

@Resolver(() => Site)
export class SiteResolver {
  constructor(
    private readonly sitesLoader: SitesLoader,
    private readonly findSiteBySlugService: FindSiteBySlugService
  ) {}

  @Query(() => Site)
  async site(
    @Args('id', { nullable: true }) id: string,
    @Args('slug', { nullable: true }) slug: string
  ) {
    let siteModel: SiteModel = null;
    if (id) {
      siteModel = await this.sitesLoader.findByIds.load(id);
    } else if (slug) {
      siteModel = await this.findSiteBySlugService.execute(slug);
    }
    if (!siteModel) {
      throw new SiteNotFoundException();
    }
    return siteModel;
  }
}
