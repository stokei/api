import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Module } from '@/controllers/graphql/types/module';
import { ModuleModel } from '@/models/module.model';

@Resolver(() => Module)
export class ModuleAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() module: ModuleModel) {
    return module.app && this.appsLoader.findByIds.load(module.app);
  }
}
