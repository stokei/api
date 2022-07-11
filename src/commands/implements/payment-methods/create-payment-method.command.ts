import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodDTO } from '@/dtos/payment-methods/create-payment-method.dto';

export class CreatePaymentMethodCommand
  implements ICommand, CreatePaymentMethodDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
