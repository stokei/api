import { CartsItemModel } from '@/models/carts-item.model';

interface IDataCartsItemCreatedEvent {
  readonly createdBy: string;
  readonly cartsItem: CartsItemModel;
}

export class CartsItemCreatedEvent {
  readonly createdBy: string;
  readonly cartsItem: CartsItemModel;

  constructor(data: IDataCartsItemCreatedEvent) {
    this.createdBy = data.createdBy;
    this.cartsItem = data.cartsItem;
  }
}
