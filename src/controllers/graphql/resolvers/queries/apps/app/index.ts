import { Args, Query, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { AppNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => App)
export class AppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @Query(() => App)
  async app(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const app = await this.appsLoader.findByIds.load(id);
    if (!app) {
      throw new AppNotFoundException();
    }
    return app;
  }
}
