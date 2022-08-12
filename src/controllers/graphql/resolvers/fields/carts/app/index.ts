import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Cart } from '@/controllers/graphql/types/cart';
import { CartModel } from '@/models/cart.model';

@Resolver(() => Cart)
export class CartAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() cart: CartModel) {
    return cart.app && this.appsLoader.findByIds.load(cart.app);
  }
}
