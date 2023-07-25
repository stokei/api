import { Injectable } from '@nestjs/common';
import { getPageLimit, getPageSkip, IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllSubscriptionContractsByItemDTO } from '@/dtos/subscription-contracts/find-all-subscription-contracts-by-item.dto';
import { SubscriptionContractMapper } from '@/mappers/subscription-contracts';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class FindAllSubscriptionContractsByItemRepository
  implements
    IBaseRepository<
      FindAllSubscriptionContractsByItemDTO,
      Promise<SubscriptionContractModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllSubscriptionContractsByItemDTO
  ): Promise<SubscriptionContractModel[]> {
    const subscriptionContractMapper = new SubscriptionContractMapper();
    const pageLimit = getPageLimit(data?.page?.limit);
    const pageSkip = getPageSkip(data?.page?.number, pageLimit);
    const app = data.where?.app?.equals;
    const parent = data.where?.parent?.equals;
    const productStartsWith = data.where?.product?.startsWith + '%';
    return subscriptionContractMapper.toModels(
      await this.model.$queryRaw`
        SELECT subscription_contracts.* FROM subscription_contracts 
        JOIN subscription_contract_items
        ON CONCAT('sub_', subscription_contracts.id) = subscription_contract_items.parent
        WHERE
          subscription_contracts.app = ${app} AND
          subscription_contracts.parent = ${parent} AND
          subscription_contract_items.product LIKE ${productStartsWith}
        ORDER BY subscription_contracts.created_at DESC
        LIMIT ${pageLimit}
        OFFSET ${pageSkip}
      `
    );
  }
}
