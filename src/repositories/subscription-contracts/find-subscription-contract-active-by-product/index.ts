import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindSubscriptionContractActiveByProductDTO } from '@/dtos/subscription-contracts/find-subscription-contract-active-by-product.dto';
import { SubscriptionContractMapper } from '@/mappers/subscription-contracts';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Injectable()
export class FindSubscriptionContractActiveByProductRepository
  implements
    IBaseRepository<
      FindSubscriptionContractActiveByProductDTO,
      Promise<SubscriptionContractModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindSubscriptionContractActiveByProductDTO
  ): Promise<SubscriptionContractModel> {
    const subscriptionContractMapper = new SubscriptionContractMapper();
    const response = await this.model.$queryRaw`
      SELECT subscription_contracts.* FROM subscription_contracts 
      JOIN subscription_contract_items
      ON CONCAT('sub_', subscription_contracts.id) = subscription_contract_items.parent
      WHERE
        subscription_contracts.app = ${data.app} AND
        subscription_contracts.parent = ${data.customer} AND
        subscription_contracts.status = 'ACTIVE' AND
        subscription_contract_items.product = ${data?.product}
      LIMIT 1
    `;
    return subscriptionContractMapper.toModel(response?.[0]);
  }
}
