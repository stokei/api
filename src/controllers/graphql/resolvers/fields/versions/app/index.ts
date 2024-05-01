import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Version } from '@/controllers/graphql/types/version';
import { VersionModel } from '@/models/version.model';

@Resolver(() => Version)
export class VersionAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() version: VersionModel) {
    return version.app && this.appsLoader.findByIds.load(version.app);
  }
}
