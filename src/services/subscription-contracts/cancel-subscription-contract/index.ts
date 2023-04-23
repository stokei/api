import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CancelSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/cancel-subscription-contract.command';
import { CancelSubscriptionContractDTO } from '@/dtos/subscription-contracts/cancel-subscription-contract.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class CancelSubscriptionContractService
  implements
    IBaseService<
      CancelSubscriptionContractDTO,
      Promise<SubscriptionContractModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CancelSubscriptionContractDTO
  ): Promise<SubscriptionContractModel> {
    return await this.commandBus.execute(
      new CancelSubscriptionContractCommand(data)
    );
  }
}
