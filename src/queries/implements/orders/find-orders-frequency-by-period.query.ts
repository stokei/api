import { IQuery } from '@nestjs/cqrs';

import { FindOrdersFrequencyByPeriodDTO } from '@/dtos/orders/find-orders-frequency-by-period.dto';
import { OrderStatus } from '@/enums/order-status.enum';

export class FindOrdersFrequencyByPeriodQuery
  implements IQuery, FindOrdersFrequencyByPeriodDTO
{
  app: string;
  status: OrderStatus;
  startAt: string;
  endAt: string;

  constructor(data: FindOrdersFrequencyByPeriodDTO) {
    this.app = data.app;
    this.status = data.status;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
  }
}
