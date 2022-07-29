import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/create-subscription-contract.command';
import { CreateSubscriptionContractDTO } from '@/dtos/subscription-contracts/create-subscription-contract.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class CreateSubscriptionContractService
  implements
    IBaseService<
      CreateSubscriptionContractDTO,
      Promise<SubscriptionContractModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateSubscriptionContractDTO
  ): Promise<SubscriptionContractModel> {
    return await this.commandBus.execute(
      new CreateSubscriptionContractCommand(data)
    );
  }
}
