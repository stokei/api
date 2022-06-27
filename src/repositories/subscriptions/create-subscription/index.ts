import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateSubscriptionDTO } from '@/dtos/subscriptions/create-subscription.dto';
import { SubscriptionMapper } from '@/mappers/subscriptions';
import { SubscriptionModel } from '@/models/subscription.model';

@Injectable()
export class CreateSubscriptionRepository
  implements IBaseRepository<CreateSubscriptionDTO, Promise<SubscriptionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateSubscriptionDTO): Promise<SubscriptionModel> {
    return new SubscriptionMapper().toModel(
      await this.model.subscription.create({ data })
    );
  }
}
