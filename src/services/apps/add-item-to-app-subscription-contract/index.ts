import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AddItemToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-item-to-app-subscription-contract.command';
import { AddItemToAppSubscriptionContractDTO } from '@/dtos/apps/add-item-to-app-subscription-contract.dto';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Injectable()
export class AddItemToAppSubscriptionContractService
  implements
    IBaseService<
      AddItemToAppSubscriptionContractDTO,
      Promise<SubscriptionContractItemModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: AddItemToAppSubscriptionContractDTO
  ): Promise<SubscriptionContractItemModel> {
    return await this.commandBus.execute(
      new AddItemToAppSubscriptionContractCommand(data)
    );
  }
}
