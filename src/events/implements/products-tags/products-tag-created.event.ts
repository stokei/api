import { ProductsTagModel } from '@/models/products-tag.model';

interface IDataProductsTagCreatedEvent {
  readonly productsTag: ProductsTagModel;
}

export class ProductsTagCreatedEvent {
  readonly productsTag: ProductsTagModel;

  constructor(data: IDataProductsTagCreatedEvent) {
    this.productsTag = data.productsTag;
  }
}
