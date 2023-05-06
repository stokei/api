import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateSubscriptionContractByAdminCommand } from '@/commands/implements/subscription-contracts/create-subscription-contract-by-admin.command';
import { CreateSubscriptionContractByAdminDTO } from '@/dtos/subscription-contracts/create-subscription-contract-by-admin.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class CreateSubscriptionContractByAdminService
  implements
    IBaseService<
      CreateSubscriptionContractByAdminDTO,
      Promise<SubscriptionContractModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateSubscriptionContractByAdminDTO
  ): Promise<SubscriptionContractModel> {
    return await this.commandBus.execute(
      new CreateSubscriptionContractByAdminCommand(data)
    );
  }
}
