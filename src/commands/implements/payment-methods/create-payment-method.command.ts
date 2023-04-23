import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodDTO } from '@/dtos/payment-methods/create-payment-method.dto';

export class CreatePaymentMethodCommand
  implements ICommand, CreatePaymentMethodDTO
{
  parent: string;
  stripePaymentMethod: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodDTO) {
    this.parent = data.parent;
    this.stripePaymentMethod = data.stripePaymentMethod;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
