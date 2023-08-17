import { ICommand } from '@nestjs/cqrs';

import { ChangeOrderToPaymentErrorDTO } from '@/dtos/orders/change-order-to-payment-error.dto';

export class ChangeOrderToPaymentErrorCommand
  implements ICommand, ChangeOrderToPaymentErrorDTO
{
  app: string;
  order: string;
  updatedBy: string;

  constructor(data: ChangeOrderToPaymentErrorDTO) {
    this.app = data.app;
    this.order = data.order;
    this.updatedBy = data.updatedBy;
  }
}
