import { CartItemModel } from '@/models/cart-item.model';

interface IDataCartItemUpdatedEvent {
  readonly updatedBy: string;
  readonly cartItem: CartItemModel;
}

export class CartItemUpdatedEvent {
  readonly updatedBy: string;
  readonly cartItem: CartItemModel;

  constructor(data: IDataCartItemUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.cartItem = data.cartItem;
  }
}
