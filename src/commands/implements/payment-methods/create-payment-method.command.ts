import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodDTO } from '@/dtos/payment-methods/create-payment-method.dto';

export class CreatePaymentMethodCommand
  implements ICommand, CreatePaymentMethodDTO
{
  parent: string;
  creditCardHash: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodDTO) {
    this.parent = data.parent;
    this.creditCardHash = data.creditCardHash;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
