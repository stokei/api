import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangeOrderToPaymentErrorCommand } from '@/commands/implements/orders/change-order-to-payment-error.command';
import { ChangeOrderToPaymentErrorDTO } from '@/dtos/orders/change-order-to-payment-error.dto';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class ChangeOrderToPaymentErrorService
  implements IBaseService<ChangeOrderToPaymentErrorDTO, Promise<OrderModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangeOrderToPaymentErrorDTO): Promise<OrderModel> {
    return await this.commandBus.execute(
      new ChangeOrderToPaymentErrorCommand(data)
    );
  }
}
