import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodPixDTO } from '@/dtos/payment-methods/create-payment-method-pix.dto';

export class CreatePaymentMethodPixCommand
  implements ICommand, CreatePaymentMethodPixDTO
{
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodPixDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
