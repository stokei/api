import { ICommand } from '@nestjs/cqrs';

import { CancelOrderSubscriptionContractsDTO } from '@/dtos/orders/cancel-order-subscription-contracts.dto';

export class CancelOrderSubscriptionContractsCommand
  implements ICommand, CancelOrderSubscriptionContractsDTO
{
  order: string;
  app: string;
  createdBy: string;

  constructor(data: CancelOrderSubscriptionContractsDTO) {
    this.order = data.order;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
