import { ProductsCategoryModel } from '@/models/products-category.model';

interface IDataProductsCategoryRemovedEvent {
  readonly productsCategory: ProductsCategoryModel;
}

export class ProductsCategoryRemovedEvent {
  readonly productsCategory: ProductsCategoryModel;

  constructor(data: IDataProductsCategoryRemovedEvent) {
    this.productsCategory = data.productsCategory;
  }
}
