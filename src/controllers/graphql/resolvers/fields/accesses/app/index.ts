import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { Access } from '@/controllers/graphql/types/access';
import { App } from '@/controllers/graphql/types/app';
import { AccessModel } from '@/models/access.model';

@Resolver(() => Access)
export class AccessAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() access: AccessModel) {
    return access.app && this.appsLoader.findByIds.load(access.app);
  }
}
