import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/create-subscription-contract-item.command';
import { CreateSubscriptionContractItemDTO } from '@/dtos/subscription-contract-items/create-subscription-contract-item.dto';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Injectable()
export class CreateSubscriptionContractItemService
  implements
    IBaseService<
      CreateSubscriptionContractItemDTO,
      Promise<SubscriptionContractItemModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateSubscriptionContractItemDTO
  ): Promise<SubscriptionContractItemModel> {
    return await this.commandBus.execute(
      new CreateSubscriptionContractItemCommand(data)
    );
  }
}
