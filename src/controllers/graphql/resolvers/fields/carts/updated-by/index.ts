import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Cart } from '@/controllers/graphql/types/cart';
import { CartModel } from '@/models/cart.model';

@Resolver(() => Cart)
export class CartUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() cart: CartModel) {
    return cart.updatedBy && this.accountsLoader.findByIds.load(cart.updatedBy);
  }
}
