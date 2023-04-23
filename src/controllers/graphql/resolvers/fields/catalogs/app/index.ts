import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { CatalogModel } from '@/models/catalog.model';

@Resolver(() => Catalog)
export class CatalogAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() catalog: CatalogModel) {
    return catalog.app && this.appsLoader.findByIds.load(catalog.app);
  }
}
