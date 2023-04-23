import { Resolver, ResolveReference } from '@nestjs/graphql';

import { SortedItemsLoader } from '@/controllers/graphql/dataloaders/sorted-items.loader';
import { SortedItem } from '@/controllers/graphql/types/sorted-item';

@Resolver(() => SortedItem)
export class SortedItemReferenceResolver {
  constructor(private readonly sortedItemsLoader: SortedItemsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.sortedItemsLoader.findByIds.load(reference.id);
  }
}
