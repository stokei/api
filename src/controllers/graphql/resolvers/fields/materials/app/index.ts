import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Material } from '@/controllers/graphql/types/material';
import { MaterialModel } from '@/models/material.model';

@Resolver(() => Material)
export class MaterialAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() material: MaterialModel) {
    return material.app && this.appsLoader.findByIds.load(material.app);
  }
}
