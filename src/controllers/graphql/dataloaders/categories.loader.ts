import { Injectable, Scope } from '@nestjs/common';
import { FindAllCategoriesService } from '@/services/categories/find-all-categories';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class CategoriesLoader {
  constructor(private readonly categoriesService: FindAllCategoriesService) {}

  readonly findByIds = new DataLoader(async (categoryIds: string[]) => {
    const categories = await this.categoriesService.execute({
      where: {
        AND: {
          ids: categoryIds
        }
      }
    });
    const categoriesMap = new Map(
      categories?.items?.map((category) => [category.id, category])
    );
    return categoryIds.map((categoryId) => categoriesMap.get(categoryId));
  });
}
