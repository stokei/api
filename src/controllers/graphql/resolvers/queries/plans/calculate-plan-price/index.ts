import { Args, Query, Resolver } from '@nestjs/graphql';

import { CalculatePlanPriceInput } from '@/controllers/graphql/inputs/plans/calculate-plan-price.input';
import { CalculatePlanPriceResponse } from '@/controllers/graphql/types/calculate-plan-price-response';
import { Plan } from '@/controllers/graphql/types/plan';
import { CalculatePlanPriceService } from '@/services/plans/calculate-plan-price';

@Resolver(() => Plan)
export class CalculatePlanPriceResolver {
  constructor(
    private readonly calculatePlanPriceService: CalculatePlanPriceService
  ) {}

  @Query(() => CalculatePlanPriceResponse)
  async calculatePlanPrice(
    @Args('input', {
      type: () => CalculatePlanPriceInput
    })
    data: CalculatePlanPriceInput
  ) {
    return await this.calculatePlanPriceService.execute(data);
  }
}
