import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanDate, cleanObject, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { ChartDataModel } from '@/models/chart-data.model';
import { FindAccessesHoursByPeriodQuery } from '@/queries/implements/accesses/find-accesses-hours-by-period.query';
import { FindAccessesHoursByPeriodRepository } from '@/repositories/accesses/find-accesses-hours-by-period';

type KeysFindAccessesHoursByPeriodQuery = keyof FindAccessesHoursByPeriodQuery;

@QueryHandler(FindAccessesHoursByPeriodQuery)
export class FindAccessesHoursByPeriodQueryHandler
  implements IQueryHandler<FindAccessesHoursByPeriodQuery>
{
  constructor(
    private readonly findAccessesChartDataRepository: FindAccessesHoursByPeriodRepository
  ) {}

  async execute(
    query: FindAccessesHoursByPeriodQuery
  ): Promise<ChartDataModel[]> {
    const data = this.clearData(query);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<KeysFindAccessesHoursByPeriodQuery>(
        'app'
      );
    }
    if (!data.startAt) {
      throw new ParamNotFoundException<KeysFindAccessesHoursByPeriodQuery>(
        'startAt'
      );
    }
    if (!data.endAt) {
      throw new ParamNotFoundException<KeysFindAccessesHoursByPeriodQuery>(
        'endAt'
      );
    }
    return await this.findAccessesChartDataRepository.execute(data);
  }

  private clearData(
    data: FindAccessesHoursByPeriodQuery
  ): FindAccessesHoursByPeriodQuery {
    return cleanObject({
      app: cleanValue(data.app),
      startAt: cleanDate(data.startAt),
      endAt: cleanDate(data.endAt)
    });
  }
}
