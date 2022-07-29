import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateSubscriptionContractRepositoryDTO } from '@/dtos/subscription-contracts/create-subscription-contract-repository.dto';
import { SubscriptionContractMapper } from '@/mappers/subscription-contracts';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class CreateSubscriptionContractRepository
  implements
    IBaseRepository<
      CreateSubscriptionContractRepositoryDTO,
      Promise<SubscriptionContractModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateSubscriptionContractRepositoryDTO
  ): Promise<SubscriptionContractModel> {
    return new SubscriptionContractMapper().toModel(
      await this.model.subscriptionContract.create({ data })
    );
  }
}
