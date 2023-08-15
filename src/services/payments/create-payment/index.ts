import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePaymentCommand } from '@/commands/implements/payments/create-payment.command';
import { CreatePaymentDTO } from '@/dtos/payments/create-payment.dto';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class CreatePaymentService
  implements IBaseService<CreatePaymentDTO, Promise<PaymentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePaymentDTO): Promise<PaymentModel> {
    return await this.commandBus.execute(new CreatePaymentCommand(data));
  }
}
