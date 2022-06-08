import { ProductsImageModel } from '@/models/products-image.model';

interface IDataProductsImageRemovedEvent {
  readonly productsImage: ProductsImageModel;
}

export class ProductsImageRemovedEvent {
  readonly productsImage: ProductsImageModel;

  constructor(data: IDataProductsImageRemovedEvent) {
    this.productsImage = data.productsImage;
  }
}
