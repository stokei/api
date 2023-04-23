import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractItemNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindSubscriptionContractItemByIdQuery } from '@/queries/implements/subscription-contract-items/find-subscription-contract-item-by-id.query';
import { FindSubscriptionContractItemByIdRepository } from '@/repositories/subscription-contract-items/find-subscription-contract-item-by-id';

@QueryHandler(FindSubscriptionContractItemByIdQuery)
export class FindSubscriptionContractItemByIdQueryHandler
  implements IQueryHandler<FindSubscriptionContractItemByIdQuery>
{
  constructor(
    private readonly findSubscriptionContractItemByIdRepository: FindSubscriptionContractItemByIdRepository
  ) {}

  async execute(
    query: FindSubscriptionContractItemByIdQuery
  ): Promise<SubscriptionContractItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const subscriptionContractItem =
      await this.findSubscriptionContractItemByIdRepository.execute(id);
    if (!subscriptionContractItem) {
      throw new SubscriptionContractItemNotFoundException();
    }
    return subscriptionContractItem;
  }
}
