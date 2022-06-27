import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateSubscriptionDTO } from '@/dtos/subscriptions/update-subscription.dto';

@Injectable()
export class UpdateSubscriptionRepository
  implements IBaseRepository<UpdateSubscriptionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateSubscriptionDTO): Promise<boolean> {
    const updated = await this.model.subscription.update({
      where: {
        id: where?.subscriptionId
      },
      data
    });
    return !!updated;
  }
}
