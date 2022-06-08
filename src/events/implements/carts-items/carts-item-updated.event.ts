import { CartsItemModel } from '@/models/carts-item.model';

interface IDataCartsItemUpdatedEvent {
  readonly cartsItem: CartsItemModel;
}

export class CartsItemUpdatedEvent {
  readonly cartsItem: CartsItemModel;

  constructor(data: IDataCartsItemUpdatedEvent) {
    this.cartsItem = data.cartsItem;
  }
}
