import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllSubscriptionContractItemsDTO } from '@/dtos/subscription-contract-items/find-all-subscription-contract-items.dto';
import { SubscriptionContractItemMapper } from '@/mappers/subscription-contract-items';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Injectable()
export class FindAllSubscriptionContractItemsRepository
  implements
    IBaseRepository<
      FindAllSubscriptionContractItemsDTO,
      Promise<SubscriptionContractItemModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllSubscriptionContractItemsDTO
  ): Promise<SubscriptionContractItemModel[]> {
    const subscriptionContractItemMapper = new SubscriptionContractItemMapper();
    return subscriptionContractItemMapper.toModels(
      await this.model.subscriptionContractItem.findMany(
        subscriptionContractItemMapper.toFindAllPrisma(data)
      )
    );
  }
}
