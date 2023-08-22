import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CancelOrderSubscriptionContractsCommand } from '@/commands/implements/orders/cancel-order-subscription-contracts.command';
import { CancelOrderSubscriptionContractsDTO } from '@/dtos/orders/cancel-order-subscription-contracts.dto';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class CancelOrderSubscriptionContractsService
  implements
    IBaseService<CancelOrderSubscriptionContractsDTO, Promise<OrderModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CancelOrderSubscriptionContractsDTO
  ): Promise<OrderModel> {
    return await this.commandBus.execute(
      new CancelOrderSubscriptionContractsCommand(data)
    );
  }
}
