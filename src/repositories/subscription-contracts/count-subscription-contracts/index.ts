import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountSubscriptionContractsDTO } from '@/dtos/subscription-contracts/count-subscription-contracts.dto';
import { SubscriptionContractMapper } from '@/mappers/subscription-contracts';

@Injectable()
export class CountSubscriptionContractsRepository
  implements IBaseRepository<CountSubscriptionContractsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountSubscriptionContractsDTO): Promise<number> {
    const subscriptionContractMapper = new SubscriptionContractMapper();
    return await this.model.subscriptionContract.count({
      where: subscriptionContractMapper.toWhereFindAllPrisma(where)
    });
  }
}
