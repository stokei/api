import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { FindOrdersFrequencyByPeriodInput } from '@/controllers/graphql/inputs/orders/find-orders-frequency-by-period.input';
import { ChartData } from '@/controllers/graphql/types/chart-data';
import { FindOrdersFrequencyByPeriodService } from '@/services/orders/find-orders-frequency-by-period';

@Resolver(() => ChartData)
export class OrdersFrequencyByPeriodResolver {
  constructor(
    private readonly findOrdersFrequencyByPeriodService: FindOrdersFrequencyByPeriodService
  ) {}

  @UseGuards(AppGuard)
  @Query(() => [ChartData])
  async ordersFrequencyByPeriod(
    @CurrentApp('id') app: string,
    @Args('where', { type: () => FindOrdersFrequencyByPeriodInput })
    where: FindOrdersFrequencyByPeriodInput
  ) {
    return await this.findOrdersFrequencyByPeriodService.execute({
      ...where,
      app
    });
  }
}
