import { CartsItemModel } from '@/models/carts-item.model';

interface IDataCartsItemUpdatedEvent {
  readonly updatedBy: string;
  readonly cartsItem: CartsItemModel;
}

export class CartsItemUpdatedEvent {
  readonly updatedBy: string;
  readonly cartsItem: CartsItemModel;

  constructor(data: IDataCartsItemUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.cartsItem = data.cartsItem;
  }
}
