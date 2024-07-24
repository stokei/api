import { ProductComboItemModel } from '@/models/product-combo-item.model';

interface IDataProductComboItemCreatedEvent {
  readonly createdBy: string;
  readonly productComboItem: ProductComboItemModel;
}

export class ProductComboItemCreatedEvent {
  readonly createdBy: string;
  readonly productComboItem: ProductComboItemModel;

  constructor(data: IDataProductComboItemCreatedEvent) {
    this.createdBy = data.createdBy;
    this.productComboItem = data.productComboItem;
  }
}
