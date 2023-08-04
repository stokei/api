import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodBoletoDTO } from '@/dtos/payment-methods/create-payment-method-boleto.dto';

export class CreatePaymentMethodBoletoCommand
  implements ICommand, CreatePaymentMethodBoletoDTO
{
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodBoletoDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
