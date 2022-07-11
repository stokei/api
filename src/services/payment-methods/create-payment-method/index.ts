import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePaymentMethodCommand } from '@/commands/implements/payment-methods/create-payment-method.command';
import { CreatePaymentMethodDTO } from '@/dtos/payment-methods/create-payment-method.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodService
  implements IBaseService<CreatePaymentMethodDTO, Promise<PaymentMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePaymentMethodDTO): Promise<PaymentMethodModel> {
    return await this.commandBus.execute(new CreatePaymentMethodCommand(data));
  }
}
