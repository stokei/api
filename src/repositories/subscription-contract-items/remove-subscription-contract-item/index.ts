import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveSubscriptionContractItemDTO } from '@/dtos/subscription-contract-items/remove-subscription-contract-item.dto';

@Injectable()
export class RemoveSubscriptionContractItemRepository
  implements
    IBaseRepository<RemoveSubscriptionContractItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    where
  }: RemoveSubscriptionContractItemDTO): Promise<boolean> {
    const removed = await this.model.subscriptionContractItem.delete({
      where: {
        id: where?.subscriptionContractItem
      }
    });
    return !!removed;
  }
}
