import { ProductsImageModel } from '@/models/products-image.model';

interface IDataProductsImageUpdatedEvent {
  readonly productsImage: ProductsImageModel;
}

export class ProductsImageUpdatedEvent {
  readonly productsImage: ProductsImageModel;

  constructor(data: IDataProductsImageUpdatedEvent) {
    this.productsImage = data.productsImage;
  }
}
