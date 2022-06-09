import { convertToISODateString } from '@stokei/nestjs';

import { CartEntity } from '@/entities';
import { CartModel } from '@/models/cart.model';

export class CartMapper {
  toModel(cart: CartEntity) {
    return (
      cart &&
      new CartModel({
        ...cart,
        updatedAt: convertToISODateString(cart.updatedAt),
        createdAt: convertToISODateString(cart.createdAt)
      })
    );
  }
  toModels(carts: CartEntity[]) {
    return carts?.length > 0 ? carts.map(this.toModel).filter(Boolean) : [];
  }
}
