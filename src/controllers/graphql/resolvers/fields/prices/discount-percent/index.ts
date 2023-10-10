import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Price } from '@/controllers/graphql/types/price';
import { PriceModel } from '@/models/price.model';

@Resolver(() => Price)
export class PriceDiscountPercentResolver {
  @ResolveField(() => App, { nullable: true })
  discountPercent(@Parent() price: PriceModel) {
    if (!price.fromAmount) {
      return null;
    }
    const fromAmountPercentage = (price.amount * 100) / price.fromAmount;
    const discountPercentage = 100 - fromAmountPercentage;
    return Math.round(discountPercentage);
  }
}
