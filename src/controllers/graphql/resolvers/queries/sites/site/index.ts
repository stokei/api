import { Args, Query, Resolver } from '@nestjs/graphql';

import { SitesLoader } from '@/controllers/graphql/dataloaders/sites.loader';
import { Site } from '@/controllers/graphql/types/site';
import { SiteNotFoundException } from '@/errors';
import { SiteModel } from '@/models/site.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';
import { FindSiteBySlugService } from '@/services/sites/find-site-by-slug';

@Resolver(() => Site)
export class SiteResolver {
  constructor(
    private readonly sitesLoader: SitesLoader,
    private readonly findSiteBySlugService: FindSiteBySlugService,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @Query(() => Site)
  async site(
    @Args('id', { nullable: true }) id: string,
    @Args('slug', { nullable: true }) slug: string
  ) {
    let siteModel: SiteModel = null;
    if (id) {
      siteModel = await this.getOrSetCacheService.execute<SiteModel>(
        SiteResolver.name + id,
        () => this.sitesLoader.findByIds.load(id)
      );
    } else if (slug) {
      siteModel = await this.getOrSetCacheService.execute<SiteModel>(
        SiteResolver.name + slug,
        () => this.findSiteBySlugService.execute(slug)
      );
    }
    if (!siteModel) {
      throw new SiteNotFoundException();
    }
    return siteModel;
  }
}
