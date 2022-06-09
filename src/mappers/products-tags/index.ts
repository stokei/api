import { convertToISODateString } from '@stokei/nestjs';

import { ProductsTagEntity } from '@/entities';
import { ProductsTagModel } from '@/models/products-tag.model';

export class ProductsTagMapper {
  toModel(productsTag: ProductsTagEntity) {
    return (
      productsTag &&
      new ProductsTagModel({
        ...productsTag,
        updatedAt: convertToISODateString(productsTag.updatedAt),
        createdAt: convertToISODateString(productsTag.createdAt)
      })
    );
  }
  toModels(productsTags: ProductsTagEntity[]) {
    return productsTags?.length > 0
      ? productsTags.map(this.toModel).filter(Boolean)
      : [];
  }
}
