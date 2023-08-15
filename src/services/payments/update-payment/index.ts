import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdatePaymentCommand } from '@/commands/implements/payments/update-payment.command';
import { UpdatePaymentDTO } from '@/dtos/payments/update-payment.dto';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class UpdatePaymentService
  implements IBaseService<UpdatePaymentDTO, Promise<PaymentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePaymentDTO): Promise<PaymentModel> {
    return await this.commandBus.execute(new UpdatePaymentCommand(data));
  }
}
