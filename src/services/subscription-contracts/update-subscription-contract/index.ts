import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/update-subscription-contract.command';
import { UpdateSubscriptionContractDTO } from '@/dtos/subscription-contracts/update-subscription-contract.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class UpdateSubscriptionContractService
  implements
    IBaseService<
      UpdateSubscriptionContractDTO,
      Promise<SubscriptionContractModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateSubscriptionContractDTO
  ): Promise<SubscriptionContractModel> {
    return await this.commandBus.execute(
      new UpdateSubscriptionContractCommand(data)
    );
  }
}
