import { ICommand } from '@nestjs/cqrs';

import { ChangeOrderToPaidDTO } from '@/dtos/orders/change-order-to-paid.dto';

export class ChangeOrderToPaidCommand
  implements ICommand, ChangeOrderToPaidDTO
{
  app: string;
  order: string;
  updatedBy: string;

  constructor(data: ChangeOrderToPaidDTO) {
    this.app = data.app;
    this.order = data.order;
    this.updatedBy = data.updatedBy;
  }
}
