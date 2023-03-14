import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { SortedItem } from '@/controllers/graphql/types/sorted-item';
import { SortedItemModel } from '@/models/sorted-item.model';

@Resolver(() => SortedItem)
export class SortedItemUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() sortedItem: SortedItemModel) {
    return (
      sortedItem.updatedBy &&
      this.accountsLoader.findByIds.load(sortedItem.updatedBy)
    );
  }
}
