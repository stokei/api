import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateSubscriptionContractItemDTO } from '@/dtos/subscription-contract-items/create-subscription-contract-item.dto';
import { SubscriptionContractItemMapper } from '@/mappers/subscription-contract-items';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Injectable()
export class CreateSubscriptionContractItemRepository
  implements
    IBaseRepository<
      CreateSubscriptionContractItemDTO,
      Promise<SubscriptionContractItemModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateSubscriptionContractItemDTO
  ): Promise<SubscriptionContractItemModel> {
    return new SubscriptionContractItemMapper().toModel(
      await this.model.subscriptionContractItem.create({ data })
    );
  }
}
