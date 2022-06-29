import { CartsItemModel } from '@/models/carts-item.model';

interface IDataCartsItemRemovedEvent {
  readonly removedBy: string;
  readonly cartsItem: CartsItemModel;
}

export class CartsItemRemovedEvent {
  readonly removedBy: string;
  readonly cartsItem: CartsItemModel;

  constructor(data: IDataCartsItemRemovedEvent) {
    this.removedBy = data.removedBy;
    this.cartsItem = data.cartsItem;
  }
}
