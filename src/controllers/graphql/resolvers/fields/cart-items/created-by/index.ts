import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { CartItemModel } from '@/models/cart-item.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => CartItem)
export class CartItemCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() cartItem: CartItemModel) {
    return this.findAccountByIdService.execute(cartItem.createdBy);
  }
}
