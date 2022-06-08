import { ProductsTagModel } from '@/models/products-tag.model';

interface IDataProductsTagRemovedEvent {
  readonly productsTag: ProductsTagModel;
}

export class ProductsTagRemovedEvent {
  readonly productsTag: ProductsTagModel;

  constructor(data: IDataProductsTagRemovedEvent) {
    this.productsTag = data.productsTag;
  }
}
