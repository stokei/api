import { CartModel } from '@/models/cart.model';

interface IDataCartUpdatedEvent {
  readonly cart: CartModel;
}

export class CartUpdatedEvent {
  readonly cart: CartModel;

  constructor(data: IDataCartUpdatedEvent) {
    this.cart = data.cart;
  }
}
