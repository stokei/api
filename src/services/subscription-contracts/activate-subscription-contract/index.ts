import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/activate-subscription-contract.command';
import { ActivateSubscriptionContractDTO } from '@/dtos/subscription-contracts/activate-subscription-contract.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class ActivateSubscriptionContractService
  implements
    IBaseService<
      ActivateSubscriptionContractDTO,
      Promise<SubscriptionContractModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: ActivateSubscriptionContractDTO
  ): Promise<SubscriptionContractModel> {
    return await this.commandBus.execute(
      new ActivateSubscriptionContractCommand(data)
    );
  }
}
