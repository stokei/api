import { Injectable, Scope } from '@nestjs/common';
import { FindAllProductsService } from '@/services/products/find-all-products';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ProductsLoader {
  constructor(private readonly productsService: FindAllProductsService) {}

  readonly findByIds = new DataLoader(async (productIds: string[]) => {
    const products = await this.productsService.execute({
      where: {
        AND: {
          ids: productIds
        }
      }
    });
    const productsMap = new Map(
      products?.items?.map((product) => [product.id, product])
    );
    return productIds.map((productId) => productsMap.get(productId));
  });
}
