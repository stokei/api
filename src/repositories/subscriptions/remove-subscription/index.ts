import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveSubscriptionDTO } from '@/dtos/subscriptions/remove-subscription.dto';

@Injectable()
export class RemoveSubscriptionRepository
  implements IBaseRepository<RemoveSubscriptionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveSubscriptionDTO): Promise<boolean> {
    const removed = await this.model.subscription.delete({
      where: {
        id: where?.subscriptionId
      }
    });
    return !!removed;
  }
}
