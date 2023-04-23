import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { SubscriptionContractItemMapper } from '@/mappers/subscription-contract-items';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Injectable()
export class FindSubscriptionContractItemByIdRepository
  implements IBaseRepository<string, Promise<SubscriptionContractItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<SubscriptionContractItemModel> {
    return new SubscriptionContractItemMapper().toModel(
      await this.model.subscriptionContractItem.findUnique({
        where: { id }
      })
    );
  }
}
