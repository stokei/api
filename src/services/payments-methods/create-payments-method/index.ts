import { CreatePaymentsMethodCommand } from '@/commands/implements/payments-methods/create-payments-method.command';
import { CreatePaymentsMethodDTO } from '@/dtos/payments-methods/create-payments-method.dto';
import { PaymentsMethodModel } from '@/models/payments-method.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreatePaymentsMethodService
  implements
    IBaseService<CreatePaymentsMethodDTO, Promise<PaymentsMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePaymentsMethodDTO): Promise<PaymentsMethodModel> {
    return await this.commandBus.execute(new CreatePaymentsMethodCommand(data));
  }
}
