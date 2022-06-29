import { CartModel } from '@/models/cart.model';

interface IDataCartRemovedEvent {
  readonly removedBy: string;
  readonly cart: CartModel;
}

export class CartRemovedEvent {
  readonly removedBy: string;
  readonly cart: CartModel;

  constructor(data: IDataCartRemovedEvent) {
    this.removedBy = data.removedBy;
    this.cart = data.cart;
  }
}
