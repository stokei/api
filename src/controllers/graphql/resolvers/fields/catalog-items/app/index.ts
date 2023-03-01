import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { CatalogItem } from '@/controllers/graphql/types/catalog-item';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Resolver(() => CatalogItem)
export class CatalogItemAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() catalogItem: CatalogItemModel) {
    return catalogItem.app && this.appsLoader.findByIds.load(catalogItem.app);
  }
}
