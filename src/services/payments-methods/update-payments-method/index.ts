import { UpdatePaymentsMethodCommand } from '@/commands/implements/payments-methods/update-payments-method.command';
import { UpdatePaymentsMethodDTO } from '@/dtos/payments-methods/update-payments-method.dto';
import { PaymentsMethodModel } from '@/models/payments-method.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdatePaymentsMethodService
  implements
    IBaseService<UpdatePaymentsMethodDTO, Promise<PaymentsMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePaymentsMethodDTO): Promise<PaymentsMethodModel> {
    return await this.commandBus.execute(new UpdatePaymentsMethodCommand(data));
  }
}
