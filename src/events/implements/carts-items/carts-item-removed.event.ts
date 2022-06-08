import { CartsItemModel } from '@/models/carts-item.model';

interface IDataCartsItemRemovedEvent {
  readonly cartsItem: CartsItemModel;
}

export class CartsItemRemovedEvent {
  readonly cartsItem: CartsItemModel;

  constructor(data: IDataCartsItemRemovedEvent) {
    this.cartsItem = data.cartsItem;
  }
}
