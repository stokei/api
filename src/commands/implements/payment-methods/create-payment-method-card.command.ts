import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodCardDTO } from '@/dtos/payment-methods/create-payment-method-card.dto';

export class CreatePaymentMethodCardCommand
  implements ICommand, CreatePaymentMethodCardDTO
{
  parent: string;
  stripePaymentMethod: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodCardDTO) {
    this.parent = data.parent;
    this.stripePaymentMethod = data.stripePaymentMethod;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
