import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Feature } from '@/controllers/graphql/types/feature';
import { FeatureModel } from '@/models/feature.model';

@Resolver(() => Feature)
export class FeatureAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() feature: FeatureModel) {
    return feature.app && this.appsLoader.findByIds.load(feature.app);
  }
}
