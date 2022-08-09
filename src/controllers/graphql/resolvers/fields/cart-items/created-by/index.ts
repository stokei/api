import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { CartItemModel } from '@/models/cart-item.model';

@Resolver(() => CartItem)
export class CartItemCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() cartItem: CartItemModel) {
    return (
      cartItem.updatedBy &&
      this.accountsLoader.findByIds.load(cartItem.createdBy)
    );
  }
}
