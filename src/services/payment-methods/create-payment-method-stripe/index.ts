import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePaymentMethodStripeCommand } from '@/commands/implements/payment-methods/create-payment-method-stripe.command';
import { CreatePaymentMethodStripeDTO } from '@/dtos/payment-methods/create-payment-method-stripe.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodStripeService
  implements
    IBaseService<CreatePaymentMethodStripeDTO, Promise<PaymentMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreatePaymentMethodStripeDTO
  ): Promise<PaymentMethodModel> {
    return await this.commandBus.execute(
      new CreatePaymentMethodStripeCommand(data)
    );
  }
}
