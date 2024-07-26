import { ProductComboItemModel } from '@/models/product-combo-item.model';

interface IDataProductComboItemRemovedEvent {
  readonly removedBy: string;
  readonly isLastProductComboItem: boolean;
  readonly productComboItem: ProductComboItemModel;
}

export class ProductComboItemRemovedEvent {
  readonly removedBy: string;
  readonly isLastProductComboItem: boolean;
  readonly productComboItem: ProductComboItemModel;

  constructor(data: IDataProductComboItemRemovedEvent) {
    this.removedBy = data.removedBy;
    this.isLastProductComboItem = data.isLastProductComboItem;
    this.productComboItem = data.productComboItem;
  }
}
