import { IQuery } from '@nestjs/cqrs';

import { FindPaymentMethodsMostUsedByPeriodDTO } from '@/dtos/payment-methods/find-payment-methods-most-used-by-period.dto';

export class FindPaymentMethodsMostUsedByPeriodQuery
  implements IQuery, FindPaymentMethodsMostUsedByPeriodDTO
{
  app: string;
  startAt: string;
  endAt: string;

  constructor(data: FindPaymentMethodsMostUsedByPeriodDTO) {
    this.app = data.app;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
  }
}
