import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { Price } from '@/controllers/graphql/types/price';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';
import { FindAllPricesService } from '@/services/prices/find-all-prices';

@Resolver(() => Product)
export class ProductDefaultPriceResolver {
  constructor(
    private readonly pricesLoader: PricesLoader,
    private readonly findAllPricesService: FindAllPricesService
  ) {}

  @ResolveField(() => Price, { nullable: true })
  async defaultPrice(@Parent() product: ProductModel) {
    const findFirstProductPrice = async () => {
      const prices = await this.findAllPricesService.execute({
        page: {
          limit: 1
        },
        where: {
          AND: {
            parent: {
              equals: product.id
            },
            active: {
              equals: true
            }
          }
        }
      });
      return prices?.items?.[0];
    };
    try {
      if (product.defaultPrice) {
        const price = await this.pricesLoader.findByIds.load(
          product.defaultPrice
        );
        if (price?.active) {
          return price;
        }
      }
      return await findFirstProductPrice();
    } catch (e) {
      return await findFirstProductPrice();
    }
  }
}
