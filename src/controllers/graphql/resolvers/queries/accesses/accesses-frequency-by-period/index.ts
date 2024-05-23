import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { FindAccessesFrequencyByPeriodInput } from '@/controllers/graphql/inputs/accesses/find-accesses-frequency-by-period.input';
import { ChartData } from '@/controllers/graphql/types/chart-data';
import { FindAccessesFrequencyByPeriodService } from '@/services/accesses/find-accesses-frequency-by-period';

@Resolver(() => ChartData)
export class AccessesFrequencyByPeriodResolver {
  constructor(
    private readonly findAccessesFrequencyByPeriodService: FindAccessesFrequencyByPeriodService
  ) {}

  @UseGuards(AppGuard)
  @Query(() => [ChartData])
  async accessesFrequencyByPeriod(
    @CurrentApp('id') app: string,
    @Args('where', { type: () => FindAccessesFrequencyByPeriodInput })
    where: FindAccessesFrequencyByPeriodInput
  ) {
    return await this.findAccessesFrequencyByPeriodService.execute({
      ...where,
      app
    });
  }
}
