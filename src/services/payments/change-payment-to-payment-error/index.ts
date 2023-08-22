import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangePaymentToPaymentErrorCommand } from '@/commands/implements/payments/change-payment-to-payment-error.command';
import { ChangePaymentToPaymentErrorDTO } from '@/dtos/payments/change-payment-to-payment-error.dto';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class ChangePaymentToPaymentErrorService
  implements
    IBaseService<ChangePaymentToPaymentErrorDTO, Promise<PaymentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangePaymentToPaymentErrorDTO): Promise<PaymentModel> {
    return await this.commandBus.execute(
      new ChangePaymentToPaymentErrorCommand(data)
    );
  }
}
