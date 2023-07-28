import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IPaginatedType,
  PaginationMapper
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAllSubscriptionContractsByItemQuery } from '@/queries/implements/subscription-contracts/find-all-subscription-contracts-by-item.query';
import { CountSubscriptionContractsByItemRepository } from '@/repositories/subscription-contracts/count-subscription-contracts-by-item';
import { FindAllSubscriptionContractsByItemRepository } from '@/repositories/subscription-contracts/find-all-subscription-contracts-by-item';

@QueryHandler(FindAllSubscriptionContractsByItemQuery)
export class FindAllSubscriptionContractsByItemQueryHandler
  implements IQueryHandler<FindAllSubscriptionContractsByItemQuery>
{
  constructor(
    private readonly findAllSubscriptionContractsByItemRepository: FindAllSubscriptionContractsByItemRepository,
    private readonly countSubscriptionContractsByItemRepository: CountSubscriptionContractsByItemRepository
  ) {}

  async execute(
    query: FindAllSubscriptionContractsByItemQuery
  ): Promise<IPaginatedType<SubscriptionContractModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const subscriptionContracts =
      await this.findAllSubscriptionContractsByItemRepository.execute(data);
    const totalCount =
      await this.countSubscriptionContractsByItemRepository.execute(data);
    return new PaginationMapper<SubscriptionContractModel>().toPaginationList({
      items: subscriptionContracts || [],
      page: data?.page,
      totalCount: totalCount || 0
    });
  }

  private clearData(
    query: FindAllSubscriptionContractsByItemQuery
  ): FindAllSubscriptionContractsByItemQuery {
    return cleanObject({
      where: cleanObject({
        app: cleanWhereDataString(query?.where?.app),
        parent: cleanWhereDataSearch(query?.where?.parent),
        status: query?.where?.status,
        product: cleanWhereDataSearch(query?.where?.product)
      }),
      orderBy: cleanObject({
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      }),
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      })
    });
  }
}
