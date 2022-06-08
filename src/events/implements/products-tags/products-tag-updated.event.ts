import { ProductsTagModel } from '@/models/products-tag.model';

interface IDataProductsTagUpdatedEvent {
  readonly productsTag: ProductsTagModel;
}

export class ProductsTagUpdatedEvent {
  readonly productsTag: ProductsTagModel;

  constructor(data: IDataProductsTagUpdatedEvent) {
    this.productsTag = data.productsTag;
  }
}
