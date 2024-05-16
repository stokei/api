import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindOrdersFrequencyByPeriodDTO } from '@/dtos/orders/find-orders-frequency-by-period.dto';
import { ChartDataModel } from '@/models/chart-data.model';
import { FindOrdersFrequencyByPeriodQuery } from '@/queries/implements/orders/find-orders-frequency-by-period.query';

@Injectable()
export class FindOrdersFrequencyByPeriodService
  implements
    IBaseService<FindOrdersFrequencyByPeriodDTO, Promise<ChartDataModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindOrdersFrequencyByPeriodDTO
  ): Promise<ChartDataModel[]> {
    return await this.queryBus.execute(
      new FindOrdersFrequencyByPeriodQuery(data)
    );
  }
}
