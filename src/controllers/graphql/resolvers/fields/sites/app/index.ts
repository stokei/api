import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Site } from '@/controllers/graphql/types/site';
import { SiteModel } from '@/models/site.model';

@Resolver(() => Site)
export class SiteAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() site: SiteModel) {
    return site.app && this.appsLoader.findByIds.load(site.app);
  }
}
