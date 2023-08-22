import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangePaymentToPaidCommand } from '@/commands/implements/payments/change-payment-to-paid.command';
import { ChangePaymentToPaidDTO } from '@/dtos/payments/change-payment-to-paid.dto';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class ChangePaymentToPaidService
  implements IBaseService<ChangePaymentToPaidDTO, Promise<PaymentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangePaymentToPaidDTO): Promise<PaymentModel> {
    return await this.commandBus.execute(new ChangePaymentToPaidCommand(data));
  }
}
