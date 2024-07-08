import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllSubscriptionContractsDTO } from '@/dtos/subscription-contracts/find-all-subscription-contracts.dto';
import { SubscriptionContractMapper } from '@/mappers/subscription-contracts';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class FindAllSubscriptionContractsRepository
  implements
    IBaseRepository<
      FindAllSubscriptionContractsDTO,
      Promise<SubscriptionContractModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllSubscriptionContractsDTO
  ): Promise<SubscriptionContractModel[]> {
    const subscriptionContractMapper = new SubscriptionContractMapper();
    console.log(subscriptionContractMapper.toFindAllPrisma(data));
    return subscriptionContractMapper.toModels(
      await this.model.subscriptionContract.findMany(
        subscriptionContractMapper.toFindAllPrisma(data)
      )
    );
  }
}
