import { convertToISODateString } from '@stokei/nestjs';
import { CategoryEntity } from '@/entities';
import { CategoryModel } from '@/models/category.model';

export class CategoryMapper {
  toModel(category: CategoryEntity) {
    return (
      category &&
      new CategoryModel({
        ...category,
        updatedAt: convertToISODateString(category.updatedAt),
        createdAt: convertToISODateString(category.createdAt)
      })
    );
  }
  toModels(categories: CategoryEntity[]) {
    return categories?.length > 0
      ? categories.map(this.toModel).filter(Boolean)
      : [];
  }
}
