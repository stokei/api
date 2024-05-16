import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { FindAccessesHoursByPeriodInput } from '@/controllers/graphql/inputs/accesses/find-accesses-hours-by-period.input';
import { ChartData } from '@/controllers/graphql/types/chart-data';
import { FindAccessesHoursByPeriodService } from '@/services/accesses/find-accesses-hours-by-period';

@Resolver(() => ChartData)
export class AccessesHoursByPeriodResolver {
  constructor(
    private readonly findAccessesHoursByPeriodService: FindAccessesHoursByPeriodService
  ) {}

  @UseGuards(AppGuard)
  @Query(() => [ChartData])
  async accessesHoursByPeriod(
    @CurrentApp('id') app: string,
    @Args('where', { type: () => FindAccessesHoursByPeriodInput })
    where: FindAccessesHoursByPeriodInput
  ) {
    return await this.findAccessesHoursByPeriodService.execute({
      ...where,
      app
    });
  }
}
