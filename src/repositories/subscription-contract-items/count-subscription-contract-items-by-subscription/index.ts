import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllSubscriptionContractItemsBySubscriptionDTO } from '@/dtos/subscription-contract-items/find-all-subscription-contract-items-by-subscription.dto';

@Injectable()
export class CountSubscriptionContractItemsBySubscriptionRepository
  implements
    IBaseRepository<
      FindAllSubscriptionContractItemsBySubscriptionDTO,
      Promise<number>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllSubscriptionContractItemsBySubscriptionDTO
  ): Promise<number> {
    const app = data.where?.app?.equals;
    const parent = data.where?.parent?.equals;
    const status = data.where?.status;
    const productStartsWith = data.where?.product?.startsWith + '%';
    const response = await this.model.$queryRaw`
        SELECT COUNT(subscription_contract_items.id) as total FROM subscription_contracts
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
