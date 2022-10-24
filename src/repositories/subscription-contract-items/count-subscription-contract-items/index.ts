import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountSubscriptionContractItemsDTO } from '@/dtos/subscription-contract-items/count-subscription-contract-items.dto';
import { SubscriptionContractItemMapper } from '@/mappers/subscription-contract-items';

@Injectable()
export class CountSubscriptionContractItemsRepository
  implements
    IBaseRepository<CountSubscriptionContractItemsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountSubscriptionContractItemsDTO): Promise<number> {
    const subscriptionContractItemMapper = new SubscriptionContractItemMapper();
    return await this.model.subscriptionContractItem.count({
      where: subscriptionContractItemMapper.toWhereFindAllPrisma(where)
    });
  }
}
