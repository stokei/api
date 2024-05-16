import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanDate, cleanObject, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { ChartDataModel } from '@/models/chart-data.model';
import { FindOrdersFrequencyByPeriodQuery } from '@/queries/implements/orders/find-orders-frequency-by-period.query';
import { FindOrdersFrequencyByPeriodRepository } from '@/repositories/orders/find-orders-frequency-by-period';

type KeysFindOrdersFrequencyByPeriodQuery =
  keyof FindOrdersFrequencyByPeriodQuery;

@QueryHandler(FindOrdersFrequencyByPeriodQuery)
export class FindOrdersFrequencyByPeriodQueryHandler
  implements IQueryHandler<FindOrdersFrequencyByPeriodQuery>
{
  constructor(
    private readonly findOrdersChartDataRepository: FindOrdersFrequencyByPeriodRepository
  ) {}

  async execute(
    query: FindOrdersFrequencyByPeriodQuery
  ): Promise<ChartDataModel[]> {
    const data = this.clearData(query);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<KeysFindOrdersFrequencyByPeriodQuery>(
        'app'
      );
    }
    if (!data.status) {
      throw new ParamNotFoundException<KeysFindOrdersFrequencyByPeriodQuery>(
        'status'
      );
    }
    if (!data.startAt) {
      throw new ParamNotFoundException<KeysFindOrdersFrequencyByPeriodQuery>(
        'startAt'
      );
    }
    if (!data.endAt) {
      throw new ParamNotFoundException<KeysFindOrdersFrequencyByPeriodQuery>(
        'endAt'
      );
    }
    return await this.findOrdersChartDataRepository.execute(data);
  }

  private clearData(
    data: FindOrdersFrequencyByPeriodQuery
  ): FindOrdersFrequencyByPeriodQuery {
    return cleanObject({
      app: cleanValue(data.app),
      status: cleanValue(data.status),
      startAt: cleanDate(data.startAt),
      endAt: cleanDate(data.endAt)
    });
  }
}
