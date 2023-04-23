import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveItemFromAppSubscriptionContractCommand } from '@/commands/implements/apps/remove-item-from-app-subscription-contract.command';
import { RemoveItemFromAppSubscriptionContractDTO } from '@/dtos/apps/remove-item-from-app-subscription-contract.dto';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Injectable()
export class RemoveItemFromAppSubscriptionContractService
  implements
    IBaseService<
      RemoveItemFromAppSubscriptionContractDTO,
      Promise<SubscriptionContractItemModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveItemFromAppSubscriptionContractDTO
  ): Promise<SubscriptionContractItemModel> {
    return await this.commandBus.execute(
      new RemoveItemFromAppSubscriptionContractCommand(data)
    );
  }
}
