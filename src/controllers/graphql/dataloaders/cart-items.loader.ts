import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCartItemsService } from '@/services/cart-items/find-all-cart-items';

@Injectable({ scope: Scope.REQUEST })
export class CartItemsLoader {
  constructor(private readonly cartItemsService: FindAllCartItemsService) {}

  readonly findByIds = new DataLoader(async (cartItemIds: string[]) => {
    const cartItems = await this.cartItemsService.execute({
      where: {
        AND: {
          ids: cartItemIds
        }
      }
    });
    const cartItemsMap = new Map(
      cartItems?.items?.map((cartItem) => [cartItem.id, cartItem])
    );
    return cartItemIds.map((cartItemId) => cartItemsMap.get(cartItemId));
  });
}
