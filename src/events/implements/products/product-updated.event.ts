import { ProductModel } from '@/models/product.model';

interface IDataProductUpdatedEvent {
  readonly product: ProductModel;
}

export class ProductUpdatedEvent {
  readonly product: ProductModel;

  constructor(data: IDataProductUpdatedEvent) {
    this.product = data.product;
  }
}
