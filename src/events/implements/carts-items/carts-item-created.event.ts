import { CartsItemModel } from '@/models/carts-item.model';

interface IDataCartsItemCreatedEvent {
  readonly cartsItem: CartsItemModel;
}

export class CartsItemCreatedEvent {
  readonly cartsItem: CartsItemModel;

  constructor(data: IDataCartsItemCreatedEvent) {
    this.cartsItem = data.cartsItem;
  }
}
