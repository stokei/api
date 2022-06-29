import { CartModel } from '@/models/cart.model';

interface IDataCartCreatedEvent {
  readonly createdBy: string;
  readonly cart: CartModel;
}

export class CartCreatedEvent {
  readonly createdBy: string;
  readonly cart: CartModel;

  constructor(data: IDataCartCreatedEvent) {
    this.createdBy = data.createdBy;
    this.cart = data.cart;
  }
}
