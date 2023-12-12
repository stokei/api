import { ICommand } from '@nestjs/cqrs';

import { SendOrderCreatedEmailDTO } from '@/dtos/emails/send-order-created-email.dto';
import { OrderModel } from '@/models/order.model';

export class SendOrderCreatedEmailCommand
  implements ICommand, SendOrderCreatedEmailDTO
{
  toAccount: string;
  order: OrderModel;
  app: string;
  createdBy: string;

  constructor(data: SendOrderCreatedEmailDTO) {
    this.toAccount = data.toAccount;
    this.order = data.order;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
