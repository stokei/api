import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { AppNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => App)
export class CurrentAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @UseGuards(AppGuard)
  @Query(() => App)
  async currentApp(@CurrentApp('id') appId: string) {
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }
    const app = await this.appsLoader.findByIds.load(appId);
    if (!app) {
      throw new AppNotFoundException();
    }
    return app;
  }
}
