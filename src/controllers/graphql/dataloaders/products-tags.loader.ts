import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllProductsTagsService } from '@/services/products-tags/find-all-products-tags';

@Injectable({ scope: Scope.REQUEST })
export class ProductsTagsLoader {
  constructor(
    private readonly productsTagsService: FindAllProductsTagsService
  ) {}

  readonly findByIds = new DataLoader(async (productsTagIds: string[]) => {
    const productsTags = await this.productsTagsService.execute({
      where: {
        AND: {
          ids: productsTagIds
        }
      }
    });
    const productsTagsMap = new Map(
      productsTags?.items?.map((productsTag) => [productsTag.id, productsTag])
    );
    return productsTagIds.map((productsTagId) =>
      productsTagsMap.get(productsTagId)
    );
  });
}
