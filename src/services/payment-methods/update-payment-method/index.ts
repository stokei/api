import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdatePaymentMethodCommand } from '@/commands/implements/payment-methods/update-payment-method.command';
import { UpdatePaymentMethodDTO } from '@/dtos/payment-methods/update-payment-method.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class UpdatePaymentMethodService
  implements IBaseService<UpdatePaymentMethodDTO, Promise<PaymentMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePaymentMethodDTO): Promise<PaymentMethodModel> {
    return await this.commandBus.execute(new UpdatePaymentMethodCommand(data));
  }
}
