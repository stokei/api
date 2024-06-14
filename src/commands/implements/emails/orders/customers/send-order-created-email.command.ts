import { ICommand } from '@nestjs/cqrs';

import { SendOrdersCustomersOrderCreatedEmailDTO } from '@/dtos/emails/send-order-created-email.dto';
import { OrderModel } from '@/models/order.model';

export class SendOrdersCustomersOrderCreatedEmailCommand
  implements ICommand, SendOrdersCustomersOrderCreatedEmailDTO
{
  toAccount: string;
  order: OrderModel;
  app: string;
  createdBy: string;

  constructor(data: SendOrdersCustomersOrderCreatedEmailDTO) {
    this.toAccount = data.toAccount;
    this.order = data.order;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
