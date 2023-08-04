import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePaymentMethodCardCommand } from '@/commands/implements/payment-methods/create-payment-method-card.command';
import { CreatePaymentMethodCardDTO } from '@/dtos/payment-methods/create-payment-method-card.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodCardService
  implements
    IBaseService<CreatePaymentMethodCardDTO, Promise<PaymentMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePaymentMethodCardDTO): Promise<PaymentMethodModel> {
    return await this.commandBus.execute(
      new CreatePaymentMethodCardCommand(data)
    );
  }
}
