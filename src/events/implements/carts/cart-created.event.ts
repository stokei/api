import { CartModel } from '@/models/cart.model';

interface IDataCartCreatedEvent {
  readonly cart: CartModel;
}

export class CartCreatedEvent {
  readonly cart: CartModel;

  constructor(data: IDataCartCreatedEvent) {
    this.cart = data.cart;
  }
}
