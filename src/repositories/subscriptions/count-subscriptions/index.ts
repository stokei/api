import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountSubscriptionsDTO } from '@/dtos/subscriptions/count-subscriptions.dto';
import { SubscriptionMapper } from '@/mappers/subscriptions';

@Injectable()
export class CountSubscriptionsRepository
  implements IBaseRepository<CountSubscriptionsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountSubscriptionsDTO): Promise<number> {
    const subscriptionMapper = new SubscriptionMapper();
    return await this.model.subscription.count({
      where: subscriptionMapper.toWhereFindAllPrisma(where)
    });
  }
}
