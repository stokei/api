import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllPriceTiersInput } from '@/controllers/graphql/inputs/price-tiers/find-all-price-tiers.input';
import { Price } from '@/controllers/graphql/types/price';
import { PriceTiers } from '@/controllers/graphql/types/price-tiers';
import { PriceModel } from '@/models/price.model';
import { FindAllPriceTiersService } from '@/services/price-tiers/find-all-price-tiers';

@Resolver(() => Price)
export class PricePriceTiersResolver {
  constructor(
    private readonly findAllPriceTiersService: FindAllPriceTiersService
  ) {}

  @ResolveField(() => PriceTiers, { nullable: true })
  tiers(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPriceTiersInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPriceTiersInput,
    @Parent() price: PriceModel
  ) {
    return this.findAllPriceTiersService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: price.id
          }
        }
      }
    });
  }
}
