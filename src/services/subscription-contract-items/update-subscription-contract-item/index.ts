import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/update-subscription-contract-item.command';
import { UpdateSubscriptionContractItemDTO } from '@/dtos/subscription-contract-items/update-subscription-contract-item.dto';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Injectable()
export class UpdateSubscriptionContractItemService
  implements
    IBaseService<
      UpdateSubscriptionContractItemDTO,
      Promise<SubscriptionContractItemModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateSubscriptionContractItemDTO
  ): Promise<SubscriptionContractItemModel> {
    return await this.commandBus.execute(
      new UpdateSubscriptionContractItemCommand(data)
    );
  }
}
