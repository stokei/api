import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivateOrderSubscriptionContractsCommand } from '@/commands/implements/orders/activate-order-subscription-contracts.command';
import { ActivateOrderSubscriptionContractsDTO } from '@/dtos/orders/activate-order-subscription-contracts.dto';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class ActivateOrderSubscriptionContractsService
  implements
    IBaseService<ActivateOrderSubscriptionContractsDTO, Promise<OrderModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: ActivateOrderSubscriptionContractsDTO
  ): Promise<OrderModel> {
    return await this.commandBus.execute(
      new ActivateOrderSubscriptionContractsCommand(data)
    );
  }
}
