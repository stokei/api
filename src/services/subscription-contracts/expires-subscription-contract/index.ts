import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ExpiresSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/expires-subscription-contract.command';
import { ExpiresSubscriptionContractDTO } from '@/dtos/subscription-contracts/expires-subscription-contract.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class ExpiresSubscriptionContractService
  implements
    IBaseService<
      ExpiresSubscriptionContractDTO,
      Promise<SubscriptionContractModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: ExpiresSubscriptionContractDTO
  ): Promise<SubscriptionContractModel> {
    return await this.commandBus.execute(
      new ExpiresSubscriptionContractCommand(data)
    );
  }
}
