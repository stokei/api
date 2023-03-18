import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Price } from '@/controllers/graphql/types/price';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { PriceModel } from '@/models/price.model';
import { FindAllPriceTiersService } from '@/services/price-tiers/find-all-price-tiers';

@Resolver(() => Price)
export class PriceAmountResolver {
  constructor(
    private readonly findAllPriceTiersService: FindAllPriceTiersService
  ) {}

  @ResolveField(() => Int)
  async amount(@Parent() price: PriceModel) {
    if (price?.amount) {
      return price.amount;
    }

    if (price?.billingScheme === BillingScheme.PER_UNIT) {
      return 0;
    }

    try {
      const tiers = await this.findAllPriceTiersService.execute({
        page: {
          limit: 1
        },
        where: {
          AND: {
            parent: {
              equals: price.id
            }
          }
        }
      });

      return tiers?.items?.[0]?.amount;
    } catch (error) {
      return 0;
    }
  }
}
