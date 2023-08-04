import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePaymentMethodPixCommand } from '@/commands/implements/payment-methods/create-payment-method-pix.command';
import { CreatePaymentMethodPixDTO } from '@/dtos/payment-methods/create-payment-method-pix.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodPixService
  implements
    IBaseService<CreatePaymentMethodPixDTO, Promise<PaymentMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePaymentMethodPixDTO): Promise<PaymentMethodModel> {
    return await this.commandBus.execute(
      new CreatePaymentMethodPixCommand(data)
    );
  }
}
