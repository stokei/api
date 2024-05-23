import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindPaymentMethodsMostUsedByPeriodDTO } from '@/dtos/payment-methods/find-payment-methods-most-used-by-period.dto';
import { ChartDataModel } from '@/models/chart-data.model';
import { FindPaymentMethodsMostUsedByPeriodQuery } from '@/queries/implements/payment-methods/find-payment-methods-most-used-by-period.query';

@Injectable()
export class FindPaymentMethodsMostUsedByPeriodService
  implements
    IBaseService<
      FindPaymentMethodsMostUsedByPeriodDTO,
      Promise<ChartDataModel[]>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindPaymentMethodsMostUsedByPeriodDTO
  ): Promise<ChartDataModel[]> {
    return await this.queryBus.execute(
      new FindPaymentMethodsMostUsedByPeriodQuery(data)
    );
  }
}
