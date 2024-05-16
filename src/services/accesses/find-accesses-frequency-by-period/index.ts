import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindAccessesFrequencyByPeriodDTO } from '@/dtos/accesses/find-accesses-frequency-by-period.dto';
import { ChartDataModel } from '@/models/chart-data.model';
import { FindAccessesFrequencyByPeriodQuery } from '@/queries/implements/accesses/find-accesses-frequency-by-period.query';

@Injectable()
export class FindAccessesFrequencyByPeriodService
  implements
    IBaseService<FindAccessesFrequencyByPeriodDTO, Promise<ChartDataModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAccessesFrequencyByPeriodDTO
  ): Promise<ChartDataModel[]> {
    return await this.queryBus.execute(
      new FindAccessesFrequencyByPeriodQuery(data)
    );
  }
}
