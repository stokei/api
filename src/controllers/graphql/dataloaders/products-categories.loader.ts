import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllProductsCategoriesService } from '@/services/products-categories/find-all-products-categories';

@Injectable({ scope: Scope.REQUEST })
export class ProductsCategoriesLoader {
  constructor(
    private readonly productsCategoriesService: FindAllProductsCategoriesService
  ) {}

  readonly findByIds = new DataLoader(async (productsCategoryIds: string[]) => {
    const productsCategories = await this.productsCategoriesService.execute({
      where: {
        AND: {
          ids: productsCategoryIds
        }
      }
    });
    const productsCategoriesMap = new Map(
      productsCategories?.items?.map((productsCategory) => [
        productsCategory.id,
        productsCategory
      ])
    );
    return productsCategoryIds.map((productsCategoryId) =>
      productsCategoriesMap.get(productsCategoryId)
    );
  });
}
