import { convertToISODateString } from '@stokei/nestjs';
import { ProductsImageEntity } from '@/entities';
import { ProductsImageModel } from '@/models/products-image.model';

export class ProductsImageMapper {
  toModel(productsImage: ProductsImageEntity) {
    return (
      productsImage &&
      new ProductsImageModel({
        ...productsImage,
        updatedAt: convertToISODateString(productsImage.updatedAt),
        createdAt: convertToISODateString(productsImage.createdAt)
      })
    );
  }
  toModels(productsImages: ProductsImageEntity[]) {
    return productsImages?.length > 0
      ? productsImages.map(this.toModel).filter(Boolean)
      : [];
  }
}
