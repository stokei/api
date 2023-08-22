import { ICommand } from '@nestjs/cqrs';

import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout-order.dto';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export class CreateStripeCheckoutCommand
  implements ICommand, CreateCheckoutDTO
{
  paymentMethodType: PaymentMethodType;
  app: string;
  customer: string;
  order: string;
  createdBy: string;

  constructor(data: CreateCheckoutDTO) {
    this.paymentMethodType = data.paymentMethodType;
    this.app = data.app;
    this.customer = data.customer;
    this.order = data.order;
    this.createdBy = data.createdBy;
  }
}
