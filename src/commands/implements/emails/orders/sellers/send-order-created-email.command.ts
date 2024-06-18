import { ICommand } from '@nestjs/cqrs';

import { SendOrdersSellersOrderCreatedEmailDTO } from '@/dtos/emails/orders/sellers/send-order-created-email.dto';
import { OrderModel } from '@/models/order.model';

export class SendOrdersSellersOrderCreatedEmailCommand
  implements ICommand, SendOrdersSellersOrderCreatedEmailDTO
{
  order: OrderModel;
  app: string;
  createdBy: string;

  constructor(data: SendOrdersSellersOrderCreatedEmailDTO) {
    this.order = data.order;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
