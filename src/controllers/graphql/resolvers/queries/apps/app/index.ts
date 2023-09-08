import { Args, Query, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { AppNotFoundException, ParamNotFoundException } from '@/errors';
import { AppModel } from '@/models/app.model';
import { FindAppBySlugService } from '@/services/apps/find-app-by-slug';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => App)
export class AppResolver {
  constructor(
    private readonly appsLoader: AppsLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService,
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
      const app = await this.getOrSetCacheService.execute<AppModel>(
        AppResolver.name + slug,
        () => this.findAppBySlugService.execute(slug)
      );
      if (!app) {
        throw new AppNotFoundException();
      }
      return app;
    }
    const app = await this.getOrSetCacheService.execute<AppModel>(
      AppResolver.name + id,
      () => this.appsLoader.findByIds.load(id)
    );
    if (!app) {
      throw new AppNotFoundException();
    }
    return app;
  }
}
