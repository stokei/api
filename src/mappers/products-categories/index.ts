import { convertToISODateString } from '@stokei/nestjs';
import { ProductsCategoryEntity } from '@/entities';
import { ProductsCategoryModel } from '@/models/products-category.model';

export class ProductsCategoryMapper {
  toModel(productsCategory: ProductsCategoryEntity) {
    return (
      productsCategory &&
      new ProductsCategoryModel({
        ...productsCategory,
        updatedAt: convertToISODateString(productsCategory.updatedAt),
        createdAt: convertToISODateString(productsCategory.createdAt)
      })
    );
  }
  toModels(productsCategories: ProductsCategoryEntity[]) {
    return productsCategories?.length > 0
      ? productsCategories.map(this.toModel).filter(Boolean)
      : [];
  }
}
