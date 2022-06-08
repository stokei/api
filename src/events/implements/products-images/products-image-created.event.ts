import { ProductsImageModel } from '@/models/products-image.model';

interface IDataProductsImageCreatedEvent {
  readonly productsImage: ProductsImageModel;
}

export class ProductsImageCreatedEvent {
  readonly productsImage: ProductsImageModel;

  constructor(data: IDataProductsImageCreatedEvent) {
    this.productsImage = data.productsImage;
  }
}
