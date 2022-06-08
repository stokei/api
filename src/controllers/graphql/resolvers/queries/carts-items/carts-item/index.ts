import { Args, Query, Resolver } from '@nestjs/graphql';
import { CartsItemsLoader } from '@/controllers/graphql/dataloaders/carts-items.loader';
import { CartsItem } from '@/controllers/graphql/types/carts-item';
import { CartsItemNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => CartsItem)
export class CartsItemResolver {
  constructor(private readonly cartsItemsLoader: CartsItemsLoader) {}

  @Query(() => CartsItem)
  async cartsItem(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const cartsItem = await this.cartsItemsLoader.findByIds.load(id);
    if (!cartsItem) {
      throw new CartsItemNotFoundException();
    }
    return cartsItem;
  }
}
