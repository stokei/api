import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanDate, cleanObject, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { ChartDataModel } from '@/models/chart-data.model';
import { FindAccessesFrequencyByPeriodQuery } from '@/queries/implements/accesses/find-accesses-frequency-by-period.query';
import { FindAccessesFrequencyByPeriodRepository } from '@/repositories/accesses/find-accesses-frequency-by-period';

type KeysFindAccessesFrequencyByPeriodQuery =
  keyof FindAccessesFrequencyByPeriodQuery;

@QueryHandler(FindAccessesFrequencyByPeriodQuery)
export class FindAccessesFrequencyByPeriodQueryHandler
  implements IQueryHandler<FindAccessesFrequencyByPeriodQuery>
{
  constructor(
    private readonly findAccessesChartDataRepository: FindAccessesFrequencyByPeriodRepository
  ) {}

  async execute(
    query: FindAccessesFrequencyByPeriodQuery
  ): Promise<ChartDataModel[]> {
    const data = this.clearData(query);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<KeysFindAccessesFrequencyByPeriodQuery>(
        'app'
      );
    }
    if (!data.startAt) {
      throw new ParamNotFoundException<KeysFindAccessesFrequencyByPeriodQuery>(
        'startAt'
      );
    }
    if (!data.endAt) {
      throw new ParamNotFoundException<KeysFindAccessesFrequencyByPeriodQuery>(
        'endAt'
      );
    }
    return await this.findAccessesChartDataRepository.execute(data);
  }

  private clearData(
    data: FindAccessesFrequencyByPeriodQuery
  ): FindAccessesFrequencyByPeriodQuery {
    return cleanObject({
      app: cleanValue(data.app),
      startAt: cleanDate(data.startAt),
      endAt: cleanDate(data.endAt)
    });
  }
}
