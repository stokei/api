import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateSubscriptionContractItemDTO } from '@/dtos/subscription-contract-items/update-subscription-contract-item.dto';

@Injectable()
export class UpdateSubscriptionContractItemRepository
  implements
    IBaseRepository<UpdateSubscriptionContractItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: UpdateSubscriptionContractItemDTO): Promise<boolean> {
    const updated = await this.model.subscriptionContractItem.update({
      where: {
        id: where?.subscriptionContractItem
      },
      data
    });
    return !!updated;
  }
}
