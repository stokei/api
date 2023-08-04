import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePaymentMethodBoletoCommand } from '@/commands/implements/payment-methods/create-payment-method-boleto.command';
import { CreatePaymentMethodBoletoDTO } from '@/dtos/payment-methods/create-payment-method-boleto.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodBoletoService
  implements
    IBaseService<CreatePaymentMethodBoletoDTO, Promise<PaymentMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreatePaymentMethodBoletoDTO
  ): Promise<PaymentMethodModel> {
    return await this.commandBus.execute(
      new CreatePaymentMethodBoletoCommand(data)
    );
  }
}
