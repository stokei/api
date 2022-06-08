import { ProductModel } from '@/models/product.model';

interface IDataProductCreatedEvent {
  readonly product: ProductModel;
}

export class ProductCreatedEvent {
  readonly product: ProductModel;

  constructor(data: IDataProductCreatedEvent) {
    this.product = data.product;
  }
}
