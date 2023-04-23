import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { CatalogModel } from '@/models/catalog.model';

@Resolver(() => Catalog)
export class CatalogCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() catalog: CatalogModel) {
    return (
      catalog.createdBy && this.accountsLoader.findByIds.load(catalog.createdBy)
    );
  }
}
