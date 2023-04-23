import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { CatalogItem } from '@/controllers/graphql/types/catalog-item';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Resolver(() => CatalogItem)
export class CatalogItemUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() catalogItem: CatalogItemModel) {
    return (
      catalogItem.updatedBy &&
      this.accountsLoader.findByIds.load(catalogItem.updatedBy)
    );
  }
}
