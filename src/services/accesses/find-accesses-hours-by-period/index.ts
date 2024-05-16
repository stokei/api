import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindAccessesHoursByPeriodDTO } from '@/dtos/accesses/find-accesses-hours-by-period.dto';
import { ChartDataModel } from '@/models/chart-data.model';
import { FindAccessesHoursByPeriodQuery } from '@/queries/implements/accesses/find-accesses-hours-by-period.query';

@Injectable()
export class FindAccessesHoursByPeriodService
  implements
    IBaseService<FindAccessesHoursByPeriodDTO, Promise<ChartDataModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAccessesHoursByPeriodDTO): Promise<ChartDataModel[]> {
    return await this.queryBus.execute(
      new FindAccessesHoursByPeriodQuery(data)
    );
  }
}
