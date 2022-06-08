import { ProductModel } from '@/models/product.model';

interface IDataProductRemovedEvent {
  readonly product: ProductModel;
}

export class ProductRemovedEvent {
  readonly product: ProductModel;

  constructor(data: IDataProductRemovedEvent) {
    this.product = data.product;
  }
}
