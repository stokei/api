import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SubscriptionContractItemMapper } from '@/mappers/subscription-contract-items';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllSubscriptionContractItemsQuery } from '@/queries/implements/subscription-contract-items/find-all-subscription-contract-items.query';
import { CountSubscriptionContractItemsRepository } from '@/repositories/subscription-contract-items/count-subscription-contract-items';
import { FindAllSubscriptionContractItemsRepository } from '@/repositories/subscription-contract-items/find-all-subscription-contract-items';

@QueryHandler(FindAllSubscriptionContractItemsQuery)
export class FindAllSubscriptionContractItemsQueryHandler
  implements IQueryHandler<FindAllSubscriptionContractItemsQuery>
{
  constructor(
    private readonly findAllSubscriptionContractItemRepository: FindAllSubscriptionContractItemsRepository,
    private readonly countSubscriptionContractItemsRepository: CountSubscriptionContractItemsRepository
  ) {}

  async execute(
    query: FindAllSubscriptionContractItemsQuery
  ): Promise<IPaginatedType<SubscriptionContractItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new SubscriptionContractItemMapper().toFindAllQueryClean(
      query
    );
    const subscriptionContractItems =
      await this.findAllSubscriptionContractItemRepository.execute(data);
    const totalCount =
      await this.countSubscriptionContractItemsRepository.execute({
        where: data.where
      });
    return new PaginationMapper<SubscriptionContractItemModel>().toPaginationList(
      {
        items: subscriptionContractItems,
        page: data.page,
        totalCount
      }
    );
  }
}
