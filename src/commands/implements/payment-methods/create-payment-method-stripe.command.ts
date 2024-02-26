import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodStripeDTO } from '@/dtos/payment-methods/create-payment-method-stripe.dto';

export class CreatePaymentMethodStripeCommand
  implements ICommand, CreatePaymentMethodStripeDTO
{
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodStripeDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
