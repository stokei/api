import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Cart } from '@/controllers/graphql/types/cart';
import { CartModel } from '@/models/cart.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Cart)
export class CartCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() cart: CartModel) {
    return this.findAccountByIdService.execute(cart.createdBy);
  }
}
