import { ICommand } from '@nestjs/cqrs';

import { ActivateOrderSubscriptionContractsDTO } from '@/dtos/orders/activate-order-subscription-contracts.dto';

export class ActivateOrderSubscriptionContractsCommand
  implements ICommand, ActivateOrderSubscriptionContractsDTO
{
  order: string;
  app: string;
  createdBy: string;

  constructor(data: ActivateOrderSubscriptionContractsDTO) {
    this.order = data.order;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
