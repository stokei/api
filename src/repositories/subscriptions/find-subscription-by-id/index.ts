import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { SubscriptionMapper } from '@/mappers/subscriptions';
import { SubscriptionModel } from '@/models/subscription.model';

@Injectable()
export class FindSubscriptionByIdRepository
  implements IBaseRepository<string, Promise<SubscriptionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<SubscriptionModel> {
    return new SubscriptionMapper().toModel(
      await this.model.subscription.findUnique({
        where: { id }
      })
    );
  }
}
