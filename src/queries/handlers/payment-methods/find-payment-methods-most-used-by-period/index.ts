import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanDate, cleanObject, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { ChartDataModel } from '@/models/chart-data.model';
import { FindPaymentMethodsMostUsedByPeriodQuery } from '@/queries/implements/payment-methods/find-payment-methods-most-used-by-period.query';
import { FindPaymentMethodsMostUsedByPeriodRepository } from '@/repositories/payment-methods/find-payment-methods-most-used-by-period';

type KeysFindPaymentMethodsMostUsedByPeriodQuery =
  keyof FindPaymentMethodsMostUsedByPeriodQuery;

@QueryHandler(FindPaymentMethodsMostUsedByPeriodQuery)
export class FindPaymentMethodsMostUsedByPeriodQueryHandler
  implements IQueryHandler<FindPaymentMethodsMostUsedByPeriodQuery>
{
  constructor(
    private readonly findAccessesChartDataRepository: FindPaymentMethodsMostUsedByPeriodRepository
  ) {}

  async execute(
    query: FindPaymentMethodsMostUsedByPeriodQuery
  ): Promise<ChartDataModel[]> {
    const data = this.clearData(query);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.app) {
      throw new ParamNotFoundException<KeysFindPaymentMethodsMostUsedByPeriodQuery>(
        'app'
      );
    }
    if (!data.startAt) {
      throw new ParamNotFoundException<KeysFindPaymentMethodsMostUsedByPeriodQuery>(
        'startAt'
      );
    }
    if (!data.endAt) {
      throw new ParamNotFoundException<KeysFindPaymentMethodsMostUsedByPeriodQuery>(
        'endAt'
      );
    }
    return await this.findAccessesChartDataRepository.execute(data);
  }

  private clearData(
    data: FindPaymentMethodsMostUsedByPeriodQuery
  ): FindPaymentMethodsMostUsedByPeriodQuery {
    return cleanObject({
      app: cleanValue(data.app),
      startAt: cleanDate(data.startAt),
      endAt: cleanDate(data.endAt)
    });
  }
}
