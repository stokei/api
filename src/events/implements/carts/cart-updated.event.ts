import { CartModel } from '@/models/cart.model';

interface IDataCartUpdatedEvent {
  readonly updatedBy: string;
  readonly cart: CartModel;
}

export class CartUpdatedEvent {
  readonly updatedBy: string;
  readonly cart: CartModel;

  constructor(data: IDataCartUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.cart = data.cart;
  }
}
