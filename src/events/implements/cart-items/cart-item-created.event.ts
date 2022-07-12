import { CartItemModel } from '@/models/cart-item.model';

interface IDataCartItemCreatedEvent {
  readonly createdBy: string;
  readonly cartItem: CartItemModel;
}

export class CartItemCreatedEvent {
  readonly createdBy: string;
  readonly cartItem: CartItemModel;

  constructor(data: IDataCartItemCreatedEvent) {
    this.createdBy = data.createdBy;
    this.cartItem = data.cartItem;
  }
}
