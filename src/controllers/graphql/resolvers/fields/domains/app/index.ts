import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Domain } from '@/controllers/graphql/types/domain';
import { AppModel } from '@/models/app.model';
import { DomainModel } from '@/models/domain.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => Domain)
export class DomainAppResolver {
  constructor(
    private readonly appsLoader: AppsLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @ResolveField(() => App, { nullable: true })
  async app(@Parent() domain: DomainModel) {
    if (!domain.app) {
      return null;
    }
    const app = await this.getOrSetCacheService.execute<AppModel>(
      domain.app,
      () => this.appsLoader.findByIds.load(domain.app)
    );
    return app;
  }
}
