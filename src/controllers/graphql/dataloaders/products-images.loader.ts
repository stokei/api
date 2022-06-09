import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllProductsImagesService } from '@/services/products-images/find-all-products-images';

@Injectable({ scope: Scope.REQUEST })
export class ProductsImagesLoader {
  constructor(
    private readonly productsImagesService: FindAllProductsImagesService
  ) {}

  readonly findByIds = new DataLoader(async (productsImageIds: string[]) => {
    const productsImages = await this.productsImagesService.execute({
      where: {
        AND: {
          ids: productsImageIds
        }
      }
    });
    const productsImagesMap = new Map(
      productsImages?.items?.map((productsImage) => [
        productsImage.id,
        productsImage
      ])
    );
    return productsImageIds.map((productsImageId) =>
      productsImagesMap.get(productsImageId)
    );
  });
}
