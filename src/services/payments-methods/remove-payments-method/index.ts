import { RemovePaymentsMethodCommand } from '@/commands/implements/payments-methods/remove-payments-method.command';
import { RemovePaymentsMethodDTO } from '@/dtos/payments-methods/remove-payments-method.dto';
import { PaymentsMethodModel } from '@/models/payments-method.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemovePaymentsMethodService
  implements
    IBaseService<RemovePaymentsMethodDTO, Promise<PaymentsMethodModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemovePaymentsMethodDTO): Promise<PaymentsMethodModel> {
    return await this.commandBus.execute(new RemovePaymentsMethodCommand(data));
  }
}
