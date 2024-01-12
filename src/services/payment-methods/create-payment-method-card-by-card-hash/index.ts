import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePaymentMethodCardByCardHashCommand } from '@/commands/implements/payment-methods/create-payment-method-card-by-card-hash.command';
import { CreatePaymentMethodCardByCardHashDTO } from '@/dtos/payment-methods/create-payment-method-card-by-card-hash.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodCardByCardHashService
  implements
    IBaseService<
      CreatePaymentMethodCardByCardHashDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreatePaymentMethodCardByCardHashDTO
  ): Promise<PaymentMethodModel> {
    return await this.commandBus.execute(
      new CreatePaymentMethodCardByCardHashCommand(data)
    );
  }
}
