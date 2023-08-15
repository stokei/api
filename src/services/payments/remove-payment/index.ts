import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemovePaymentCommand } from '@/commands/implements/payments/remove-payment.command';
import { RemovePaymentDTO } from '@/dtos/payments/remove-payment.dto';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class RemovePaymentService
  implements IBaseService<RemovePaymentDTO, Promise<PaymentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemovePaymentDTO): Promise<PaymentModel> {
    return await this.commandBus.execute(new RemovePaymentCommand(data));
  }
}
