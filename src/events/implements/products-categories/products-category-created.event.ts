import { ProductsCategoryModel } from '@/models/products-category.model';

interface IDataProductsCategoryCreatedEvent {
  readonly productsCategory: ProductsCategoryModel;
}

export class ProductsCategoryCreatedEvent {
  readonly productsCategory: ProductsCategoryModel;

  constructor(data: IDataProductsCategoryCreatedEvent) {
    this.productsCategory = data.productsCategory;
  }
}
