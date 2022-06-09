import { convertToISODateString } from '@stokei/nestjs';

import { ProductEntity } from '@/entities';
import { ProductModel } from '@/models/product.model';

export class ProductMapper {
  toModel(product: ProductEntity) {
    return (
      product &&
      new ProductModel({
        ...product,
        updatedAt: convertToISODateString(product.updatedAt),
        createdAt: convertToISODateString(product.createdAt)
      })
    );
  }
  toModels(products: ProductEntity[]) {
    return products?.length > 0
      ? products.map(this.toModel).filter(Boolean)
      : [];
  }
}
