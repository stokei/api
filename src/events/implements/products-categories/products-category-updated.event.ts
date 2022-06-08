import { ProductsCategoryModel } from '@/models/products-category.model';

interface IDataProductsCategoryUpdatedEvent {
  readonly productsCategory: ProductsCategoryModel;
}

export class ProductsCategoryUpdatedEvent {
  readonly productsCategory: ProductsCategoryModel;

  constructor(data: IDataProductsCategoryUpdatedEvent) {
    this.productsCategory = data.productsCategory;
  }
}
