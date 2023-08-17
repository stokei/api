import { ICommand } from '@nestjs/cqrs';

import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout.dto';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export class CreateStripeCheckoutCommand
  implements ICommand, CreateCheckoutDTO
{
  paymentMethodType: PaymentMethodType;
  app: string;
  customer: string;
  price: string;
  createdBy: string;

  constructor(data: CreateCheckoutDTO) {
    this.paymentMethodType = data.paymentMethodType;
    this.app = data.app;
    this.customer = data.customer;
    this.price = data.price;
    this.createdBy = data.createdBy;
  }
}
