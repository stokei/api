import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePagarmeCheckoutCommand } from '@/commands/implements/checkouts/create-pagarme-checkout.command';
import { CreateStripeCheckoutCommand } from '@/commands/implements/checkouts/create-stripe-checkout.command';
import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout-order.dto';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class CreateCheckoutService
  implements IBaseService<CreateCheckoutDTO, Promise<CheckoutModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCheckoutDTO): Promise<CheckoutModel> {
    if (data.paymentMethodType === PaymentMethodType.PIX) {
      return await this.commandBus.execute(
        new CreatePagarmeCheckoutCommand(data)
      );
    }
    return await this.commandBus.execute(new CreateStripeCheckoutCommand(data));
  }
}
