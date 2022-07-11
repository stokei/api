import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemovePaymentMethodCommand } from '@/commands/implements/payment-methods/remove-payment-method.command';
import { RemovePaymentMethodDTO } from '@/dtos/payment-methods/remove-payment-method.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class RemovePaymentMethodService
  implements IBaseService<RemovePaymentMethodDTO, Promise<PaymentMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemovePaymentMethodDTO): Promise<PaymentMethodModel> {
    return await this.commandBus.execute(new RemovePaymentMethodCommand(data));
  }
}
