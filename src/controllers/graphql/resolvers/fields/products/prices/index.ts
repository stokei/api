import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllPricesInput } from '@/controllers/graphql/inputs/prices/find-all-prices.input';
import { Prices } from '@/controllers/graphql/types/prices';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';
import { FindAllPricesService } from '@/services/prices/find-all-prices';

@Resolver(() => Product)
export class ProductPricesResolver {
  constructor(private readonly findAllPricesService: FindAllPricesService) {}

  @ResolveField(() => Prices, { nullable: true })
  prices(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPricesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPricesInput,
    @Parent() product: ProductModel
  ) {
    return this.findAllPricesService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: product.id
          }
        }
      }
    });
  }
}
