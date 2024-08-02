import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindSubscriptionContractActiveByProductQuery } from '@/queries/implements/subscription-contracts/find-subscription-contract-active-by-product.query';
import { FindSubscriptionContractActiveByProductRepository } from '@/repositories/subscription-contracts/find-subscription-contract-active-by-product';

@QueryHandler(FindSubscriptionContractActiveByProductQuery)
export class FindSubscriptionContractActiveByProductQueryHandler
  implements IQueryHandler<FindSubscriptionContractActiveByProductQuery>
{
  constructor(
    private readonly findSubscriptionContractActiveByProductRepository: FindSubscriptionContractActiveByProductRepository
  ) {}

  async execute(
    query: FindSubscriptionContractActiveByProductQuery
  ): Promise<SubscriptionContractModel> {
    if (!query) {
      throw new DataNotFoundException();
    }
    const data = this.clearData(query);
    return await this.findSubscriptionContractActiveByProductRepository.execute(
      data
    );
  }

  private clearData(
    query: FindSubscriptionContractActiveByProductQuery
  ): FindSubscriptionContractActiveByProductQuery {
    return cleanObject({
      product: cleanValue(query?.product),
      app: cleanValue(query?.app),
      customer: cleanValue(query?.customer)
    });
  }
}
