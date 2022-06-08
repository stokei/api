import { CartModel } from '@/models/cart.model';

interface IDataCartRemovedEvent {
  readonly cart: CartModel;
}

export class CartRemovedEvent {
  readonly cart: CartModel;

  constructor(data: IDataCartRemovedEvent) {
    this.cart = data.cart;
  }
}
