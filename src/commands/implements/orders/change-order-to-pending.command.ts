import { ICommand } from '@nestjs/cqrs';

import { ChangeOrderToPendingDTO } from '@/dtos/orders/change-order-to-pending.dto';

export class ChangeOrderToPendingCommand
  implements ICommand, ChangeOrderToPendingDTO
{
  app: string;
  order: string;
  updatedBy: string;

  constructor(data: ChangeOrderToPendingDTO) {
    this.app = data.app;
    this.order = data.order;
    this.updatedBy = data.updatedBy;
  }
}
