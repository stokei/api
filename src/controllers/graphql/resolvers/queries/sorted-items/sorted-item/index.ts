import { Args, Query, Resolver } from '@nestjs/graphql';

import { SortedItemsLoader } from '@/controllers/graphql/dataloaders/sorted-items.loader';
import { SortedItem } from '@/controllers/graphql/types/sorted-item';
import { ParamNotFoundException, SortedItemNotFoundException } from '@/errors';

@Resolver(() => SortedItem)
export class SortedItemResolver {
  constructor(private readonly sortedItemsLoader: SortedItemsLoader) {}

  @Query(() => SortedItem)
  async sortedItem(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const sortedItem = await this.sortedItemsLoader.findByIds.load(id);
    if (!sortedItem) {
      throw new SortedItemNotFoundException();
    }
    return sortedItem;
  }
}
