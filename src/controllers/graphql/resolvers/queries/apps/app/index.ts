import { Args, Query, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { AppNotFoundException, ParamNotFoundException } from '@/errors';
import { FindAppBySlugService } from '@/services/apps/find-app-by-slug';

@Resolver(() => App)
export class AppResolver {
  constructor(
    private readonly appsLoader: AppsLoader,
    private readonly findAppBySlugService: FindAppBySlugService
  ) {}

  @Query(() => App)
  async app(
    @Args('id', { nullable: true }) id: string,
    @Args('slug', { nullable: true }) slug: string
  ) {
    if (!id && !slug) {
      throw new ParamNotFoundException('id');
    }
    if (slug) {
      const app = await this.findAppBySlugService.execute(slug);
      if (!app) {
        throw new AppNotFoundException();
      }
      return app;
    }
    const app = await this.appsLoader.findByIds.load(id);
    if (!app) {
      throw new AppNotFoundException();
    }
    return app;
  }
}
