import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/remove-subscription-contract-item.command';
import { RemoveSubscriptionContractItemDTO } from '@/dtos/subscription-contract-items/remove-subscription-contract-item.dto';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Injectable()
export class RemoveSubscriptionContractItemService
  implements
    IBaseService<
      RemoveSubscriptionContractItemDTO,
      Promise<SubscriptionContractItemModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveSubscriptionContractItemDTO
  ): Promise<SubscriptionContractItemModel> {
    return await this.commandBus.execute(
      new RemoveSubscriptionContractItemCommand(data)
    );
  }
}
