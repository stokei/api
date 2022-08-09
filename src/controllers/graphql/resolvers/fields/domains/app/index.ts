import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Domain } from '@/controllers/graphql/types/domain';
import { DomainModel } from '@/models/domain.model';

@Resolver(() => Domain)
export class DomainAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() domain: DomainModel) {
    return domain.app && this.appsLoader.findByIds.load(domain.app);
  }
}
