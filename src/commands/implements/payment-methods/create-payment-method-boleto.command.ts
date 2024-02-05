import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodBoletoDTO } from '@/dtos/payment-methods/create-payment-method-boleto.dto';

export class CreatePaymentMethodBoletoCommand
  implements ICommand, CreatePaymentMethodBoletoDTO
{
  boletoLine: string;
  boletoBarcode: string;
  boletoURL: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodBoletoDTO) {
    this.boletoLine = data.boletoLine;
    this.boletoBarcode = data.boletoBarcode;
    this.boletoURL = data.boletoURL;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
