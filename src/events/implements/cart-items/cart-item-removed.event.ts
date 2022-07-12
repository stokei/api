import { CartItemModel } from '@/models/cart-item.model';

interface IDataCartItemRemovedEvent {
  readonly removedBy: string;
  readonly cartItem: CartItemModel;
}

export class CartItemRemovedEvent {
  readonly removedBy: string;
  readonly cartItem: CartItemModel;

  constructor(data: IDataCartItemRemovedEvent) {
    this.removedBy = data.removedBy;
    this.cartItem = data.cartItem;
  }
}
