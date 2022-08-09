import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { CartItemModel } from '@/models/cart-item.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => CartItem)
export class CartItemAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() cartItem: CartItemModel) {
    return this.findAppByIdService.execute(cartItem.app);
  }
}
