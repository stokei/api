import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { AppNotFoundException, ParamNotFoundException } from '@/errors';
import { AppModel } from '@/models/app.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => App)
export class CurrentAppResolver {
  constructor(
    private readonly appsLoader: AppsLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @UseGuards(AppGuard)
  @Query(() => App)
  async currentApp(@CurrentApp('id') appId: string) {
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }
    const app = await this.getOrSetCacheService.execute<AppModel>(appId, () =>
      this.appsLoader.findByIds.load(appId)
    );
    if (!app) {
      throw new AppNotFoundException();
    }
    return app;
  }
}
