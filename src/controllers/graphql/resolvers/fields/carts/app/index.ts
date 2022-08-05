import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Cart } from '@/controllers/graphql/types/cart';
import { CartModel } from '@/models/cart.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Cart)
export class CartAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Cart)
  app(@Parent() cart: CartModel) {
    return this.findAppByIdService.execute(cart.app);
  }
}
