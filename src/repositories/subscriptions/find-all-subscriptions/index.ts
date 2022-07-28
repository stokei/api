import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllSubscriptionsDTO } from '@/dtos/subscriptions/find-all-subscriptions.dto';
import { SubscriptionMapper } from '@/mappers/subscriptions';
import { SubscriptionModel } from '@/models/subscription.model';

@Injectable()
export class FindAllSubscriptionsRepository
  implements
    IBaseRepository<FindAllSubscriptionsDTO, Promise<SubscriptionModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllSubscriptionsDTO): Promise<SubscriptionModel[]> {
    const subscriptionMapper = new SubscriptionMapper();
    return subscriptionMapper.toModels(
      await this.model.subscription.findMany(
        subscriptionMapper.toFindAllPrisma(data)
      )
    );
  }
}
