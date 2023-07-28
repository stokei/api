import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllSubscriptionContractsByItemDTO } from '@/dtos/subscription-contracts/find-all-subscription-contracts-by-item.dto';

@Injectable()
export class CountSubscriptionContractsByItemRepository
  implements
    IBaseRepository<FindAllSubscriptionContractsByItemDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllSubscriptionContractsByItemDTO): Promise<number> {
    const app = data.where?.app?.equals;
    const parent = data.where?.parent?.equals;
    const status = data.where?.status;
    const productStartsWith = data.where?.product?.startsWith + '%';
    const response = await this.model.$queryRaw`
        SELECT COUNT(subscription_contracts.id) as total FROM subscription_contracts
        JOIN subscription_contract_items
        ON CONCAT('sub_', subscription_contracts.id) = subscription_contract_items.parent
        WHERE
          subscription_contracts.app = ${app} AND
          subscription_contracts.parent = ${parent} AND
          subscription_contracts.status = ${status} AND
          subscription_contract_items.product LIKE ${productStartsWith}
      `;
    return Number((response?.[0] as any)?.total) || 0;
  }
}
