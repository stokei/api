import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Price } from '@/controllers/graphql/types/price';
import { PriceModel } from '@/models/price.model';

@Resolver(() => Price)
export class PriceCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() price: PriceModel) {
    return (
      price.createdBy && this.accountsLoader.findByIds.load(price.createdBy)
    );
  }
}
