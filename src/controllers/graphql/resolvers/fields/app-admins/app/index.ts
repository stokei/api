import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { AppAdmin } from '@/controllers/graphql/types/app-admin';
import { AppAdminModel } from '@/models/app-admin.model';

@Resolver(() => AppAdmin)
export class AppAdminAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() appAdmin: AppAdminModel) {
    return appAdmin.app && this.appsLoader.findByIds.load(appAdmin.app);
  }
}
