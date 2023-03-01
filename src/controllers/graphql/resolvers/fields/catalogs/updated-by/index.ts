import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { CatalogModel } from '@/models/catalog.model';

@Resolver(() => Catalog)
export class CatalogUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() catalog: CatalogModel) {
    return (
      catalog.updatedBy && this.accountsLoader.findByIds.load(catalog.updatedBy)
    );
  }
}
