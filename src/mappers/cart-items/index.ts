import { convertToISODateString } from '@stokei/nestjs';

import { CartItemEntity } from '@/entities';
import { CartItemModel } from '@/models/cart-item.model';

export class CartItemMapper {
  toModel(cartItem: CartItemEntity) {
    return (
      cartItem &&
      new CartItemModel({
        ...cartItem,
        updatedAt: convertToISODateString(cartItem.updatedAt),
        createdAt: convertToISODateString(cartItem.createdAt)
      })
    );
  }
  toModels(cartItems: CartItemEntity[]) {
    return cartItems?.length > 0
      ? cartItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
