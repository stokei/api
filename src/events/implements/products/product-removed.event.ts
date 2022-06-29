import { ProductModel } from '@/models/product.model';

interface IDataProductRemovedEvent {
  readonly removedBy: string;
  readonly product: ProductModel;
}

export class ProductRemovedEvent {
  readonly removedBy: string;
  readonly product: ProductModel;

  constructor(data: IDataProductRemovedEvent) {
    this.removedBy = data.removedBy;
    this.product = data.product;
  }
}
