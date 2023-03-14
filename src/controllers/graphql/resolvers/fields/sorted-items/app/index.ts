import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { SortedItem } from '@/controllers/graphql/types/sorted-item';
import { SortedItemModel } from '@/models/sorted-item.model';

@Resolver(() => SortedItem)
export class SortedItemAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() sortedItem: SortedItemModel) {
    return sortedItem.app && this.appsLoader.findByIds.load(sortedItem.app);
  }
}
