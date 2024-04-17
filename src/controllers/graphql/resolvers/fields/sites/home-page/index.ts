import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PagesLoader } from '@/controllers/graphql/dataloaders/pages.loader';
import { Page } from '@/controllers/graphql/types/page';
import { Site } from '@/controllers/graphql/types/site';
import { SiteModel } from '@/models/site.model';

@Resolver(() => Site)
export class SiteHomePageResolver {
  constructor(private readonly pagesLoader: PagesLoader) {}

  @ResolveField(() => Page, { nullable: true })
  homePage(@Parent() site: SiteModel) {
    return site.homePage && this.pagesLoader.findByIds.load(site.homePage);
  }
}
