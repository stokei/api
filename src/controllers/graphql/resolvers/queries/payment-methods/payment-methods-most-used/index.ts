import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { FindPaymentMethodsMostUsedByPeriodInput } from '@/controllers/graphql/inputs/payment-methods/find-payment-methods-most-used-by-period.input';
import { ChartData } from '@/controllers/graphql/types/chart-data';
import { FindPaymentMethodsMostUsedByPeriodService } from '@/services/payment-methods/find-payment-methods-most-used-by-period';

@Resolver(() => ChartData)
export class PaymentMethodsMostUsedByPeriodResolver {
  constructor(
    private readonly findPaymentMethodsMostUsedByPeriodService: FindPaymentMethodsMostUsedByPeriodService
  ) {}

  @UseGuards(AppGuard)
  @Query(() => [ChartData])
  async paymentMethodsMostUsedByPeriod(
    @CurrentApp('id') app: string,
    @Args('where', { type: () => FindPaymentMethodsMostUsedByPeriodInput })
    where: FindPaymentMethodsMostUsedByPeriodInput
  ) {
    return await this.findPaymentMethodsMostUsedByPeriodService.execute({
      ...where,
      app
    });
  }
}
